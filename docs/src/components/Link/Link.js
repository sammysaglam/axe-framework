import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Link = ({ children, className, exact, newTab, type, url }) => {
	const classNames = ['link', className].filter(notEmpty => notEmpty).join(' ');

	return (
		(type === 'html-a-tag' && (
			<a className={classNames} href={url} rel={newTab ? 'noopener noreferrer' : null} target={newTab ? '_blank' : null}>
				{children}
			</a>
		)) ||
		(type === 'router-link' && (
			<NavLink className={classNames} exact={exact} to={url}>
				{children}
			</NavLink>
		))
	);
};

Link.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	exact: PropTypes.bool,
	newTab: PropTypes.bool,
	type: PropTypes.oneOf(['html-a-tag', 'router-link']),
	url: PropTypes.string.isRequired
};

Link.defaultProps = {
	className: null,
	exact: null,
	newTab: false,
	type: 'router-link'
};

export default Link;
