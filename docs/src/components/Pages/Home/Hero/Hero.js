import React from 'react';
import Button from '../../../Button/Button';
import Logo from '../../../Logo/Logo';

const Hero = () => (
	<section className="hero">
		<div className="hero__logo">
			<Logo hideText={true} />
		</div>
		<div className="hero__text-wrapper">
			<h2 className="hero__text">A PHP & React based framework for building web applications</h2>
			<div className="hero__buttons-wrapper">
				<Button className="hero__button" type="router-link" url="/docs/get-started/installation" variant="call-to-action">
					Get Started
				</Button>
				<Button className="hero__button" type="router-link" url="/tutorial">
					Tutorial
				</Button>
			</div>
		</div>
	</section>
);

export default Hero;
