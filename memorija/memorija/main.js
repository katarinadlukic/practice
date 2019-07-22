let data = [
    {
      "id": "0",
      "url": "images/cockta.png"
    },
    {
      "id": "1",
      "url": "images/gorki_list.png"
    },
    {
      "id": "2",
      "url": "images/guarana.png"
    },
    {
      "id": "3",
      "url": "images/zero.png"
    },
    {
      "id": "4",
      "url": "images/kozel.png"
    },
    {
      "id": "5",
      "url": "images/krusovice.png"
    },
    {
      "id": "6",
      "url": "images/pepsi.png"
    },
    {
      "id": "7",
      "url": "images/schweppes.png"
    }
  ]
  

let btnStart = document.getElementById("start");
let container = document.getElementById("container");
let scoreBoard = document.getElementById("scoreBoard");
let gameDiv = document.getElementById("gameDiv");
let tbl = document.getElementById("table");
let imgId = [];
let cellId  = [];
let openElements = 0;
let player = '';
(function init() {
    listeners();
    lvlOptions();
    enterGame();
})();
function enterGame() {
    let x = readCookie("username");
    if(x){
        createElements(x);
    }else {
        let person = prompt("Please enter your name");
        createCookie("username",person, 1);
    }
    player = "Katarina";
    createElements(player);
}
function listeners() {
    start.addEventListener("click", gameStart);
}
function createElements() {
    document.getElementById("title").style.display = "none"; 
    container.style.visibility = "visible";
    let welcomeMsg = document.getElementById("welcome");
    welcomeMsg.textContent = `Welcome!`;
    generateTable();
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
function generateTable() {
    let picsId= [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
    let arr = shuffle(picsId); // shuffled array
    let tblBody = document.createElement("tbody");
    tblBody.setAttribute("id", "tblBody");
    let row1 = document.createElement("tr");
    for (let i = 0; i < 4; i++) {
    row1.innerHTML += `<td id='${i}' onclick = "check(this,${arr[i]})" ></td>`;
    tblBody.appendChild(row1);
    }
    let row2 = document.createElement("tr");
    for (let i = 4; i < 8; i++) {   
     row2.innerHTML += `<td id='${i}' onclick ="check(this,${arr[i]})"></td>`;
     tblBody.appendChild(row2);
    }
    let row3 = document.createElement("tr");
    for (let i = 8; i < 12; i++) {     
    row3.innerHTML += `<td id='${i}' onclick ="check(this,${arr[i]})"></td>`;
    tblBody.appendChild(row3);
    }
    let row4 = document.createElement("tr");
    for (let i = 12; i < 16; i++) {
     row4.innerHTML += `<td id='${i}' onclick ="check(this,${arr[i]})"></td>`;
     tblBody.appendChild(row4);
    }
    tbl.appendChild(tblBody);
}
let nowFinished = 0;
let now = 0;
function check(element,value) {
    let imageToCompare = data[value].url;
    if(element.innerHTML == "" && imgId.length < 2){
        element.innerHTML = `<img id=${value} src='${imageToCompare}'/>`;
        if(imgId.length == 0){
            imgId.push(value);
            cellId.push(element.id);
            console.log(imgId);
            console.log(cellId);
        }else if(imgId.length == 1){
            imgId.push(value);
            cellId.push(element.id);
            console.log(imgId);
            console.log(cellId);
            if(imgId[0] == imgId[1]){
                openElements += 2;
                imgId = [];
                cellId = [];
                if(openElements == 16){
                    nowFinished = new Date();
                    clearTimeout(timeout);
                    displayScore();
                    document.getElementById("tblBody").style.pointerEvents = "none"; 
                }
            }else {
                
                function removePictures(){
                    // debugger;
                    document.getElementById(cellId[0]).innerHTML = "";
                    document.getElementById(cellId[1]).innerHTML = "";
                    imgId = [];
                    cellId = [];
                }
                setTimeout(removePictures,500);
            }

        }
    }
}
function shuffle(array) { 
    var currentIndex = array.length;
    var temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};
let time = 0;
function lvlOptions() {
    let lvlTxt = document.getElementById("lvlTxt");
    lvlTxt.textContent = " You have 60 sec to finish the game";
    let a = document.getElementById('level');
    a.addEventListener('change', function() {
        if (this.value == 0) {
            time = 0;
            lvlTxt.textContent = " You have 60 sec to finish the game";
        }
        if (this.value == 1) {
            time = 1;
            lvlTxt.textContent = " You have 30 sec to finish the game";
        }
        if (this.value == 2) {
            time = 2;
            lvlTxt.textContent = " You have 15 sec to finish the game";
        }
    })
}
let timeout = 0;
function gameStart(){
    openElements = 0;
    tbl.innerHTML = '';  
    createElements();
    now = new Date();
    for(let i = 0; i < 15; i++){
        document.getElementById(i).innerHTML = "";
    }
    document.getElementById("tblBody").style.pointerEvents = "visible";
    if(time == 0){
        
      timeout = setTimeout(endGame,60000);
      countdown(60); 
    }
    else if(time == 1){
        timeout =  setTimeout(endGame,30000);
        countdown(30);
    }
    else if(time == 2){
        timeout = setTimeout(endGame,15000);
        countdown(15);
 
    }
}
function endGame(){
    document.getElementById("tblBody").style.pointerEvents = "none";
     
}
function displayScore(){
    if (nowFinished !== 0){
        let res = nowFinished - now;
        let resInsec = millisToMinutesAndSeconds(res);
        console.log(res);
        let ol = document.getElementById("list");
        ol.innerHTML +=`<li>${player}: ${resInsec} sec</li>`;
    } 
}
function millisToMinutesAndSeconds(millis) {
    var seconds = ((millis % 60000) / 1000).toFixed(2);
    return  seconds;
  }

  function countdown(t) {
   
    let timeleft = t;
    let downloadTimer = setInterval(function() {
        document.getElementById("welcome").innerHTML = "Seconds remaining: " + timeleft;
        timeleft -= 1;
       if(timeleft <= 0 || openElements == 16){
            
            clearInterval(downloadTimer);
            document.getElementById("welcome").innerHTML = "Game over. Try again!"
        }
    }, 1000);
}