import React from 'react';
import CourseForm from './CourseForm';
import { shallow } from 'enzyme';
import { fireEvent, render } from '@testing-library/react';

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

it('shoud NOT show error if error.onSave exists', () => {
	const overrideProps = {
		errors: {
			onSave: 'error'
		}
	};
	const { wrapper } = setupRTL(overrideProps);

	expect(wrapper.getByRole('alert')).toBeTruthy();
});

it('should call onSave prop when submit if all fields of the form is not empty', () => {
	const overrideProps = {
		course: {
			title: 'test',
			authorId: '1',
			category: 'test'
		}
	};
	const { wrapper, props } = setupRTL(overrideProps);

	fireEvent.submit(wrapper.getByTestId('save-form'));
	expect(props.onSave).toHaveBeenCalled();
});

it('should show "Saving" button text when the form is saving', () => {
	const { wrapper } = setupRTL({ saving: true });

	expect(wrapper.getByText(/saving/i)).toBeTruthy();
});
