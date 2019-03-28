import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  bookLibrary: [],
  isAuthenticated: false,
  currUser: null,
  currUserRole: null,
  token: null,
  lastUsedBookId: 10
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_LIBRARY:
      return updateObject(state, { bookLibrary: action.bookLibrary });
    case actionTypes.SIGN_IN:
      return updateObject(state, {
        isAuthenticated: action.isAuthenticated,
        currUser: action.currUser,
        currUserRole: action.currUserRole,
        token: action.token
      });
    case actionTypes.SIGN_OUT:
      return updateObject(state, {
        isAuthenticated: false,
        currUser: null,
        currUserRole: null,
        token: null
      });
    case actionTypes.UPDATE_LIBRARY:
      if (state.bookLibrary.length < action.bookLibrary.length) {
        return updateObject(state, {
          bookLibrary: action.bookLibrary,
          lastUsedBookId: state.lastUsedBookId + 1
        });
      } else {
        return updateObject(state, { bookLibrary: action.bookLibrary });
      }
    case actionTypes.UPDATE_USER:
      return updateObject(state, { currUser: action.currUser });
    case actionTypes.ADD_CATEGORY:
      const addCategoryUser = { ...state.currUser };
      addCategoryUser.favCategories.push(action.newCategory);
      return updateObject(state, { currUser: addCategoryUser });
    case actionTypes.ADD_FRIEND:
      const addFriendUser = { ...state.currUser };
      addFriendUser.friends.push(action.newFriend);
      return updateObject(state, { currUser: addFriendUser });
    case actionTypes.DELETE_CATEGORY:
      const deleteCategoryUser = { ...state.currUser };
      deleteCategoryUser.favCategories.splice(action.index, 1);
      return updateObject(state, { currUser: deleteCategoryUser });
    case actionTypes.DELETE_FRIEND:
      const deleteFriendUser = { ...state.currUser };
      deleteFriendUser.friends.splice(action.index, 1);
      return updateObject(state, { currUser: deleteFriendUser });
    default:
      return state;
  }
};

export default reducer;
