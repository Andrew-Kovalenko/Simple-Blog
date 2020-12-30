import {ADD_COMMENT, FETCH_COMMENTS} from "../types";

const initialState = {
  comments: [],
  loading: false,
}

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {...state, comments: state.comments.concat([action.payload])}
    case FETCH_COMMENTS:
      return {...state, comments: action.payload}
    default: return state
  }
  return state
}