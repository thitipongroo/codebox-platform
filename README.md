# Codebox Platform

A full-stack web platform for managing coding packages and subscriptions for **CodeKidsBox** — a coding education service for kids. It includes a customer-facing storefront with Omise payment integration and a React-based admin dashboard for managing customer records.

---

## Project Structure

```text
codebox-platform/
├── server/          Koa.js API server + EJS server-rendered pages
├── admin/           React admin dashboard (SPA)
├── database/        MySQL schema
└── README.md
```

---

## Tech Stack

### Server (`server/`)

| Layer | Technology |
| --- | --- |
| Framework | Koa.js 2.x |
| Templating | koa-ejs (EJS) |
| Database | MySQL 2 (connection pool) |
| Payment | Omise (Thai payment gateway) |
| Auth | bcrypt password hashing, session-based |
| Config | dotenv |

### Admin (`admin/`)

| Layer | Technology |
| --- | --- |
| UI | React 16, Bootstrap 4 |
| State | Redux |
| Routing | React Router 4 |
| Tables | react-bootstrap-table |
| UI Kit | Reactstrap, Semantic UI React |

---

## Getting Started

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

# Copy and fill in environment variables
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

Start the server:

```bash
npm run dev     # development (nodemon)
npm start       # production
```

The server runs on [http://localhost:3000](http://localhost:3000).

### Admin Setup

```bash
cd admin
npm install
npm start
```

The admin dashboard runs on [http://localhost:3001](http://localhost:3001) and proxies API calls to the server.

---

## Architecture

```text
Browser (Customer)
  └─► server/ (Koa.js :3000)
        ├── EJS pages   GET /store, /detail/:id, /purchase, /thankyou, ...
        ├── App routes  POST /payment  (Omise charge flow)
        └── REST API    /api/*
              ├── POST  /api/auth/signin
              ├── GET   /api/package/detail
              ├── GET   /api/package/subscription
              ├── GET   /api/customer_detail/view/:id
              ├── GET   /api/customer_detail/history/:id
              ├── POST  /api/customer_detail/transactions
              └── POST  /api/customer_detail/cancel

Browser (Admin)
  └─► admin/ (React SPA :3001)
        ├── /                   Login
        ├── /TableCustomer      Customer transaction list + search filter
        ├── /HistoryPayment/:id Payment history
        └── /View/:id           Customer detail editor
```

### Server Directory Layout

```text
server/src/
├── app.js              Koa app setup and page routes
├── config/index.js     Environment variable loader
├── db/index.js         MySQL connection pool
├── middleware/
│   └── auth.js         Session auth guard for protected API routes
├── repository/
│   ├── user.js         Admin user queries
│   ├── package.js      Package & subscription queries (API)
│   ├── packageTb.js    Package detail queries (app routes)
│   └── customerManage.js  Customer insert & payment insert
├── routes/
│   ├── index.js        Mount app and /api routes
│   ├── app/            Server-rendered page routes
│   │   ├── store.js    GET /store
│   │   ├── detail.js   GET /detail/:id
│   │   └── payment.js  POST /payment
│   └── api/            REST API routes
│       ├── auth.js     POST /auth/signin
│       ├── packages.js GET /package/detail, GET /package/subscription
│       └── customers.js GET|POST /customer_detail/*
├── services/
│   └── auth.js         bcrypt password verification
└── views/              EJS templates
```

### Admin Directory Layout

```text
admin/src/
├── App.js              Router + auth-guarded routes
├── index.js            Redux store bootstrap
├── store/
│   ├── reducer.js      Root reducer
│   └── actions.js      Action creators
├── components/
│   ├── Login.js        Sign-in form
│   ├── TableCustomer.js  Customer list with search filter
│   ├── FilterModal.js  Search/filter modal (used by TableCustomer)
│   ├── HistoryPayment.js  Payment history table
│   ├── ViewCustomer.js   Customer detail editor
│   └── SearchCustomer.js  Name search modal
└── styles/
    └── login.css
```

---

## Database Schema

Six tables in the `codebox` database:

| Table | Description |
| --- | --- |
| `customer_detail` | Customer records & subscription status |
| `package_detail` | Coding course packages |
| `subscription` | Subscription plan types (1M, 3M, 6M, …) |
| `package_plan` | Package × subscription pricing matrix |
| `payment_detail` | Payment transaction log |
| `admin_user` | Admin dashboard users (bcrypt passwords) |

See [`database/schema.sql`](database/schema.sql) for the full DDL.

---

## Payment Flow

1. Customer selects a package and subscription on `/store` → `/detail/:id` → `/purchase`
2. Customer fills in card details on the payment form
3. `POST /payment` tokenises the card via Omise, creates a customer, charges the card
4. On success the customer record and payment log are saved to MySQL, then the browser is redirected to Omise's 3DS page
5. After 3DS, Omise redirects back to `/thankyou?status=success`
