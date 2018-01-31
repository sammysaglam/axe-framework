import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App';

// render website
const render = Component => {

	const renderResult = (
		<AppContainer>
			<BrowserRouter>
				<Component/>
			</BrowserRouter>
		</AppContainer>
	);

	ReactDOM.render(
		renderResult ,
		document.getElementById('app')
	);
};
render(App);

if ( module.hot ) {
	module.hot.accept('./components/App' , () => {
		render(App);
	});
}