import React, { useState } from "react";
import axios from "axios";
import "./FormStyles.css";

function DeleteTask() {
  const [taskId, setTaskId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (!taskId || taskId.length !== 24) {
      setMessage("❗ Please enter a valid 24-character Task ID.");
      return;
    }

    try {
      const res = await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      if (res.data.success) {
        setMessage("✅ Task deleted successfully!");
        setTaskId("");
      } else {
        setMessage("❌ Task not found or couldn't be deleted.");
      }
    } catch (err) {
      setMessage("❌ Error deleting task. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Delete Task</h2>
      <input
        type="text"
        placeholder="Enter Task ID (24 chars)"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
        className="form-input"
      />
      <button onClick={handleDelete} className="form-button delete">
        Delete Task
      </button>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
}

export default DeleteTask;
