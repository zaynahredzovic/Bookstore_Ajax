const bookForm          = document.getElementById("bookForm");
const bookName          = document.getElementById("bookName");
const bookAuthor        = document.getElementById("bookAuthor");
const bookPrice         = document.getElementById("bookPrice");
const nameError         = document.querySelector(".nameError");
const autherError       = document.querySelector(".authorError");
const priceError        = document.querySelector(".priceError");
const bookStatus        = document.getElementById("bookStatus");
const message           = document.querySelector(".message");
let heading             = document.querySelector(".heading");
let bookButton          = document.getElementById("bookButton");
const modelContainer    = document.querySelector(".model-container");
const bookId            = document.getElementById("bookId");
const totalBooks        = document.querySelector(".totalBooks");
const totalAmount       = document.querySelector(".totalAmount");
let nameStatus = autherStatus = priceStatus = true;
const records_per_page = 3;
let page = 1;

// Event listener for book 
bookForm.addEventListener("submit", (e) => {

        e.preventDefault();
        
        // Book name validations
        if(Empty(bookName, "Book Name", nameError)){
            nameStatus = false;
        } else {
            nameStatus = true;
        }

        // Author validations 
        if(Empty(bookAuthor, "Author Name", autherError)){
            autherStatus = false;
            if(notInt(bookAuthor, "Author Name", autherError)){
                autherStatus = false;
            } else {
                autherStatus = true;
            }
        } else {
            autherStatus = true;
        }

        // Book price validations
        if(Empty(bookPrice, "Price", priceError)){
            priceStatus = false;
            if(isNegative(bookPrice, 'Price', priceError)){
                priceStatus = false;
            } else {
                priceStatus = true;
            }
        } else {
            priceStatus = true;
        }
        
        if(nameStatus === false && autherStatus === false && priceStatus === false ){
            console.log('submitted');
            // Send ajax request for add book
            if(bookStatus.value === "addBook"){
                $.ajax({
                    type : 'POST',
                    url  : 'ajax/addBook.php',
                    data : $(bookForm).serialize(),
                    success : (response) => {
                        const convertedRes = JSON.parse(response);
                        if(convertedRes.status === "success"){
                            modelContainer.style.display = "none";
                            bookForm.reset();
                            message.innerHTML = `<div class="alert success">
                            <div class="alert-icon"><div class="alertIcon">&check;</div></div>
                            <p> <strong>Success!</strong> ${convertedRes.msg} </p>
                        </div>`;
                        hideMsg();
                        fetchBooks();
                        booksInfo();
                        createPagination();
                        }
                    }
                })
            } else if(bookStatus.value === "updateBook"){
                $.ajax({
                    type : 'POST',
                    url  : 'ajax/updateBook.php',
                    data : $(bookForm).serialize(),
                    success : (response) => {
                        const convertedRes = JSON.parse(response);
                        if(convertedRes.status === "success"){
                            modelContainer.style.display = "none";
                            bookForm.reset();
                            message.innerHTML = `<div class="alert success">
                            <div class="alert-icon"><div class="alertIcon">&check;</div></div>
                            <p> <strong>Success!</strong> ${convertedRes.msg} </p>
                        </div>`;
                        hideMsg();
                        fetchBooks();
                        booksInfo();
                        }
                    }
                })
            }
        }
    })



function fetchBooks(){
    
    let table = document.getElementById("table");
    let offset = (page-1)*records_per_page;
    $.ajax({
        type : 'POST',
        url  : 'ajax/fetchBooks.php',
        data : {offset: offset, records_per_page: records_per_page},
        success : (response) => {
            const res = JSON.parse(response);
            if(res.status === "success"){
            let result = "";
                res.data.forEach((book) => {
                result += `<tr>
				<td>${book.bookName}</td>
				<td>${book.authorName}</td>
				<td><div class="dollor">$ ${book.bookPrice}.00</div></td>
                <td><a href="" class="btn btn-warning btn-small updateBookBtn" onclick="updateBook(${book.id}, '${book.bookName}', '${book.authorName}', ${book.bookPrice});">Edit <span>&#9998;</span></a></td>
                <td><a href="javascript:void(0);" class="btn btn-danger btn-small" onclick="deleteBook(${book.id});">Delete <span>&#10006;</span></a></td>
			</tr>`;
                })
                table.innerHTML = `<table class="table">
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Author Name</th>
                        <th>Book Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>${result}</tbody></table>`;
            } else if(res.status === "noRecords"){
            table.innerHTML = `<div style="font-size:1.4rem;border: 1px solid silver;padding: 1rem;border-radius: 3px;color:silver">No Records</div>`;
            }
            const updateBookBtn = document.querySelectorAll(".updateBookBtn");
                updateBookBtn.forEach((btn) => {
                    btn.addEventListener("click", (e) => {
                        e.preventDefault();
                        modelBox();
                    })
                })
        }
    })
}

