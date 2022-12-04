import type { Course } from '../types/course.type';
import type { Author } from '../types/author.type';

export interface IRootState {
	state: IAppState;
}

export type IAppState = {
	courses: Course[];
	authors: Author[];
	apiCallsInProgress: number;
};
