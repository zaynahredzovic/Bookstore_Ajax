const bookForm = document.getElementById("bookForm");
const bookName = document.getElementById("bookName");
const authorName = document.getElementById("authorName");
const bookPrice = document.getElementById("bookPrice");

const nameError = document.querySelector(".nameError");
const authorError = document.querySelector(".authorError");
const priceError = document.querySelector(".priceError"); 

let nameStatus = true;
let authorStatus = true;
let priceStatus = true;


bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //book name validation

    if(Empty(bookName, "Book name is required", nameError)){
        nameStatus = false;
    }else {
        nameStatus = true;
    }

    //author name validation

    if(Empty(authorName, "Author name is required", authorError)){
        authorStatus = false;
        if(notInt(authorName, "Author name", authorError)){
            authorStatus = false;
        }else {
            authorStatus = true;
        }
    }else {
        authorStatus = true;
    }

    //price validation

    if(Empty(bookPrice, "Book price is required", priceError)){
        priceStatus = false;
        if(isNegative(bookPrice, "Book price", priceError)){
            priceStatus = false;
        }else {
            priceStatus = true;
        }
    }else {
        priceStatus = true;
    }

})