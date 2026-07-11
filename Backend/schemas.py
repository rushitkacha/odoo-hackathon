from pydantic import BaseModel, EmailStr


# Used when a user registers
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


# Used when a user logs in
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Response returned to frontend
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True