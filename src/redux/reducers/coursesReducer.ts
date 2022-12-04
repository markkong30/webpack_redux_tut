import type { Course, IAction } from '../types/course.type';

export const coursesReducer = (state: Course[] = [], action: IAction) => {
	switch (action.type) {
		case 'LOAD_COURSES':
			return action.courses;
		case 'CREATE_COURSE':
			return [...state, action.course];
		case 'UPDATE_COURSE':
			return state.map((course) =>
				course.id === action.course.id ? action.course : course
			);
		default:
			return state;
	}
};
