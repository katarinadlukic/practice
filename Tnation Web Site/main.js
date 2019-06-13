function myFunction() {
    let job = document.getElementById("dropdown-job").children;
    let associates = document.getElementById("dropdown-associates").children;
    let contact = document.getElementById("dropdown-contact").children;
    for (let i = 0; i < job.length; i++) {
        job[i].id = i;
        job[i].addEventListener("mouseover", mouseOver);
        job[i].addEventListener("mouseout", mouseOut);
    }
    for (let i = 0, x = 3; i < associates.length; i++) {
        associates[i].id = x;
        associates[i].addEventListener("mouseover", mouseOver);
        associates[i].addEventListener("mouseout", mouseOut);
        x++;
    }
    for (let i = 0, x = 6; i < contact.length; i++) {
        contact[i].id = x;
        contact[i].addEventListener("mouseover", mouseOver);
        contact[i].addEventListener("mouseout", mouseOut);
        x++;
    }
}
myFunction();


function mouseOver() {
    if (this.id == 0 || this.id == 4) {
        this.style.backgroundColor = "#CC88EE";
    }
    if (this.id == 1 || this.id == 5 || this.id == 6) {
        this.style.backgroundColor = "#FF9999";
    };
    if (this.id == 2 || this.id == 3 || this.id == 7) {
        this.style.backgroundColor = "#FFFF99";
    }
}
function mouseOut() {
    this.style.backgroundColor = "rgba(36,36,255,0.1)";
}