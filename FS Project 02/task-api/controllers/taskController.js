const store = require("../data/store");

/**
 * GET /api/tasks
 * Optional query param: ?completed=true|false
 */
function getAllTasks(req, res) {
  let tasks = store.getAll();

  const { completed } = req.query;
  if (completed !== undefined) {
    const wantCompleted = completed === "true";
    tasks = tasks.filter((task) => task.completed === wantCompleted);
  }

  res.status(200).json({
    status: "success",
    count: tasks.length,
    data: tasks,
  });
}

/**
 * GET /api/tasks/:id
 */
function getTaskById(req, res) {
  const task = store.getById(req.taskId);

  if (!task) {
    return res.status(404).json({
      status: "error",
      message: `Task with id ${req.taskId} not found`,
    });
  }

  res.status(200).json({ status: "success", data: task });
}

/**
 * POST /api/tasks
 */
function createTask(req, res) {
  const newTask = store.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Task created",
    data: newTask,
  });
}

/**
 * PUT /api/tasks/:id
 */
function updateTask(req, res) {
  const updated = store.update(req.taskId, req.body);

  if (!updated) {
    return res.status(404).json({
      status: "error",
      message: `Task with id ${req.taskId} not found`,
    });
  }

  res.status(200).json({
    status: "success",
    message: "Task updated",
    data: updated,
  });
}

/**
 * DELETE /api/tasks/:id
 */
function deleteTask(req, res) {
  const deleted = store.remove(req.taskId);

  if (!deleted) {
    return res.status(404).json({
      status: "error",
      message: `Task with id ${req.taskId} not found`,
    });
  }

  // 204 No Content - successful deletion, nothing to send back
  res.status(204).send();
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
