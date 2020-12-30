import {CREATE_POST, REQUESTS_POST} from "../types";
import axios from "axios";

export function fetchPosts() {
  return {
    type: REQUESTS_POST
  }
}

export function createPost({title, body}) {
  axios({
    method: 'post',
    url: `${process.env.ARI_URL}/posts`,
    data: {
      title,
      body
    }
  });

  return {
    type: CREATE_POST
  }
}