from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class Booking(BaseModel):
    movie_id: int
    user_name: str
    seats: int

bookings = []  # Temporary in-memory list

@router.post("/")
def book_ticket(booking: Booking):
    bookings.append(booking)
    return {"message": "Booking successful", "booking": booking}
