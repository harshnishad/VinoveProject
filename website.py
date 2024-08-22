import pymongo
from pymongo import MongoClient
import time

# MongoDB connection settings
MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "website_visit_history"
COLLECTION_NAME = "visits"

# Create a MongoDB client
client = MongoClient(MONGO_URI)

# Get a reference to the database and collection
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

def add_visit(url, title, visit_time):
    """Add a new website visit to the database"""
    visit = {
        "url": url,
        "title": title,
        "visit_time": visit_time
    }
    collection.insert_one(visit)

def get_visits():
    """Retrieve all website visits from the database"""
    visits = collection.find()
    return visits

def get_visits_by_url(url):
    """Retrieve website visits for a specific URL"""
    visits = collection.find({"url": url})
    return visits

def get_recent_visits(limit=10):
    """Retrieve the most recent website visits"""
    visits = collection.find().sort("visit_time", -1).limit(limit)
    return visits

while True:
    # Get user input for URL, title, and visit time
    url = input("Enter URL: ")
    title = input("Enter title: ")
    visit_time = input("Enter visit time: ")

    # Add the visit to the database
    add_visit(url, title, visit_time)

    # Print all visits
    print("All visits:")
    for visit in get_visits():
        print(f"URL: {visit['url']}, Title: {visit['title']}, Visit Time: {visit['visit_time']}")

    # Print visits for the entered URL
    print(f"\nVisits for {url}:")
    for visit in get_visits_by_url(url):
        print(f"URL: {visit['url']}, Title: {visit['title']}, Visit Time: {visit['visit_time']}")

    # Print recent visits
    print("\nRecent visits:")
    for visit in get_recent_visits():
        print(f"URL: {visit['url']}, Title: {visit['title']}, Visit Time: {visit['visit_time']}")

    # Wait for 1 second before continuing
    time.sleep(1)

# Close the MongoDB client (not reached due to the while loop)
# client.close()