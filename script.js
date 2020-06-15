
class Book{
    constructor(name, author, type){
        this.name=name;
        this.author=author;
        this.type=type;
    };
};

class Display{

    clear(){
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }
    showAlert(alert){
        let msg = document.getElementById('msg');
        let message;
        if (alert == "success") {
            message = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Book successfully added.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
        }
        else {
            message = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> Please fill all the fields.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`
        }
        msg.innerHTML = message;
        setTimeout(() => {
            msg.innerHTML = '';
        }, 5000);
    };
    
}

show();

//Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e){
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;

    let story = document.getElementById('story');
    let educational = document.getElementById('educational');
    let other = document.getElementById('other');
    let type;
    if (story.checked) {
        type = story.value;
    }
    else if (educational.checked) {
        type = educational.value;
    }
    else if (other.checked) {
        type = other.value;
    }
    let book = new Book(name,author,type);
    console.log(book);
    // localStorage.setItem('books', JSON.stringify(book));
    // let books = localStorage.getItem('books');
    // console.log(JSON.parse(books));
    let books = localStorage.getItem('books');
    if(books==null){
        booksObj = [];
    }
    else{
        booksObj = JSON.parse(books);
    }
    let myObj = {
        Name: book.name,
        Author: book.author,
        Type: book.type
    };
    
    booksObj.push(myObj);
    
    localStorage.setItem('books', JSON.stringify(booksObj));
    let d = new Display();
    show();
    e.preventDefault();
}
function show(){
    let d = new Display();
    let books = localStorage.getItem('books');
    let booksObj;
    if(books==null){
        booksObj = [];
    }
    else{
        booksObj = JSON.parse(books);
    }
    let tableBody = document.getElementById('tableBody');
    let uiString;
    Array.from(booksObj).forEach(function(element,index){
        if(element.Name.length>0 && element.Author.length>0){
            uiString += `<tr><td>${element.Name}</td><td>${element.Author}</td><td>${element.Type}</td><td><button onclick="deleteBook(this.id)"class="btn btn-large btn-danger" id="${index}">Delete</button></td></tr>`;
            tableBody.innerHTML = uiString;
            d.clear();
            d.showAlert('success');
        }
        else{
            d.showAlert('alert');
        }
    });
    
};

function deleteBook(index){
    let books = localStorage.getItem('books');
    if (books == null) {
        booksObj = [];
    }
    else {
        booksObj = JSON.parse(books);
    }
    booksObj.splice(index,1);
    localStorage.setItem('books', JSON.stringify(booksObj));
    show();
    location.reload();
};
