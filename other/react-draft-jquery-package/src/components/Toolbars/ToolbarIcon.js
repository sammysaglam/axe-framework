import React from 'react';

export default class StyleButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {onToggle} = this.props;
		return (
			<li onMouseDown={this.props.onToggle}><span className={this.props.id_}>{this.props.label}</span></li>
		)
	}
}