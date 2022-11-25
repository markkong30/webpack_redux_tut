export type Course = {
	title: string;
};

enum ActionTypes {
	A = 'CREATE_COURSE',
	B = 'ANYTHING_HERE_B'
}

interface IActionA {
	type: ActionTypes.A;
	course: Course;
}

interface IActionB {
	type: ActionTypes.B;
	b: string;
}

export type IAction = IActionA | IActionB;
