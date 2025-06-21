# Stemmy Coming Soon

This monorepo contains two parts:

1. **Front-end** (root): built with React, Vite, and Tailwind
2. **Back-end** (`/server`): Express server with SQLite for email subscriptions

## Local Development

- In one terminal, start the front-end dev server:
  ```bash
  npm install
  npm run dev
  ```

- In another terminal, start the back-end dev server:
  ```bash
  cd server
  npm install
  npm run dev
  ```

- The front-end will proxy `/api` calls to `http://localhost:3001`.

## Production Build & Run (Monolithic)

This project serves the front-end static build from the back-end.

1. Install dependencies and build front-end:
   ```bash
   npm install
   npm run build
   cd server
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. By default, the server listens on `PORT` environment variable (default `3001`).

## Deploying to Render

1. Create a **Web Service** on Render, pointing to this repository.
2. Set the **Build Command** to:
   ```bash
   npm install && npm run build && cd server && npm install
   ```
3. Set the **Start Command** to:
   ```bash
   npm start
   ```
4. Render will automatically set the `PORT` environment variable.
5. Your front-end and API will be served from a single origin, simplifying CORS. 