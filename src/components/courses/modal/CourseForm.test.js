import React from 'react';
import CourseForm from './CourseForm';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';

const setup = (propsOverride) => {
	const props = {
		authors: [],
		course: {},
		saving: false,
		errors: {},
		onSave: jest.fn(),
		onChange: jest.fn(),
		...propsOverride
	};
	const wrapper = shallow(<CourseForm {...props} />);
	return { props, wrapper };
};

const setupRTL = (propsOverride) => {
	const props = {
		authors: [],
		course: {},
		saving: false,
		errors: {},
		onSave: jest.fn(),
		onChange: jest.fn(),
		...propsOverride
	};
	const wrapper = render(<CourseForm {...props} />);
	return { props, wrapper };
};

it('renders form and header', () => {
	const { wrapper } = setup();

	expect(wrapper.find('form').exists()).toBeTruthy();
	expect(wrapper.find('h2').text()).toEqual('Add Course');
});

it('should render Add Course header', () => {
	const { wrapper } = setupRTL();

	expect(wrapper.getByText('Add Course')).toBeTruthy();
});
