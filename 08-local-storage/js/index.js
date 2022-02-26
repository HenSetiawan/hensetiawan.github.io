const closeModalBtn = document.querySelector(".close-modal");
const openModalBtn = document.querySelector(".modal-fab");
const bookModalForm = document.querySelector(".book-form");
const textWarning = document.querySelector(".text-warning");
const alertDelete = document.querySelector(".alert-modal");
const btnCancelDelete = document.querySelector(".btn-cancel");
const btnConfirmDelete = document.querySelector(".btn-confirmation");

const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookYear = document.getElementById("book-year");
const isCompleted = document.getElementById("isCompleted");

const btnSaveBook = document.getElementById("btn-save");
const bookContainer = document.querySelector(".book-container");
const unfinishedContainer = document.querySelector(".unfinished-book");
const finishedContainer = document.querySelector(".finished-book");

const keyword = document.querySelector(".keyword");

// toggle modal
closeModalBtn.addEventListener("click", function () {
  bookModalForm.classList.remove("active-modal");
  bookTitle.value = "";
  bookAuthor.value = "";
  bookYear.value = "";
});

openModalBtn.addEventListener("click", function () {
  bookModalForm.classList.add("active-modal");
});

// save new book
btnSaveBook.addEventListener("click", function (event) {
  event.preventDefault();
  const storageKey = "bookList";
  let isComplete = false;
  if (isCompleted.checked) {
    isComplete = true;
  }
  const newBookData = {
    id: new Date().getTime(),
    title: bookTitle.value,
    author: bookAuthor.value,
    year: bookYear.value,
    isComplete,
  };

  if (
    newBookData.title !== "" &&
    newBookData.author !== "" &&
    newBookData.year !== ""
  ) {
    textWarning.classList.remove("active");
    saveBook(newBookData, storageKey);
    const bookList = getBookList(storageKey);
    renderBookList(bookList);
    bookModalForm.classList.remove("active-modal");

    bookTitle.value = "";
    bookAuthor.value = "";
    bookYear.value = "";
  } else {
    textWarning.classList.add("active");
  }
});

// move and delete book
bookContainer.addEventListener("click", function (event) {
  const bookList = getBookList("bookList");

  if (event.target.classList.contains("btn-move")) {
    const bookId = event.target.parentElement.dataset.id;
    moveBook(bookId, bookList, "bookList");
  }

  if (event.target.classList.contains("btn-delete")) {
    const bookId = event.target.parentElement.dataset.id;
    alertDelete.classList.add("active-modal");
    alertDelete.dataset.id = bookId;
  }
});

// delete confirmation
btnCancelDelete.addEventListener("click", function () {
  alertDelete.classList.remove("active-modal");
});

btnConfirmDelete.addEventListener("click", function () {
  const bookList = getBookList("bookList");
  const bookId = alertDelete.dataset.id;
  deleteBook(bookId, bookList, "bookList");
  alertDelete.classList.remove("active-modal");
});

// search book by title
keyword.addEventListener("keyup", function () {
  const bookList = getBookList("bookList");
  const filteredBook = filterBookByTitle(keyword.value, bookList);
  renderBookList(filteredBook);
});

function filterBookByTitle(bookTitle, bookList) {
  return bookList.filter(
    (data) =>
      JSON.stringify(data).toLowerCase().indexOf(bookTitle.toLowerCase()) !== -1
  );
}

function saveBook(newBookData, storageKey) {
  if (typeof Storage !== "undifined") {
    let bookData = [];
    if (localStorage.getItem(storageKey) === null) {
      bookData = [];
    } else {
      bookData = JSON.parse(localStorage.getItem(storageKey));
    }
    bookData.unshift(newBookData);
    localStorage.setItem(storageKey, JSON.stringify(bookData));
  } else {
    alert("browser anda tidak mendukung web storage");
  }
}

function getBookList(storageKey) {
  if (typeof Storage !== "undefined") {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } else {
    return [];
  }
}

function moveBook(bookId, bookList, storageKey) {
  let bookData = [];
  bookList.forEach(function (book) {
    if (book.id == bookId) {
      book.isComplete = !book.isComplete;
    }
    bookData.unshift(book);
  });
  localStorage.setItem(storageKey, JSON.stringify(bookData));
  renderBookList(bookList);
}

function deleteBook(bookId, bookList, storageKey) {
  const selectedBook = bookList.find((book) => book.id == bookId);
  const indexOfBook = bookList.indexOf(selectedBook);
  bookList.splice(indexOfBook, 1);
  localStorage.setItem(storageKey, JSON.stringify(bookList));
  renderBookList(bookList);
}

function renderBookList(bookList) {
  let unfinishedBook = ``;
  let finishedBook = ``;
  bookList.forEach(function (book) {
    if (book.isComplete) {
      finishedBook += `<div class="box"data-id=${book.id}>
    <h4 class="box-title">${book.title}</h4>
    <p class="text-secondary">Ditulis : ${book.author}</p>
    <p class="text-secondary">Diterbitkan : ${book.year}</p>
    <button class="btn btn-done btn-move" >Belum Selesai Dibaca</button>
    <button class="btn btn-delete">Hapus</button>
  </div>`;
    } else {
      unfinishedBook += `<div class="box" data-id=${book.id}>
      <h4 class="box-title">${book.title}</h4>
      <p class="text-secondary">Ditulis : ${book.author}</p>
      <p class="text-secondary">Diterbitkan : ${book.year}</p>
      <button class="btn btn-done btn-move">Selesai Dibaca</button>
      <button class="btn btn-delete">Hapus</button>
    </div>`;
    }
  });

  unfinishedContainer.innerHTML = unfinishedBook;
  finishedContainer.innerHTML = finishedBook;
}

window.addEventListener("load", function () {
  const bookList = getBookList("bookList");
  renderBookList(bookList);
});
