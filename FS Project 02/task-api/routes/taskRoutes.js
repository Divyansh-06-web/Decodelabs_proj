const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const {
  validateTaskCreate,
  validateTaskUpdate,
  validateIdParam,
} = require("../middleware/validateTask");

// Resources are nouns, methods are verbs -> /tasks, not /getTasks
router.get("/", getAllTasks);
router.get("/:id", validateIdParam, getTaskById);
router.post("/", validateTaskCreate, createTask);
router.put("/:id", validateIdParam, validateTaskUpdate, updateTask);
router.delete("/:id", validateIdParam, deleteTask);

module.exports = router;
