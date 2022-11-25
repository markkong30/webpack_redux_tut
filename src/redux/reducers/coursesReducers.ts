import type { Course, IAction } from '../types/course.type';

export const coursesReducer = (state: Course[] = [], action: IAction) => {
	switch (action.type) {
		case 'CREATE_COURSE':
			return [...state, { course: action.course }];
		default:
			return state;
	}
};
