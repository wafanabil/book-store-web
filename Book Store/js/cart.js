let cart = document.querySelector(".cart");

// ctrate array to store data from local storge
let bookArray = [];

getDataFromLocalStorge();
function getDataFromLocalStorge() {
    let data = window.localStorage.getItem("books");
    // if there data in the local storge store it in the bookArray
    if (data) {
        let book = JSON.parse(data);
        book.forEach((index) => bookArray.push(index))
        addElementToPage(book);
    }
}

// create element for each book
function addElementToPage(books) {
    books.forEach(function (b) {

        // rightSide
        let rightSide = document.createElement("div");
        rightSide.classList = "right-side";

        let img = document.createElement("img");
        img.setAttribute("src", b.bookImg)

        let p = document.createElement("p");
        let text = document.createTextNode(b.bookName);
        p.appendChild(text);

        rightSide.appendChild(img);
        rightSide.appendChild(p);

        // leftSide
        let leftSide = document.createElement("div");
        leftSide.classList = "left-side";

        // // //first Div
        let firstDiv = document.createElement("div");

        let text2 = document.createTextNode(b.bookPrise);
        let span = document.createElement("span");
        span.classList = "prise";
        span.appendChild(text2);

        let text3 = document.createTextNode("ريال");
        let p2 = document.createElement("p");
        p2.appendChild(span);
        p2.appendChild(text3);

        let li1 = document.createElement("li");
        let text4 = document.createTextNode("+");
        li1.appendChild(text4);

        let li2 = document.createElement("li");
        let text5 = document.createTextNode(b.num);
        li2.classList = "number";
        li2.appendChild(text5);

        let li3 = document.createElement("li");
        let text6 = document.createTextNode("-");
        li3.appendChild(text6);


        let ul = document.createElement("ul");
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);


        let input = document.createElement("div");
        input.classList = "num";
        input.appendChild(ul);


        firstDiv.appendChild(p2);
        firstDiv.appendChild(input);
        // console.log(input);

        // // // SecoundDiv
        let SecoundDiv = document.createElement("div");
        SecoundDiv.classList = "trash-continar";

        let img2 = document.createElement("img");
        img2.classList = "trash";
        img2.setAttribute("src", "img/close.png")

        SecoundDiv.appendChild(img2);

        leftSide.appendChild(firstDiv);
        leftSide.appendChild(SecoundDiv);

        let item = document.createElement("div");
        item.classList = "item";
        item.setAttribute("data-id", b.id);
        item.appendChild(rightSide);
        item.appendChild(leftSide);

        let hr = document.createElement("hr");
        cart.appendChild(item);
        cart.appendChild(hr);
    })
}

let code = document.querySelector(".code input");
let butUse = document.querySelector(".code .use");
let butDUse = document.querySelector(".code .duse");
let prise = document.querySelectorAll(".prise");
let value = document.querySelector(".value");
let total = document.querySelector(".total");
let bookNum = document.querySelector(".number");



// store the number of cober for each book here
let input = "";
code.oninput = function(){
    input = code.value;
}

//حساب القيمة // changa the value of books
prise.forEach(function (p) {
    value.innerHTML = +value.innerHTML + (+p.innerHTML * +bookNum.innerHTML);
})

// حساب المجموع // changa the total of books with tax
taxtotal = +value.innerHTML * 0.15;
total.innerHTML = +value.innerHTML + taxtotal;

let discount = +total.innerHTML * 0.30;
let use = 0;
// حساب كود الخصم // use the discount only 1 time
butUse.onclick = function () {
    if (use === 0) {
        if (input === "wafa") {
            total.innerHTML = +total.innerHTML - discount;
        }
        use++;
    }
}

// حذف كود الخصم // delete the discount code
butDUse.onclick = function () {
    if (use === 1) {
        if (input === "wafa") {
            total.innerHTML = +total.innerHTML + discount;
        }
        use--;
    }
}

// زيادة ونقصان عدد الكتب // changa the value and total when the number of book change
let quantity = document.querySelectorAll(".num");

quantity.forEach(function (num) {
    let plus = num.children[0].children[0];
    let mines = num.children[0].children[2];
    let number = num.children[0].children[1];

    // function +
    // change the number of book in cart as ewll as the value of class(vlaue & total)
    plus.onclick = function () {
        value.innerHTML = +value.innerHTML + +num.previousElementSibling.children[0].innerHTML;
        total.innerHTML = +value.innerHTML + (+value.innerHTML * 0.15);
        number.innerHTML = +number.innerHTML + 1;
        let name = num.parentNode.parentNode.previousElementSibling.children[1].innerHTML;
        // change the value from local storge so when we refrch the page it stay the same
        for (let i = 0; i < bookArray.length; i++) {
            if (bookArray[i].bookName === name) {
                bookArray[i].num += 1;
                addBookToLocalStorge(bookArray);
            }
        }
    }

    // function -
    // change the number of book in cart as ewll as the value of class(vlaue & total)
    mines.onclick = function () {
        if (+number.innerHTML !== 1) {
            value.innerHTML = +value.innerHTML - +num.previousElementSibling.children[0].innerHTML;
            total.innerHTML = +total.innerHTML - +num.previousElementSibling.children[0].innerHTML - (+num.previousElementSibling.children[0].innerHTML * 0.15);
            number.innerHTML = +number.innerHTML - 1;
            let name = num.parentNode.parentNode.previousElementSibling.children[1].innerHTML;
            // change the value from local storge so when we refrch the page it stay the same
            for (let i = 0; i < bookArray.length; i++) {
                if (bookArray[i].bookName === name) {
                    bookArray[i].num -= 1;
                    addBookToLocalStorge(bookArray);
                }
            }
        }
    }
})

// حذف الكتاب من السلة //delete the book from cart
let trash = document.querySelectorAll(".trash");
trash.forEach((tr) => {
    tr.onclick = function () {
        let item = tr.parentNode.parentNode.parentNode;
        let hr = tr.parentNode.parentNode.parentNode.nextElementSibling;
        let p = tr.parentNode.previousElementSibling.children[0].children[0]
        value.innerHTML = +value.innerHTML - +p.innerHTML;
        total.innerHTML = +total.innerHTML - +p.innerHTML;
        hr.remove();
        item.remove();
        if (+value.innerHTML === 0) {
            total.innerHTML = 0;
        }
        deleteFromLocalStorge(item.getAttribute("data-id"));
    }
});

// delete book from local storge
function deleteFromLocalStorge(dataId) {
    bookArray = bookArray.filter((filterdBook) => filterdBook.id != dataId)
    window.localStorage.setItem("books", JSON.stringify(bookArray));
}

// 
// 
// change the local storge
function addBookToLocalStorge(books) {
    window.localStorage.setItem("books", JSON.stringify(books));
}
