import os
from azure.cosmos import CosmosClient
from dotenv import load_dotenv

load_dotenv()

COSMOS_DB_URI = os.getenv("COSMOS_DB_URI")
COSMOS_DB_KEY = os.getenv("COSMOS_DB_KEY")
COSMOS_DB_NAME = os.getenv("COSMOS_DB_NAME")
client = CosmosClient(COSMOS_DB_URI, credential=COSMOS_DB_KEY)
database = client.get_database_client(COSMOS_DB_NAME)
