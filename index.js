showTask();
let mainContainer = document.getElementById("container2") 
let myInput = document.getElementById("myInput"); 
let addBtn = document.getElementById("add");
let list = document.getElementById("myUL"); 
let deleteBtn = document.getElementById("deleteBtn");

//*DATE: 
function displayDate(){
    let date = new Date();
    date= date.toString().split(" ");
    document.querySelector("#date").innerHTML = date[0] + ", " + date[1]+ " " + date[2] + " " + date[3];
}
displayDate();


//ERROR message if field is empty
function submitList() {
    if (myInput.value ==""){ 
        document.getElementById("error").innerHTML = "Please enter some text";
        document.getElementById("error").style.visibility = "visible";
    } 
    else {
    //* this func returns a blank input value after we add an item to the list.
        myInput.value ="";
        document.getElementById("error").style.visibility = "hidden";
    }
};

// CODING NEPAL
//* DISPLAY TASK
function showTask(){
    let taskObj = JSON.parse(localStorage.getItem("taskItems"));//turning it into an object from a string
    let html = "";

    //* Local Storage Update:
    if(taskObj){
    taskObj.forEach((item,index) => {
    // if status is completed, set the isCompleted value to checked
    let isCompleted = item.status == "completed" ? "checked" : "";
        html += ` <li>
        <input type="checkbox" id="${index}" onclick= "taskComplete(this)" ${isCompleted}>
        <p class= "${isCompleted} grid-item2">${item.name}</p>
        <button id= "deleteBtn" onclick= "deleteToDo(${index})">❌</button>
        </li>`;
        });
    }
        myUL.innerHTML = html;
}


//* MAIN FUNCTION submitList() starts here: 
//Todo: STEP 1: "Button CLICK" function to submitList to the main list
addBtn.addEventListener("click", function (){
    let userTask = myInput.value;
    //* Local Storage Update:
    let taskObj = JSON.parse(localStorage.getItem("taskItems"));//turning it into an object from a string
    if(taskObj == null){
        taskObj = [];
    }
    let taskInfo = {name: userTask, status: "pending"};
    taskObj.push(taskInfo);
    localStorage.setItem("taskItems", JSON.stringify(taskObj));
    showTask();
    
    submitList(); 
});

//Todo: STEP 2: "Enter" key function to submitList to the main list
//* REPEATED "ENTER" function so if user presses "ENTER" they can still add to main list and do the same thing
document.addEventListener("keypress", function (e){
    let userTask = myInput.value;
    if(e.key== "Enter"){
    //* Local Storage Update:
    let taskObj = JSON.parse(localStorage.getItem("taskItems"));//turning it into an object from a string
    if(taskObj == null){
        taskObj = [];
    }                                                                                                               // set 2 properties in object. One is the user input. Second is status to for status Update                                                          
    let taskInfo = {name: userTask, status: "pending"};
    taskObj.push(taskInfo);
    localStorage.setItem("taskItems", JSON.stringify(taskObj));
    showTask();
    
    submitList(); 
    }
});


//DELETE Item
function deleteToDo(index){
    //remocing selected task from array
    let taskObj = JSON.parse(localStorage.getItem("taskItems"));
    taskObj.splice(index,1);

    //Update local storage
    localStorage.setItem("taskItems", JSON.stringify(taskObj));
    showTask();
}

function taskComplete(selectedTask){
// adding one more class to <p> called checked if tick applied
let taskObj = JSON.parse(localStorage.getItem("taskItems"));
if(selectedTask.checked){
    selectedTask.parentElement.children[1].classList.add("checked");
    taskObj[selectedTask.id].status = "completed";
} else {
    selectedTask.parentElement.children[1].classList.remove("checked");
     taskObj[selectedTask.id].status = "pending";
}
localStorage.setItem("taskItems", JSON.stringify(taskObj));
}


