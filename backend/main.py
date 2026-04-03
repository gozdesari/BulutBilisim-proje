from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, get_db
import models, schemas, crud

# Veritabanındaki tabloları oluşturur
Base.metadata.create_all(bind=engine)

# FastAPI uygulamasını başlatır
app = FastAPI()

# Frontend'in backend'e istek atabilmesi için CORS ayarı
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://51.21.182.182:5173",
        "http://51.21.182.182"
        "http://gozde-bulut-kutuphane-frontend-2026.s3-website.eu-north-1.amazonaws.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ana kontrol endpointi
@app.get("/")
def root():
    return {"message": "çalışıyor"}

# Kitap ekleme endpointi
@app.post("/books", response_model=schemas.BookResponse)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    return crud.create_book(db, book)

# Tüm kitapları listeleme endpointi
@app.get("/books", response_model=list[schemas.BookResponse])
def read_books(db: Session = Depends(get_db)):
    return crud.get_books(db)

# ID'si verilen kitabı getirme endpointi
@app.get("/books/{book_id}", response_model=schemas.BookResponse)
def read_book(book_id: int, db: Session = Depends(get_db)):
    book = crud.get_book_by_id(db, book_id)

    if not book:
        raise HTTPException(status_code=404, detail="Kitap bulunamadı")

    return book

# ID'ye göre kitap silme endpointi
@app.delete("/books/{book_id}")
def remove_book(book_id: int, db: Session = Depends(get_db)):
    book = crud.delete_book(db, book_id)

    if not book:
        raise HTTPException(status_code=404, detail="Kitap bulunamadı")

    return {"message": "Kitap silindi"}

# ID'ye göre kitap güncelleme endpointi
@app.put("/books/{book_id}", response_model=schemas.BookResponse)
def update_book(book_id: int, book: schemas.BookUpdate, db: Session = Depends(get_db)):
    updated_book = crud.update_book(db, book_id, book)

    if not updated_book:
        raise HTTPException(status_code=404, detail="Kitap bulunamadı")

    return updated_book