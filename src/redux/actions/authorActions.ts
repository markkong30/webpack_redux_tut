import * as authorApi from '../../api/authorApi';
import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { IAppState } from '../../redux/types/store.type';

const loadAuthorsSuccess = (authors: any) => {
	return { type: 'LOAD_AUTHORS', authors };
};

export const loadAuthors = (): ThunkAction<
	void,
	IAppState,
	unknown,
	AnyAction
> => {
	return (dispatch) =>
		authorApi
			.getAuthors()
			.then((authors) => {
				dispatch(loadAuthorsSuccess(authors));
			})
			.catch((err) => {
				throw err;
			});
};
