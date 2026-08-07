const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const TaskController = require("../Controller/TaskController");

router.use(auth);

router.get("/", TaskController.getTasks);
router.get("/stats", TaskController.getTaskStats);
router.post("/", TaskController.createTask);
router.patch("/:id/complete", TaskController.completeTask);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

module.exports = router;
