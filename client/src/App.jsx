import { useEffect, useState } from "react";

const API = "https://taskflow-api-md16.onrender.com";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  async function loadTasks() {
    const res = await fetch(`${API}/tasks`);
    setTasks(await res.json());
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask() {
    if (!title.trim()) {
      alert("Title required");
      return;
    }
    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, dueDate }),
    });
    setTitle("");
    setDescription("");
    setDueDate("");
    loadTasks();
  }

  async function toggleTask(id) {
    await fetch(`${API}/tasks/${id}/toggle`, { method: "PATCH" });
    loadTasks();
  }

  async function deleteTask(id) {
    if (!window.confirm("Delete task?")) return;
    await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
    loadTasks();
  }

  async function editTask(task) {
    const newTitle = prompt("Edit title", task.title);
    if (!newTitle) return;
    await fetch(`${API}/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        description: task.description,
        dueDate: task.dueDate,
      }),
    });
    loadTasks();
  }

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  const isOverdue = (task) =>
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ color: "#333" }}>TaskFlow</h1>

      <p style={{ color: "#666" }}>
        Active: <b>{activeCount}</b> • Completed: <b>{completedCount}</b>
      </p>

      <input
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }}
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ padding: "10px", marginBottom: "10px" }}
      />

      <br />
      <button
        onClick={addTask}
        style={{ padding: "10px 20px", background: "#4CAF50", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", marginBottom: "20px" }}
      >
        + Add Task
      </button>

      <hr />

      <div style={{ marginBottom: "10px" }}>
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              marginRight: "8px",
              padding: "6px 14px",
              background: filter === f ? "#333" : "#eee",
              color: filter === f ? "white" : "#333",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <hr />

      {filtered.length === 0 ? (
        <p style={{ color: "#999" }}>No tasks found 🎉</p>
      ) : (
        filtered.map((task) => (
          <div
            key={task.id}
            style={{
              border: isOverdue(task) ? "2px solid red" : "1px solid #ddd",
              background: isOverdue(task) ? "#fff0f0" : "white",
              padding: "16px",
              marginBottom: "12px",
              borderRadius: "10px",
            }}
          >
            <h3 style={{ margin: "0 0 6px" }}>
              {task.completed ? "✅" : "⬜"} {task.title}
              {isOverdue(task) && (
                <span style={{ color: "red", fontSize: "12px", marginLeft: "8px" }}>
                  Overdue!
                </span>
              )}
            </h3>

            {task.description && <p style={{ color: "#555", margin: "4px 0" }}>{task.description}</p>}

            <p style={{ color: "#888", fontSize: "13px" }}>
              Due: {task.dueDate || "-"}
            </p>

            <button onClick={() => toggleTask(task.id)} style={{ marginRight: "8px", padding: "6px 12px", borderRadius: "6px", border: "1px solid #ccc", cursor: "pointer" }}>
              Toggle
            </button>
            <button onClick={() => editTask(task)} style={{ marginRight: "8px", padding: "6px 12px", borderRadius: "6px", border: "1px solid #ccc", cursor: "pointer" }}>
              Edit
            </button>
            <button onClick={() => deleteTask(task.id)} style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid red", color: "red", cursor: "pointer" }}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;