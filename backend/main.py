from fastapi import FastAPI
from app.routes import bookings, movies  
from fastapi.middleware.cors import CORSMiddleware
from app.routes import bookings
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movies.router, prefix="/movies", tags=["Movies"])  # ✅ Register movies route
app.include_router(bookings.router, prefix="/bookings")

# Root route
@app.get("/")
def read_root():
    return {"message": "Movie Booking Backend Running"}
