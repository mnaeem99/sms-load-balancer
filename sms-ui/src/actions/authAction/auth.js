import axios from "axios";

import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../types";
import setAuthToken from "../../utils/setAuthToken";
import { setAlert } from "../alert";
import { LOGIN_URL, LOAD_USER_URL } from "../../apis/apiUrls";

// Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(LOAD_USER_URL);

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Login User
export const login = (username, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(
            LOGIN_URL,
            body,
            config
        );
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
        
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};


// Logout / Clear Profile

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};