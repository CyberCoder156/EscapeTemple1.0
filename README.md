# 🗝️ EscapeTemple

### Unlock the Mystery. Solve the Puzzles. Escape the Temple.

EscapeTemple is a browser-based, story-driven virtual escape room game where players explore rooms, solve puzzles, uncover clues, and progress through challenging levels.

The project combines an interactive React frontend with a Node.js backend and a database to deliver a structured escape room experience.

🔗 **GitHub Repository:** [EscapeTemple1.0](https://github.com/CyberCoder156/EscapeTemple1.0)

---

## ✨ Features

- 🏛️ **Interactive Escape Rooms** — Explore virtual rooms and interact with objects.
- 🧩 **Puzzle Solving** — Answer questions and solve challenges to advance.
- 🔐 **Progressive Gameplay** — Complete challenges to unlock further stages.
- 💡 **Questions and Clues** — Discover information that helps solve puzzles.
- 🎮 **Level Selection** — Navigate through available game levels.
- 📚 **Subject Selection** — Access puzzles organized by subject.
- 🎒 **Inventory System** — Interact with the game's inventory interface.
- 📊 **Progress Tracking** — Manage and retrieve game progress through the backend.
- 🗄️ **Database Integration** — Store and retrieve game-related information.
- 🌐 **Full-Stack Architecture** — Separate frontend and backend applications.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript (JSX)
- CSS
- Tailwind CSS

### Backend
- Node.js
- Express.js
- JavaScript
- REST API

### Database
- MySQL

### Development Tools
- Git
- GitHub
- npm
- Visual Studio Code

---

## 📁 Project Structure

```text
EscapeTemple/
│
├── backend/
│   ├── routes/
│   │   ├── levels.js
│   │   ├── progress.js
│   │   ├── questions.js
│   │   ├── roomObjects.js
│   │   └── subjects.js
│   │
│   ├── scripts/
│   │   ├── createDatabase.sql
│   │   ├── createTables.sql
│   │   ├── sampleData.sql
│   │   └── migration_add_question_sessions.sql
│   │
│   ├── validators/
│   │   └── levelValidator.js
│   │
│   ├── .env.example
│   ├── db.js
│   ├── server.js
│   ├── sampleData.js
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── GameRoom.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── QuestionPanel.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── GamePage.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LevelSelection.jsx
│   │   │   └── SubjectSelection.jsx
│   │   │
│   │   ├── config/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

Follow these instructions to run EscapeTemple on your local machine.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [Git](https://git-scm.com/)
- MySQL

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/CyberCoder156/EscapeTemple1.0.git
```

Navigate into the project directory:

```bash
cd EscapeTemple1.0
```

### 2. Install Backend Dependencies

Open a terminal in the project root and run:

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory.

Use the provided `.env.example` as a reference and configure the database credentials and other required variables.

**Important:** Never upload your actual `.env` file or database passwords to GitHub.

### 4. Set Up the Database

Make sure your MySQL server is running.

The backend includes SQL scripts for database initialization and sample data.

Review the scripts in `backend/scripts/` and execute the appropriate files in the required order:

1. `createDatabase.sql`
2. `createTables.sql`
3. `sampleData.sql`

If your database has already been initialized, avoid recreating it unnecessarily.

Configure the database connection in your backend environment variables according to the requirements in `backend/db.js`.

### 5. Start the Backend

From the `backend` directory, start the server using the appropriate script defined in `backend/package.json`.

For example:

```bash
npm start
```

If your project uses a development script instead, use:

```bash
npm run dev
```

The backend is configured to run on:

**http://localhost:5000**

### 6. Install Frontend Dependencies

Open a second terminal from the project root:

```bash
cd frontend
npm install
```

### 7. Configure the Frontend API

Open:

`frontend/src/config/api.js`

Make sure the frontend communicates with the backend at:

`http://localhost:5000`

Use the API URL format expected by the existing configuration. Do not replace working configuration unnecessarily.

### 8. Start the Frontend

From the `frontend` directory, run the development command defined in `frontend/package.json`.

For example:

```bash
npm run dev
```

If your frontend is configured to use port `3000`, open:

**http://localhost:3000**

Keep both the frontend and backend running while playing the game.

---

## 🎮 How to Play

1. Open EscapeTemple in your browser.
2. Explore the available subjects and levels.
3. Enter a game room.
4. Examine the room and its interactive objects.
5. Read the available questions and clues.
6. Solve the puzzles to make progress.
7. Continue through the challenges and work toward escaping the temple.

The exact gameplay sequence depends on the configured levels and puzzles.

---

## 🧑‍💻 Development

EscapeTemple uses a separate frontend and backend.

| Component | Local URL | Purpose |
|---|---|---|
| Frontend | `http://localhost:3000` | User interface and gameplay |
| Backend | `http://localhost:5000` | API and game logic |
| Database | MySQL server | Persistent game data |

### Development Workflow

1. Make frontend changes inside `frontend/src/`.
2. Make backend changes inside `backend/`.
3. Update database scripts when the schema needs to change.
4. Test the application locally.
5. Commit and push your changes to GitHub.

---

## 🔒 Security

- Keep database credentials in environment variables.
- Never commit real passwords, API keys, or secret tokens.
- Validate incoming API requests.
- Restrict database access to authorized applications.
- Configure CORS appropriately when deploying the application.
- Use HTTPS when hosting the application publicly.

---

## 🌍 Deployment

The GitHub repository contains the project's source code.

To make EscapeTemple playable through a public website, the frontend and backend must be deployed to accessible hosting services, and the database must be configured for the deployed backend.

The frontend must also use the deployed backend's API URL rather than `localhost`.

**Note:** Publishing this repository does not automatically deploy the game.

---

## 🔮 Future Enhancements

Potential improvements include:

- Additional escape rooms and storylines.
- More challenging puzzles and riddles.
- Hints and clue systems.
- Timed challenges.
- Achievement and scoring systems.
- Improved animations and sound effects.
- Multiplayer gameplay.
- Expanded progress tracking.

---

## 👥 Contributors

Developed as a full-stack web development project.

Contributions, suggestions, and constructive feedback are welcome.

---

## 📜 License

No license has been specified for this project yet.

Until a license is added, the repository should not be assumed to grant permission for others to redistribute or reuse its code.

---

**EscapeTemple — Every clue matters. Every puzzle counts. Can you escape?** 🗝️
