import React from 'react';

import DocumentationPage from '../../DocumentationPage/DocumentationPage';

import AuthModels from '../../../../../modules/Auth/models/README.md';
import AuthViews from './Auth/AuthViews';

const ModuleDocs = () => (
	<DocumentationPage
		baseUrl="/modules"
		pages={{
			Auth: [
				{
					label: 'Models',
					view: <AuthModels />
				},
				{
					label: 'Views',
					view: <AuthViews />
				},
				{
					label: 'Controllers',
					view: <div />
				}
			]
		}}
	/>
);

export default ModuleDocs;
