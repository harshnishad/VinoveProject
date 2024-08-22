import psutil
from datetime import datetime, timedelta
import asyncio
import pygetwindow as gw
from motor import motor_asyncio

client = motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017/")
db = client["usage"]
collection = db["usage"]

async def get_active_window_title():
    try:
        return gw.getActiveWindow().title
    except Exception:
        return "Unknown"

async def track_usage():
    current_app = None
    start_time = None

    while True:
        try:
            active_app = await get_active_window_title()
            
            if active_app != current_app:
                if current_app is not None:
                    end_time = datetime.now()
                    duration = end_time - start_time
                    document = {
                        "app_name": current_app,
                        "start_time": start_time.strftime("%Y-%m-%d %H:%M:%S"),
                        "end_time": end_time.strftime("%Y-%m-%d %H:%M:%S"),
                        "duration": str(duration)
                    }
                    await collection.insert_one(document)
                
                current_app = active_app
                start_time = datetime.now()
            
            await asyncio.sleep(1)
        except KeyboardInterrupt:
            if current_app is not None:
                end_time = datetime.now()
                duration = end_time - start_time
                document = {
                    "app_name": current_app,
                    "start_time": start_time.strftime("%Y-%m-%d %H:%M:%S"),
                    "end_time": end_time.strftime("%Y-%m-%d %H:%M:%S"),
                    "duration": str(duration)
                }
                await collection.insert_one(document)
            break
        except Exception as e:
            print(f"An error occurred: {e}")
            break

# Run the track_usage function
async def main():
    await track_usage()

asyncio.run(main())