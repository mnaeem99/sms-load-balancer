import { combineReducers } from "redux";
import request from "./request";
import alert from "./alert";
import auth from "./auth";


export default combineReducers({
    alert,
    auth,
    request
});