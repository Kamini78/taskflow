const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const filePath =
path.join(
__dirname,
"tasks.json"
);

function readTasks(){

try{

return JSON.parse(
fs.readFileSync(
filePath,
"utf8"
)
);

}

catch{

return [];

}

}

function saveTasks(data){

fs.writeFileSync(
filePath,
JSON.stringify(
data,
null,
2
)
);

}

let tasks=
readTasks();

app.get("/",(req,res)=>{

res.send(
"TaskFlow Backend Running"
);

});

app.get("/tasks",(req,res)=>{

res.json(tasks);

});

app.post("/tasks",(req,res)=>{

const task={

id:
uuidv4(),

title:
req.body.title,

description:
req.body.description || "",

dueDate:
req.body.dueDate || "",

completed:
false,

createdAt:
Date.now()

};

tasks.unshift(
task
);

saveTasks(
tasks
);

res
.status(201)
.json(task);

});

app.patch(
"/tasks/:id/toggle",

(req,res)=>{

const task=
tasks.find(
t=>
t.id===
req.params.id
);

if(!task){

return res
.status(404)
.json({
message:
"Task not found"
});

}

task.completed=
!task.completed;

saveTasks(
tasks
);

res.json(task);

}

);

app.put(
"/tasks/:id",

(req,res)=>{

const task=
tasks.find(
t=>
t.id===
req.params.id
);

if(!task){

return res
.status(404)
.json({
message:
"Task not found"
});

}

task.title=
req.body.title;

task.description=
req.body.description;

task.dueDate=
req.body.dueDate;

saveTasks(
tasks
);

res.json(task);

}

);

app.delete(
"/tasks/:id",

(req,res)=>{

tasks=
tasks.filter(
t=>
t.id!==
req.params.id
);

saveTasks(
tasks
);

res.json({
message:
"Deleted"
});

}

);

app.listen(
5000,

()=>{

console.log(
"Server started on port 5000"
);

}
);