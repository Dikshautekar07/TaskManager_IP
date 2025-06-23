const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Mongodb Connection
mongoose.connect("mongodb://127.0.0.1:27017/tasks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ MongoDB Error:", err));

// Mongoose Model
const Task = mongoose.model("Task", {
  title: String,
  completed: Boolean,
  deadline: String,
});

// Get All Tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add New Task
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

// Update Task by ID
app.put("/tasks/:id", async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true });
});

// Delete Task by ID
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
// Seed demo tasks
app.get("/seed", async (req, res) => {
  const demoTasks = [
    {
      title: "Complete Assignment",
      completed: false,
      deadline: "2025-06-25",
    },
    {
      title: "Project PPT",
      completed: true,
      deadline: "2025-06-20",
    },
    {
      title: "Submit Report",
      completed: false,
      deadline: "2025-06-30",
    },
  ];

  try {
    await Task.insertMany(demoTasks);
    res.send("✅ Demo tasks inserted!");
  } catch (err) {
    res.status(500).send("❌ Error inserting tasks: " + err);
  }
});
