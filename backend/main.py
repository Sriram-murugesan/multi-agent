from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import ChatRequest
from agent import Agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = Agent()

@app.post("/chat")
def chat(req: ChatRequest):
    return agent.chat(req.message)

@app.post("/clear")
def clear():
    agent.clear()
    return {"status": "cleared"}