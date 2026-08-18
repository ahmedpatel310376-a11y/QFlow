# QFlow — AI-Powered Queue & Crowd Management

College hackathon backend for:
- hospitals
- colleges
- banks
- offices
- service centers

## Stack

- Node.js + Express.js
- MongoDB + Mongoose
- Socket.IO for real-time queue/crowd updates
- JWT authentication
- Python + FastAPI AI service
- Firebase Cloud Messaging integration (optional)
- Redis is intentionally not required for version 1

## Start from zero

### 1. Requirements
Install:
- Node.js 18+
- MongoDB 7+ OR Docker Desktop

### 2. Start MongoDB

Easiest with Docker:

```bash
docker compose up -d
```

Or run your local MongoDB service.

### 3. Configure environment

Copy `.env.example` to `.env`.

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

The default values work with local MongoDB.

### 4. Install packages

```powershell
npm install
```

### 5. Build

```powershell
npm run build
```

### 6. Start development server

```powershell
npm run dev
```

Backend:
http://localhost:5000

Health check:
http://localhost:5000/api/health

### 7. Optional demo data

In another terminal:

```powershell
npm run seed
```

The seed creates:
- demo organization
- demo service
- sample tokens

## API

### Auth
POST `/api/auth/register`
POST `/api/auth/login`

### Queues
GET `/api/queues`
POST `/api/queues`
GET `/api/queues/:id`
POST `/api/queues/:id/join`
POST `/api/queues/:id/next`
GET `/api/queues/:id/crowd`

### Tokens
GET `/api/tokens/:id`
POST `/api/tokens/:id/action`

Actions:
- recall
- start
- complete
- skip
- cancel

### Dashboard
GET `/api/dashboard/summary`

### AI
POST `/api/ai/predict-wait`

The Node backend forwards prediction requests to the optional FastAPI service.

## Socket.IO

Connect to:

`http://localhost:5000`

Join a queue room:

```js
socket.emit("queue:join", queueId);
```

The backend emits:
- `queue:updated`
- `crowd:updated`
- `token:updated`

## FastAPI AI service

Open another terminal:

```powershell
cd ai-service
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python main.py
```

AI service:
http://localhost:8000

Swagger:
http://localhost:8000/docs

If the AI service is not running, the main Node backend still works. The wait-time endpoint returns a fallback prediction.

## Firebase

Firebase push notifications are optional. The backend includes a notification service that sends FCM notifications when Firebase credentials are configured.

## Architecture

Client
  |
  v
Express API ---- JWT Auth
  |
  +---- MongoDB
  |
  +---- Socket.IO ----> live queue/crowd updates
  |
  +---- FastAPI AI ----> wait-time prediction
  |
  +---- Firebase FCM -> push notifications

Redis can be added later for high-scale deployments, but it is not required for the hackathon MVP.
