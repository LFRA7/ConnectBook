# ConnectBook

**ConnectBook** is an application under development, supervised by Ricardo Soares (Blip), built with **React + Node.js**. Its goal is to implement a company Sticker platform to promote relationships between employees in a remote work environment.

---

## Tech Stack

- [Node.js](https://nodejs.org/) — JavaScript runtime for the backend
- [Express](https://expressjs.com/) — Web framework for the REST API
- [React](https://react.dev/) — JavaScript library for building user interfaces
- [Vite](https://vite.dev/) — Frontend build tool and dev server
- [MongoDB](https://www.mongodb.com/) — NoSQL database
- [Mongoose](https://mongoosejs.com/) — MongoDB object modeling (ODM)
- [JWT](https://jwt.io/) — Token-based authentication
- [Multer](https://github.com/expressjs/multer) — File upload handling (sticker images)
- [node-cron](https://github.com/node-cron/node-cron) — Scheduled tasks (daily credit distribution)
- [Bootstrap](https://getbootstrap.com/) — CSS framework for responsive UI
- [React Router](https://reactrouter.com/) — Client-side routing
- [React Toastify](https://fkhadra.github.io/react-toastify/) — Toast notifications

---

## Features

- **Collect Stickers** — Users receive daily credits to open sticker packs
- **Employee Stickers** — Stickers represent real company members
- **Duplicate Management** — Repeated stickers are converted into extra credits based on rarity
- **Pack System** — Acquire stickers through randomized packs
- **Rarity System** — Stickers have different rarities (Common, Rare, Epic, Legendary)
- **Team Focus** — Promotes interaction and familiarity among remote employees
- **Secure Authentication** — Login with JWT to protect user data
- **User Profile** — View collected stickers and available credits
- **Responsive UI** — Intuitive web application with a smooth browser experience

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) running locally or a remote connection string

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ConnectBook.git
   cd ConnectBook
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on the example:
   ```bash
   cp .env.example .env
   ```
   Then update the values in `.env` as needed.

### Running the Application

Start the **backend** server:
```bash
node server.js
```

Start the **frontend** dev server (in a separate terminal):
```bash
npm start
```

The frontend will be available at `http://localhost:5173` and the API at `http://localhost:3000`.

---

## Environment Variables

| Variable      | Description                  | Example                               |
|---------------|------------------------------|---------------------------------------|
| `MONGODB_URI` | MongoDB connection string    | `mongodb://localhost:27017/stickersdb` |

See [.env.example](.env.example) for reference.

---

## Project Structure

```
ConnectBook/
├── Models/
│   └── User.js                        # User mongoose model
├── public/
│   └── stickers/                      # Uploaded sticker images (.png)
├── src/
│   ├── assets/                        # Static images (pack covers, icons)
│   ├── Departments/
│   │   ├── Administration/
│   │   │   ├── customer-services.jsx
│   │   │   ├── facilities-management.jsx
│   │   │   ├── legal.jsx
│   │   │   ├── logistics.jsx
│   │   │   ├── office-management.jsx
│   │   │   └── procurement.jsx
│   │   ├── Financial/
│   │   │   ├── accounting.jsx
│   │   │   ├── auditing.jsx
│   │   │   ├── budgeting.jsx
│   │   │   ├── financial-planning.jsx
│   │   │   ├── investments.jsx
│   │   │   └── taxation.jsx
│   │   ├── HumanResources/
│   │   │   ├── compliance.jsx
│   │   │   ├── employee-engagement.jsx
│   │   │   ├── employee-relations.jsx
│   │   │   ├── payroll.jsx
│   │   │   ├── recruitment.jsx
│   │   │   └── training.jsx
│   │   ├── ITServices/
│   │   │   ├── cloud-services.jsx
│   │   │   ├── cybersecurity.jsx
│   │   │   ├── data-analytics.jsx
│   │   │   ├── development.jsx
│   │   │   ├── networking.jsx
│   │   │   └── support.jsx
│   │   ├── Marketing/
│   │   │   ├── advertising.jsx
│   │   │   ├── branding.jsx
│   │   │   ├── events.jsx
│   │   │   ├── market-research.jsx
│   │   │   ├── seo.jsx
│   │   │   └── social-media.jsx
│   │   ├── administration.jsx         # Administration department page
│   │   ├── financial.jsx              # Financial department page
│   │   ├── human-resources.jsx        # HR department page
│   │   ├── ITServices.jsx             # IT Services department page
│   │   ├── marketing.jsx              # Marketing department page
│   │   └── teams.css                  # Shared teams styling
│   ├── App.jsx                        # Main app component & routing
│   ├── App.css
│   ├── main.jsx                       # React entry point
│   ├── index.css                      # Global styles
│   ├── login.jsx                      # Login page
│   ├── login.css
│   ├── register.jsx                   # Registration page
│   ├── Register.css
│   ├── profile.jsx                    # User profile page
│   ├── profile.css
│   ├── shop.jsx                       # Sticker shop page
│   ├── shop.css
│   ├── departments.jsx                # Departments overview page
│   ├── departments.css
│   ├── access-denied.jsx              # Unauthenticated access page
│   ├── access-denied-authenticated.jsx
│   └── auth.js                        # Auth utilities (token handling)
├── server.js                          # Express API server
├── db.js                              # MongoDB connection setup
├── vite.config.js                     # Vite configuration
├── eslint.config.js                   # ESLint configuration
├── index.html                         # HTML entry point
├── .env.example                       # Environment variables template
├── .gitignore
└── package.json
```
