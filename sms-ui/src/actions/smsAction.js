import axios from "axios";
import { ADD_SMS_REQUEST_URL } from "../apis/apiUrls";
import { ADD_SMS_REQUEST } from "./types";
import { setAlert } from "./alert";

export const addSmsRequest = ({ message, phone }) =>

    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ message: message, phone: convertToPhoneNumberList(phone)});
        try {
            const res = await axios.post(
                ADD_SMS_REQUEST_URL,
                body,
                config
            )
            if (res?.status === 200) {
                dispatch(setAlert("successfully created", "success"))
            }
            dispatch({
                type: ADD_SMS_REQUEST,
                payload: res.data,
            });

        } catch (err) {
            const errors = err?.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    };

    function convertToPhoneNumberList(commaSeparatedString) {
        // Remove leading and trailing whitespaces, then split the string by commas
        var phoneNumberArray = commaSeparatedString.trim().split(',');
    
        // Trim each phone number to remove any extra whitespaces
        phoneNumberArray = phoneNumberArray.map(function (phoneNumber) {
            return phoneNumber.trim();
        });
    
        return phoneNumberArray;
    }