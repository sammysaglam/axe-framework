import React from 'react';

import DocumentationPage from '../../DocumentationPage/DocumentationPage';

import AuthModels from '../../../../../modules/Auth/models/README.md';
import AuthViews from './Auth/AuthViews';
import AuthControllers from '../../../../../modules/Auth/controllers/README.md';

import BookingViews from '../../../../../modules/Booking/views/README.md';

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
					view: <AuthControllers />
				}
			] ,
			Booking: [
				{
					label: 'Views',
					view: <BookingViews />
				}
			]
		}}
	/>
);

export default ModuleDocs;
