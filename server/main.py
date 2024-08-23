from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import uvicorn

from function.screenshot import screenshot
from function.webTracker import track_usage
from database.db import get_detail

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TimerState(BaseModel):
    timerRunning: bool

@app.get('/')
async def get_root():
    try:
        res = await get_detail()
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/screenshot')
async def read_screenshot(time: int):
    try:
        screenshot(time)
        return {"message": "Screenshot taken", "time": time}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/timer')
async def update_timer_state(state: TimerState):
    try:
        if state.timerRunning:
            # Run track_usage in the background
            asyncio.create_task(track_usage())
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
