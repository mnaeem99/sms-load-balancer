
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_PASSWORD,
    REQUEST_FORGET_PASSWORD_SUCCESS,
    REQUEST_FORGET_PASSWORD_FAIL,
    LOGIN_VERIFY_FAIL,
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    loading: true,
    user: null,
};

function auth(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: !!localStorage.getItem("token"),
                loading: false,
                user: payload,
            };

        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.accessToken);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case LOGIN_VERIFY_FAIL:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REQUEST_FORGET_PASSWORD_FAIL:
        case UPDATE_PASSWORD:
        case REQUEST_FORGET_PASSWORD_SUCCESS:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: !!localStorage.getItem("token"),
                loading: false,


            };
        default:
            return state;
    }
}
export default auth;