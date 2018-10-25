import React from 'react'
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';

export default class SentenceContent extends React.Component {
    state = {
        editorState: EditorState.createEmpty(),
    }

    editorOnChange = (editorState) => {
        this.setState({editorState})
        console.log("raw", convertToRaw(editorState.getCurrentContent()))
    }

    render() {
        return (
            <Editor editorState={this.state.editorState} onChange={this.editorOnChange}/>    
        );
    }
}