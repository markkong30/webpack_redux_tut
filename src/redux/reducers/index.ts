import { combineReducers } from 'redux';
import { authorsReducer } from './authorsReducer';
import { coursesReducer } from './coursesReducer';

const rootReducer = combineReducers({
	courses: coursesReducer,
	authors: authorsReducer
});

export default rootReducer;
