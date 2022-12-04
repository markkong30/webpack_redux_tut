import type { Course } from '../types/course.type';
import * as courseApi from '../../api/courseApi';
import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { IAppState } from '../../redux/types/store.type';

const loadCourseSuccess = (courses: Course[]) => {
	return { type: 'LOAD_COURSES', courses };
};

const createCourseSuccess = (course: Course) => {
	return { type: 'CREATE_COURSE', course };
};

const updateCourseSuccess = (course: Course) => {
	return { type: 'UPDATE_COURSE', course };
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

export const saveCourse = (
	course: Course
): ThunkAction<void, IAppState, unknown, AnyAction> => {
	return (dispatch) =>
		courseApi
			.saveCourse(course)
			.then((course) => {
				if (course.id) {
					dispatch(updateCourseSuccess(course));
				} else {
					dispatch(createCourseSuccess(course));
				}
			})
			.catch((err) => {
				throw err;
			});
};
