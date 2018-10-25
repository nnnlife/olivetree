import React from 'react';
import Popup from 'reactjs-popup';
import Link from 'next/link';

const config = require('../server/config');

export default class Branch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            deckPopup: false,
            branches: []
        };
    }   

    componentDidMount() {
        fetch(config.SERVER_URL_PREFIX + '/api/branch', {credentials: 'include'})
        .then(res => res.json())
        .then(data => {
            this.setState({branches: data})
        });
    }

    updateInputValue = evt => {
        this.setState({inputValue: evt.target.value});
    }

    createDeck = () => {
        this.setState({deckPopup: false, inputValue:''})
        fetch(config.SERVER_URL_PREFIX + '/api/create-branch', {
            method: "Post",
            credentials: 'include',
            body: JSON.stringify({name: this.state.inputValue}),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({branches: data})
        });
    }

    updateDeckPopup = isOpen => this.setState({deckPopup: isOpen});

    render() {
        
        const Decks = this.state.branches.map((branch, index) => (
            <Link href={{pathname: '/olive', query: {branch: branch._id}}}>
            <button key={index}>
                {branch.name}
            </button>
            </Link>
        ));
        return (
            <div>
                <Popup trigger={<button className='button'>Create Deck</button>} onClose={() => {this.updateDeckPopup(false)}}
                         onOpen={() => {this.updateDeckPopup(true)}} open={this.state.deckPopup} modal>                
                    {close => (
                        <div>
                            Deck: 
                        <input type='text' value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}></input>
                        <button onClick={() => {close()}}>Close</button>
                        <button onClick={this.createDeck}>Create</button>
                        </div>
                    )}   
                </Popup>
                <h2>
                    Decks
                </h2>
                {Decks}
            </div>
        );
    }
}