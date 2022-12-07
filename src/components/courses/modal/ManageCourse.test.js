import React from 'react';
import { mount } from 'enzyme';
import { authors, newCourse, courses } from '../../../../tools/mockData';
import { ManageCourse } from './ManageCourse';

jest.mock('react-router-dom', () => ({
	useHistory: () => ({
		push: jest.fn()
	})
}));

function render(args) {
	const defaultProps = {
		authors,
		courses,
		// Passed from React Router in real app, so just stubbing in for test.
		// Could also choose to use MemoryRouter as shown in Header.test.js,
		// or even wrap with React Router, depending on whether I
		// need to test React Router related behavior.
		history: {},
		saveCourse: jest.fn(() =>
			Promise.reject({ message: 'Title is required.' })
		),
		loadAuthors: jest.fn(),
		loadCourses: jest.fn(),
		course: newCourse,
		match: {}
	};

	const props = { ...defaultProps, ...args };

	return mount(<ManageCourse {...props} />);
}

it('sets error when attempting to save an empty title field', () => {
	const setState = jest.fn();
	jest
		.spyOn(React, 'useState')
		.mockImplementation((state) => [state, setState]);
	const wrapper = render();

	wrapper.find('form').simulate('submit');
	// wrapper.update();
	// expect(setState).toHaveBeenCalled();
	wrapper.update();
	expect(setState).toHaveBeenCalled();
	// const error = wrapper.find('.alert').first();
	// expect(error.text()).toBe('Title is required.');
});
