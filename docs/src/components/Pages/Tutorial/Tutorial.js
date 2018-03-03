import React from 'react';

import UnderConstruction from './00-UNDER-CONSTRUCTION.md';

import DocumentationPage from '../../DocumentationPage/DocumentationPage';

const Docs = () => (
	<DocumentationPage
		baseUrl="/tutorial"
		pages={{
			'Get Started': [
				{
					label: 'Setup',
					view: <UnderConstruction />
				}
			]
		}}
	/>
);

export default Docs;
