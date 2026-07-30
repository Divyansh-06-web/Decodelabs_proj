/**
 * In-memory "database".
 * Swap this module out for a real DB (MongoDB, Postgres, etc.) in Project 3
 * without touching any controller logic — that's the point of this layer.
 */

let tasks = [
  {
    id: 1,
    title: "Set up project repository",
    description: "Initialize git and push the starter scaffold",
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Design the API contract",
    description: "Define routes, request/response shapes, and status codes",
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

let nextId = 3;

const getAll = () => tasks;

const getById = (id) => tasks.find((task) => task.id === id);

const create = (data) => {
  const newTask = {
    id: nextId++,
    title: data.title,
    description: data.description || "",
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return newTask;
};

const update = (id, data) => {
  const task = getById(id);
  if (!task) return null;
  Object.assign(task, data);
  return task;
};

const remove = (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};

module.exports = { getAll, getById, create, update, remove };
