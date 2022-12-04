import type { Course } from '../types/course.type';
import * as courseApi from '../../api/courseApi';
import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { IAppState } from '../../redux/types/store.type';
import { beginApiCall, endApiCall } from './apiStatusActions';

const loadCourseSuccess = (courses: Course[]) => {
	return { type: 'LOAD_COURSES', courses };
};

const createCourseSuccess = (course: Course) => {
	return { type: 'CREATE_COURSE', course };
};

const updateCourseSuccess = (course: Course) => {
	return { type: 'UPDATE_COURSE', course };
};

const deleteCourseOptimistic = (course: Course) => {
	return { type: 'DELETE_COURSE_OPT', course };
};

export const loadCourses = (): ThunkAction<
	void,
	IAppState,
	unknown,
	AnyAction
> => {
	return (dispatch) => {
		dispatch(beginApiCall());

		return courseApi
			.getCourses()
			.then((courses) => {
				dispatch(loadCourseSuccess(courses));
			})
			.catch((err) => {
				dispatch(endApiCall());
				throw err;
			})
			.finally(() => {
				dispatch(endApiCall());
			});
	};
};

export const saveCourse = (
	course: Course
): ThunkAction<void, IAppState, unknown, AnyAction> => {
	return (dispatch) => {
		dispatch(beginApiCall());

		return courseApi
			.saveCourse(course)
			.then((course) => {
				if (course.id) {
					dispatch(updateCourseSuccess(course));
				} else {
					dispatch(createCourseSuccess(course));
				}
			})
			.catch((err) => {
				dispatch(endApiCall());
				throw err;
			})
			.finally(() => {
				dispatch(endApiCall());
			});
	};
};

export const deleteCourse = (
	course: Course
): ThunkAction<void, IAppState, unknown, AnyAction> => {
	return (dispatch) => {
		dispatch(deleteCourseOptimistic(course));
		return courseApi.deleteCourse(course.id).catch((err) => {
			throw err;
		});
	};
};
