# 🚀 Production AI Agent

A full-stack AI assistant built with a FastAPI backend and a React/Vite frontend. The project is designed for clean GitHub publishing with environment-safe configuration, build-friendly scripts, and CI validation.

## ✨ Features

- **AI chat experience** with Groq Llama-3.1
- **Tool-aware responses** using calculator, web search, and weather lookup
- **React + Tailwind UI** with a polished chat interface
- **FastAPI backend** with safe tool execution and persistent session memory
- **Clean repo structure** with `.gitignore`, `.env.example`, and GitHub Actions CI

## 🧩 Tech Stack

### Backend
- FastAPI
- Groq Python SDK
- DuckDuckGo search
- python-dotenv
- Requests

### Frontend
- React 18
- Vite
- Tailwind CSS

## 🚀 Quickstart

### 1. Backend

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `backend/.env` and set:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Start the backend:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Frontend

From the repository root:

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## 🛠️ Project Layout

```text
production-agent/
├── backend/               # FastAPI backend and AI agent logic
│   ├── agent.py
│   ├── config.py
│   ├── main.py
│   ├── memory.py
│   ├── requirements.txt
│   ├── schemas.py
│   ├── tool_registry.py
│   ├── tools.py
│   ├── .env.example
│   └── .env              # ignored
├── frontend/              # React/Vite frontend UI
│   ├── index.css
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── components/
├── .github/               # GitHub Actions CI
│   └── workflows/ci.yml
├── .gitignore
├── LICENSE
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## ✅ GitHub Ready

- `.gitignore` excludes generated files, virtual environments, and secret env files
- `backend/.env.example` provides a safe template
- `LICENSE` is set to MIT
- GitHub Actions validates frontend build and backend Python compilation

## 🔧 Notes

- Backend will load `backend/.env` directly, even when running from the repository root.
- The frontend uses the browser `fetch` API to call `http://localhost:8000/chat`.
- Keep secrets out of GitHub by never committing `.env`.
