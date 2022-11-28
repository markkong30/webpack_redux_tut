import type { Course } from '../types/course.type';
import * as courseApi from '../../api/courseApi';
import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { IAppState } from '../../redux/types/store.type';

export const createCourse = (course: Course) => {
	return { type: 'CREATE_COURSE', course };
};

const loadCourseSuccess = (courses: Course[]) => {
	return { type: 'LOAD_COURSES', courses };
};

export const loadCourses = (): ThunkAction<
	void,
	IAppState,
	unknown,
	AnyAction
> => {
	return (dispatch) =>
		courseApi
			.getCourses()
			.then((courses) => {
				dispatch(loadCourseSuccess(courses));
			})
			.catch((err) => {
				throw err;
			});
};
