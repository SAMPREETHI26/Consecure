# 📘 Cyber Threat Intelligence Dashboard
 A ML-powered threat intelligence dashboard with real-time WebSocket updates, full REST API support, user authentication, and a React-based frontend. It allows security analysts to register, log in, analyze cyber threats, and visualize them in real-time.

---
# 🔍 Functionality Overview (HTML Embedded)

This document showcases the core functionalities of the project through embedded video demos.

---

## 1️⃣ Register and Login

<p>
<video width="600" controls>
  <source src="media/register_and_login.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
</p>

---

## 2️⃣ Authentication Protected Routes

<p>
<video width="600" controls>
  <source src="media/authentication_protected.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
</p>

---

## 3️⃣ Categorical Display

<p>
<video width="600" controls>
  <source src="media/categorical_display.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
</p>

---

## 4️⃣ Description-Based Search

<p>
<video width="600" controls>
  <source src="media/description_based_search.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
</p>

---

## 5️⃣ Find by ID

<p>
<video width="600" controls>
  <source src="media/find_by_id.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
</p>

---

## 6️⃣ Live Updates & ML Predictions

<p>
<video width="600" controls>
  <source src="media/liveupdates_and_mlprediction.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
</p>

---

## 7️⃣ Threat Stats

<p>
<video width="600" controls>
  <source src="media/threat_stats.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
</p>

## 📂 Project Structure

```
Consecure/
├── Backend/
│   ├── app/
│   │   ├── __init__.py           # Flask app factory
│   │   ├── models.py             # SQLAlchemy models
│   │   ├── routes.py             # API endpoints
│   ├── setup_db.py               # Initializes PostgreSQL DB
│   ├── ingestion.py              # Loads initial threat data
│   ├── run.py                    # Flask + SocketIO entrypoint
│   ├── socket_server.py          # WebSocket server logic
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.js, components/   # React components
│   ├── package.json
│   ├── Dockerfile
│
├── docker-compose.yml            # Full stack orchestration
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 Using Docker (Recommended)

```bash
docker-compose up --build
```

This command will:

- Spin up a PostgreSQL database
- Set up and seed the backend (`setup_db.py`, `ingestion.py`)
- Start Flask with WebSocket support
- Launch the frontend React app

### 🔸 Manual Setup

```bash
# Backend
cd Backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python setup_db.py
python ingestion.py
python run.py

# Frontend
cd frontend
npm install
npm start
```

---

## 🔐 Authentication

JWT tokens are issued on successful login:

- **Register** → `/api/register`
- **Login** → `/api/login` → returns `access_token`
- Use `Authorization: Bearer <token>` for protected endpoints.

---

## 📡 WebSocket Events

| Event        | Emitted From       | Description                                |
|--------------|--------------------|--------------------------------------------|
| `new_threat` | `/api/analyze`     | Triggered after successful threat analysis |

**Frontend Listener** (React):
```javascript
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000');

socket.on('new_threat', (data) => {
  // Update UI with new threat data
});
```

---

## 🧪 Testing

### Backend (Pytest)

```bash
cd Backend
pytest
```

### Frontend (React Testing Library + Jest)

```bash
cd frontend
npm test
```

Tests include:

- Pagination functionality
- Category filtering
- Search behavior
- Login/Register button triggers

---

## 🔁 REST API Reference

### 🔸 `GET /api/threats`

Fetch paginated and filtered threats.

**Query Params:**

| Param     | Description           |
|-----------|-----------------------|
| `page`    | Page number (int)     |
| `limit`   | Items per page (int)  |
| `category`| Filter by category    |
| `search`  | Search description    |

---

### 🔸 `GET /api/threats/<id>`

Fetch full threat details by ID.

---

### 🔸 `GET /api/threats/stats`

Returns aggregated data:
- Total threats
- Category counts
- Severity counts

---

### 🔸 `POST /api/register`

Registers a new user.

```json
{
  "username": "testuser",
  "password": "testpass"
}
```

---

### 🔸 `POST /api/login`

Logs in a user and returns a token.

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### 🔸 `POST /api/analyze`

Analyzes threat description using ML model.

**Headers:**
`Authorization: Bearer <token>`

```json
{
  "description": "System infected with ransomware"
}
```

**Response:**
```json
{
  "predicted_category": "Ransomware"
}
```

---

## 🐳 Docker Overview

### Backend `Dockerfile`

- Installs dependencies
- Runs `setup_db.py` and `ingestion.py`
- Starts Flask-SocketIO

### Frontend `Dockerfile`

- Uses `node:18-alpine`
- Installs and builds React app

### `docker-compose.yml`

Defines 3 services:

- `backend`
- `frontend`
- `db` (PostgreSQL)

---

## 🧩 Dependencies

### Backend (`requirements.txt`)

- Flask, Flask-JWT-Extended
- Flask-SocketIO
- SQLAlchemy, psycopg2
- scikit-learn, pandas
- eventlet

### Frontend

- React, React DOM, Axios
- socket.io-client
- React Router

---

## 🔐 Environment Variables

| Variable         | Purpose                  |
|------------------|--------------------------|
| `DATABASE_URL`   | PostgreSQL connection URL|
| `JWT_SECRET`     | Secret for JWT encoding  |
| `FLASK_ENV`      | Set to `development`     |

Use `.env` file or bind in docker-compose.

---

##  By

**Sampreethi Y**  
- BTech CSE, PES University  
- [GitHub](https://github.com/SAMPREETHI26)  
- [LinkedIn](https://linkedin.com/in/sampreethi)

---

