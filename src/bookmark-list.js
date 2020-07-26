/* eslint-disable indent */
import $ from 'jquery';
import store from './store';
import api from './api';

const render = function () {
    let html = ``;
    if (store.addingNewBookmark === true) {
        html = addNewBookmarkForm();
    }
    else if (store.addingNewBookmark === false) {
        html = generateBookmarkList(store.bookmarks);
    }
    $('.app-input').html(html);
};

const addNewBookmarkForm = function () {
    return `
    <form id="js-bookmark-list-form">

    <div class="bookmark-title">
        <label for="title">Title:</label>
        <input type="text" id="title" class="bookmark-title-entry" name="title" placeholder="Bookmark Title..." required>
    </div>

    <div class="bookmark-URL">
        <label for="url">URL:</label>
        <input type="url" id="url" class="bookmark-URL-entry" name="url" placeholder="https://NewBookmarksURL.com" required>
    </div>

    <div class="rating">
        <p>Rate your bookmark:</p>
        <select id="rating" class="ratingMenu" name="rating" required>
            <option value"5">5</option>
            <option value"4">4</option>
            <option value"3">3</option>
            <option value"2">2</option>
            <option value"1">1</option>
        </select>
    </div>

    <div class="description">
        <input type="text" class="description-box" name="desc" placeholder="Add a description for your new bookmark..." required>
    </div>
    <button class="cancel" id="cancel" type="submit">Cancel</button>
    <button class="submit" id="submit" type="submit">Submit</button>
</form>`;
};

const generateBookmarkElement = function (bookmark) {
    if (bookmark.rating >= store.filter) {
    if (bookmark.expandedView === true)
        return `
    <li class="js-bookmark" data-bookmark-id="${bookmark.id}">
    <h3><button class="toggleExpanded"><b>${bookmark.title}</b> ...... Rating: ${bookmark.rating}</button></h3>
    <button onclick="window.location.href='${bookmark.url}';" class="visit-URL">Visit Site!</button>
    <div class="descriptionData">
        <p><i>Description:</i> ${bookmark.desc}</p>
    </div>
    <button class="delete" id="delete">Delete</button>
    `;
    else
        return `
    <li class="js-bookmark" data-bookmark-id="${bookmark.id}">
    <h3><button class="toggleExpanded"><b>${bookmark.title}</b> ...... Rating: ${bookmark.rating}</button></h3>
    `;
    }
};

const getIdFromBookmark = function (bookmark) {
    return $(bookmark)
        .closest('.js-bookmark')
        .data('bookmark-id');
};

// const handleToggleBookmarkClick = function () {
//     $('body').on('click','.toggleExpanded', event => {
//         const id = getIdFromBookmark(event.currentTarget);
//         store.toggleExpanded(id);
//         render();
//     });
// };

const handleToggleBookmarkClick = function () {
    $('body').on('click', '.toggleExpanded', event => {
        let id = getIdFromBookmark (event.currentTarget);
        store.toggleExpanded(id);
        render();
    });
};

const generateBookmarkList = function (bookmarks) {
    const nav = `
        <div class="options">
            <button class="addNewForm" name="newBookmark" type="button">New Bookmark</button>
            <select id="ratingMenu" class="ratingMenu2" name="ratingMenu">
                <option value="0">Filter By Rating</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
            </select>
            </div>
      </div>
    `;
    const items = bookmarks.map((bookmark) => generateBookmarkElement(bookmark));
    return nav + items.join('');
};

const handleNewBookmarkClick = function () {
    $('body').on('click', '.addNewForm', function () {
        store.toggleAddBookmark();
        render();
    });
};

const handleCancelBookmark = function () {
    $('main').on('click', '#cancel', function() {
        store.toggleAddBookmark()
        render();
    });
};

const handleNewBookmarkSubmit = function () {
    $('main').on('submit', '#js-bookmark-list-form', event => {
    // $('main').on('submit', '#submit', event => {
        event.preventDefault();
        let formElement = $('#js-bookmark-list-form')[0];
        console.log(formElement);
        console.log(serializeJson(formElement));
        api.createBookmark(serializeJson(formElement))
            .then ((newBookmark) => {
                store.addBookmark(newBookmark);
                store.addingNewBookmark = false;
                render();
            });
    });
};

function serializeJson(form) {
    const formData = new FormData(form);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
}

const handleDeleteClick = function () {
    $('main').on('click', '.delete', event => {
        event.preventDefault();
        let id = getIdFromBookmark (event.currentTarget);
        // console.log(id);
        api.deleteBookmark(id)
            .then(() => {
                store.findAndDelete(id);
                render();
            });
    });
};

const ratingFilter = function () {
    $('body').on('change', '#ratingMenu', event => {
        store.filter =event.currentTarget.value;
        render();
    });
};

const bindEventListeners = function () {
    ratingFilter();
    handleNewBookmarkClick();
    handleNewBookmarkSubmit();
    handleToggleBookmarkClick();
    handleDeleteClick();
    handleCancelBookmark();
};

export default {
    generateBookmarkList,
    addNewBookmarkForm,
    render,
    bindEventListeners
};