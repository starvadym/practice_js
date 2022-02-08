// import { books } from "./books.js";
import books from "./books.js";
const BOOKS = "book";
localStorage.setItem(BOOKS, JSON.stringify(books));

const firstDivRef = document.createElement("div");
const secondDivRef = document.createElement("div");
firstDivRef.classList.add("first-div");
secondDivRef.classList.add("second-div");
document.querySelector("#root").append(firstDivRef, secondDivRef);

const titleRef = document.createElement("h1");
const bookListRef = document.createElement("ul");
const addBtnRef = document.createElement("button");

titleRef.textContent = "Library";
addBtnRef.textContent = "Add";
firstDivRef.append(titleRef, bookListRef, addBtnRef);

function renderList() {
  const books = JSON.parse(localStorage.getItem(BOOKS));

  const markup = books
    .map(({ id, title }) => {
      return `<li id="${id}">
        <p class="title-book" >${title}</p>
        <button class="js-edit-btn" type="button">Edit</button>
        <button class="js-del-btn" type="button">Delete</button>
    </li>`;
    })
    .join("");
  bookListRef.insertAdjacentHTML("afterbegin", markup);
  const editBtnRefs = document.querySelectorAll(".js-edit-btn");
  const deleteBtnRefs = document.querySelectorAll(".js-del-btn");
  editBtnRefs.forEach((editBtnRef) =>
    editBtnRef.addEventListener("click", editBook)
  );
  deleteBtnRefs.forEach((deleteBtnRef) =>
    deleteBtnRef.addEventListener("click", deleteBook)
  );
  const titleRefs = document.querySelectorAll(".title-book");
  titleRefs.forEach((titleRef) =>
    titleRef.addEventListener("click", renderPreview)
  );
}
renderList();

addBtnRef.addEventListener("click", addBook);

function bookPreviewMarkup({ title, author, img, plot, id }) {
  return `<div id="${id}" class="wrapper">
            <h2>${title}</h2>
            <p>${author}</p>
            <img src="${img}" alt="Book cover" width="250px">
            <p>${plot}</p>
          </div>`;
}

function formMarkup({ title, author, img, plot }) {
  return ` <form action="">
              <label>
              Title
                <input type="text" name="title" value='${title}' />
              </label>
              <label>
              Author
                <input type="text" name="author" value='${author}'/>
              </label>
              <label>
              Image URL
                <input type="text" name="img" value='${img}'/>
              </label>
              <label>
              Plot
                <input type="text" name="plot" value='${plot}'/>
              </label>
              <button type="button" class="save-btn">Save</button>

            </form>`;
}

function renderPreview(event) {
  const books = JSON.parse(localStorage.getItem(BOOKS));
  const book = books.find((book) => book.title === event.target.textContent);
  const markup = bookPreviewMarkup(book);
  secondDivRef.innerHTML = "";
  secondDivRef.insertAdjacentHTML("afterbegin", markup);
}

function editBook(event) {
  const id = event.target.parentElement.id;
  const books = JSON.parse(localStorage.getItem(BOOKS));
  const bookToEdit = books.find((book) => id === book.id);
  const markup = formMarkup(bookToEdit);
  secondDivRef.innerHTML = "";
  secondDivRef.insertAdjacentHTML("afterbegin", markup);
  saveInputData(bookToEdit);
  const saveBtn = document.querySelector(".save-btn");
  saveBtn.addEventListener("click", onSaveData);

  function onSaveData() {
    if (Object.values(bookToEdit).includes("")) {
      alert("Please fill in all the fields");
      return;
    }
    const markup = bookPreviewMarkup(bookToEdit);
    secondDivRef.innerHTML = "";
    secondDivRef.insertAdjacentHTML("afterbegin", markup);

    const index = books.indexOf(bookToEdit);
    books[index] = bookToEdit;
    localStorage.setItem(BOOKS, JSON.stringify(books));

    // const updatedBooks = books.map((book) =>
    //   book.id === id ? bookToEdit : book
    // );
    // localStorage.setItem(BOOKS, JSON.stringify(updatedBooks));
    bookListRef.innerHTML = "";
    renderList();
  }
}

function deleteBook(event) {
  const id = event.target.parentElement.id;

  const books = JSON.parse(localStorage.getItem(BOOKS));
  const updatedBooks = books.filter((book) => id !== book.id);

  localStorage.setItem(BOOKS, JSON.stringify(updatedBooks));
  bookListRef.innerHTML = "";
  renderList();
  const wrapper = document.querySelector(".wrapper");
  if (wrapper) {
    if (wrapper.id === id) {
      secondDivRef.innerHTML = "";
    }
  }
}

function addBook() {
  const newBook = {
    id: `${Date.now()}`,
    title: "",
    author: "",
    img: "",
    plot: "",
  };
  const markup = formMarkup(newBook);
  secondDivRef.innerHTML = "";
  secondDivRef.insertAdjacentHTML("afterbegin", markup);

  saveInputData(newBook);

  const saveBtn = document.querySelector(".save-btn");
  saveBtn.addEventListener("click", onSaveData);

  function onSaveData() {
    if (Object.values(newBook).includes("")) {
      alert("Please fill in all the fields");
      return;
    }
    const markup = bookPreviewMarkup(newBook);
    secondDivRef.innerHTML = "";
    secondDivRef.insertAdjacentHTML("afterbegin", markup);
    const books = JSON.parse(localStorage.getItem(BOOKS));
    books.push(newBook);
    localStorage.setItem(BOOKS, JSON.stringify(books));
    bookListRef.innerHTML = "";
    renderList();
  }
}

function saveInputData(book) {
  const inputAllRef = document.querySelectorAll("input");
  function onChange(e) {
    book[e.target.name] = e.target.value;
  }
  inputAllRef.forEach((inputRef) =>
    inputRef.addEventListener("change", onChange)
  );
}

