```markdown
# Leaderboard Application

This project is a Leaderboard application built with React, TypeScript, and Vite for the frontend, and Node.js with Express for the backend.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

### Clone the repository

```sh
git clone https://github.com/your-username/leaderboard-app.git
cd leaderboard-app
```

### Install dependencies

```sh
npm install
```

## Running the Application

### Running the Vite Development Server

The Vite development server runs the frontend of the application.

```sh
npm run dev
```

By default, the Vite server will run on `http://localhost:5173`.

### Running the Node.js Server

The Node.js server handles the backend of the application.

```sh
node server.js
```

By default, the Node.js server will run on `http://localhost:3001`.

## Exposed Ports

- **Frontend (Vite)**: `http://localhost:5173`
- **Backend (Node.js)**: `http://localhost:3001`

## Project Structure

- `src/`: Contains the frontend source code.
- `public/`: Contains static files and the `mockPlayers.json` file used by the backend.
- `server.js`: The main file for the Node.js server.

## Additional Information

- The frontend fetches data from the backend at `http://localhost:3001/players`.
- Ensure both servers are running simultaneously for the application to function correctly.

## Troubleshooting

- **CORS Issues**: Ensure the `cors` middleware is enabled in the Node.js server.
- **500 Internal Server Error**: Check the file path and permissions for `mockPlayers.json`.

## License

This project is licensed under the MIT License.
```
