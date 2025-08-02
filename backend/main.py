from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.routes import bookings, movies
import os

app = FastAPI()

origins = [
    "http://localhost:5173",     # Dev frontend
    "https://<your-app-name>.azurewebsites.net"  # Replace with your Azure App Service URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(movies.router, prefix="/movies", tags=["Movies"])
app.include_router(bookings.router, prefix="/bookings", tags=["Bookings"])

# Serve React static frontend from 'frontend/dist' (after build)
app.mount("/static", StaticFiles(directory="frontend/dist/assets"), name="static")

@app.get("/")
def read_root():
    return FileResponse("frontend/dist/index.html")
