let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.myjson.com/bins/gsx6p', true);
xhr.onload = function() {
    data = JSON.parse(xhr.responseText);
}
xhr.send();

let tryIt = document.getElementById("tryIt");
let btnStart = document.getElementById("start");
let container = document.getElementById("container");
let scoreBoard = document.getElementById("scoreBoard");
let gameDiv = document.getElementById("gameDiv");
let tbl = document.getElementById("table");
  

(function init() {
    container.style.visibility = "hidden";
    listeners();
    lvlOptions();

})();
let target = [];


function enterGame() {
    // let x = readCookie("username");
    // if(x){
    //     createElements(x);
    // }else {
    //     let person = prompt("Please enter your name");
    //     createCookie("username",person, 1);
    // }
    let x = "Katarina"
    createElements(x);
}

function listeners() {
    tryIt.addEventListener("click", enterGame);
    start.addEventListener("click", gameStart);
}


function createElements(person) {
    tryIt.style.display = "none"; // brisanje tryIt dugmeta sa stranice
    container.style.visibility = "visible";
    let welcomeMsg = document.getElementById("welcome");
    welcomeMsg.textContent = `Welcome ${person}!`;
    generateTable()

}


function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1)
}

function lvlOptions() {
    let lvlTxt = document.getElementById("lvlTxt");
    lvlTxt.textContent = " You have 60 sec to finish the game";
    let a = document.getElementById('level');
    a.addEventListener('change', function() {
        if (this.value == 0) {
            lvlTxt.textContent = " You have 60 sec to finish the game";
        }
        if (this.value == 1) {
            lvlTxt.textContent = " You have 30 sec to finish the game";
        }
        if (this.value == 2) {
            lvlTxt.textContent = " You have 15 sec to finish the game";
        }
    })
}

function generateTable() {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    shuffle(arr); // [3,4,7,3,5,7,3,7,8,91,0] 
    let tblBody = document.createElement("tbody");
    let row1 = document.createElement("tr");
    for (let i = 0; i < 4; i++) {

        let cell = document.createElement("td");
        let picButton = document.createElement("button");
        cell.setAttribute("id", arr[i]);
        cell.addEventListener("click", check);
        cell.appendChild(picButton);
        row1.appendChild(cell);
        tblBody.appendChild(row1);
    }
    let row2 = document.createElement("tr");
    for (let i = 4; i < 8; i++) {

        let cell = document.createElement("td");
        let picButton = document.createElement("button");
        cell.setAttribute("id", arr[i]);
        cell.addEventListener("click", check);
        cell.appendChild(picButton);
        row2.appendChild(cell);
        tblBody.appendChild(row2);
    }
    let row3 = document.createElement("tr");
    for (let i = 8; i < 12; i++) {

        let cell = document.createElement("td");
        let picButton = document.createElement("button");
        cell.setAttribute("id", arr[i]);
        cell.addEventListener("click", check);
        cell.appendChild(picButton);
        row3.appendChild(cell);
        tblBody.appendChild(row3);
    }
    let row4 = document.createElement("tr");
    for (let i = 12; i < 16; i++) {

        let cell = document.createElement("td");
        let picButton = document.createElement("button");
        cell.setAttribute("id", arr[i]);
        cell.addEventListener("click", check);
        cell.appendChild(picButton);
        row4.appendChild(cell);
        tblBody.appendChild(row4);
    }
    tbl.appendChild(tblBody);
}

function gameStart() {

    countdown();
    setTimeout(endGame, 10000)
}
let arrX = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
shuffle(arrX);
console.log(arrX)


function check() {

    let x = this;
    let counter = 0;
    for (let i = 0; i < arrX.length; i++) {

        x.innerHTML = `<img id="${arrX[i]}" src="${data[arrX[i]].url}">`;

    }
    console.log(x.id, x.children[0].id)
}

function endGame() {
    tbl.style.visibility = "hidden";
}

function countdown() {
    let timeleft = 10;
    let downloadTimer = setInterval(function() {
        document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
        timeleft -= 1;
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "You ran out of time. Try again!"
        }
    }, 1000);
}



function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

};