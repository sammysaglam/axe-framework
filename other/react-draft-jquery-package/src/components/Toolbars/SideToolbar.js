import React from 'react';
import ToolbarIcon from './ToolbarIcon'

export default class SideToolbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blockSettings:{
				show:false
			}
		}
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
	}

	onMouseOver() {
		this.setState({
			blockSettings:{
				show:true
			}
		});
	}

	onMouseLeave() {
		setTimeout(() => {
			this.setState({isExpanded:false});
		} , 1000);
	}

	render() {
		const {isExpanded} = this.state;
		const {editorState} = this.props;
		return (
			<div className="side-toolbar" style={{top:this.props.position.top}}>
				<span onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
					≡
				</span>
				{isExpanded
					? <BlockSettings sideToolbarState={this.state}/>
					:
					null
				}
			</div>
		)

	}
}

const BLOCK_TYPES = [
	{id_:'h1' , label:'H1'} ,
	{id_:'h2' , label:'H2'} ,
];

class BlockSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sideToolbarState:props.sideToolbarState
		}
	}

	render() {
		return (
			<div className="block-settings toolbar">
				<ul className="toolbar-icons">
					{
						BLOCK_TYPES.map(block_type =>
							<ToolbarIcon
								key={block_type.id_}
								id_={block_type.id_}
								label={block_type.label}
								onToggle={this.onToggle}
							/>
						)
					}
				</ul>
			</div>
		)
	}
}