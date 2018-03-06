import React from 'react';

import AuthViewsMarkdown from '../../../../../../modules/Auth/views/README.md';

export default class AuthViews extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoginFormVisible: false,
			isSignupFormVisible: false
		};

		this.toggleLoginForm = this.toggleLoginForm.bind(this);
		this.toggleSignupForm = this.toggleSignupForm.bind(this);
	}

	toggleLoginForm() {
		const { isLoginFormVisible, isSignupFormVisible } = this.state;

		const newIsLoginFormVisible = !isLoginFormVisible;

		this.setState({
			isLoginFormVisible: newIsLoginFormVisible,
			isSignupFormVisible: newIsLoginFormVisible ? false : isSignupFormVisible
		});
	}

	toggleSignupForm() {
		const { isLoginFormVisible, isSignupFormVisible } = this.state;

		const newIsSignupFormVisible = !isSignupFormVisible;

		this.setState({
			isSignupFormVisible: newIsSignupFormVisible,
			isLoginFormVisible: newIsSignupFormVisible ? false : isLoginFormVisible
		});
	}

	render() {
		const { isLoginFormVisible, isSignupFormVisible } = this.state;
		const { toggleLoginForm, toggleSignupForm } = this;

		return (
			<AuthViewsMarkdown
				constants={{
					IS_VALID: true,

					ERROR_ISEMPTY: 1,
					ERROR_USERNAMETAKEN: 2,
					ERROR_TOOLONG: 4,
					ERROR_TOOSHORT: 8,
					ERROR_REQUIRESUPPERCASELETTERS: 16,
					ERROR_REQUIRESLOWERCASELETTERS: 32,
					ERROR_REQUIRESNUMBERS: 64,

					USERNAME_MAX_LENGTH: 10,
					PASSWORD_MIN_LENGTH: 5,
					NAME_MAX_LENGTH: 20,

					DID_NOT_ACCEPT_TO_SIGNUP_TO_NEWSLETTER: 11
				}}
				isLoginFormVisible={isLoginFormVisible}
				isSignupFormVisible={isSignupFormVisible}
				toggleLoginForm={toggleLoginForm}
				toggleSignupForm={toggleSignupForm}
			/>
		);
	}
}
