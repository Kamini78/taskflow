import { useState } from "react";

function App() {

const [title, setTitle] = useState("");
const [tasks, setTasks] = useState([]);

async function loadTasks() {

const response =
await fetch(
"http://localhost:5000/tasks"
);

const data =
await response.json();

setTasks(data);

}

async function addTask() {

if (!title.trim()) {
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
title
})

}
);

setTitle("");

loadTasks();

}

return (

<div
style={{
padding:"30px"
}}
>

<h1>
TaskFlow
</h1>

<input
placeholder="Enter task"
value={title}
onChange={(e)=>
setTitle(
e.target.value
)}
/>

<button
onClick={addTask}
>
Add Task
</button>

<button
onClick={loadTasks}
>
Show Tasks
</button>

<ul>

{
tasks.map(
(task)=>(

<li
key={task.id}
>

{task.completed
? "✅"
: "⬜"}

{" "}

{task.title}

</li>

)
)

}

</ul>

</div>

);

}

export default App;