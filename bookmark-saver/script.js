/**
 * IDs (4)
 * bookmark-name
 * bookmark-url
 * add-bookmark
 * bookmark-list
 */

const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");
const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");

// add Event Listener to load Bookmarks
document.addEventListener("DOMContentLoaded", loadBookmarks);

// add Eventlistener to add Bookmark button
addBookmarkBtn.addEventListener("click", function () {
    const name = bookmarkNameInput.value.trim();
    const url = bookmarkUrlInput.value.trim();

    if (!name || !url) {
        alert("Please enter both Name and URL");
    } else {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            alert("Please enter a valid URL starting with http:// or https://");
            return
        }

        addBookmark(name, url);
        saveBookmark(name, url);
        bookmarkNameInput.value = "";
        bookmarkUrlInput.value = "";
    }
});

// add Bookmark to a list - elements with url and remove button

function addBookmark(name, url) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = url;
    link.textContent = name;
    link.target = "_blank";

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
        // remove clicked element from bookmark list
        bookmarkList.removeChild(li);
        //remove bookmark from storage
        removeBookmarkFromStorage(name, url);
    });

    li.appendChild(link);
    li.appendChild(removeButton);

    bookmarkList.appendChild(li);
};

// save bookmarks to local storage
function saveBookmark(name, url) {
    const bookmarks = getBookmarksFromStorage();
    bookmarks.push({ name, url });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

};

// get bookmarks from local storage
function getBookmarksFromStorage() {
    const bookmarks = localStorage.getItem("bookmarks");
    return bookmarks ? JSON.parse(bookmarks) : [];
};

// load bookmarks from local storage
function loadBookmarks() {
    const bookmarks = getBookmarksFromStorage();
    bookmarks.forEach((bookmark) => addBookmark(bookmark.name, bookmark.url));
};

// remove bookmark from local storage
function removeBookmarkFromStorage(name, url) {
    let bookmarks = getBookmarksFromStorage();
    bookmarks = bookmarks.filter((bookmark) => bookmark.name !== name || bookmark.url !== url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
};
