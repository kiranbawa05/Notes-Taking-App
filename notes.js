let editIndex = -1;
const add=()=>{
    let input=document.getElementById("text");
    let item=input.value;

    if (item=="") return;//base case

    let now = new Date().toLocaleString();
     
    let tasks=JSON.parse(localStorage.getItem("notes"))||[];

    if(editIndex===-1){
        tasks.push({note:item,dt:now});
    }
    else{
        tasks[editIndex]={note:item,dt:new Date().toLocaleString()};
    }

    localStorage.setItem("notes",JSON.stringify(tasks));
    display();
    input.value="";
};

function display(){
    let list=document.getElementById("list");
    list.innerHTML="";

    let tasks=JSON.parse(localStorage.getItem("notes"))||[];
    tasks.forEach((task,index)=>{
        let li=document.createElement("li");
        li.textContent=task.note+"";


        let liB=document.createElement("button");
        liB.textContent="Delete";
        liB.classList.add("del"); 

        let liE=document.createElement("button");
        liE.textContent="edit";
        liE.classList.add("edit"); 

        liB.onclick=function(){
            Delete(index);
        }
        liE.onclick=function(){
            Edit(index);
        }
        let time = document.createElement("small");
        time.textContent = task.dt;
        li.appendChild(time);
        li.appendChild(liE);
        li.appendChild(liB);

        list.appendChild(li);
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

    document.getElementById("text").value=tasks[index].note;
    editIndex=index;
}
window.onload=function(){
    display();
};