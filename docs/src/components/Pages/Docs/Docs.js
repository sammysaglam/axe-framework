import React from 'react';

import UnderConstruction from './00-UNDER-CONSTRUCTION.md';

import Installation from './GetStarted/01-Installation.md';
import Configuring from './GetStarted/02-Configuring.md';

import CreatingRoutes from './Routing/01-Creating-Routes.md';
import DefaultRoutes from './Routing/02-Default-Routes.md';

import DocumentationPage from '../../DocumentationPage/DocumentationPage';

const Docs = () => (
	<DocumentationPage
		baseUrl="/docs"
		pages={{
			'Get Started': [
				{
					label: 'Installation',
					view: <Installation />
				},
				{
					label: 'Configuring',
					view: <Configuring />
				},
				{
					label: 'Code Style',
					view: <UnderConstruction />
				}
			],
			Model: [
				{
					label: 'Basics',
					view: <UnderConstruction />
				},
				{
					label: 'ORM',
					view: <UnderConstruction />
				},
				{
					label: 'Database',
					view: <UnderConstruction />
				}
			],
			View: [
				{
					label: 'Basics',
					view: <UnderConstruction />
				},
				{
					label: 'Loading Assets',
					view: <UnderConstruction />
				},
				{
					label: 'React and JavaScript',
					view: <UnderConstruction />
				}
			],
			Controller: [
				{
					label: 'Basics',
					view: <UnderConstruction />
				}
			],
			Routing: [
				{
					label: 'Creating Routes',
					view: <CreatingRoutes />
				} ,
				{
					label: 'Default Routes',
					view: <DefaultRoutes />
				}
			],
			Contributing: [
				{
					label: 'Basics',
					view: <UnderConstruction />
				}
			]
		}}
	/>
);

export default Docs;
