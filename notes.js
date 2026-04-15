let editIndex = -1;
const add=()=>{
    let input=document.getElementById("text");
    let item=input.value;

    if (item=="") return;//base case

    let now = new Date().toISOString();
     
    let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

    if(editIndex===-1){
        tasks.push({"note":"item","dt":"now"});
    }
    else{
        tasks[editIndex]={note:item,dt:now};
    }

    localStorage.setItem("tasks",JSON.stringify(tasks));
    display();
    input.value="";
};

function display(){
    let list=document.getElementById("list");
    list.innerHTML="";

    let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
    tasks.forEach((task,index)=>{
        let li=document.createElement("li");
        li.textContent=task.name+"";


        let liB=document.createElement("button");
        liB.textContent=Delete;

        let liE=document.createElement("button");
        liE.textContent=edit;

        liB.onclick=function(){
            Delete(index);
        }
        liE.onclick=function(){
            Edit(index);
        }

        li.appendChild(time);
        li.appendChild(liE);
        li.appendChild(liB);

        list.appendChild(li);
    })
}

function Delete(){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    display();
}

function Edit(){
    let tasks=JSON.parse(localStorage.getItem("tasks"));

    document.getElementById("text").value=tasks[index].name;
    document.getElementById("dt").value=tasks[index].dt;

    editIndex=index;
}
window.onload=function(){
    display();
};