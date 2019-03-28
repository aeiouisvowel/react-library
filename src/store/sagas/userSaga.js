import { put } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

export function* updateUserSaga(action) {
  yield put({
    ...action,
    type: actionTypes.UPDATE_USER,
    currUser: action.currUser
  });
}

export function* addCategorySaga(action) {
  yield put({
    ...action,
    type: actionTypes.ADD_CATEGORY,
    newCategory: action.newCategory
  });
}

export function* addFriendSaga(action) {
  yield put({
    ...action,
    type: actionTypes.ADD_FRIEND,
    newFriend: action.newFriend
  });
}

export function* deleteCategorySaga(action) {
    yield put({
        ...action,
        type: actionTypes.DELETE_CATEGORY,
        index: action.index
    })
}

export function* deleteFriendSaga(action){
    yield put({
        ...action,
        type: actionTypes.DELETE_FRIEND,
        index: action.index
    })
}
