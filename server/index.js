const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

// Temporary storage
let tasks = [];

// Home route
app.get("/", (req, res) => {
  res.send("TaskFlow Backend Running");
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add task
app.post("/tasks", (req, res) => {

  const newTask = {

    id: uuidv4(),

    title: req.body.title,

    completed: false

  };

  tasks.unshift(newTask);

  res.status(201).json(newTask);

});

// Toggle complete / incomplete
app.patch("/tasks/:id/toggle", (req, res) => {

  const task = tasks.find(
    task =>
      task.id === req.params.id
  );

  if (!task) {

    return res.status(404).json({
      message:
      "Task not found"
    });

  }

  task.completed =
    !task.completed;

  res.json(task);

});

// Delete task
app.delete("/tasks/:id", (req, res) => {

  tasks =
  tasks.filter(
    task =>
      task.id !==
      req.params.id
  );

  res.json({
    message:
    "Task deleted"
  });

});

// Start server
app.listen(5000, () => {

console.log(
"Server started on port 5000"
);

});