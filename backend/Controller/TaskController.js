const mongoose = require("mongoose");
const Task = require("../models/Task");

// GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    const {
      status,
      priority,
      search,
      sort = "-createdAt",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = { user: req.user.id };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [tasks, total] = await Promise.all([
      Task.find(filter).sort(sort).skip(skip).limit(Number(limit)),
      Task.countDocuments(filter),
    ]);

    res.json({
      tasks,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/tasks/stats
exports.getTaskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const byStatus = { todo: 0, "in-progress": 0, done: 0 };
    for (const row of stats) {
      byStatus[row._id] = row.count;
    }

    res.json({
      byStatus,
      total: Object.values(byStatus).reduce((sum, n) => sum + n, 0),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user.id });
    res.status(201).json({ success: true, task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ success: true, task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH /api/tasks/:id/complete
exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status: "done" },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ success: true, task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
