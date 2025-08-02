from app.models import BookingResponse
import uuid

# Simulated storage (in-memory DB)
bookings_db = {
    "movie123": [1, 2, 3]  # already booked seats
}

def book_seats(movie_id: str, seats: list):
    booked = bookings_db.get(movie_id, [])
    if any(seat in booked for seat in seats):
        return None
    bookings_db[movie_id] = booked + seats
    return BookingResponse(
        booking_id=str(uuid.uuid4()),
        movie_id=movie_id,
        seats=seats,
        status="Confirmed"
    )
