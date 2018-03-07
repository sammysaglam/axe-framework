import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import App from './components/App';

// determine if environment is server-side or client-side
const isServerSide = typeof document === 'undefined';

// client-side rendering (with hot-loader)
if (!isServerSide) {
	// render website
	const render = Component => {
		const renderResult = (
			<AppContainer>
				<BrowserRouter>
					<Component />
				</BrowserRouter>
			</AppContainer>
		);

		const targetElement = document.getElementById('app');

		if (targetElement.innerHTML === 'no-ssr') {
			ReactDOM.render(renderResult, targetElement);
		} else {
			ReactDOM.hydrate(renderResult, targetElement);
		}
	};
	render(App);

	if (module.hot) {
		module.hot.accept('./components/App', () => {
			render(App);
		});
	}
} else {
	// ssr
	window.React = React;
	window.ReactDOM = ReactDOM;
	window.ReactDOMServer = ReactDOMServer;

	const fakeFunction = () => null;

	window.setTimeout = fakeFunction;

	// eslint-disable-next-line react/prop-types
	window.Website = ({ context, location }) => (
		<StaticRouter context={context} location={location}>
			<App />
		</StaticRouter>
	);
}
