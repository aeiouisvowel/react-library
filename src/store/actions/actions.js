import * as actionTypes from './actionTypes';

export const googleSignIn = (routeTo) => {
    return {
        type: actionTypes.SIGN_IN_SAGA,
        routeTo: routeTo
    }
}

export const signOut = (routeTo) => {
    return {
        type: actionTypes.SIGN_OUT_SAGA,
        routeTo: routeTo
    }
}

export const loadLibrary = () => {
    return {
        type: actionTypes.LOAD_LIBRARY_SAGA
    }
}