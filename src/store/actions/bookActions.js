import * as actionTypes from './actionTypes';

export const updateLibraryBooks = (books) => {
    return {
        type : actionTypes.UPDATE_LIBRARY_SAGA,
        bookLibrary: books
    }
}