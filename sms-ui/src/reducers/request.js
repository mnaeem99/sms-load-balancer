import { ADD_SMS_REQUEST, GET_SMS_REQUEST } from "../actions/types";

function request(sms = [], action) {
    const { type, payload } = action;
    switch (type) {
        case GET_SMS_REQUEST:
            return payload;
        case ADD_SMS_REQUEST:
            return [payload, ...sms]
        default:
            return sms;
    }
}
export default request;