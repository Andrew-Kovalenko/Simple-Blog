import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./reducers/rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootSaga from "./sagas";
import createSagaMiddleware from 'redux-saga'

const saga = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(
    thunk, saga
  )
))

saga.run(rootSaga)

export default store