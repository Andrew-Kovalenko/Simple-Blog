import axios from "axios";
import {ADD_COMMENT, REQUESTS_COMMENTS} from "../types";

export function createComment(post) {
  axios({
    method: 'post',
    url: `${process.env.ARI_URL}/comments`,
    data: {
      postId: post.postId,
      body: post.body
    }
  });

  return {
    type: ADD_COMMENT,
    payload: post
  }
}

export function getComments() {
  return {
    type: REQUESTS_COMMENTS
  }
}