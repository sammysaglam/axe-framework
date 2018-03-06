---
imports:
    'ReactLoginPanel': '../../../docs/src/components/Pages/ModuleDocs/Auth/ReactLoginPanel/ReactLoginPanel.lazyLoaded'
---

# <ReactLoginPanel />

## Installation
```bash
npm install react-login-panel --save
```

## Full-Featured Demo
```jsx show-source
<ReactLoginPanel
	areFormTitlesVisible={true}
	isLoginFormVisible={props.isLoginFormVisible}
	isSignupFormVisible={props.isSignupFormVisible}
	loggingIn={false}
	loginFailed={false}
	loginFormFields={[
		{
			id: 'username',
			element: <input placeholder="Username" />
		},
		{
			id: 'password',
			element: <input placeholder="Password" type="password" />
		}
	]}
	onSubmitLoginForm={() => alert('Logged in!')}
	onSubmitSignupForm={() => alert('Signed up!')}
	signingUp={false}
	signupFormFields={[
		{
			id: 'username',
			element: <input placeholder="Username" />,
			validator: async (value, done) => {
				// sync validators
				if (value.length === 0) {
					return done(props.constants.ERROR_ISEMPTY);
				} else if (value.length > props.constants.USERNAME_MAX_LENGTH) {
					return done(props.constants.ERROR_TOOLONG);
				}

				// async validator
				const asyncResponse = await new Promise(resolve => {
					const FAKE_TIMEOUT = 250;

					setTimeout(() => {
						resolve(
							value === 'sammy'
								? props.constants.ERROR_USERNAMETAKEN
								: props.constants.IS_VALID
						);
					}, FAKE_TIMEOUT);
				});

				return done(asyncResponse);
			},
			errorFeedbackElement: errorCode => {
				switch (errorCode) {
					case props.constants.ERROR_ISEMPTY:
						return <div>Username cannot be empty!</div>;
					case props.constants.ERROR_TOOLONG:
						return (
							<div>
								Username cannot be longer than{' '}
								{props.constants.USERNAME_MAX_LENGTH} characters!
							</div>
						);
					case props.constants.ERROR_USERNAMETAKEN:
						return <div>Username already taken!</div>;
					default:
						return <div>Unknown Error</div>;
				}
			}
		},
		{
			id: 'password',
			element: <input placeholder="Password" type="password" />,
			validator: val => {
				if (val.length === 0) {
					return props.constants.ERROR_ISEMPTY;
				}

				let BITWISE_ERROR_CODE = 0;

				if (val.length < props.constants.PASSWORD_MIN_LENGTH) {
					BITWISE_ERROR_CODE |= props.constants.ERROR_TOOSHORT;
				}

				if (val.replace(/[^A-Z]/g, '').length === 0) {
					BITWISE_ERROR_CODE |=
						props.constants.ERROR_REQUIRESUPPERCASELETTERS;
				}

				if (val.replace(/[^a-z]/g, '').length === 0) {
					BITWISE_ERROR_CODE |=
						props.constants.ERROR_REQUIRESLOWERCASELETTERS;
				}

				if (val.replace(/[^0-9]/g, '').length === 0) {
					BITWISE_ERROR_CODE |= props.constants.ERROR_REQUIRESNUMBERS;
				}

				if (BITWISE_ERROR_CODE === 0) {
					return true;
				}
				return BITWISE_ERROR_CODE;
			},
			errorFeedbackElement: errorCode => {
				switch (errorCode) {
					case props.constants.ERROR_ISEMPTY:
						return <div>Password cannot be empty!</div>;

					default:
						return (
							<React.Fragment>
								{errorCode & props.constants.ERROR_TOOSHORT ? (
									<div>
										Password must be min{' '}
										{props.constants.PASSWORD_MIN_LENGTH} characters.
									</div>
								) : null}
								{errorCode &
								props.constants.ERROR_REQUIRESUPPERCASELETTERS ? (
									<div>Password requires Uppercase Letters.</div>
								) : null}
								{errorCode &
								props.constants.ERROR_REQUIRESLOWERCASELETTERS ? (
									<div>Password requires Lowercase Letters.</div>
								) : null}
								{errorCode & props.constants.ERROR_REQUIRESNUMBERS ? (
									<div>Password requires Numbers.</div>
								) : null}
							</React.Fragment>
						);
				}
			}
		},
		{
			id: 'name',
			element: <input placeholder="Full Name" />,
			validator: val => {
				if (val.length === 0) {
					return props.constants.ERROR_ISEMPTY;
				} else if (val.length >= props.constants.NAME_MAX_LENGTH) {
					return props.constants.ERROR_TOOLONG;
				}

				return true;
			},
			errorFeedbackElement: errorCode => {
				switch (errorCode) {
					case props.constants.ERROR_ISEMPTY:
						return <div>Name cannot be empty!</div>;
					case props.constants.ERROR_TOOLONG:
						return (
							<div>
								Name cannot be longer than{' '}
								{props.constants.NAME_MAX_LENGTH} characters!
							</div>
						);
					default:
						return <div>Unknown Error</div>;
				}
			}
		}
	]}
	toggleLoginForm={props.toggleLoginForm}
	toggleSignupForm={props.toggleSignupForm}
/>
```