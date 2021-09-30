import { combineReducers } from "redux";
import posts from "./posts";
import authReducer from "./Auth";

export default combineReducers({ posts, authReducer });
