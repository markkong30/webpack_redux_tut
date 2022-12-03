export type Course = {
	id: string;
	slug: string;
	category: string;
	title: string;
	authorId: string;
	author: string;
};

enum ActionTypes {
	A = 'CREATE_COURSE',
	B = 'LOAD_COURSES'
}

interface IActionA {
	type: ActionTypes.A;
	course: Course;
}

interface IActionB {
	type: ActionTypes.B;
	courses: Course[];
}
export interface CourseDispatch {
	type: ActionTypes.A | ActionTypes.B;
	course: Course;
}

export type IAction = IActionA | IActionB;
