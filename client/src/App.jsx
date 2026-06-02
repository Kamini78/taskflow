import { useEffect, useState } from "react";

function App() {

const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [dueDate,setDueDate]=useState("");

const [tasks,setTasks]=useState([]);
const [filter,setFilter]=useState("all");

async function loadTasks(){

const response=
await fetch(
"http://localhost:5000/tasks"
);

const data=
await response.json();

setTasks(data);

}

useEffect(()=>{
loadTasks();
},[]);

async function addTask(){

if(!title.trim()){
alert("Title required");
return;
}

await fetch(
"http://localhost:5000/tasks",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({

title,
description,
dueDate

})

}

);

setTitle("");
setDescription("");
setDueDate("");

loadTasks();

}

async function toggleTask(id){

await fetch(

`http://localhost:5000/tasks/${id}/toggle`,

{
method:"PATCH"
}

);

loadTasks();

}

async function deleteTask(id){

const ok=
window.confirm(
"Delete task?"
);

if(!ok)
return;

await fetch(

`http://localhost:5000/tasks/${id}`,

{
method:"DELETE"
}

);

loadTasks();

}

async function editTask(task){

const newTitle=
prompt(
"Edit title",
task.title
);

if(!newTitle)
return;

await fetch(

`http://localhost:5000/tasks/${task.id}`,

{

method:"PUT",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({

title:newTitle,

description:
task.description,

dueDate:
task.dueDate

})

}

);

loadTasks();

}

const filteredTasks=
tasks.filter((task)=>{

if(filter==="active")
return !task.completed;

if(filter==="completed")
return task.completed;

return true;

});

return(

<div
style={{
padding:"40px"
}}
>

<h1>
TaskFlow
</h1>

<input
placeholder="Task title"
value={title}
onChange={(e)=>
setTitle(
e.target.value
)}
/>

<br/><br/>

<textarea

placeholder=
"Description"

value=
{description}

onChange=
{(e)=>

setDescription(
e.target.value
)

}

/>

<br/><br/>

<input

type="date"

value=
{dueDate}

onChange=
{(e)=>

setDueDate(
e.target.value
)

}

/>

<br/><br/>

<button
onClick={
addTask
}
>

Add Task

</button>

<hr/>

<button
onClick={()=>
setFilter("all")
}
>
All
</button>

{" "}

<button
onClick={()=>
setFilter("active")
}
>
Active
</button>

{" "}

<button
onClick={()=>
setFilter("completed")
}
>
Completed
</button>

<hr/>

{

filteredTasks.map(
(task)=>(

<div

key={
task.id
}

style={

{
border:
"1px solid gray",

padding:
"12px",

margin:
"10px"

}

}

>

<h3>

{
task.completed
?
"✅"
:
"⬜"
}

{" "}

{task.title}

</h3>

<p>
{task.description}
</p>

<p>

Due:
{" "}

{
task.dueDate
||
"No due date"
}

</p>

<button
onClick={()=>
toggleTask(
task.id
)
}
>

Toggle

</button>

{" "}

<button
onClick={()=>
editTask(
task
)
}
>

Edit

</button>

{" "}

<button
onClick={()=>
deleteTask(
task.id
)
}
>

Delete

</button>

</div>

)

)

}

</div>

);

}

export default App;