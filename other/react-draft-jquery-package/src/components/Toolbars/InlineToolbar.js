import React from 'react';
import ToolbarIcon from './ToolbarIcon'

const INLINE_STYLES = [
	{id_:'bold' , label:'B'} ,
	{id_:'italic' , label:'I'} ,
	{id_:'link' , label:'url'} ,
	{id_:'code' , label:'<code>'} ,
];

export default class InlineToolbar extends React.Component {
	constructor(props) {
		super(props);
		this.onToggle = this.onToggle.bind(this);
	}

	onToggle(e) {
		e.preventDefault() ;
	}

	render() {
		const currentStyle = this.props.editorState.getCurrentInlineStyle();
		return (
			<div className="inline-toolbar toolbar" style={this.props.position}>
				<ul className="toolbar-icons">
					{
						INLINE_STYLES.map(inline_style =>
							<ToolbarIcon
								key={inline_style.id_}
								id_={inline_style.id_}
								label={inline_style.label}
								onToggle={this.onToggle}
							/>
						)
					}
				</ul>
			</div>
		);
	} ;
}