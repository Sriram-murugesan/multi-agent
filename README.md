# 🚀 Production AI Agent

A sophisticated, full-stack AI agent application built with a FastAPI backend and a React/Vite frontend. This agent leverages the power of Groq's Llama-3.1 model to provide intelligent responses and perform real-world tasks through integrated tools.

## ✨ Features

- **🤖 Intelligent Conversation**: Powered by Groq's Llama-3.1-8b-instant model for fast and accurate responses.
- **🛠️ Tool Integration**: The agent can autonomously decide to use tools to provide better answers:
  - **🔍 Web Search**: Real-time information retrieval using DuckDuckGo.
  - **🧮 Calculator**: Precise mathematical computations.
  - **🌤️ Weather**: Current weather updates for any location.
- **💬 Real-time Chat Interface**: A modern, responsive UI built with React and Tailwind CSS.
- **🧠 Persistent Memory**: Maintains conversation context within a session.
- **🎨 Premium Design**: Features a glassmorphic UI, smooth animations, and a sleek dark-themed aesthetic.

## 🛠️ Tech Stack

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **AI Model**: [Groq](https://groq.com/) (Llama-3.1-8b-instant)
- **Search**: [DuckDuckGo Search](https://pypi.org/project/duckduckgo-search/)
- **Environment Management**: `python-dotenv`

### Frontend
- **Framework**: [React](https://reactjs.org/) (via Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+
- Groq API Key (Get it from [Groq Cloud](https://console.groq.com/))

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file and add your Groq API Key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```
5. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the root directory (where `package.json` is located):
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
├── backend/
│   ├── agent.py          # Core Agent logic & tool handling
│   ├── main.py           # FastAPI endpoints
│   ├── tools.py          # Tool implementations (Search, Calc, etc.)
│   ├── tool_registry.py  # JSON definitions for tools
│   ├── memory.py         # Conversation state management
│   └── .env              # Environment variables
├── frontend/
│   └── src/
│       ├── components/   # UI Components (ChatBox, InputBar, etc.)
│       └── App.jsx       # Main application entry
├── package.json          # Frontend dependencies & scripts
└── tailwind.config.js    # Tailwind CSS configuration
```

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
