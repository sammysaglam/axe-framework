import React from 'react';
import {Editor , EditorState , RichUtils} from 'draft-js';
import InlineToolbar from './../Toolbars/InlineToolbar' ;
import SideToolbar from './../Toolbars/SideToolbar' ;

const utils = require('../../utils/entry.js');

export default class EditableContent extends React.Component {
	constructor() {
		super();
		this.state = {
			editorState:EditorState.createEmpty() ,
			inlineToolbar:{show:false}
		}
		this.focus = () => {
			this.refs.editor.focus();
			this.onChange(this.state.editorState);
			this.handleKeyCommand = this.handleKeyCommand.bind(this);
		}
		this.onChange = this.onChange.bind(this);
		this.updateSelection = this._updateSelection.bind(this);
	};

	onChange(editorState) {

		// is selection is not collapsed, show the inlineToolbar for formatting the selection
		var selection = utils.selection.getSelection();
		if ( !selection.isCollapsed && !editorState.getSelection().isCollapsed() && selection.range ) {

			const offset = utils.selection.getSelectionCoords(this.refs.container , selection.range)

			this.setState({
				inlineToolbar:{
					show:true ,
					position:{
						top:offset.top ,
						left:offset.left
					}
				}
			});

		} else {
			this.setState({inlineToolbar:{show:false}});
		}

		this.setState({editorState});
		setTimeout(this.updateSelection , 0);
	}

	_updateSelection() {
		const selectionRange = utils.selection.getSelection().range;
		let selectedBlock;
		if ( selectionRange ) {
			selectedBlock = utils.selection.getSelectedBlockElement(selectionRange);
		}
		this.setState({
			selectedBlock ,
			selectionRange
		});
	}

	handleKeyCommand(command) {
		const newState = RichUtils.handleKeyCommand(this.state.editorState , command);
		if ( newState ) {
			this.onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	}

	_promptForLink(e) {
		e.preventDefault();
	}

	render() {
		const {editorState , selectedBlock , selectionRange} = this.state;
		let sideToolbarOffsetTop = 0;

		if ( selectedBlock ) {
			const editor = this.refs.container;
			const editorBounds = editor.getBoundingClientRect();
			const blockBounds = selectedBlock.getBoundingClientRect();

			sideToolbarOffsetTop = (blockBounds.bottom - editorBounds.top) - 26; // height of side toolbar
		}

		return (
			<div onClick={this.focus} ref="container">
				{this.state.inlineToolbar.show
					? <InlineToolbar
						editorState={editorState}
						position={this.state.inlineToolbar.position}
					/>
					: null
				}
				{selectedBlock
					? <SideToolbar
						position={{top:sideToolbarOffsetTop}}
					/>
					: null
				}
				<Editor
					editorState={this.state.editorState}
					onChange={this.onChange}
					handleKeyCommand={this.handleKeyCommand}
					ref="editor"
				/>
			</div>
		);
	}
}