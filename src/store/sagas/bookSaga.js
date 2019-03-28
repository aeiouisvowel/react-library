import { put } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

export function* updateLibraryBooksSaga(action) {
  yield put({
    ...action,
    type: actionTypes.UPDATE_LIBRARY,
    bookLibrary: action.bookLibrary
  });
}