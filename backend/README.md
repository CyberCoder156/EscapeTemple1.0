# 🏛️ EscapeTemple - Backend REST API Guide

Welcome to the backend documentation for **EscapeTemple**. This backend is built using **Node.js**, **Express.js**, and **MySQL**, designed to be simple, beginner-friendly, secure, and easy to explain during a college project presentation or viva.

---

## 📁 Directory Structure

The backend is completely decoupled and resides in its own `backend/` directory, keeping the frontend completely untouched:

```text
backend/
├── server.js               <-- Main Express application entry point & CORS configuration
├── db.js                   <-- MySQL connection pool configuration (reusable connections)
├── .env                    <-- Environment variables (port, database credentials)
├── .env.example            <-- Safe template for environment variables
├── .gitignore              <-- Prevents .env and node_modules from being tracked
├── package.json            <-- Node.js dependencies (express, mysql2, dotenv, cors)
├── routes/
│   ├── subjects.js         <-- API for academic subjects & levels hierarchy
│   ├── levels.js           <-- API for level details, questions, and room objects
│   ├── questions.js        <-- API for question retrieval & secret answer validation
│   ├── roomObjects.js      <-- Standalone room objects endpoints
│   └── progress.js         <-- API for player inventory, level start, & exit validation
└── scripts/
    ├── createDatabase.sql  <-- Creates the 'escapetemple' database safely
    ├── createTables.sql    <-- Creates the 9 relational InnoDB tables
    └── sampleData.sql      <-- Seeds initial subjects, items, levels, objects, & questions
```

---

## ⚙️ Technologies Used

1. **Node.js**: The JavaScript runtime environment executing our backend code.
2. **Express.js**: A minimalist web framework providing routing and HTTP request handling.
3. **MySQL (MySQL 8.0)**: The relational database managing subjects, levels, objects, and game progress.
4. **mysql2**: High-performance MySQL driver with Promise and connection pooling support.
5. **cors**: Middleware allowing our React frontend (`http://localhost:3000`) to communicate with the backend (`http://localhost:5000`).
6. **dotenv**: Loads configuration from `.env` so database passwords are never hardcoded.

---

## 🚀 How to Run on Windows (Step-by-Step)

### Step 1: Start the MySQL Service
On Windows, check if the MySQL service (`MySQL80`) is running:
1. Press `Win + R`, type `services.msc`, and press **Enter**.
2. Scroll down to find **MySQL80**.
3. If its status is not "Running", right-click it and select **Start**.
*(Alternatively, open PowerShell as Administrator and run: `net start MySQL80`)*

### Step 2: Run the SQL Scripts in MySQL Workbench or Terminal
You can run the three SQL scripts in order using **MySQL Workbench** or the command prompt:

#### Option A: Using MySQL Workbench
1. Open **MySQL Workbench**.
2. Connect to your local MySQL connection (`localhost:3306`).
3. Click **File > Open SQL Script...** and open:
   - `backend/scripts/createDatabase.sql` (Click the ⚡ lightning bolt icon to execute)
   - `backend/scripts/createTables.sql` (Click ⚡ to execute)
   - `backend/scripts/sampleData.sql` (Click ⚡ to execute)

#### Option B: Using Command Prompt
```cmd
cd C:\Users\ARCHI\OneDrive\Desktop\EscapeTemple\backend\scripts
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p < createDatabase.sql
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p < createTables.sql
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p < sampleData.sql
```

### Step 3: Configure `.env`
Open `backend/.env` in Visual Studio Code and verify your MySQL password:
```env
PORT=5000
FRONTEND_ORIGIN=http://localhost:3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_actual_mysql_password
DB_NAME=escapetemple
```

### Step 4: Install Dependencies & Start the Backend
Open a terminal in the `backend` directory:
```powershell
cd c:\Users\ARCHI\OneDrive\Desktop\EscapeTemple\backend
npm install
npm start
```

