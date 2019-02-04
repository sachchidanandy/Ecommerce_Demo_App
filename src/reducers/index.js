import {combineReducers} from 'redux';
import user from './userReducer';

//Note the name we are giving here is used to access values state.courses.anyPropertyName
const rootReducer = combineReducers({
    user
});

export default rootReducer;