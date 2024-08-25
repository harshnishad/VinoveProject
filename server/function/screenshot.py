import asyncio
import pyautogui
import datetime
import io
import requests
import json
import base64  # Importing the base64 module
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

# Lambda function URL
LAMBDA_URL = "https://xaaezpqn9b.execute-api.us-east-1.amazonaws.com/prod/upload"

async def save_screenshot_to_mongodb(image_bytes: io.BytesIO):
    # Prepare the document to be inserted into MongoDB
    document = {
        "timestamp": datetime.datetime.now(),
        "image": image_bytes.getvalue()
    }
    # Insert the document into the MongoDB collection
    result = collection.insert_one(document)
    return result.inserted_id

async def invoke_lambda(image_bytes: io.BytesIO):
    # Convert the image to base64
    image_base64 = base64.b64encode(image_bytes.getvalue()).decode('utf-8')
    
    # Prepare the payload for Lambda
    payload = {
        "image_data": image_base64,
        "timestamp": datetime.datetime.now().isoformat()
    }
    
    # Invoke the Lambda function
    response = requests.post(LAMBDA_URL, data=json.dumps(payload))
    
    # Check the response
    if response.status_code == 200:
        print("Image successfully uploaded to S3 via Lambda")
    else:
        print(f"Failed to upload image to S3 via Lambda: {response.text}")

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
        
        # Invoke the Lambda function to upload the image to S3
        await invoke_lambda(img_bytes)

async def main():
    interval = 60  # Screenshot interval in seconds
    await screenshot(interval)

if __name__ == "__main__":
    asyncio.run(main())
