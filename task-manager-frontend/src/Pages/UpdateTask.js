import React, { useState } from "react";
import axios from "axios";
import "./FormStyles.css";

function UpdateTask() {
  const [taskId, setTaskId] = useState("");
  const [updatedData, setUpdatedData] = useState({
    title: "",
    completed: false,
    deadline: "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}`, updatedData);
      alert("✅ Task updated successfully!");
      setTaskId("");
      setUpdatedData({ title: "", completed: false, deadline: "" });
    } catch (error) {
      alert("❌ Failed to update task");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Update Task</h2>
      <form onSubmit={handleUpdate}>
        <input
          className="form-input"
          type="text"
          placeholder="Enter Task ID"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          required
        />
        <input
          className="form-input"
          type="text"
          placeholder="New Title"
          value={updatedData.title}
          onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
        />
        <input
          className="form-input"
          type="date"
          value={updatedData.deadline}
          onChange={(e) => setUpdatedData({ ...updatedData, deadline: e.target.value })}
        />
        <label className="form-checkbox">
          <input
            type="checkbox"
            checked={updatedData.completed}
            onChange={(e) => setUpdatedData({ ...updatedData, completed: e.target.checked })}
          />
          Completed
        </label>
        <button className="form-button" type="submit">Update Task</button>
      </form>
    </div>
  );
}

export default UpdateTask;
