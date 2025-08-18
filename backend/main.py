from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

from app.routes.movies import router as movies_router
from app.routes.bookings import router as bookings_router
from app.routes.users import router as users_router


# In Docker container, the working directory is /app, so frontend/dist is at /app/frontend/dist
BASE_DIR = Path(__file__).resolve().parent  # backend/ -> /app
FRONTEND_DIST = BASE_DIR / "frontend" / "dist"
FRONTEND_ASSETS = FRONTEND_DIST / "assets"

app = FastAPI()


origins = [
    "http://localhost:5173",  
    "http://localhost:8000",  
    "http://localhost:8080",  
    "https://ticket-booking-app-service-d5djc9ccaxd3ana0.centralindia-01.azurewebsites.net"  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Static Files ---
print(f"🔍 Looking for frontend assets at: {FRONTEND_ASSETS}")
print(f"🔍 Frontend dist exists: {FRONTEND_DIST.exists()}")
if FRONTEND_DIST.exists():
    print(f"🔍 Frontend dist contents: {list(FRONTEND_DIST.iterdir())}")

if FRONTEND_ASSETS.exists():
    app.mount("/assets", StaticFiles(directory=FRONTEND_ASSETS), name="assets")
    print(f"✅ Assets folder mounted successfully")
else:
    print(f"⚠️ Warning: Assets folder not found at {FRONTEND_ASSETS}")

# --- API Routes ---
app.include_router(movies_router)
app.include_router(bookings_router)
app.include_router(users_router, prefix="/users")

# --- Serve React App ---
@app.get("/")
def serve_react_app_root():
    index_file = FRONTEND_DIST / "index.html"
    print(f"🔍 Looking for index.html at: {index_file}")
    print(f"🔍 index.html exists: {index_file.exists()}")
    if index_file.exists():
        return FileResponse(index_file)
    return {"error": f"index.html not found in {FRONTEND_DIST}"}

@app.get("/{full_path:path}")
def serve_react_app(full_path: str):
    # Skip API routes
    if full_path.startswith("api/") or full_path in ["movies", "bookings", "users"]:
        return {"error": "API endpoint not found"}
    
    index_file = FRONTEND_DIST / "index.html"
    print(f"🔍 Looking for index.html at: {index_file}")
    print(f"🔍 index.html exists: {index_file.exists()}")
    if index_file.exists():
        return FileResponse(index_file)
    return {"error": f"index.html not found in {FRONTEND_DIST}"}
