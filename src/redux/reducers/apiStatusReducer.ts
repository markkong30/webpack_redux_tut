import { IAction } from '../types/apiStatus.type';

export const apiCallStatusReducer = (state = 0, action: IAction) => {
	switch (action.type) {
		case 'BEGIN_API_CALL':
			return state + 1;
		case 'END_API_CALL':
			return state - 1;
		default:
			return state;
	}
};
