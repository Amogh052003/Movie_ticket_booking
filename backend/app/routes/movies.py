from fastapi import APIRouter, HTTPException

router = APIRouter()

movies = [
  {
    "id": "1",
    "title": "Inception",
    "description": "A mind-bending thriller by Christopher Nolan that blurs the lines between dreams and reality.",
    "poster_url": "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"
  },
  {
    "id": "2",
    "title": "Interstellar",
    "description": "A space odyssey exploring time, gravity, and love across galaxies.",
    "poster_url": "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"
  },
  {
    "id": "3",
    "title": "The Dark Knight",
    "description": "Gotham’s silent guardian battles Joker in a gripping crime drama.",
    "poster_url": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },
  {
    "id": "4",
    "title": "Avatar",
    "description": "A visually stunning epic where humans and Na'vi collide on Pandora.",
    "poster_url": "https://image.tmdb.org/t/p/w500/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg"
  },
  {
    "id": 5,
    "title": "The Matrix",
    "description": "A hacker discovers the world is a simulation in this iconic sci-fi classic.",
    "poster_url": "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
  }
];   

@router.get("/movies")
def get_all_movies():
    return movies

@router.get("/{movie_id}")
def get_movie(movie_id: int):
    for movie in movies:
        if movie["id"] == movie_id:
            return movie
    raise HTTPException(status_code=404, detail="Movie not found")
