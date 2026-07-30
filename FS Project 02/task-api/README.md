# Task API — Project 2: Backend API Development

**DecodeLabs Full Stack Development — Industrial Training Kit (Batch 2026)**

A simple, well-structured backend REST API built with **Node.js** and **Express**, built to satisfy the Project 2 brief: create API endpoints, handle user input/responses, and validate incoming data — the "nervous system" that connects a frontend to server-side logic.

---

## ✨ Features

- **RESTful endpoints** for a `Task` resource — proper nouns-for-resources, verbs-for-methods design (`GET /tasks`, not `GET /getTasks`)
- **Full CRUD**: Create, Read, Update, Delete
- **Input validation middleware** — rejects malformed requests before they touch business logic ("never trust the client")
- **Correct, semantic HTTP status codes** (`200`, `201`, `204`, `400`, `404`, `500`)
- **Centralized error handling** — no unhandled crashes, consistent JSON error shape
- **Layered architecture** — routes → controllers → data layer, so swapping the in-memory store for a real database later (Project 3+) requires no controller changes
- **Automated tests** using Node's built-in test runner

---

## 🗂️ Project Structure

```
task-api/
├── controllers/
│   └── taskController.js    # Business logic for each endpoint
├── data/
│   └── store.js             # In-memory "database" (swap for real DB later)
├── middleware/
│   ├── validateTask.js      # Input validation (the "gatekeeper")
│   └── errorHandler.js      # Central error + 404 handling
├── routes/
│   └── taskRoutes.js        # Route definitions
├── tests/
│   └── tasks.test.js        # Automated endpoint tests
├── app.js                   # Express app setup (middleware, routes)
├── server.js                # Entry point — starts the HTTP server
├── package.json
├── .env.example
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher

### Installation

```bash
# 1. Move into the project folder
cd task-api

# 2. Install dependencies
npm install

# 3. Copy the environment template
cp .env.example .env

# 4. Start the server
npm start
```

You should see:
```
🚀 Task API running on http://localhost:3000
```

For development with auto-restart on file changes:
```bash
npm run dev
```

### Running Tests

```bash
npm test
```

---

## 📡 API Reference

Base URL: `http://localhost:3000/api/tasks`

| Method | Endpoint          | Description                     | Success Status |
|--------|-------------------|----------------------------------|-----------------|
| GET    | `/api/tasks`       | List all tasks                  | `200 OK`        |
| GET    | `/api/tasks/:id`   | Get a single task by ID          | `200 OK`        |
| POST   | `/api/tasks`       | Create a new task                | `201 Created`   |
| PUT    | `/api/tasks/:id`   | Update an existing task          | `200 OK`        |
| DELETE | `/api/tasks/:id`   | Delete a task                    | `204 No Content`|

### GET `/api/tasks`

Optional query filter: `?completed=true` or `?completed=false`

**Response `200`**
```json
{
  "status": "success",
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "Set up project repository",
      "description": "Initialize git and push the starter scaffold",
      "completed": true,
      "createdAt": "2026-07-30T08:00:00.000Z"
    }
  ]
}
```

### GET `/api/tasks/:id`

**Response `200`** — returns the task
**Response `404`** — task not found
**Response `400`** — `:id` is not a valid positive integer

### POST `/api/tasks`

**Request body**
```json
{
  "title": "Write the README",
  "description": "Document setup and API usage"
}
```

| Field         | Type   | Required | Rules                          |
|---------------|--------|----------|----------------------------------|
| `title`       | string | ✅ Yes   | Non-empty, max 120 characters   |
| `description` | string | ❌ No    | Must be a string if provided     |

**Response `201`**
```json
{
  "status": "success",
  "message": "Task created",
  "data": {
    "id": 3,
    "title": "Write the README",
    "description": "Document setup and API usage",
    "completed": false,
    "createdAt": "2026-07-30T08:05:00.000Z"
  }
}
```

**Response `400`** (validation failure)
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": ["title is required and must be a non-empty string"]
}
```

### PUT `/api/tasks/:id`

Accepts any subset of `title`, `description`, `completed`.

**Request body example**
```json
{ "completed": true }
```

**Response `200`** — returns the updated task
**Response `400`** — invalid types or empty body
**Response `404`** — task not found

### DELETE `/api/tasks/:id`

**Response `204`** — no body, task deleted
**Response `404`** — task not found

---

## 🧪 Example: Quick manual test with `curl`

```bash
# Create a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn REST APIs", "description": "Project 2"}'

# List all tasks
curl http://localhost:3000/api/tasks

# Get one task
curl http://localhost:3000/api/tasks/1

# Update a task
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a task
curl -X DELETE http://localhost:3000/api/tasks/1
```

---

## 🧠 Design Notes

- **Validate everything at the door.** Middleware checks the request shape *before* it reaches a controller — malformed or malicious input never touches business logic.
- **Status codes carry meaning.** `201` for creation, `204` for a successful delete with no body, `400` for the client's fault, `404` when a resource doesn't exist, `500` only for genuine server-side failures.
- **Statelessness.** Each request carries everything the server needs — no session state is held between calls, which is what makes this API horizontally scalable later.
- **Separation of concerns.** Routes only wire up URLs to handlers. Controllers hold logic. The data layer is isolated so a real database can be dropped in without touching anything else.

---

## 🔭 Next Steps (Beyond Project 2)

- Replace `data/store.js` with a real database (MongoDB / PostgreSQL)
- Add authentication (`AuthN`) and authorization (`AuthZ`) middleware
- Add rate limiting (`429 Too Many Requests`)
- Add OpenAPI/Swagger documentation
- Containerize with Docker

---

## 📬 Contact

**DecodeLabs**
📞 +91 89330 06408 · ✉️ decodelabs.tech@gmail.com
🌎 www.decodelabs.tech · 📍 Greater Lucknow, India
