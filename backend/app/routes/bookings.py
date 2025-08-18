from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from uuid import uuid4
from datetime import datetime
from typing import List
from app.db.collection import bookings_container

# Correct, clean prefix — no trailing slash or typo
router = APIRouter(prefix="/bookings", tags=["Bookings"])

class Booking(BaseModel):
    movie_id: int
    user_name: str
    seats: List[str]  # store seat codes like ["S1", "S2"]

@router.post("/")
def book_ticket(booking: Booking):
    booking_id = str(uuid4())
    document = {
        "id": booking_id,
        "movie_id": booking.movie_id,
        "user_name": booking.user_name,
        "seats": booking.seats,
        "timestamp": datetime.utcnow().isoformat()
    }

    try:
        bookings_container.create_item(body=document)
        return {
            "message": "Booking successful",
            "booking_id": booking_id
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Booking failed: {str(e)}"
        )

@router.get("/{movie_id}")
def get_booked_seats(movie_id: int):
    """Return a flat list of booked seats for a movie."""
    try:
        query = f"SELECT b.seats FROM b WHERE b.movie_id = {movie_id}"
        booked_seats = []
        for item in bookings_container.query_items(
            query=query,
            enable_cross_partition_query=True
        ):
            booked_seats.extend(item["seats"])  # flatten seat arrays
        return booked_seats
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching booked seats: {str(e)}"
        )
