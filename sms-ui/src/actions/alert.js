import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert =
    (msg, alertType, timeout = 3000) =>
        (dispatch) => {
            const id = uuidv4();
            dispatch({
                type: SET_ALERT,
                payload: { msg, alertType, id },
            });
            if (!msg.includes('successfully')) {
                setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
            }

        };

export const remove =
    (msg, alertType, id) =>
        (dispatch) => {
            dispatch({ type: REMOVE_ALERT, payload: id })
        };