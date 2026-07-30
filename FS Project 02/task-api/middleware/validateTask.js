/**
 * "Never trust the client."
 * Validates the request body before it ever reaches the controller/database.
 */

function validateTaskCreate(req, res, next) {
  const { title, description } = req.body;
  const errors = [];

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    errors.push("title is required and must be a non-empty string");
  }

  if (title && title.length > 120) {
    errors.push("title must be 120 characters or fewer");
  }

  if (description !== undefined && typeof description !== "string") {
    errors.push("description must be a string");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors,
    });
  }

  next();
}

function validateTaskUpdate(req, res, next) {
  const { title, description, completed } = req.body;
  const errors = [];

  if (title !== undefined && (typeof title !== "string" || title.trim().length === 0)) {
    errors.push("title must be a non-empty string");
  }

  if (description !== undefined && typeof description !== "string") {
    errors.push("description must be a string");
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    errors.push("completed must be a boolean");
  }

  if (Object.keys(req.body).length === 0) {
    errors.push("request body cannot be empty");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors,
    });
  }

  next();
}

function validateIdParam(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      status: "error",
      message: "id must be a positive integer",
    });
  }
  req.taskId = id;
  next();
}

module.exports = { validateTaskCreate, validateTaskUpdate, validateIdParam };
