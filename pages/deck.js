import React from 'react';
import Popup from 'reactjs-popup';

export default class Deck extends React.Component {
    render() {
        return (
            <div>
                <Popup trigger={<button className='button'>Create Deck</button>} modal>
                    <button>Close</button>
                {/*
                    {hello => (
                        <div>
                            Deck name: 
                        <input type='text'></input>
                        <button onClick={() => {hello()}}>Close</button>
                        </div>
                    )}
                    */}   
                </Popup>
                <h2>
                    Decks
                </h2>
            </div>
        );
    }
}