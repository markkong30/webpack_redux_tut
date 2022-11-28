import type { Course, IAction } from '../types/course.type';

export const coursesReducer = (state: Course[] = [], action: IAction) => {
	switch (action.type) {
		case 'LOAD_COURSES':
			return action.courses;
		case 'CREATE_COURSE':
			return [...state, action.course];
		default:
			return state;
	}
};
