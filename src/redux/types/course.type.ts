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
	B = 'LOAD_COURSES',
	C = 'UPDATE_COURSE',
	D = 'DELETE_COURSE_OPT'
}

interface IActionA {
	type: ActionTypes.A;
	course: Course;
}

interface IActionB {
	type: ActionTypes.B;
	courses: Course[];
}

interface IActionC {
	type: ActionTypes.C;
	course: Course;
}

interface IActionD {
	type: ActionTypes.D;
	course: Course;
}
export interface CourseDispatch {
	type: ActionTypes.A | ActionTypes.B | ActionTypes.C;
	course: Course;
}

export type IAction = IActionA | IActionB | IActionC | IActionD;
