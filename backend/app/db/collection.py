from .cosmos_client import database

movies_container = database.get_container_client("movies")
showtimes_container = database.get_container_client("showtimes")
bookings_container = database.get_container_client("bookings")
