import type { Course } from '../types/course.type';

export interface IRootState {
	state: IAppState;
}

export type IAppState = {
	courses: Course[];
};
