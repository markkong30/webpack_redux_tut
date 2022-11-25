import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { composeWithDevTools } from 'redux-devtools-extension';

export const configureStore = (initialState?: any) => {
	return createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(reduxImmutableStateInvariant()))
	);
};
