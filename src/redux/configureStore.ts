import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { IAppState } from './types/store.type';

export const configureStore = (initialState?: IAppState) => {
	return createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvariant()))
	);
};
