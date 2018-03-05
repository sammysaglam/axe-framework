import React from 'react';

const lazyLoad = (Component, options = {}) =>
	class LazyLoadedComponent extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				Component: null
			};
		}

		componentWillMount() {
			// eslint-disable-next-line react/destructuring-assignment
			if (!this.state.Component) {
				if (module.hot) {
					this.setState({ Component: Component.default });
				} else {
					// eslint-disable-next-line new-cap
					Component().then(AsyncComponent => {
						this.setState({ Component: AsyncComponent.default });
					});
				}
			}
		}

		render() {
			// eslint-disable-next-line no-shadow
			const { Component } = this.state;

			return Component ? <Component {...this.props} /> : options.loading ? options.loading : null;
		}
	};

export default lazyLoad;
