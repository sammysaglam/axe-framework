import React from 'react';
import {Switch , Route , NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import AppMarkdown from "./App.md";

const App = () => (
	<AppMarkdown value="hello" func={() => console.log('sams!!')} someComponent={<div>hell345o</div>}/>
);

App.propTypes = {};

export default App;