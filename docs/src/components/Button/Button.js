import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link/Link';

const Button = ({ className, children, exact, type, url, variant }) => {
	const classNames = ['button', `button--${variant}`, className].filter(notEmpty => notEmpty).join(' ');

	return (
		(type === 'button' && (
			<button className={classNames} type="button">
				{children}
			</button>
		)) ||
		(type === 'link' && <Link className={classNames} url={url} />) ||
		(type === 'router-link' && (
			<Link className={classNames} exact={exact} url={url}>
				{children}
			</Link>
		))
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	exact: PropTypes.bool,
	type: PropTypes.oneOf(['button', 'link', 'router-link']),
	url: PropTypes.string,
	variant: PropTypes.oneOf(['normal', 'call-to-action'])
};

Button.defaultProps = {
	className: null,
	exact: null,
	type: 'button',
	url: null,
	variant: 'normal'
};

export default Button;
