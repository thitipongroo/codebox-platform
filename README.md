# Codebox Platform

A full-stack web platform for managing coding packages and subscriptions for **CodeKidsBox** — a coding education service for kids. It includes a customer-facing storefront with Omise payment integration and a React-based admin dashboard for managing customer records.

---

## Architecture

```text
┌───────────────────────────┐    ┌──────────────────────────┐
│     Customer Browser       │    │      Admin Browser        │
│  /store → /detail → /pay  │    │  React SPA (port 3001)    │
└─────────────┬─────────────┘    └─────────────┬────────────┘
              │ HTTP                            │ HTTP proxy
              ▼                                ▼
┌─────────────────────────────────────────────────────────────┐
│                  Koa.js Server (port 3000)                   │
│                                                             │
│  EJS Server-Rendered Pages        REST API (/api/*)         │
│  ├── GET  /store                  ├── POST /api/auth/signin  │
│  ├── GET  /detail/:id             ├── GET  /api/package/*    │
│  ├── GET  /purchase               └── GET|POST /api/         │
│  ├── POST /payment  (Omise)           customer_detail/*      │
│  └── GET  /thankyou                                         │
│                                                             │
│  Middleware: koa-body, koa-static, koa-ejs, session auth    │
└───────────────────────┬─────────────────────────────────────┘
                        │ MySQL connection pool
                        ▼
            ┌───────────────────────┐
            │      MySQL Database    │
            │  customer_detail       │
            │  package_detail        │
            │  subscription          │
            │  package_plan          │
            │  payment_detail        │
            │  admin_user            │
            └───────────────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │   Omise Payment GW    │
            │  (Thai 3DS charges)   │
            └───────────────────────┘
```

---

## Tech Stack

### Server

| Layer | Technology | Why |
| ----- | ---------- | --- |
| Framework | Koa.js 2.x | Lightweight async middleware chain — cleaner than Express for a small API server; `async/await` native |
| Templating | koa-ejs (EJS) | Server-rendered HTML for the customer storefront; simpler than a full SSR framework for a small page set |
| Database | MySQL 2 (connection pool) | Relational schema fits e-commerce (packages × subscriptions pricing matrix); connection pooling handles concurrent requests |
| Payment | Omise | Thai payment gateway with 3DS support and a simple REST API; zero PCI scope on the server side (card tokenised in the browser) |
| Auth | bcrypt + session | bcrypt for admin password hashing; session-based auth is stateful but avoids JWT refresh token complexity for an internal dashboard |
| Config | dotenv | 12-factor app config — environment variables override code |

### Admin Dashboard

| Layer | Technology | Why |
| ----- | ---------- | --- |
| UI | React 16 + Bootstrap 4 | Fast UI iteration; Bootstrap provides grid and component baseline without a design system budget |
| State | Redux | Predictable state container for the customer/payment data that flows between list, detail, and history views |
| Routing | React Router 4 | Declarative client-side routing; Auth-guarded routes wrap protected components |
| Tables | react-bootstrap-table | Server data rendered in sortable, filterable tables without building a custom grid |

---

## Project Structure

```text
codebox-platform/
├── server/
│   ├── src/
│   │   ├── app.js              # Koa app setup, EJS config, page routes
│   │   ├── config/index.js     # Environment variable loader
│   │   ├── db/index.js         # MySQL connection pool (mysql2)
│   │   ├── middleware/
│   │   │   └── auth.js         # Session auth guard for protected API routes
│   │   ├── repository/
│   │   │   ├── user.js         # Admin user queries
│   │   │   ├── package.js      # Package & subscription queries (API)
│   │   │   ├── packageTb.js    # Package detail queries (app routes)
│   │   │   └── customerManage.js  # Customer insert & payment insert
│   │   ├── routes/
│   │   │   ├── index.js        # Mount app and /api routes
│   │   │   ├── app/            # Server-rendered page routes
│   │   │   │   ├── store.js
│   │   │   │   ├── detail.js
│   │   │   │   └── payment.js
│   │   │   └── api/            # REST API routes
│   │   │       ├── auth.js
│   │   │       ├── packages.js
│   │   │       └── customers.js
│   │   ├── services/
│   │   │   └── auth.js         # bcrypt password verification
│   │   └── views/              # EJS templates
│   ├── .env.example
│   └── package.json
├── admin/
│   └── src/
│       ├── App.js              # Router + auth-guarded routes
│       ├── index.js            # Redux store bootstrap
│       ├── store/
│       │   ├── reducer.js
│       │   └── actions.js
│       └── components/
│           ├── Login.js
│           ├── TableCustomer.js
│           ├── FilterModal.js
│           ├── HistoryPayment.js
│           ├── ViewCustomer.js
│           └── SearchCustomer.js
├── database/
│   └── schema.sql              # Full DDL for all 6 tables
└── README.md
```

---

## System Flow

### Customer Payment Flow

