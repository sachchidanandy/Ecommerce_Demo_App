import * as ActionType from '../constants/ActionType';
import UserAPI from '../demoAPI/userAPI';

function loginUserSuccess (user) {
    return {type : ActionType.LOGIN_USER, user}
}

function registerUserSuccess (user) {
    return {type : ActionType.LOGIN_USER, user}
}

function addToCardSuccess(user) {
    return {type : ActionType.ADD_TO_CART, user}
}

export function loginUser(user) {
    return function (dispatch) {
        return UserAPI.login(user).then (user => {
            dispatch(loginUserSuccess(user));
        }).catch ((error) => {
            throw error;
        });
    };
}

export function registerUser(user) {
    return function (dispatch) {
        return UserAPI.saveUser(user).then (user => {
            dispatch(registerUserSuccess(user));
        }).catch ((error) => {
            throw error;
        });
    };
}

export function addToCart(userID, product) {
    return function (dispatch) {
        return UserAPI.addToCart(userID, product).then (user => {
            dispatch(addToCardSuccess(user));
        }).catch((error) => {
            throw error;
        });
    };
}