The terminal will display:
```text
=========================================
🏛️  EscapeTemple Backend running on port 5000
🌐  Accepting requests from: http://localhost:3000
📡  Health check: http://localhost:5000/api/health
=========================================
```

---

## 📡 Complete REST API Endpoints

### 1. Health Check
* **`GET /api/health`**
  - Response:
    ```json
    {
      "status": "online",
      "message": "EscapeTemple Backend API is running successfully",
      "database": {
        "connected": true,
        "message": "MySQL pool is ready"
      }
    }
    ```

---

### 2. Subjects & Levels
* **`GET /api/subjects`**
  - Returns all subjects (Mathematics, Computer Science, Physics, Chemistry, General Knowledge).
* **`GET /api/subjects/:subjectId`**
  - Returns single subject details.
* **`GET /api/subjects/:subjectId/levels`**
  - Returns levels for a subject (supports scaling to 100 levels).
* **`GET /api/levels/:levelId`**
  - Returns level details (name, difficulty, room background).

---

### 3. Questions & Answer Submission
* **`GET /api/levels/:levelId/questions`**
  - Returns questions for a level.
  - **Security Rule**: The `correct_answer` field is never sent to the browser!
* **`POST /api/questions/:questionId/answer`**
  - Checks a submitted answer on the backend using parameterized SQL queries.
  - Request:
    ```json
    {
      "answer": "10",
      "playerId": "demo-player"
    }
    ```
  - Correct Response:
    ```json
    {
      "correct": true,
      "points": 10,
      "message": "Correct! The ancient mechanism hums to life."
    }
    ```
  - Incorrect Response:
    ```json
    {
      "correct": false,
      "message": "That answer is incorrect. Examine the chamber clues and try again."
    }
    ```

---

### 4. Room Objects & Interaction
* **`GET /api/levels/:levelId/objects`**
  - Returns interactive objects with positions and animation types.
  - Keeps secret hidden items private until discovered.
* **`POST /api/levels/:levelId/objects/:objectId/interact`**
  - Validates interaction on the server. Checks if required keys exist in player inventory, unlocks chests, and prevents duplicate item collections.
  - Request:
    ```json
    {
      "playerId": "demo-player"
    }
    ```
  - Response when item discovered:
    ```json
    {
      "success": true,
      "objectId": 1,
      "objectName": "Patterned Floor Rug",
      "animation": "lift",
      "message": "Success! You discovered: Golden Key! Added to your inventory.",
      "itemDiscovered": {
        "id": 1,
        "name": "Golden Key",
        "type": "key"
      }
    }
    ```

---

### 5. Player Inventory, Progress & Level Escape
* **`GET /api/players/:playerId/inventory`**
  - Returns all items currently collected by the player.
* **`GET /api/players/:playerId/progress`**
  - Returns player progress across levels and subjects.
* **`POST /api/players/:playerId/levels/:levelId/start`**
  - Validates that previous level was completed before unlocking higher levels.
* **`POST /api/players/:playerId/levels/:levelId/complete`**
  - **Server-Side Verification**: Verifies all required level tasks (e.g. key collected, question solved) before marking the level complete and unlocking the next chamber.

---

## 🎓 College Viva & Interview Guide

If asked during a project presentation:
1. **Why MySQL and not MongoDB?**  
   EscapeTemple has structured relational dependencies: a *Subject* has many *Levels*, each *Level* has *Objects* and *Questions*, and players collect relational *Inventory* and *Requirements*. MySQL provides strict foreign keys (`ON DELETE CASCADE`) and transactional consistency.
2. **Why use a Connection Pool (`mysql2.createPool`)?**  
   Opening a new connection per HTTP request is slow and exhausts system sockets. A connection pool keeps 10 connections alive in memory and reuses them instantly.
3. **How is security handled?**  
   - All SQL queries use `?` parameterized placeholders to prevent SQL Injection.
   - The correct answer is never sent in question APIs.
   - Level completion cannot be forged: the backend verifies database records before marking completion.
