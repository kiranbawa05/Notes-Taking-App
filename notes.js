let editIndex = -1;
const add=()=>{
    let input=document.getElementById("note");
    let item=input.value;

    let temp=document.getElementById("text");
    let title=temp.value;

    if (item=="" && title=="") {
        alert("Please enter a title and note");
        return;//base case
    }
        let now = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
     
    let tasks=JSON.parse(localStorage.getItem("notes"))||[];

    if(editIndex===-1){
        tasks.push({
            title:title,
            note:item,
            dt:now
        });
    }
    else{
        tasks[editIndex]={
            title:title,
            note:item,
            dt:new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            })
        }
    }

    editIndex = -1;

    localStorage.setItem("notes",JSON.stringify(tasks));
    display();
    input.value="";
    temp.value="";
};

function display(){
    let list=document.getElementById("list");
    list.innerHTML="";

    let tasks=JSON.parse(localStorage.getItem("notes"))||[];
    tasks.forEach((task,index)=>{
        let li=document.createElement("li");

        let contents=document.createElement("div");
        let head=document.createElement("div");
        head.classList.add("head");
        contents.classList.add("contents");

//this has time, title and text note.
        let time=document.createElement("small");
        time.textContent=task.dt;
        time.classList.add("time");

        let title=document.createElement("p");
        title.textContent=task.title;
        title.classList.add("title");

        let text=document.createElement("p");
        text.textContent=task.note;
        text.classList.add("note-text");

//adding contents for top-most div in one list item
        head.appendChild(title);
        head.appendChild(time);
//adding top-most div and text note in upper area of one list item
        contents.appendChild(head);
        contents.appendChild(text);
        

//bottom div of one list item
        let actions=document.createElement("div");
        //edit button
        let liE=document.createElement("button");
        liE.innerHTML=`<div class="icon">
                                <i class="fa-regular fa-pen-to-square"></i>    
                            </div>`;
        liE.classList.add("edit");
        //delete buttton
        let liB=document.createElement("button");
        liB.innerHTML=`<div class="icon">
                                <i class="fa-regular fa-trash-can"></i>    
                            </div>`;
        liB.classList.add("del");
        //button functions
        liB.onclick=function(){
            Delete(index);
        }
        liE.onclick=function(){
            Edit(index);
        }
//adding buttons in bottom-most div
        actions.appendChild(liE);
        actions.appendChild(liB);
//adding all these things in one list item
        li.appendChild(contents);
        li.appendChild(actions);
//adding all in the list
        list.appendChild(li)

    })
}

function Delete(index){
    let tasks = JSON.parse(localStorage.getItem("notes"));
    tasks.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(tasks));
    display();
}

function Edit(index){
    let tasks=JSON.parse(localStorage.getItem("notes"));

    document.getElementById("text").value=tasks[index].title;
    document.getElementById("note").value=tasks[index].note;
    editIndex=index;
}

window.onload=function(){
    display();
};



