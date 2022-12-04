enum ActionTypes {
	A = 'BEGIN_API_CALL',
	B = 'END_API_CALL'
}

interface IActionA {
	type: ActionTypes.A;
}

interface IActionB {
	type: ActionTypes.B;
}

export type IAction = IActionA | IActionB;
