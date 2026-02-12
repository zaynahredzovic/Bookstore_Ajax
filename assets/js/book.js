const bookForm = document.getElementById("bookForm");
const bookName = document.getElementById("bookName");
const authorName = document.getElementById("authorName");
const bookPrice = document.getElementById("bookPrice");

const nameError = document.querySelector(".nameError");
const authorError = document.querySelector(".authorError");
const priceError = document.querySelector(".priceError");

const bookStatus = document.getElementById("bookStatus"); 
const message = document.querySelector(".message");

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

    if(nameStatus === false && authorStatus === false && priceStatus === false){
    
        //send ajax request if there is no errors
        if(bookStatus.value === "addBook"){
            $.ajax({
                type: 'POST',
                url: 'ajax/addBook.php',
                data: $(bookForm).serialize(),
                success: (feedback) => {
                    const response = JSON.parse(feedback);
                    if(response.status === "success"){
                        modelContainer.style.display = 'none';
                        bookForm.reset();
                        message.innerHTML = `<div class="alert success">
                        <div class="alert-icon"><div class="alertIcon">&check;</div><div>
                        <p> <strong>Success!</strong> ${response.message}</p>
                        </div>`;
                        hideMsg();
                        fetchBooks();
                    }
                }   
            })
        }
    }
})

function fetchBooks() {

    let table = document.getElementById("table");
    $.ajax({
        type: 'GET',
        url: 'ajax/fetchBooks.php',
        success: (feedback) => {
            let response;
            try {
                response = JSON.parse(feedback);
            } catch (e) {
                console.error("Error parsing JSON:", e);
                return;
            }

            if(response.status === "success"){
                let results = "";
                response.data.forEach(book => {
                    results += `<tr>
				<td>${book.bookName}</td>
				<td>${book.authorName}</td>
				<td><div class="dollor">$${book.bookPrice}</div></td>
                <td><a href="" class="btn btn-warning btn-small showModel" >Edit <span>&#9998;</span></a></td>
                <td><a href="" class="btn btn-danger btn-small">Delete <span>&#10006;</span></a></td>
			</tr>`;
                })
                table.innerHTML =  `<table class="table">
		<thead>
			<tr>
				<th>Book Name</th>
				<th>Author Name</th>
				<th>Book Price</th>
				<th>Edit</th>
				<th>Delete</th>
			</tr>
		</thead>
		<tbody>${results}</tbody></table>`;
            }else if(response.status === "error"){
                table.innerHTML = `No books found. Please add some books.`;
            }
            
        }
    })
}

fetchBooks();