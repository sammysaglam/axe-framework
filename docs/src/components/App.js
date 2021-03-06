import React from 'react';
import { Route } from 'react-router-dom';

import Nav from './Nav/Nav';

import Home from './Pages/Home/Home';
import Docs from './Pages/Docs/Docs';
import Tutorial from './Pages/Tutorial/Tutorial';
import ModuleDocs from './Pages/ModuleDocs/ModuleDocs';

const App = () => (
	<React.Fragment>
		<Nav />
		<Route exact={true} path="/" render={Home} />
		<Route path="/docs" render={Docs} />
		<Route path="/tutorial" render={Tutorial} />
		<Route path="/modules" render={ModuleDocs} />
	</React.Fragment>
);

export default App;
