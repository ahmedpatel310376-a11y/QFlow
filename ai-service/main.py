from fastapi import FastAPI
from pydantic import BaseModel
from math import ceil

app = FastAPI(title="QFlow AI Service", version="1.0.0")


class WaitRequest(BaseModel):
    queueLength: int = 0
    activeCounters: int = 1
    averageServiceMinutes: float = 5
    crowdLevel: float = 0


@app.get("/")
def root():
    return {
        "service": "QFlow AI Service",
        "status": "running"
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
def predict(data: WaitRequest):
    counters = max(1, data.activeCounters)

    # Simple baseline prediction for the hackathon MVP.
    base = (data.queueLength * data.averageServiceMinutes) / counters

    # Slight crowd adjustment.
    crowd_factor = 1 + max(0, min(data.crowdLevel, 100)) / 500

    predicted = max(0, ceil(base * crowd_factor))

    return {
        "predicted_wait_minutes": predicted,
        "confidence": 0.80,
        "source": "qflow-ai-baseline"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
