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

        let contents=document.createElement("div");

        let text=document.createElement("p");
        text.textContent=task.note;

        let time=document.createElement("small");
        time.textContent=task.dt;
        contents.appendChild(text);
        contents.appendChild(time);


        let actions=document.createElement("div");

        let liE=document.createElement("button");
        liE.textContent="Edit";
        liE.classList.add("edit");

        let liB=document.createElement("button");
        liB.textContent="Delete";
        liB.classList.add("del");

        liB.onclick=function(){
            Delete(index);
        }
        liE.onclick=function(){
            Edit(index);
        }

        actions.appendChild(liE);
        actions.appendChild(liB);

        li.appendChild(contents);
        li.appendChild(actions);

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

    document.getElementById("text").value=tasks[index].note;
    editIndex=index;
}
window.onload=function(){
    display();
};