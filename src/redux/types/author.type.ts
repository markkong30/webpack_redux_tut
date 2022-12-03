// export type Author = {};

enum ActionTypes {
	A = 'LOAD_AUTHORS'
}

interface IActionA {
	type: ActionTypes.A;
	authors: Author[];
}

export type Author = any;

export type IAction = IActionA;
