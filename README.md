# 🤖 Production AI Agent

A full-stack AI assistant with a **FastAPI** backend and a **React + Vite** frontend. The agent can answer questions, perform math, search the web, and look up weather — all powered by **Groq Llama-3.1**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.11-blue)
![React](https://img.shields.io/badge/react-18-61DAFB)

---

## ✨ Features

- 💬 **Conversational AI** with session memory (last 20 messages)
- 🧮 **Calculator** — safe AST-based math evaluation (no `eval`)
- 🔍 **Web search** — real-time results via DuckDuckGo
- 🌤️ **Weather** — live conditions via wttr.in
- ⚡ **Typing animation** and polished dark-mode chat UI
- 🛡️ **Secure** — secrets stay in `.env`, never committed

---

## 🧩 Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Backend  | FastAPI, Groq SDK, python-dotenv  |
| AI Model | Llama-3.1-8b-instant (via Groq)   |
| Search   | DuckDuckGo Search                 |
| Frontend | React 18, Vite, Tailwind CSS      |
| CI       | GitHub Actions                    |

---

## 🚀 Quickstart

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/production-agent.git
cd production-agent
```

### 2. Backend setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv .venv

# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up your API key
cp .env.example .env
# Open .env and paste your Groq API key
```

Start the backend:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Open the local Vite URL shown in the terminal (default: `http://localhost:5173`).

---

## 🗂️ Project Layout

```
production-agent/
├── backend/                  # FastAPI backend & AI agent logic
│   ├── main.py               # FastAPI app & endpoints
│   ├── agent.py              # Agent loop with tool-calling
│   ├── memory.py             # Conversation history manager
│   ├── tools.py              # calculator, search, get_weather
│   ├── tool_registry.py      # Tool schema definitions for Groq
│   ├── schemas.py            # Pydantic request schemas
│   ├── config.py             # Env loading & validation
│   ├── requirements.txt      # Python dependencies
│   └── .env.example          # Safe API key template
│
├── frontend/                 # React/Vite frontend
│   ├── index.html
│   ├── index.css             # Tailwind directives
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx           # State, fetch, layout
│       └── components/
│           ├── Navbar.jsx
│           ├── ChatBox.jsx
│           ├── InputBar.jsx
│           └── MessageBubble.jsx
│
├── .github/
│   └── workflows/ci.yml      # GitHub Actions CI
├── .gitignore
├── LICENSE
└── README.md
```

---

## ✅ GitHub Ready

- `.gitignore` excludes `__pycache__`, `node_modules`, `dist`, `.env`, and OS/IDE files
- `backend/.env.example` provides a safe template — your real key is never committed
- `LICENSE` — MIT
- GitHub Actions CI validates both the frontend build and backend Python syntax on every push

---

## 🔧 Notes

- The backend reads `backend/.env` automatically via `python-dotenv`, regardless of where you launch `uvicorn` from.
- The frontend calls `http://localhost:8000/chat` — make sure the backend is running before opening the UI.
- To get a free Groq API key, visit [console.groq.com](https://console.groq.com).
