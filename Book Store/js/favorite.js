let favoriteCon = document.querySelector(".favorite-continar");

// ctrate array to store data from local storge
let favoriteArray = [];

getDataFromLocalStorge();
function getDataFromLocalStorge() {
    let data = window.localStorage.getItem("favorite");
    // if there data in the local storge store it in the bookArray
    if (data) {
        let favorite = JSON.parse(data);
        favorite.forEach((index) => favoriteArray.push(index))
        addElementToPage(favorite);
    }
}


// create element for each book
function addElementToPage(favorite) {
    favorite.forEach(function (f) {

        let img = document.createElement("img"); 
        img.classList = "book-img";
        img.setAttribute("src", f.bImg);

        let p1 = document.createElement("p"); 
        let text1 = document.createTextNode(f.bName);
        p1.appendChild(text1);

        let p2 = document.createElement("p"); 
        p2.classList = "p"

        let span = document.createElement("span"); 
        let text2 = document.createTextNode(f.bPrise);
        span.appendChild(text2);

        let text3 = document.createTextNode(" ريال");
        
        p2.appendChild(span);
        p2.appendChild(text3);

        let div = document.createElement("div");

        let img2 = document.createElement("img");
        img2.classList = "empty-heart"; 
        img2.setAttribute("src", "img/empty-heart.png");

        let img3 = document.createElement("img");
        img3.classList = "red-heart active"; 
        img3.setAttribute("src", "img/red-heart.png");

        let img4 = document.createElement("img");
        img4.setAttribute("src", "img/upload.png");

        div.appendChild(img2);
        div.appendChild(img3);
        div.appendChild(img4);


        let item = document.createElement("div");
        item.classList = "favorite-item";
        item.setAttribute("data-id", f.id);
        item.appendChild(img);
        item.appendChild(p1);
        item.appendChild(p1);
        item.appendChild(div);

        favoriteCon.appendChild(item);

    })
}


let redHeart = document.querySelectorAll(".red-heart");
redHeart.forEach((r) => {
    r.onclick = function(){
        let item = r.parentNode.parentNode;
        item.remove();
        deleteFromLocalStorge(item.getAttribute("data-id"));
    }
});

// delete book from local storge
function deleteFromLocalStorge(dataId){
    favoriteArray = favoriteArray.filter((filterdBook) => filterdBook.id != dataId)
    window.localStorage.setItem("favorite", JSON.stringify(favoriteArray));
}