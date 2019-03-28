import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { googleSignInSaga, signOutSaga, loadLibrarySaga } from './saga';
import { addCategorySaga, addFriendSaga, deleteCategorySaga, deleteFriendSaga, updateUserSaga } from './userSaga';
import { updateLibraryBooksSaga } from './bookSaga';

export function* watchStatus() {
    yield takeEvery(actionTypes.SIGN_IN_SAGA, googleSignInSaga);
    yield takeEvery(actionTypes.SIGN_OUT_SAGA, signOutSaga);
    yield takeEvery(actionTypes.UPDATE_LIBRARY_SAGA, updateLibraryBooksSaga);
    yield takeEvery(actionTypes.UPDATE_USER_SAGA, updateUserSaga);
    yield takeEvery(actionTypes.LOAD_LIBRARY_SAGA, loadLibrarySaga);
    yield takeEvery(actionTypes.ADD_CATEGORY_SAGA, addCategorySaga);
    yield takeEvery(actionTypes.ADD_FRIEND_SAGA, addFriendSaga);
    yield takeEvery(actionTypes.DELETE_CATEGORY_SAGA, deleteCategorySaga);
    yield takeEvery(actionTypes.DELETE_FRIEND_SAGA, deleteFriendSaga);
}