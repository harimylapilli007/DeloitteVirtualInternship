const mongoose = require("mongoose");
const Task = require("../models/Task");

const MONGO_URI =
  "mongodb+srv://harimylapilli007_db_user:JmQmuoXxxWoOl1qk@cluster0.3d6nv5c.mongodb.net/";

// Fixed demo user id — replace with a real User _id once auth is wired up.
// Override with: USER_ID=<objectId> npm run seed:tasks
const SEED_USER_ID =
  process.env.USER_ID || "64b0f2c8e1a2b3c4d5e6f701";

const daysFromNow = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const tasks = [
  {
    title: "Set up project repo",
    description: "Initialize git, add README, and push the starter code.",
    status: "done",
    priority: "high",
    dueDate: daysFromNow(-7),
  },
  {
    title: "Design task API",
    description: "Define CRUD endpoints, query filters, and response shape.",
    status: "done",
    priority: "high",
    dueDate: daysFromNow(-3),
  },
  {
    title: "Implement TaskController",
    description: "Add get, create, update, and delete handlers with ownership checks.",
    status: "in-progress",
    priority: "high",
    dueDate: daysFromNow(1),
  },
  {
    title: "Add pagination to task list",
    description: "Support page and limit query params in getTasks.",
    status: "in-progress",
    priority: "medium",
    dueDate: daysFromNow(2),
  },
  {
    title: "Write seed script",
    description: "Seed sample tasks covering all status and priority values.",
    status: "todo",
    priority: "medium",
    dueDate: daysFromNow(3),
  },
  {
    title: "Filter tasks by status",
    description: "Verify ?status=todo|in-progress|done works as expected.",
    status: "todo",
    priority: "medium",
    dueDate: daysFromNow(4),
  },
  {
    title: "Filter tasks by priority",
    description: "Verify ?priority=low|medium|high works as expected.",
    status: "todo",
    priority: "low",
    dueDate: daysFromNow(5),
  },
  {
    title: "Add due-date reminders",
    description: "Optional feature: notify users when a task is due soon.",
    status: "todo",
    priority: "low",
    dueDate: daysFromNow(14),
  },
  {
    title: "Refactor error handling",
    description: "Centralize API error responses for task routes.",
    status: "todo",
    priority: "medium",
    dueDate: daysFromNow(7),
  },
  {
    title: "Document task endpoints",
    description: "Write short usage notes for GET/POST/PATCH/DELETE /api/tasks.",
    status: "in-progress",
    priority: "low",
    dueDate: daysFromNow(6),
  },
];

async function seed() {
  try {
    if (!mongoose.Types.ObjectId.isValid(SEED_USER_ID)) {
      throw new Error(`Invalid USER_ID: ${SEED_USER_ID}`);
    }

    const userId = new mongoose.Types.ObjectId(SEED_USER_ID);

    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await Task.deleteMany({ user: userId });
    console.log(`Cleared existing tasks for user ${userId}`);

    const payload = tasks.map((task) => ({ ...task, user: userId }));
    const created = await Task.insertMany(payload);
    console.log(`Seeded ${created.length} tasks for user ${userId}`);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
