from pydantic import BaseModel
from typing import List

class BookingRequest(BaseModel):
    movie_id: str
    seats: List[int]

class BookingResponse(BaseModel):
    booking_id: str
    movie_id: str
    seats: List[int]
    status: str