fetchBooks();

function updateBook(id, bookN, bookA, bookP){
    bookName.value = bookN;
    bookAuthor.value = bookA;
    bookPrice.value = bookP;
    heading.innerHTML = "Update Book";
    bookButton.value = "update book \u276F";
    bookName.classList.remove("borderRed");
    bookAuthor.classList.remove("borderRed");
    bookPrice.classList.remove("borderRed");
    nameError.innerHTML = "";
    autherError.innerHTML = "";
    priceError.innerHTML = "";
    bookStatus.value = "updateBook";
    bookId.value = id;
}


function addBookForm(){

    bookName.value = "";
    bookAuthor.value = "";
    bookPrice.value = "";
    heading.innerHTML = "Add Book";
    bookButton.value = "add book \u276F";  
    bookStatus.value = "addBook";
}

function deleteBook(id){

    const confirmBox = confirm("Are you really sure you want to delete this book ?");
    if(confirmBox){
        $.ajax({
            type : 'POST',
            url  : 'ajax/deleteBook.php',
            data : {id},
            success : (response) => {
                const convertedRes = JSON.parse(response);
                if(convertedRes.status === "success"){
                    message.innerHTML = `<div class="alert success">
                            <div class="alert-icon"><div class="alertIcon">&check;</div></div>
                            <p> <strong>Success!</strong> ${convertedRes.msg} </p>
                        </div>`;
                        hideMsg();
                        fetchBooks();
                        booksInfo();
                        createPagination();
                }
            }
        })
    }
}

function booksInfo() {
    $.ajax({

        type : 'GET',
        url  : 'ajax/booksInfo.php',
        success : (response) => {
            const res = JSON.parse(response);
            if(res.status === "success"){
                totalBooks.innerHTML = `Total Books<h2>${res.totalBooks}</h2>`;
                totalAmount.innerHTML = `Total Amount <h2> $ ${res.totalAmount}.00</h2>`;
            } else if(res.status === "noBooks"){
                totalBooks.innerHTML = `Total Books<h2>0.00</h2>`;
                totalAmount.innerHTML = `Total Amount <h2> $ 0.00</h2>`;
            }
        }
    })
}

booksInfo();

function createPagination() {
    const paginate = document.querySelector('.paginate')
    let links = '';
    let leftLinks = '';
    let rigthLinks = '';

    $.ajax({
        type: 'get',
        url: 'ajax/rowsCount.php',
        success: (feedback) =>{
            const response = JSON.parse(feedback);
            if(response.status === 'success'){
                let totalPages = Math.ceil(response.rows / records_per_page);
                let startLoop = page;
                let diff = totalPages - page;

                startLoop = (diff<=3) ? totalPages -3 : startLoop;

                let endLoop = startLoop+3;

                leftLinks = (page > 1) ? `<li><a href='javascript:void(0)' onclick='prev()'><span style='font-size: 18px;'>&laquo</span></a></li>
                <li><a href='javascript:void(0)' onclick='firstPage()'><span style='font-size: 12px;'>First</span></a></li>` : "";

                if(startLoop<=0) startLoop = 1;
                startLoop = (startLoop<=0) ? startLoop = 1 : startLoop;

                for (let i = startLoop; i <= endLoop; i++) {

                    let active = (i===page) ? 'active' : '';

                    links += `<li><a href='javascript:void(0)' onclick='clickLink(${i})' class='${active}' >${i}</a></li>`;
                }

                rigthLinks = (page<totalPages) ? `<li><a href='javascript:void(0)'  onclick='lastPage(${totalPages})'><span style='font-size: 12px;'>Last</span></a></li>
                <li><a href='javascript:void(0)'  onclick='next()'><span style='font-size: 18px;'>&raquo</span></a></li>` : '';

                if(response.rows > 3){
                    paginate.innerHTML = `<ul class='pagination'>
                    ${leftLinks}
                    ${links}
                    ${rigthLinks}
                    </ul>`;
                }

            }
        }
    })
}

createPagination();

function clickLink(pageNumber) {
    page = pageNumber;
    createPagination();
    fetchBooks();
}

function prev() {
    page -= 1;
    createPagination();
    fetchBooks();
}

function next() {
    page += 1;
    createPagination();
    fetchBooks();
}

function firstPage() {
    page = 1;
    createPagination();
    fetchBooks();
}

function lastPage(totalPages) {
    page = totalPages
    createPagination();
    fetchBooks();
}