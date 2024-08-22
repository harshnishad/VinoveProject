from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from function.screenshot import screenshot
#from function.webTracker import track_usage
from database.db import (get_detail)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get('/')
async def get_root():
    res = await get_detail()
    return res

@app.post('/screenshot')
async def readroot(request: Request, time: int):
    print(time)
    screenshot(time)
    return {"message": "Screenshot taken", "time": time}


import uvicorn

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)