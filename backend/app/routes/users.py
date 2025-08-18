from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

users = []

class User(BaseModel):
    username: str
    email: str

@router.post("/")
def add_user(user: User):
    for existing_user in users:
        if existing_user.email == user.email:
            raise HTTPException(status_code=400, detail="User already exists")
    users.append(user)
    return {"message": "User added successfully", "user": user}

@router.get("/")
def get_users():
    return users
