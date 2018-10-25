import React from 'react';
import Popup from 'reactjs-popup';
import SentenceContent from './sentence-content';


export default class CreateOlive extends React.Component {
    state = {
        createPopup: false,
        keyword: '',
        contents: [],
    };

    constructor(props) {
        super(props);
        this.plugins = ['Sentence', 'Image', 'Tag']
        this.currentPluginSelection = 'Sentence'
    }

    updateCreatePopup = isOpen => {
        this.setState({createPopup: isOpen});
    }

    updateKeyword = e => {
        this.setState({keyword: e.target.value});
    }

    createOlive = () => {

    }

    contentTypeChanged = e => {
        this.currentPluginSelection = e.target.value;
    }

    addContent = () => {
        switch(this.currentPluginSelection) {
            case 'Sentence':
                let contents = this.state.contents;
                contents.push((<SentenceContent/>));
                this.setState({contents: contents});
            break;
        }
    }

    render() {
        const options = this.plugins.map((item, index) => (
            <option value={item} key={index}>{item}</option>
        ));
        const addedContents = this.state.contents.map((item, index) => item);
        return(
                <Popup trigger={<button className='button'>Add Contents</button>} onClose={() => {this.updateCreatePopup(false)}}
                         onOpen={() => {this.updateCreatePopup(true)}} open={this.state.createPopup} modal>                
                    {close => (
                        <div>
                            Keyword: 
                        <input type='text' value={this.state.keyword} onChange={evt => this.updateKeyword(evt)}></input>
                        <button onClick={() => {close()}}>Close</button>
                        <button onClick={this.createOlive}>Create</button>
                        <br/>
                        <select onChange={this.contentTypeChanged}>
                        {options}
                        </select>
                        <button onClick={this.addContent}>Add Content</button>
                        {addedContents}
                        </div>
                    )}   
                </Popup>
        );
    }
}
