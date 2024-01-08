const closeAdd = document.querySelector(".close-icon");
const addButton = document.querySelector(".add");
const overlay = document.querySelector(".overlay");
const addWindow = document.querySelector(".add_window");
const statuses = document.querySelectorAll(".status");
const formButton = document.querySelector(".submit");
const container = document.querySelector(".container");
let screenBooks = document.querySelectorAll(".book");

//displays form pop-up
addButton.addEventListener('click', () => {
    overlay.classList.remove('none');
    addWindow.classList.remove('none');
});

//closes form pop-up
closeAdd.addEventListener('click', () => {
    closeModal();
});

function closeModal() {
    overlay.classList.add('none');
    addWindow.classList.add('none');
}

const myLibrary = [];

//function add (displays) book to page
function addBook(book) {
    toAdd = document.createElement('div');
    toAdd.classList.add('book')
    toAdd.innerHTML = `
    <img src="icons/x.svg" alt="" srcset="">
    <div class="info">
        <div class="author">${book.author}'s</div>
        <div class="name">${book.title}</div>
        <div class="pages">${book.pages} pages</div>
    </div>
    <div class="status">Not read</div>
    `
    toAdd.style.background = `url("${book.image}") center/cover no-repeat`;
    toAdd.lastElementChild.classList = `status ${book.status}`;
    if (book.status === 'notRead') {
        toAdd.lastElementChild.innerText = "Not Read";
    } else if (book.status === 'reading') {
        toAdd.lastElementChild.innerText = "Reading";
    } else {
        toAdd.lastElementChild.innerText = "Completed";
    }
    container.appendChild(toAdd);
}

//constructor function
function Book(title, author, image, pages, status) {
    this.title = title;
    this.author = author;
    this.image = image;
    this.pages = pages;
    this.status = status;
}

//form handler
formButton.addEventListener("click", (e) => {
    e.preventDefault();
    inputs = document.querySelectorAll('input');
    const radio = document.getElementsByName('status');
    let statusRadio = '';
    if (radio[0].checked) {
        statusRadio = 'notRead';
    } else if (radio[1].checked) {
        statusRadio = 'reading';
    } else {
        statusRadio = 'completed';
    }
    const title = inputs[0].value;
    inputs[0].value = '';
    const author = inputs[1].value;
    inputs[1].value = '';
    const image = inputs[2].value;
    inputs[2].value = '';
    const pages = inputs[3].value;
    inputs[3].value = 0;
    const item = new Book(title, author, image, pages, statusRadio);
    myLibrary.push(item);
    console.log(myLibrary);
    addBook(item);
    closeModal();
});

function changeStatus(index) {
    const screenBooks = document.querySelectorAll(".book");
    const currentStatus = myLibrary[index].status;
    const screenBook = screenBooks[index];
    if (currentStatus === 'notRead') {
        myLibrary[index].status = 'reading';
        screenBook.lastElementChild.innerText = 'Reading';
    } else if (currentStatus === 'reading') {
        myLibrary[index].status = 'completed';
        screenBook.lastElementChild.innerText = 'Completed';
    }
    screenBook.lastElementChild.classList = `status ${myLibrary[index].status}`;
    console.log(myLibrary);
}

//bad example
// function addListeners() {
//     let screenBooks = document.querySelectorAll(".book");
//     screenBooks.forEach((item, index) => {
//         item.addEventListener('click', (e) => {
//             if (e.target.tagName.toLowerCase() === 'img') {
//                 container.removeChild(item);
//                 myLibrary.splice(index, 1);
//                 console.log(myLibrary);
//             } else if (e.target.classList.contains('status')) {
//                 changeStatus(index);
//                 e.stopPropagation();
//             }
//         });
//     });
// }


//good example
container.addEventListener('click', (e) => {
    const book = e.target.closest('.book');
    if (!book) return;

    const index = Array.from(container.children).indexOf(book);

    if (e.target.tagName.toLowerCase() === 'img') {
        container.removeChild(book);
        myLibrary.splice(index, 1);
        console.log(myLibrary);
    } else if (e.target.classList.contains('status')) {
        changeStatus(index);
    }
});
