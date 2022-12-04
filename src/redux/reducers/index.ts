import { combineReducers } from 'redux';
import { apiCallStatusReducer } from './apiStatusReducer';
import { authorsReducer } from './authorsReducer';
import { coursesReducer } from './coursesReducer';

const rootReducer = combineReducers({
	courses: coursesReducer,
	authors: authorsReducer,
	apiCallsInProgress: apiCallStatusReducer
});

export default rootReducer;
