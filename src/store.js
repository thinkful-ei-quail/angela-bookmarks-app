/* eslint-disable indent */
const bookmarks = [];
let addingNewBookmark = false;
let error = null;
let filter = 0;

const toggleAddBookmark = function () {
    this.addingNewBookmark = !this.addingNewBookmark;
};

const findById = function (id) {
    return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const toggleExpanded = function (id) {
    const item = this.findById(id);
    item.expandedView = !item.expandedView;
};

// const toggleExpanded = function (id) {
//     const bookmark = this.bookmarks.find(currentBookmark => currentBookmark.id === id);
//     bookmark.expanded = !bookmark.expanded;
// };

const addBookmark = function (bookmark) {
    this.bookmarks.push(bookmark);
};

const findAndDelete = function (id) {
    this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

const setError = function (error) {
    this.error = error;
};

export default {
    filter,
    toggleExpanded,
    toggleAddBookmark,
    addingNewBookmark,
    bookmarks,
    error,
    findById,
    addBookmark,
    findAndDelete,
    setError
};