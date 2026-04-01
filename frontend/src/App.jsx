import "./App.css";
import { useEffect, useState } from "react";

function App() {
  // Backend'den gelen kitap listesini tutar
  const [books, setBooks] = useState([]);

  // Form inputlarını tutar
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [isRead, setIsRead] = useState(false);
  const [showForm, setShowForm] = useState(false);


  // Hata mesajını tutar
  const [error, setError] = useState("");

  // Backend'den tüm kitapları çekmek için kullanılır
  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/books");

      if (!response.ok) {
        throw new Error("Kitaplar alınamadı.");
      }

      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.error("Kitapları çekme hatası:", err);
      setError("Kitaplar yüklenemedi.");
    }
  };

  // Sayfa ilk açıldığında kitapları getirir
  useEffect(() => {
    fetchBooks();
  }, []);

  // Form gönderildiğinde yeni kitap ekler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          author: author,
          genre: genre,
          is_read: isRead
        })
      });

      if (!response.ok) {
        throw new Error("Kitap eklenemedi.");
      }

      // Formu temizler
      setTitle("");
      setAuthor("");
      setGenre("");
      setIsRead(false);

      // Listeyi yeniden çeker
      fetchBooks();
    } catch (err) {
      console.error("Kitap ekleme hatası:", err);
      setError("Kitap eklenirken hata oluştu.");
    }
  };

  // Bir kitabı id'sine göre siler
  const handleDelete = async (bookId) => {
    setError("");

    try {
      const response = await fetch(`http://127.0.0.1:8000/books/${bookId}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Kitap silinemedi.");
      }

      // Listeyi yeniden çeker
      fetchBooks();
    } catch (err) {
      console.error("Kitap silme hatası:", err);
      setError("Kitap silinirken hata oluştu.");
    }
  };

  // Bir kitabın okundu/okunmadı durumunu değiştirir
  const handleToggleRead = async (book) => {
    setError("");

    try {
      const response = await fetch(`http://127.0.0.1:8000/books/${book.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          genre: book.genre,
          is_read: !book.is_read
        })
      });

      if (!response.ok) {
        throw new Error("Kitap durumu güncellenemedi.");
      }

      // Listeyi yeniden çeker
      fetchBooks();
    } catch (err) {
      console.error("Kitap güncelleme hatası:", err);
      setError("Kitap durumu güncellenirken hata oluştu.");
    }
  };

return (
  <>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 30px" }}>
      <h1 className="header">Kişisel Kütüphane</h1>

      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Kapat" : "Yeni Kitap Ekle"}
      </button>
    </div>

    <div className="container">

      {/* SOL TARAF → KİTAPLAR */}
      <div className="left">

        {/* BUTON */}
       

        {/* FORM SADECE AÇILINCA GÖRÜNÜR */}
        {showForm && (
          <div className="card">
            <h2>Yeni Kitap</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Kitap adı"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <br /><br />

              <input
                type="text"
                placeholder="Yazar"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />

              <br /><br />

              <input
                type="text"
                placeholder="Tür"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />

              <br /><br />

              <label>
                <input
                  type="checkbox"
                  checked={isRead}
                  onChange={(e) => setIsRead(e.target.checked)}
                />
                Okundu
              </label>

              <br /><br />

              <button className="add-btn" type="submit">
                Kaydet
              </button>
            </form>
          </div>
        )}

        {/* KİTAP LİSTESİ */}
        {books.length === 0 ? (
          <p>Henüz kitap yok.</p>
        ) : (
          books.map((book) => (
            <div className="card" key={book.id}>
              <strong>{book.title}</strong>
              <p>{book.author} - {book.genre}</p>
              <p>{book.is_read ? "Okundu" : "Okunmadı"}</p>

              <button
                className="toggle-btn"
                onClick={() => handleToggleRead(book)}
              >
                {book.is_read ? "Okunmadı Yap" : "Okundu Yap"}
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(book.id)}
                style={{ marginLeft: "10px" }}
              >
                Sil
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  </>
);
}

export default App;