import React from 'react';
import {shallow} from 'enzyme';

import Website from './Website';

/* eslint-disable no-undef*/
describe('Website' , () => {

	const fakeFunction = () => null;
	const fakeObject = {};

	const mockProps = {
		deselectAllWidgets:fakeFunction ,
		onDrag:fakeFunction ,
		selectWidget:fakeFunction ,
		selectedWidgets:fakeObject ,
		startDrag:fakeFunction ,
		stopDrag:fakeFunction ,
		widgets:fakeObject ,
		onSpreadsheetCellRangeSelect:fakeFunction ,
		onSpreadsheetCellSelect:fakeFunction ,
		onSpreadsheetUpdateCellData:fakeFunction ,
		onSpreadsheetUpdateColumn:fakeFunction ,
		spreadsheetStates:fakeObject
	};

	it('should render without throwing an error' , () => {
		const wrapper = shallow(
			<Website
				{...mockProps}
			/>
		);

		expect(wrapper.find('.website').length).toBe(1);
	});

});