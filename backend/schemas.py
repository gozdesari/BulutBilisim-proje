from pydantic import BaseModel
from typing import Optional

# API'ye gelen veri (request)
class BookCreate(BaseModel):
    title: str
    author: str
    genre: Optional[str] = None
    is_read: Optional[bool] = False

# API'den dönen veri (response)
class BookResponse(BaseModel):
    id: int
    title: str
    author: str
    genre: Optional[str]
    is_read: bool

    class Config:
        from_attributes = True

#güncellemede kullanılacak veri
class BookUpdate(BaseModel):
    title: str
    author: str
    genre: Optional[str] = None
    is_read: bool