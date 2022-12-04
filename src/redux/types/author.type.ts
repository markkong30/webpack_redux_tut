// export type Author = {};

enum ActionTypes {
	A = 'LOAD_AUTHORS'
}

interface IActionA {
	type: ActionTypes.A;
	authors: Author[];
}

export type Author = {
	id: string;
	name: string;
};

export type IAction = IActionA;
