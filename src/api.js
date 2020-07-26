/* eslint-disable indent */
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/angela-bookmark';

const listApiFetch = function (url, method, newData) {
    let error;
    return fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: newData
      })
        .then(res => {
            if (!res.ok) {
                error = { code: res.status };
                if (!res.headers.get('content-type').includes('json')) {
                    error.message = res.statusText;
                    return Promise.reject(error);
                }
            }
            return res.json();
        })
        .then(data => {
            if (error) {
                error.message = data.message;
                return Promise.reject(error);
            }
            // console.log(data);
            return data;
        });
};

const getBookmarks = function () {
    return listApiFetch(`${BASE_URL}/bookmarks`);
};

const createBookmark = function (newBookmark) {
    return listApiFetch(`${BASE_URL}/bookmarks`, 'POST', newBookmark);
};

const deleteBookmark = function (id) {
    return listApiFetch(`${BASE_URL}/bookmarks/${id}`, 'DELETE');
};

export default {
    getBookmarks,
    createBookmark,
    deleteBookmark
};