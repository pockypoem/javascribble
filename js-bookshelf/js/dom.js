const UNCOMPLETED_BOOK_LIST_ID = "bookslist";
const COMPLETED_BOOK_LIST_ID = "completed-books";
const BOOK_ITEMID = "itemId";

function addBookList() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);

    const textJudul = document.getElementById("title").value;
    const textAuthor = document.getElementById("author").value;
    const textYear = document.getElementById("year").value;

    const bookShelf = makeBookList(textJudul, textAuthor, textYear, false);
    const bookshelfObject = composeBookObject(textJudul, textAuthor, textYear, false);

    bookShelf[BOOK_ITEMID] = bookshelfObject.id;
    bookshelfs.push(bookshelfObject);

    uncompletedBOOKList.append(bookShelf);
    updateDataToStorage();
}

function makeBookList(judulbuku, pengarangbuku, tahunterbit, isCompleted) {
    const textTitle = document.createElement("h2");
    textTitle.innerText = judulbuku;

    const textPengarang = document.createElement("h3");
    textPengarang.innerText = pengarangbuku;

    const textTahun = document.createElement("p");
    textTahun.innerText = tahunterbit;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textPengarang, textTahun);

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    if (isCompleted) {
        container.append(createUndoButton(), createTrashButton());
    } else {
        container.append(createCheckButton(), createTrashButton());
    }

    return container;
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function(event) {
        eventListener(event);
    })
    return button;
}

//menghapus buku yang belum selesai dibaca
function addBookToCompleted(bookElement) {
    const bookTitle = bookElement.querySelector(".inner > h2").innerText;
    const bookAuthor = bookElement.querySelector(".inner > h3").innerText;
    const bookYear = bookElement.querySelector(".inner > p").innerText;

    const newBookList = makeBookList(bookTitle, bookAuthor, bookYear, true);
    const bookShelf = findBook(bookElement[BOOK_ITEMID]);
    bookShelf.isCompleted = true;
    newBookList[BOOK_ITEMID] = bookShelf.id;

    const listCompleted = document.getElementById(COMPLETED_BOOK_LIST_ID);
    listCompleted.append(newBookList);
    bookElement.remove()

    updateDataToStorage();
}

function createCheckButton() {
    return createButton("check-button", function(event) {
        addBookToCompleted(event.target.parentElement);
    })
}

function removeBookFromCompleted(bookElement) {
    const bookshelfPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    bookshelfs.splice(bookshelfPosition, 1);

    bookElement.remove();
    updateDataToStorage();
}

function createTrashButton() {
    return createButton("trash-button", function(event) {
        removeBookFromCompleted(event.target.parentElement);
    })
}

function undoBookFromCompleted(bookElement) {
    const bookUncompleted = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);
    const bookTitle = bookElement.querySelector(".inner > h2").innerText;
    const bookAuthor = bookElement.querySelector(".inner > h3").innerText;
    const bookYear = bookElement.querySelector(".inner > p").innerText;

    const newBookList = makeBookList(bookTitle, bookAuthor, bookYear, false);

    const bookShelf = findBook(bookElement[BOOK_ITEMID]);
    bookShelf.isCompleted = false;
    newBookList[BOOK_ITEMID] = bookShelf.id;
    bookUncompleted.append(newBookList);
    bookElement.remove();

    updateDataToStorage();
}

function createUndoButton() {
    return createButton("undo-button", function(event) {
        undoBookFromCompleted(event.target.parentElement);
    })
}