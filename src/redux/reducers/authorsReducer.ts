import type { Author, IAction } from '../types/author.type';

export const authorsReducer = (state: Author[] = [], action: IAction) => {
	switch (action.type) {
		case 'LOAD_AUTHORS':
			return action.authors;
		default:
			return state;
	}
};
