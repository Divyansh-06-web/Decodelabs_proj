# Full Stack Development — Industrial Training Kit
**DecodeLabs | Batch 2026**

This repository documents the three-project progression of the DecodeLabs Full Stack Development internship track. Each project is a self-contained milestone that must be completed and verified for quality before the next unlocks.

| # | Project | Phase | Focus |
|---|---------|-------|-------|
| 1 | Responsive Frontend Interface | Interface | HTML5, CSS3, vanilla JS |
| 2 | Backend API Development | Integration | REST endpoints, server logic |
| 3 | Database Integration | Persistence | Schema design, CRUD, data storage |

**Golden rule across all three:** build hands-on, not just in theory. Take each project one at a time, experiment beyond the minimum spec, and treat every error (a broken layout, a failed request, a database connection error) as a learning opportunity, not a blocker.

**Qualification criteria (applies to every project):**
- Complete the current project to unlock the next week's projects
- All submissions are verified for quality — not just "does it run," but "is it built correctly"
- Each project is mandatory; none can be skipped

---

## Project 1: Responsive Frontend Interface

**Goal:** Build a responsive frontend interface for a simple web application — the digital entry point of the app.

**Key requirements:**
- Use HTML5, CSS3, and basic JavaScript — **no frameworks**. The mandate is to master fundamentals first.
- Fully responsive layout that adapts across screen sizes (mobile-first: start single-column, expand with `min-width` media queries at 768px/tablet and 1024px/desktop)
- Clean, accessible, user-friendly UI using semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)

**Core techniques:**
- **CSS Grid** for whole-page macro layout; **Flexbox** for micro-components (nav items, button groups, cards)
- `clamp()` for fluid typography
- Semantic markup for accessibility and SEO — proper landmarks give screen readers and search engines a "table of contents" for your page

**Key skills:** Frontend development, responsive design, UI fundamentals

**Workflow:** Discovery (define the problem) → Wireframe (grayscale, mobile-first) → Semantics (HTML structure) → Style (CSS Grid/Flex + palette) → Logic (state & interactivity) → Audit (performance/accessibility check)

---

## Project 2: Backend API Development

**Goal:** Build a simple backend API to handle application logic — the "brain" that processes requests between frontend and server.

**Key requirements:**
- Create API endpoints supporting **GET** and **POST**
- Handle user input and return appropriate responses
- Validate incoming data before processing it

**Core principles:**
- **REST naming:** resources are nouns, methods are verbs. `GET /users` correct, not `GET /getUsers`. `GET /users/{id}/posts` for nested resources.
- **HTTP methods and their semantics:**
  | Method | Purpose | Safe? | Idempotent? |
  |--------|---------|-------|-------------|
  | GET | Retrieval | Yes | Yes |
  | POST | Creation | No | No |
  | PUT | Update/Replace | No | Yes |
  | DELETE | Removal | No | Yes |
- **Never trust the client** — validate every incoming request both syntactically (is the format correct?) and semantically (is the value logically valid?)
- **JSON** as the data exchange format — lightweight, machine-parsable, human-readable
- **Use proper HTTP status codes** so the client never has to guess:
  - `201` Created, `204` No Content
  - `400` Bad Request, `401` Unauthorized, `403` Forbidden, `404` Not Found, `429` Too Many Requests
  - `500` Internal Server Error
- **Resilience patterns:** statelessness (ability to restart cleanly), circuit breakers (isolate failures so one bad service doesn't cascade)
- **Document your API** — undocumented endpoints don't effectively exist to the developers who need to use them

**Key skills:** Backend development, server-side logic, API design, RESTful conventions

---

## Project 3: Database Integration

**Goal:** Connect the backend to a database to store and retrieve data persistently — moving beyond temporary variables to real data longevity.

**Key requirements:**
- Design a simple database schema
- Perform basic CRUD operations (Create, Read, Update, Delete)
- Ensure proper data handling and integrity

**Core concepts:**
- **SQL vs NoSQL:**
  | | SQL (Relational) | NoSQL (Non-Relational) |
  |---|---|---|
  | Structure | Strict, tabular | Flexible, schema-less |
  | Compliance | ACID | Eventually consistent, horizontally scalable |
  | Best for | Complex relationships | Rapidly changing datasets |
  | Examples | PostgreSQL, MySQL | MongoDB |
- **Relationships:** One-to-One (User <-> UserProfile), One-to-Many (Customer -> Orders), Many-to-Many (Students <-> Courses via a junction table)
- **Keys:** Primary Key (unique row identifier) and Foreign Key (points to another table's primary key, maintaining referential integrity)
- **Connecting code to storage:** either native drivers (e.g. `pg` for Postgres — fast, but manual/boilerplate-heavy) or an ORM (Prisma, SQLAlchemy, Mongoose — more productive, adds a small overhead)
- **CRUD <-> REST <-> SQL mapping:**
  | CRUD | HTTP | SQL |
  |------|------|-----|
  | Create | POST | INSERT |
  | Read | GET | SELECT |
  | Update | PUT/PATCH | UPDATE |
  | Delete | DELETE | DELETE |
- **Data integrity at the schema level** — never trust application logic alone:
  - `UNIQUE` — no duplicate values (e.g. emails)
  - `NOT NULL` — required fields
  - `CHECK` — enforce logical conditions (e.g. `age >= 18`)
- **SQL injection prevention** — always use parameterized queries, never raw string concatenation of user input into a query

**Key skills:** Databases, CRUD operations, data storage

### This repo's implementation (Node.js + MongoDB)

The working code for Project 3 lives in this repository:

```
config/db.js       -> MongoDB connection (Mongoose)
models/Item.js      -> Schema with validation (required, unique, min)
routes/items.js      -> CRUD endpoints mapped to REST verbs
server.js           -> App entry point
```

**Setup:**
```bash
npm install
cp .env.example .env    # then edit MONGO_URI if needed
npm run dev              # or: npm start
```

Requires a running MongoDB instance — local (`mongod`) or a MongoDB Atlas connection string in `.env`.

**Endpoints:**
| Action | Method | Route |
|--------|--------|-------|
| Create | POST | `/api/items` |
| Read all | GET | `/api/items` |
| Read one | GET | `/api/items/:id` |
| Update | PUT | `/api/items/:id` |
| Delete | DELETE | `/api/items/:id` |

**Notes:**
- Mongoose queries are parameterized by design, so this implementation is already safe against the raw-concatenation injection pattern — avoid switching to unsanitized `$where` clauses with user input, since that reopens the same risk.
- `runValidators: true` is set on updates so schema constraints (`unique`, `min`, etc.) are enforced on PUT, not just on create.

---

## Overall Progression

```
Project 1 (Skin)         Project 2 (Nerves)          Project 3 (Vault)
Static, responsive   ->  Dynamic, stateless API  ->  Persistent, validated storage
UI/UX + semantics         REST + validation             Schema + CRUD + integrity
```

Each project builds directly on the last: Project 1 gives you something to look at, Project 2 gives it a brain to process requests, Project 3 gives that brain a memory. Completing all three demonstrates the full request lifecycle — from a user's click, through validated server logic, to durable storage and back.

---

## Contact

Phone: +91 89330 06408
Email: decodelabs.tech@gmail.com
Web: www.decodelabs.tech
Location: Greater Lucknow, India
