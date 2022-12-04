import * as authorApi from '../../api/authorApi';
import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { IAppState } from '../../redux/types/store.type';
import { beginApiCall, endApiCall } from './apiStatusActions';
import { Author } from '../types/author.type';

const loadAuthorsSuccess = (authors: Author[]) => {
	return { type: 'LOAD_AUTHORS', authors };
};

export const loadAuthors = (): ThunkAction<
	void,
	IAppState,
	unknown,
	AnyAction
> => {
	return (dispatch) => {
		dispatch(beginApiCall());
		return authorApi
			.getAuthors()
			.then((authors) => {
				dispatch(loadAuthorsSuccess(authors));
			})
			.catch((err) => {
				dispatch(endApiCall());
				throw err;
			})
			.finally(() => {
				dispatch(endApiCall());
			});
	};
};
