from sqlalchemy.orm import Session
import models, schemas

# kitap ekleme
def create_book(db: Session, book: schemas.BookCreate):
    new_book = models.Book(
        title=book.title,
        author=book.author,
        genre=book.genre,
        is_read=book.is_read
    )
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book

# kitapları listeleme
def get_books(db: Session):
    return db.query(models.Book).all()

def get_book_by_id(db: Session, book_id: int):
    return db.query(models.Book).filter(models.Book.id == book_id).first()

#id ye göre kitap silme
def delete_book(db: Session, book_id: int):
    book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if book:
        db.delete(book)
        db.commit()
    return book

#güncelleme
def update_book(db: Session, book_id: int, book_data: schemas.BookUpdate):
    book = db.query(models.Book).filter(models.Book.id == book_id).first()
    
    if not book:
        return None

    book.title = book_data.title
    book.author = book_data.author
    book.genre = book_data.genre
    book.is_read = book_data.is_read

    db.commit()
    db.refresh(book)

    return book