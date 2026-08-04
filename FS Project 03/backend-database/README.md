Project 3: Database Integration (Node.js + MongoDB)

Setup
```bash
npm install
cp .env.example .env   # then edit MONGO_URI if needed
npm run dev             # or: npm start
```

Requires a running MongoDB instance — local (`mongod`) or a connection string
from MongoDB Atlas pasted into `.env`.

## Structure
- `config/db.js` — handles the connection between the app and MongoDB
- `models/Item.js` — schema definition with constraints (required, unique, min)
- `routes/items.js` — CRUD endpoints mapped to REST verbs
- `server.js` — app entry point

## Endpoints
| Action | Method | Route            |
|--------|--------|-------------------|
| Create | POST   | /api/items        |
| Read all | GET  | /api/items        |
| Read one | GET  | /api/items/:id    |
| Update | PUT    | /api/items/:id    |
| Delete | DELETE | /api/items/:id    |

## Notes
- Mongoose queries are parameterized by design — you're not hand-building
  query strings from user input, so this setup is already safe against the
  injection-style attack shown in your slides. Just don't switch to raw
  `$where` clauses with user input, since that reopens the same risk.
- `runValidators: true` on update ensures your schema constraints (e.g.
  `unique`, `min`) are still enforced on PUT requests, not just on create.
