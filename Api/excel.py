import pandas as pd
from pymongo import MongoClient

# Replace this with your MongoDB connection string
mongo_uri = "mongodb+srv://stonecrazehelp:98879887stone@cluster0.uc9geon.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

try:
    # Connect to MongoDB Atlas
    client = MongoClient(mongo_uri)
    db = client['gadget']  # Replace 'your_database_name' with your desired database name
    collection = db['device']  # Replace 'your_collection_name' with your desired collection name

    # Read Excel data
    excel_file = 'device.xlsx'  # Replace with the correct path to your Excel file
    df = pd.read_excel(excel_file)

    # Convert DataFrame to dictionary
    data = df.to_dict(orient='records')

    # Insert data into MongoDB
    collection.insert_many(data)

finally:
    # Close the MongoDB connection
    client.close()