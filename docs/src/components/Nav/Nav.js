import React from 'react';
import Link from '../Link/Link';

import Logo from '../Logo/Logo';

const Nav = () => (
	<header className="nav">
		<div className="nav__inner">
			<Logo />
			<nav className="nav__links-wrapper">
				<Link className="nav__link nav__link--internal" exact={true} url="/">
					<span>Home</span>
				</Link>
				<Link className="nav__link nav__link--internal" exact={false} url="/docs">
					<span>Docs</span>
				</Link>
				<Link className="nav__link nav__link--internal" exact={false} url="/tutorial">
					<span>Tutorial</span>
				</Link>
				<Link className="nav__link nav__link--internal" exact={false} url="/modules">
					<span>Modules</span>
				</Link>
			</nav>
			<div>
				<Link className="nav__link nav__link--github" newTab={true} type="html-a-tag" url="https://github.com/sammysaglam/axe-framework/releases">
					v0.1.0
				</Link>
				<Link className="nav__link nav__link--github" newTab={true} type="html-a-tag" url="https://github.com/sammysaglam/axe-framework">
					GitHub
				</Link>
			</div>
		</div>
	</header>
);

export default Nav;
