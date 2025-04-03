from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from RAG_handler import mistral_rag_response
from zephyr_model import zephyr_response
from llama_model import llama_response

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.post("/chat")
async def chat(request: Request):
    body = await request.json()
    query = body["query"]
    mode = body.get("mode", "rag")

    if mode == "zephyr":
        result = zephyr_response(query)
    elif mode == "llama":
        result = llama_response(query)
    else:
        result = mistral_rag_response(query)

    return {"response": result}
