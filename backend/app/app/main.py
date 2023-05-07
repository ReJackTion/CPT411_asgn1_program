import time

from fastapi import FastAPI, APIRouter, Request

from typing import List, Optional, Union

from pydantic import AnyHttpUrl, BaseSettings, validator

from fastapi.middleware.cors import CORSMiddleware

import nltk

# download necessary resources for tokenization once only
nltk.download("punkt")


# Define the DFA
class DFA:
    def __init__(self):
        self.states = {
            "q0",
            "q1",
            "q2",
            "q3",
            "q4",
            "q5",
            "q6",
            "q7",
            "q8",
            "q9",
            "q10",
            "q11",
        }
        self.alphabet = {"a", "d", "e", "f", "h", "i", "n", "o", "r", "s", "t"}
        self.transitions = {
            "q0": {
                "a": "q1",
                "d": "q11",
                "e": "q11",
                "f": "q2",
                "h": "q11",
                "i": "q3",
                "n": "q11",
                "o": "q4",
                "r": "q11",
                "s": "q11",
                "t": "q5",
            },
            "q1": {
                "a": "q11",
                "d": "q11",
                "e": "q11",
                "f": "q11",
                "h": "q11",
                "i": "q11",
                "n": "q6",
                "o": "q11",
                "r": "q11",
                "s": "q11",
                "t": "q11",
            },
            "q2": {
                "a": "q11",
                "d": "q11",
                "e": "q11",
                "f": "q11",
                "h": "q11",
                "i": "q11",
                "n": "q11",
                "o": "q7",
                "r": "q11",
                "s": "q11",
                "t": "q11",
            },
            "q3": {
                "a": "q11",
                "d": "q11",
                "e": "q11",
                "f": "q11",
                "h": "q11",
                "i": "q11",
                "n": "q8",
                "o": "q11",
                "r": "q11",
                "s": "q8",
                "t": "q11",
            },
            "q4": {
                "a": "q11",
                "d": "q11",
                "e": "q11",
                "f": "q8",
                "h": "q11",
                "i": "q11",
                "n": "q11",
                "o": "q11",
                "r": "q11",
                "s": "q11",
                "t": "q11",
            },
            "q5": {
                "a": "q11",
                "d": "q11",
                "e": "q11",
                "f": "q11",
                "h": "q9",
                "i": "q11",
                "n": "q11",
                "o": "q8",
                "r": "q11",
                "s": "q11",
                "t": "q11",
            },
            "q6": {
                "a": "q11",
                "d": "q8",
                "e": "q11",
                "f": "q11",
                "h": "q11",
                "i": "q11",
                "n": "q11",
                "o": "q11",
                "r": "q11",
                "s": "q11",
                "t": "q11",
            },
            "q7": {
                "a": "q11",
                "d": "q11",
                "e": "q11",
                "f": "q11",
                "h": "q11",
                "i": "q11",
                "n": "q11",
                "o": "q11",
                "r": "q8",
                "s": "q11",
                "t": "q11",
            },
            "q8": {
                "a": "q11",
                "d": "q11",
                "e": "q11",
                "f": "q11",
                "h": "q11",
                "i": "q11",
                "n": "q11",
                "o": "q11",
                "r": "q11",
                "s": "q11",
                "t": "q11",
            },
            "q9": {
                "a": "q10",
                "d": "q11",
                "e": "q8",
                "f": "q11",
                "h": "q11",
                "i": "q11",
                "n": "q11",
                "o": "q11",
                "r": "q11",
                "s": "q11",
                "t": "q11",
            },
            "q10": {
                "a": "q11",
                "d": "q11",
                "e": "q11",
                "f": "q11",
                "h": "q11",
                "i": "q11",
                "n": "q11",
                "o": "q11",
                "r": "q11",
                "s": "q11",
                "t": "q8",
            },
            "q11": {
                "a": "q11",
                "d": "q11",
                "e": "q11",
                "f": "q11",
                "h": "q11",
                "i": "q11",
                "n": "q11",
                "o": "q11",
                "r": "q11",
                "s": "q11",
                "t": "q11",
            },
        }
        self.start_state = "q0"
        self.accept_states = {"q1", "q6", "q8"}

    def is_accept(self, string):
        current_state = self.start_state
        for c in string:
            if c not in self.alphabet:
                return False
            current_state = self.transitions[current_state][c]
        return current_state in self.accept_states


app = FastAPI(title="DFA Stop Word finder API", openapi_url="/openapi.json")

api_router = APIRouter()


@api_router.get("/", status_code=200)
def root(*, text: str) -> dict:
    """
    Root GET
    """

    dfa = DFA()
    tokens = nltk.word_tokenize(text)

    is_stop_words = []

    for token in tokens:
        is_stop_words.append(dfa.is_accept(token.lower()))

    word_counts = {
        "the": 0,
        "and": 0,
        "a": 0,
        "an": 0,
        "in": 0,
        "of": 0,
        "to": 0,
        "that": 0,
        "is": 0,
        "for": 0,
    }

    for token in tokens:
        if token.lower() in word_counts:
            word_counts[token.lower()] += 1

    return {
        "is_stop_words": is_stop_words,
        "tokens": tokens,
        "occurrence": word_counts,
        "total": sum(is_stop_words),
        "status": any(is_stop_words),
    }


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


app.include_router(api_router)

origins = [
    "http://localhost",
    "http://localhost:8001",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")
