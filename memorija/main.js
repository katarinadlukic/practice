let tryIt = document.getElementById("tryIt");
let container = document.getElementById("container");
let scoreBoard = document.getElementById("scoreBoard");
let gameDiv = document.getElementById("gameDiv");
    function enterGame() {
            let x = readCookie("username");
            if(x){
                createElements(x);
            }else {
                let person = prompt("Please enter your name");
                createCookie("username",person, 1);
            }
            
  }
  function listeners(){
      
      tryIt.addEventListener("click", enterGame)
  }
  (function init(){
      container.style.visibility = "hidden";
      listeners();
  })();

  function createElements(person){
    tryIt.style.display = "none"; // brisanje tryIt dugmeta sa strancie
    container.style.visibility = "visible";
    let welcomeMsg = document.getElementById("welcome");
            welcomeMsg.textContent = `Welcome ${person}!`;
    

  }

 
  function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}