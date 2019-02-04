import * as ActionType from '../constants/ActionType';
import initialState from './initialStoreState';

export default function userReducer (state = initialState.user, action) {
    switch (action.type) {
        case ActionType.LOGIN_USER :
            return  action.user;

        default:
            return state;
    }
}