const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/", (req,res)=>{

res.send(
"TaskFlow Backend Running"
);

});

app.get("/tasks",(req,res)=>{

res.json(tasks);

});

app.post("/tasks",(req,res)=>{

const newTask={

id:uuidv4(),

title:req.body.title,

description:
req.body.description || "",

dueDate:
req.body.dueDate || "",

completed:false,

createdAt:
Date.now()

};

tasks.unshift(
newTask
);

res
.status(201)
.json(newTask);

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

res.json({
message:
"Task deleted"
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