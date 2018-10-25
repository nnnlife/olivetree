import React from 'react';
import Popup from 'reactjs-popup';
import SentenceContent from './sentence-content';

var uniqueId = function() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
};

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
        this.props.onCreate({keyword: this.state.keyword, contents: this.state.contents});
    }

    contentTypeChanged = e => {
        this.currentPluginSelection = e.target.value;
    }

    contentUpdate = (id, content) => {
        let found = this.state.contents.find(item => item.id === id);
        found.content = content;  
    }

    addContent = () => {
        let key = uniqueId();

        switch(this.currentPluginSelection) {
            case 'Sentence':
                let contents = this.state.contents;
                contents.push({
                    type: 'Sentence',
                    id: key,
                    view: (<SentenceContent id={key} update={this.contentUpdate}/>),
                    content: Buffer,
                });
                this.setState({contents: contents});
            break;
        }
    }

    render() {
        const options = this.plugins.map((item, index) => (
            <option value={item} key={index}>{item}</option>
        ));
        const addedContents = this.state.contents.map((item, index) => item.view);
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
