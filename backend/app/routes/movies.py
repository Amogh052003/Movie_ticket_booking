from fastapi import APIRouter, HTTPException
from azure.cosmos.exceptions import CosmosResourceNotFoundError
from app.db.collection import movies_container
router = APIRouter()

@router.get("/movies")
def get_all_movies():
    try:
        query = "SELECT * FROM c"
        movies = list(movies_container.query_items(
            query=query,
            enable_cross_partition_query=True
        ))

        # Optional: Clean out Cosmos metadata
        for movie in movies:
            movie.pop("_rid", None)
            movie.pop("_self", None)
            movie.pop("_etag", None)
            movie.pop("_attachments", None)
            movie.pop("_ts", None)

        return movies
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch movies: {str(e)}")

@router.get("/movies/{movie_id}")
def get_movie(movie_id: str):
    try:
        movie = movies_container.read_item(item=movie_id, partition_key=movie_id)
        return movie
    except CosmosResourceNotFoundError:
        raise HTTPException(status_code=404, detail="Movie not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching movie: {str(e)}")
 