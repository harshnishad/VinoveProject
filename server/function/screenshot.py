import asyncio
import pyautogui
import datetime
import io
from pymongo import MongoClient
from PIL import Image

# MongoDB connection settings
MONGO_URI = 'mongodb://localhost:27017/'
DATABASE_NAME = 'screenshot_db'
COLLECTION_NAME = 'screenshots'

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]

async def save_screenshot_to_mongodb(image_bytes: io.BytesIO):
    # Prepare the document to be inserted into MongoDB
    document = {
        "timestamp": datetime.datetime.now(),
        "image": image_bytes.getvalue()
    }
    # Insert the document into the MongoDB collection
    result = collection.insert_one(document)
    return result.inserted_id

async def screenshot(interval: int):
    while True:
        now = datetime.datetime.now()
        print(f"Taking screenshot at {now}")
        await asyncio.sleep(interval)
        
        # Take screenshot using pyautogui
        image = pyautogui.screenshot()
        
        # Save the screenshot to an in-memory bytes buffer
        img_bytes = io.BytesIO()
        image.save(img_bytes, format='PNG')
        img_bytes.seek(0)
        
        # Save the screenshot to MongoDB
        screenshot_id = await save_screenshot_to_mongodb(img_bytes)
        print(f"Screenshot saved to MongoDB with ID: {screenshot_id}")

async def main():
    interval = 60  # Screenshot interval in seconds
    await screenshot(interval)

if __name__ == "__main__":
    asyncio.run(main())