```text
1. Customer visits /store
      → package list rendered by EJS from MySQL (package_detail + package_plan)

2. Clicks a package → /detail/:id
      → subscription options rendered (subscription × package_plan)

3. Fills in details → /purchase?p=PKG_ID&s=SUB_ID
      → plan pricing queried:
         SELECT pp.*, pd.*, s.*
         FROM package_plan pp
         JOIN package_detail pd USING (package_id)
         JOIN subscription s USING (sub_id)
         WHERE sub_id=? AND package_id=?

4. Submits card → POST /payment
      a. Omise tokenises card in-browser (no card data touches the server)
      b. Server creates Omise customer + charge via Omise SDK
      c. On success: INSERT customer_detail + INSERT payment_detail
      d. Redirect to Omise 3DS page

5. After 3DS → Omise redirects to /thankyou?status=success
```

### Admin Dashboard Flow

```text
Admin → /login → POST /api/auth/signin
  → bcrypt.compare(password, hash) → session set
  → redirect to /TableCustomer

/TableCustomer  → GET /api/customer_detail/view/:id (list)
                → FilterModal / SearchCustomer for search

/HistoryPayment/:id  → GET /api/customer_detail/history/:id
/View/:id            → GET /api/customer_detail/view/:id (edit form)
                     → POST /api/customer_detail/transactions
                     → POST /api/customer_detail/cancel
```

---

## Database Schema

Six tables in the `codebox` database:

| Table | Description |
| ----- | ----------- |
| `customer_detail` | Customer records, subscription status, Omise token |
| `package_detail` | Coding course packages with name, picture, and date range |
| `subscription` | Subscription plan types (1M, 3M, 6M, …) |
| `package_plan` | Package × subscription pricing matrix (`plan_value`) |
| `payment_detail` | Payment transaction log (`S` = success, `F` = fail) |
| `admin_user` | Admin dashboard users (bcrypt-hashed passwords) |

See [`database/schema.sql`](database/schema.sql) for the full DDL.

---

## API Reference

Base path: `/api`

| Method | Path | Description |
| ------ | ---- | ----------- |
| `POST` | `/auth/signin` | Admin login — compares bcrypt hash, sets session |
| `GET` | `/package/detail` | List all packages |
| `GET` | `/package/subscription` | List all subscription plans |
| `GET` | `/customer_detail/view/:id` | Get customer record by ID |
| `GET` | `/customer_detail/history/:id` | Get payment history for a customer |
| `POST` | `/customer_detail/transactions` | Insert a new transaction |
| `POST` | `/customer_detail/cancel` | Cancel a subscription |

### Example: Admin sign-in

```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{ "username": "admin", "password": "secret" }'
```

Response:

```json
{ "status": "ok", "userId": 1 }
```

### Example: Get customer detail

```bash
curl http://localhost:3000/api/customer_detail/view/42 \
  -H "Cookie: session=<token>"
```

Response:

```json
{
  "customer_id": 42,
  "first_name": "สมชาย",
  "last_name": "ใจดี",
  "email": "somchai@example.com",
  "package_id": 2,
  "subscription_id": 3,
  "customer_pay_status": "A"
}
```

---

## Setup

### Prerequisites

- Node.js 10+
- MySQL 5.7+

### Database Setup

```bash
mysql -u root -p < database/schema.sql
```

### Server Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=3000
APP_URL=http://localhost:3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=codebox

OMISE_PUBLIC_KEY=pkey_...
OMISE_SECRET_KEY=skey_...
```

```bash
npm run dev     # development (nodemon)
npm start       # production
```

### Admin Dashboard Setup

```bash
cd admin
npm install
npm start       # runs on port 3001, proxies /api/* to port 3000
```

---

## Tradeoffs

| Decision | Alternative | Reasoning |
| -------- | ----------- | --------- |
| EJS server-rendered storefront | Next.js SSR | EJS is simpler for a small, stable page set; Next.js adds build complexity without benefit at this scale |
| Session-based auth for admin | JWT | Sessions are stateful (require server memory or Redis) but simpler to invalidate; JWT needs a refresh token strategy |
| Direct SQL queries in repositories | ORM (Sequelize / TypeORM) | Raw SQL gives full control over query shape and avoids N+1 surprises; acceptable for a small schema |
| Omise card tokenisation in-browser | Server-side card collection | Keeps raw card data off the server entirely; Omise.js handles PCI scope |
| React 16 + Redux for admin | React + Context API | Redux was chosen for predictable state across multiple nested views; Context would be sufficient for this complexity level today |

---

## Scaling Considerations

| Concern | Approach |
| ------- | -------- |
| Session state prevents horizontal scaling | Replace in-memory sessions with Redis session store (`koa-session` + `ioredis`) |
| Admin dashboard read-heavy queries | Add a MySQL read replica; route `SELECT` queries from the admin to the replica |
| Payment processing latency | Move Omise charge creation to a job queue (Bull + Redis) with webhook confirmation instead of synchronous response |
| Static assets on EJS pages | Serve from a CDN (e.g. CloudFront) with cache headers; remove from Koa static middleware in production |
| Database connection limits | Tune the mysql2 pool `connectionLimit`; add ProxySQL in front of MySQL for connection multiplexing |
