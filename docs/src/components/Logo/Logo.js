import React from 'react';
import PropTypes from 'prop-types';

import Link from '../Link/Link';
import LogoImage from './_img/logo.svg';

const Logo = ({ hideImage, hideText, link }) => {
	const logo = (
		<React.Fragment>
			{hideImage ? null : <LogoImage />}
			{hideText ? null : <span className="logo__text">axe framework</span>}
		</React.Fragment>
	);

	return link ? (
		<div className="logo">{logo}</div>
	) : (
		<h1>
			<Link className="logo" url="/">
				{logo}
			</Link>
		</h1>
	);
};

Logo.propTypes = {
	hideImage: PropTypes.bool,
	hideText: PropTypes.bool,
	link: PropTypes.bool
};

Logo.defaultProps = {
	hideImage: false,
	hideText: false,
	link: false
};

export default Logo;
