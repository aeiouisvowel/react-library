import * as actionTypes from './actionTypes';

export const addCategory = (newCategory) => {
    return {
        type : actionTypes.ADD_CATEGORY_SAGA,
        newCategory: newCategory
    }
}

export const deleteCategory = (index) => {
    return {
        type: actionTypes.DELETE_CATEGORY_SAGA,
        index: index
    }
}

export const addFriend = (newFriend) => {
    return {
        type : actionTypes.ADD_FRIEND_SAGA,
        newFriend: newFriend
    }

}

export const deleteFriend = (index) => {
    return {
        type: actionTypes.DELETE_FRIEND_SAGA,
        index: index
    }
}

export const updateUser = (currUser) => {
    return {
        type: actionTypes.UPDATE_USER_SAGA,
        currUser: currUser
    }
}