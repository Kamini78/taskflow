import { useEffect, useState } from "react";

function App() {

const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [dueDate,setDueDate]=useState("");

const [tasks,setTasks]=useState([]);
const [filter,setFilter]=useState("all");

async function loadTasks(){

const res=
await fetch(
"http://localhost:5000/tasks"
);

setTasks(
await res.json()
);

}

useEffect(()=>{
loadTasks();
},[]);

async function addTask(){

if(!title.trim()){

alert(
"Title required"
);

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

if(
!window.confirm(
"Delete task?"
)
)
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

const title=
prompt(
"Edit title",
task.title
);

if(!title)
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

title,

description:
task.description,

dueDate:
task.dueDate

})

}

);

loadTasks();

}

const filtered=
tasks.filter(t=>{

if(filter==="active")
return !t.completed;

if(filter==="completed")
return t.completed;

return true;

});

const active=
tasks.filter(
t=>!t.completed
).length;

const complete=
tasks.filter(
t=>t.completed
).length;

return(

<div
style={{

maxWidth:"700px",

margin:"auto",

padding:"20px",

fontFamily:
"Arial"

}}
>

<h1>
TaskFlow
</h1>

<p>

Active:
{active}

{" • "}

Completed:
{complete}

</p>

<input

placeholder=
"Task title"

value=
{title}

onChange=
{(e)=>

setTitle(
e.target.value
)

}

style={{
width:"100%",
padding:"10px"
}}

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

style={{

width:"100%",

padding:"10px"

}}

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
onClick={addTask}>
＋ Add
</button>

<hr/>

<button onClick={()=>setFilter("all")}>
All
</button>

{" "}

<button onClick={()=>setFilter("active")}>
Active
</button>

{" "}

<button onClick={()=>setFilter("completed")}>
Completed
</button>

<hr/>

{

filtered.length===0

?

<p>
No tasks yet
</p>

:

filtered.map(task=>(

<div

key={
task.id
}

style={{

border:

task.dueDate &&
!task.completed &&
new Date(task.dueDate)
<
new Date()

?

"2px solid red"

:

"1px solid #ddd",

padding:"16px",

marginBottom:"12px",

borderRadius:"12px"

}}

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
"-"
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