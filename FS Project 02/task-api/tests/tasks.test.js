const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");
const app = require("../app");

function request(server, method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = http.request(
      {
        port: server.address().port,
        path,
        method,
        headers: {
          "Content-Type": "application/json",
          ...(data ? { "Content-Length": Buffer.byteLength(data) } : {}),
        },
      },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          let parsed = null;
          try {
            parsed = raw ? JSON.parse(raw) : null;
          } catch (e) {
            parsed = raw;
          }
          resolve({ status: res.statusCode, body: parsed });
        });
      }
    );
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

test("Task API", async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());

  await t.test("GET /api/tasks returns seeded tasks with 200", async () => {
    const res = await request(server, "GET", "/api/tasks");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, "success");
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length >= 2);
  });

  await t.test("POST /api/tasks creates a task with 201", async () => {
    const res = await request(server, "POST", "/api/tasks", {
      title: "Write README",
      description: "Document the API",
    });
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.data.title, "Write README");
    assert.strictEqual(res.body.data.completed, false);
  });

  await t.test("POST /api/tasks without title returns 400", async () => {
    const res = await request(server, "POST", "/api/tasks", {
      description: "missing title",
    });
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.status, "error");
  });

  await t.test("GET /api/tasks/:id for missing task returns 404", async () => {
    const res = await request(server, "GET", "/api/tasks/9999");
    assert.strictEqual(res.status, 404);
  });

  await t.test("GET /api/tasks/:id with invalid id returns 400", async () => {
    const res = await request(server, "GET", "/api/tasks/not-a-number");
    assert.strictEqual(res.status, 400);
  });

  await t.test("PUT /api/tasks/:id updates a task", async () => {
    const created = await request(server, "POST", "/api/tasks", {
      title: "Temp task",
    });
    const id = created.body.data.id;

    const res = await request(server, "PUT", `/api/tasks/${id}`, {
      completed: true,
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.data.completed, true);
  });

  await t.test("DELETE /api/tasks/:id removes a task", async () => {
    const created = await request(server, "POST", "/api/tasks", {
      title: "Delete me",
    });
    const id = created.body.data.id;

    const res = await request(server, "DELETE", `/api/tasks/${id}`);
    assert.strictEqual(res.status, 204);

    const check = await request(server, "GET", `/api/tasks/${id}`);
    assert.strictEqual(check.status, 404);
  });

  await t.test("unknown route returns 404", async () => {
    const res = await request(server, "GET", "/api/nonexistent");
    assert.strictEqual(res.status, 404);
  });
});
