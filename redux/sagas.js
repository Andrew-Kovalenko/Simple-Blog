import {FETCH_COMMENTS, FETCHED_POST, REQUESTS_COMMENTS, REQUESTS_POST} from "./types";
import {call, put, takeEvery, all} from "redux-saga/effects";

export function* fetchPostsWatcher() {
  yield takeEvery(REQUESTS_POST, fetchPostsWorker)
}

function* fetchPostsWorker() {
  const payload = yield call(fetchPosts)
  yield put({ type: FETCHED_POST, payload })
}

async function fetchPosts() {
  const response = await fetch(`${process.env.ARI_URL}/posts`)
  return await response.json()
}

export function* fetchCommentsWatcher() {
  yield takeEvery(REQUESTS_COMMENTS, fetchCommentsWorker)
}

function* fetchCommentsWorker() {
  const payload = yield call(fetchComments)
  yield put({ type: FETCH_COMMENTS, payload })
}

async function fetchComments() {
  const response = await fetch(`${process.env.ARI_URL}/comments`)
  return await response.json()
}

export default function* rootSaga() {
  yield all([
    fetchPostsWatcher(),
    fetchCommentsWatcher()
  ])
}
