# OW2 Stadium Randomizer

A full-stack web application for the Overwatch 2 Stadium gamemode randomizer.  
Players can select or be randomly assigned heroes, pick powers, buy items, and track progress through a best-of-7 series with cash management.

---


## Features

- Backend API with FastAPI and Oracle DB for managing heroes, powers, and items.
- Frontend built with React (Vite) to fetch and display heroes.
- Fetch heroes from backend and display in a simple UI.
- Planned features: round progression, power/item logic, cash tracking, deployment.

---

## Getting Started

### Backend Setup

1. Create and activate a Python virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
```
2. Install Dependencies

```bash
pip install -r backend/requirements.txt
```

3. Create a `.env` file in the `backend` directory with your Oracle DB connection details:

```bash
ORACLE_USERNAME=your_username
ORACLE_PASSWORD=your_password
ORACLE_HOST=10.0.0.86
ORACLE_PORT=1521
ORACLE_SERVICE=XEPDB1
```
4. Run the backend:

```bash
cd backend
uvicorn main:app --reload
```
### Frontend Setup

1. Navigate to the frontend folder and install npm packages:

```bash
cd frontend
npm install
npm run dev
```

2. Open your browser at http://localhost:5173 to see the React app.

## Environment Variables

Make sure your `.env` file contains:

```bash
ORACLE_USERNAME=
ORACLE_PASSWORD=
ORACLE_HOST=
ORACLE_PORT=
ORACLE_SERVICE=
```
## Usage
- The backend serves API endpoints like /heroes to fetch hero data.
- The frontend fetches and displays heroes dynamically from the backend.
- You can extend the frontend with components for powers, items, rounds, and cash.

## To Do
- Implement round progression logic.
- Add power and item management.
- Implement cash tracking system.
- Prepare for deployment.