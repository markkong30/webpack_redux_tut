import type { Course } from '../types/course.type';

export const createCourse = (course: Course) => {
	return { type: 'CREATE_COURSE', course };
};
