import {combineReducers} from "redux";
import {postReducer} from "./postReducer";
import {commentsReducer} from "./commentsReducer";

export const rootReducer = combineReducers({
  posts: postReducer,
  comments: commentsReducer
})