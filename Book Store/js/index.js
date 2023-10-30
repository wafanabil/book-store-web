let redHeart = document.querySelectorAll(".red-heart");
let emptyHeart = document.querySelectorAll(".empty-heart");

emptyHeart.forEach(function (h) {
    h.onclick = function () {
        h.classList.toggle("active");
        h.nextElementSibling.classList.toggle("active");
    }
})

redHeart.forEach(function (h) {
    h.onclick = function () {
        h.classList.toggle("active");
        h.previousElementSibling.classList.toggle("active");
    }
})


let plus = document.querySelectorAll(".plus");
let cross = document.querySelectorAll(".cross");

plus.forEach(function (p) {
    p.onclick = function () {
        p.classList.toggle("active");
        p.nextElementSibling.classList.toggle("active");
        p.parentNode.nextElementSibling.nextElementSibling.classList.toggle("active");
    }
})

cross.forEach(function (c) {
    c.onclick = function () {
        c.classList.toggle("active");
        c.previousElementSibling.classList.toggle("active");
        c.parentNode.nextElementSibling.nextElementSibling.classList.toggle("active");
    }
})

// زر اضف الى السلة
let cartBut = document.querySelectorAll(".card-but");

// create array to store each book
let books = [];

// اذا كانت الاري فيها قيم لا يحذفها
if(localStorage.getItem("books")){
    books = JSON.parse(localStorage.getItem("books"));
}


// اضافة كتاب للسلة
// get book information
cartBut.forEach(function(c){
    c.onclick = function(){
        let bookName = c.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        let bookImg = c.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.getAttribute("src");
        let bookPrise = c.previousElementSibling.previousElementSibling.children[0].innerHTML;
        let num = 1;
        addToBookArray(bookName, bookImg, bookPrise, num);
    }
})

// store book information
function addToBookArray(Name, bookImg, bookPrise){
    const bookToCrt = {
        id: Date.now(),
        bookName: Name,
        bookImg: bookImg,
        bookPrise: bookPrise,
        num: 1,
    }
    for(let i = 0; i < books.length; i++){
        if(books[i].bookName === Name){
            books[i].num += 1;
            addBookToLocalStorge(books);
            return;
        }
    }    

    books.push(bookToCrt);
    addBookToLocalStorge(books);
}

// add the books information to local storege
function addBookToLocalStorge(books){
    window.localStorage.setItem("books", JSON.stringify(books));
}
// 

// 
// 
// 
// 
// 
// 
// 
// 
// create array to store each book
let favorite = [];

// اذا كانت الاري فيها قيم لا يحذفها
if(localStorage.getItem("favorite")){
    favorite = JSON.parse(localStorage.getItem("favorite"));
}


// اضافة كتاب للسلة
// get book information
emptyHeart.forEach(function (h) {
    h.onclick = function () {
        h.classList.toggle("active");
        h.nextElementSibling.classList.toggle("active");
        let bName = h.parentNode.previousElementSibling.previousElementSibling.innerHTML;
        let bImg = h.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.getAttribute("src");
        let bPrise = h.parentNode.previousElementSibling.children[0].innerHTML;
        addToFavoriteArray(bName, bImg, bPrise);
    }
})


// store book information
function addToFavoriteArray(Name, bookImg, bookPrise){
    const bookToFavorite = {
        id: Date.now(),
        bName: Name,
        bImg: bookImg,
        bPrise: bookPrise,
    }

    console.log(favorite.includes(Name));
    // console.log(1);

    for(let i = 0; i < favorite.length; i++){
        if(favorite[i].bName === Name){
            // console.log(favorite[i].bName.includes(Name));
            return;
        }
    }    

    

    favorite.push(bookToFavorite);
    addBookToLocalStorge2(favorite);
}

// add the books information to local storege
function addBookToLocalStorge2(favorite){
    window.localStorage.setItem("favorite", JSON.stringify(favorite));
}

let BN = document.querySelectorAll(".book-name")
favorite.forEach(function(f){
    BN.forEach(function(b){
        // console.log(f.bookName);
        if(f.bName === b.innerHTML){
            b.nextElementSibling.nextElementSibling.children[0].classList.toggle("active");
            b.nextElementSibling.nextElementSibling.children[1].classList.toggle("active");
            console.log(b.nextElementSibling.nextElementSibling.children[0])
        }
    })
})

