let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.myjson.com/bins/1gw9hx', true);
xhr.onload = function() {
    data = JSON.parse(xhr.responseText);
}
xhr.send();

let btnStart = document.getElementById("start");
let tbl = document.getElementById("table");
let imgId = [];
let cellId = [];
let openElements = 0;
let player = '';
let downloadTimer = 0;
let timeEnd = 0;
let timeStart = 0;
let time = 0;

function enterGame() {
	let x = readCookie("username");
	if (x) {
		listeners();
	} else {
		let person = prompt("Please enter your name");
		createCookie("username", person, 1);
	}
	player = x;
}

function listeners() {
	start.addEventListener("click", gameStart);
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
	let picsId = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
	let arr = shuffle(picsId); // shuffled array
	let tblBody = document.createElement("tbody");
	tblBody.setAttribute("id", "tblBody");
	let row1 = document.createElement("tr");
	for (let i = 0; i < 4; i++) {
		row1.innerHTML += `<td id=${i} onclick = "check(this,${arr[i]})" ></td>`;
		tblBody.appendChild(row1);
	}
	let row2 = document.createElement("tr");
	for (let i = 4; i < 8; i++) {
		row2.innerHTML += `<td id=${i} onclick ="check(this,${arr[i]})"></td>`;
		tblBody.appendChild(row2);
	}
	let row3 = document.createElement("tr");
	for (let i = 8; i < 12; i++) {
		row3.innerHTML += `<td id=${i} onclick ="check(this,${arr[i]})"></td>`;
		tblBody.appendChild(row3);
	}
	let row4 = document.createElement("tr");
	for (let i = 12; i < 16; i++) {
		row4.innerHTML += `<td id=${i} onclick ="check(this,${arr[i]})"></td>`;
		tblBody.appendChild(row4);
	}
	tbl.appendChild(tblBody);
}
let nowFinished = 0;
let now = 0;

function check(element, value) {
	let imageToCompare = data[value].url;
	if (element.innerHTML == "" && imgId.length < 2) {
		element.innerHTML = `<img id='img${value}' src='${imageToCompare}'/>`;
		if (imgId.length == 0) {
			imgId.push(value);
			cellId.push(element.id);
			console.log(imgId);
			console.log(cellId);
		} else if (imgId.length == 1) {
			imgId.push(value);
			cellId.push(element.id);
			console.log(imgId);
			console.log(cellId);
			if (imgId[0] == imgId[1]) {
				openElements += 2;
				imgId = [];
				cellId = [];
				if (openElements == 16) {
					timeEnd = new Date(); // vreme kad je zavrsena igra
					displayScore();
					document.getElementById("tblBody").style.pointerEvents = "none";
				}
			} else {
				function removePictures() {
					// debugger;
					console.log(document.getElementById(cellId[0]));
					document.getElementById(cellId[0]).innerHTML = "";
					console.log(document.getElementById(cellId[1]));
					document.getElementById(cellId[1]).innerHTML = "";
					imgId = [];
					cellId = [];
				}
				setTimeout(removePictures, 500);
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

function lvlOptions() {
	let lvlTxt = document.getElementById("lvlTxt");
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

function gameStart() {
	clearInterval(downloadTimer);
	openElements = 0;
	tbl.innerHTML = '';
	generateTable();
	document.getElementById("tblBody").style.pointerEvents = "visible";
	for (let i = 0; i < 15; i++) {
		document.getElementById(i).innerHTML = "";
	}
	if (time == 0) {
		countdown(60);
	} else if (time == 1) {
		countdown(30);
	} else if (time == 2) {
		countdown(15);
	}
	timeStart = new Date();
}

function displayScore() {
	let scoreCal = timeEnd - timeStart;
	score = millisToMinutesAndSeconds(scoreCal);
	document.getElementById("list").innerHTML = `<li>${player}: ${score} sec</li>`
}

function millisToMinutesAndSeconds(millis) {
	var seconds = ((millis % 60000) / 1000).toFixed(2);
	return seconds;
}

function countdown(t) {
	let timeleft = t;
	downloadTimer = setInterval(function() {
		document.getElementById("welcome").innerHTML = "Seconds remaining: " + timeleft;
		timeleft -= 1;
		if (timeleft <= 0) {
			clearInterval(downloadTimer);
			document.getElementById("welcome").innerHTML = "Game over. Try again!";
			document.getElementById("tblBody").style.pointerEvents = "none";
		}
		if (openElements == 16) {
			clearInterval(downloadTimer);
			document.getElementById("welcome").innerHTML = "You won! Try again!";
			timeEnd = 0;
			timeStart = 0;
		}
	}, 1000);
}
(function init() {
	
	lvlOptions();
	generateTable();
	setTimeout(enterGame, 300);
})();