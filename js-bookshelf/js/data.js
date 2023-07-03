const STORAGE_KEY = "BOOKSHELF_APPS";

let bookshelfs = [];

function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage yaa");
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(bookshelfs);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null) {
        bookshelfs = data;
    }

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function composeBookObject(judulbuku, pengarangbuku, tahunterbit, isCompleted) {
    return {
        id: +new Date(),
        judulbuku,
        pengarangbuku,
        tahunterbit,
        isCompleted
    };
}

function findBook(bookId) {
    for (bookshelf of bookshelfs) {
        if (bookshelf.id === bookId)
            return bookshelf;
    }
    return null;
}

function findBookIndex(bookId) {
    let index = 0;
    for (bookshelf of bookshelfs) {
        if (bookshelf.id === bookId)
            return index;

        index++;
    }

    return -1;
}

//LAST
function refreshDataFromBookshelfs() {
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);
    let listCompleted = document.getElementById(COMPLETED_BOOK_LIST_ID);

    for (bookshelf of bookshelfs) {
        const newBookList = makeBookList(bookshelf.judulbuku, bookshelf.pengarangbuku, bookshelf.tahunterbit, bookshelf.isCompleted);
        newBookList[BOOK_ITEMID] = bookshelf.id;


        if (bookshelf.isCompleted) {
            listCompleted.append(newBookList);
        } else {
            listUncompleted.append(newBookList);
        }
    }
}