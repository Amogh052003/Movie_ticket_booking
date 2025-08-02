from fastapi import APIRouter, HTTPException

router = APIRouter()

# Dummy movie database
movies = [
    {
        "id": 1,
        "title": "Oppenheimer",
        "poster": "https://image.tmdb.org/t/p/w500/bKzYxSxz6uDwFpHvMZgXlIItKZt.jpg",
        "language": "English",
        "genre": "Drama",
    },
    {
        "id": 2,
        "title": "Barbie",
        "poster": "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
        "language": "English",
        "genre": "Comedy",
    },
    {
        "id": 3,
        "title": "The Dark Knight",
        "poster": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        "language": "English",
        "genre": "Action",
    }
]

@router.get("/movies")
def get_all_movies():
    return movies

@router.get("/{movie_id}")
def get_movie(movie_id: int):
    for movie in movies:
        if movie["id"] == movie_id:
            return movie
    raise HTTPException(status_code=404, detail="Movie not found")
