import { combineReducers } from 'redux';
import { coursesReducer } from './coursesReducers';

const rootReducer = combineReducers({
	courses: coursesReducer
});

export default rootReducer;
