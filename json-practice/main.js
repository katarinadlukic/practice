
let list = document.getElementById('list');
let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.myjson.com/bins/1fe04i', true);
    xhr.onload = function(){
        data = JSON.parse(xhr.responseText);
        render(data);    
    }
    xhr.send();
function render(data){
    let unknown;
    for (let i = 0; i < data.length; i++) {  
        if(data[i].age !== null){
            unknown = data[i].age;
        }else{
           unknown = "Unknown"
        }  
        list.innerHTML += `
        <div id = ${i}>
        <p>Name: ${data[i].firstName}</p>
        <p>Surname: ${data[i].surname}</p>
        <p>Age: ${unknown}</p> 
        <p>Gender: ${data[i].gender}</p>      
        <button onclick = "info(event)">Friends</button>
        </div>     `
    }
}
function info(event){
    let x = event.target;
    let id = x.parentNode.id;
    let friendsId = data[id].friends;// list of friends id-s
    let friends =[];// list of friends names
    let filterFof = new Set(); // filtered friends of friends
    let allFof = [];// all friends of friends
    let obj={};// object helper
    let suggested=[];// suggested friends array
   for (let i = 0; i < friendsId.length; i++) {
       friends.push(data[friendsId[i]-1].firstName + " " + data[friendsId[i]-1].surname);  
        for(let j = 0; j < data[friendsId[i]-1].friends.length;j++){
                if(data[friendsId[i]-1].friends[j]-1 == id || data[friendsId[i]-1].friends[j]-1 == id ){
                    continue;// if chosen friend is in the list of fof, don't display
                }
            allFof.push(data[data[friendsId[i]-1].friends[j]-1].firstName + " " + data[data[friendsId[i]-1].friends[j]-1].surname);
            filterFof.add(data[data[friendsId[i]-1].friends[j]-1].firstName + " " + data[data[friendsId[i]-1].friends[j]-1].surname);
        }  
    }
    for(let i = 0; i < allFof.length;i++){
        obj[allFof[i]] = (obj[allFof[i]] + 1 ) || 1;
    };
    for (let x in obj) {
        if (obj[x] >=2){
            suggested.push(x);
        }  
    }

    (function modal(){
        var modal = document.getElementById('myModal');
        var btn = document.getElementById(id);
        var span = document.getElementsByClassName("close");
        btn.onclick = function() {
            modal.style.display = "block";
            let friendsList = document.getElementById("friends");
            let suggestedFriends;
            if(suggested.length == 0){
                suggestedFriends = "No suggestions";
            }else{
                suggestedFriends = suggested;
            }
            friendsList.innerHTML = `
            <p><b>Friends:</b> ${friends}</p>
            <p><b>Friends of friends:</b> ${Array.from(filterFof)}</p>
            <p><b>Suggested friends:</b> ${suggestedFriends}</p>
            `
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    })();
}
