// helps in working with async code
import { put } from "redux-saga/effects";
import firebase from "firebase";
import axios from "axios";

import * as actionTypes from "../actions/actionTypes";
import User from "../../model/user.model";

export function* loadLibrarySaga(action) {
  try {
    const bookLibrary = yield axios.get(
      "./assets/json/library-book-list.json"
    );
    yield put({
      ...action,
      type: actionTypes.LOAD_LIBRARY,
      bookLibrary: bookLibrary.data
    });
  } catch (error) {
    console.log(error);
  }
}

export function* signOutSaga(action) {
  yield put({
    ...action,
    type: actionTypes.SIGN_OUT,
  });
  yield action.routeTo.push('/');
}

export function* googleSignInSaga(action) {
  let provider = new firebase.auth.GoogleAuthProvider();
  try {
    yield firebase.initializeApp({
      apiKey: "AIzaSyB9HDWLDiNHt5rkgyr7UdJxuR8ksmTuWLI",
      authDomain: "anytime-library-m104.firebaseapp.com"
    });
  } catch (error) {}
  try {
    const authResponse = yield firebase.auth().signInWithPopup(provider);
    try {
      const libraryAcc = yield axios.get(
        "./assets/json/library-user-list.json"
      );
      let userDetails = yield isExistingUser(authResponse, libraryAcc);
      let token = yield firebase.auth().currentUser.getIdToken();
      yield put({
        ...action,
        type: actionTypes.SIGN_IN,
        isAuthenticated: true,
        currUser: userDetails.user,
        currUserRole: userDetails.role,
        token: token
      });
      yield action.routeTo.push('/'+userDetails.role);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

function isExistingUser(userData, libraryAcc) {
  // later can be replaced with a backend service
  for (const user of libraryAcc.data) {
    if (user.email === userData.user.email) {
      if (user.role === "admin") {
        return {user: user, role: "admin"};
      } else {
        return {user: user, role: "user"};
      }
    }
  }
  // add new user to library users if user is not found
  // please change this role from "user" to "admin" to navigate to get admin related pages
  let user = new User(
    userData.email,
    userData.displayName,
    "user",
    userData.photoURL
  );
  // if role is modified to "admin", then below navigation should also be changed to admin
  return {user: user, role: "user"};
}
