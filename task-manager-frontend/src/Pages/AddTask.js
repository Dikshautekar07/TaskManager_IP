import React, { useState } from "react";
import axios from "axios";
import "./FormStyles.css";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!title || !deadline) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/tasks", {
        title,
        completed: false,
        deadline,
      });
      alert("✅ Task added successfully!");
      navigate("/");
    } catch (err) {
      alert("❌ Error adding task");
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="form-input"
      />
      <button onClick={handleAdd} className="form-button">Add Task</button>
    </div>
  );
};

export default AddTask;
