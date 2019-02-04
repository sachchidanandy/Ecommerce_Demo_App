import * as ActionType from '../constants/ActionType';
import UserAPI from '../demoAPI/userAPI';

function loginUserSuccess (user) {
    return {type : ActionType.LOGIN_USER, user}
}

function registerUserSuccess (user) {
    return {type : ActionType.LOGIN_USER, user}
}

export function loginUser(user) {
    return function (dispatch) {
        UserAPI.login(user).then ((user) => {
            dispatch(loginUserSuccess(user));
        }).catch ((error) => {
            throw error;
        });
    };
}

export function registerUser(user) {
    return function (dispatch) {
        UserAPI.saveUser(user).then ((user) => {
            dispatch(registerUserSuccess(user));
        }).catch ((error) => {
            throw error;
        });
    };
}