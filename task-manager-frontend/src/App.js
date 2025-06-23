import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import AddTask from "./Pages/AddTask";
import UpdateTask from "./Pages/UpdateTask";
import DeleteTask from "./Pages/DeleteTask";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  return (
    <Router>
      <div className="app-container">
        <h1 className="title">Task Manager</h1>

        <div className="nav-buttons">
          <Link to="/">Home</Link>
          <Link to="/add">Add Task</Link>
          <Link to="/update">Update Task</Link>
          <Link to="/delete">Delete Task</Link>
        </div>

        <Routes>
          <Route path="/" element={
            <ul style={{ listStyle: "none", padding: 0 }}>
              {tasks.map((task) => (
                <li key={task._id} style={{
                  background: "rgba(255,255,255,0.85)",
                  margin: "10px auto",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  width: "300px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                }}>
                  <strong>{task.title}</strong><br />
                  Status: {task.completed ? "✅ Completed" : "❌ Pending"}<br />
                  Deadline: {task.deadline}<br />
                  <span style={{ fontSize: "12px", color: "#555" }}>
                    Task ID: <code>{task._id}</code>
                  </span>
                </li>
              ))}
            </ul>
          } />
          <Route path="/add" element={<AddTask />} />
          <Route path="/update" element={<UpdateTask />} />
          <Route path="/delete" element={<DeleteTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
