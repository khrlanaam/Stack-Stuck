import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById } from "../services/bookService";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await getBookById(id);

      setBook(response);
    } catch (err) {
      console.error(err);
    }
  };

  if (!book) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#111",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "22px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        padding: "40px",
      }}
    >
      {/* Tombol kembali */}
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "#e50914",
          color: "#fff",
          border: "none",
          padding: "12px 22px",
          borderRadius: "10px",
          cursor: "pointer",
          marginBottom: "35px",
          fontWeight: "bold",
          fontSize: "15px",
        }}
      >
        ← Kembali
      </button>

      {/* Card Detail */}
      <div
        style={{
          background: "#181818",
          borderRadius: "18px",
          padding: "35px",
          display: "flex",
          gap: "40px",
          alignItems: "flex-start",
          boxShadow: "0 0 20px rgba(0,0,0,.4)",
        }}
      >
        {/* Cover */}
        <img
          src={
            book.cover_url
              ? book.cover_url
              : "https://via.placeholder.com/280x420?text=No+Cover"
          }
          alt={book.title}
          style={{
            width: "280px",
            height: "420px",
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />

        {/* Detail */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              marginTop: 0,
              fontSize: "42px",
              marginBottom: "35px",
            }}
          >
            {book.title}
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "170px auto",
              rowGap: "18px",
              fontSize: "18px",
            }}
          >
            <strong>Penulis</strong>
            <span>{book.author}</span>

            <strong>Kategori</strong>
            <span>{book.category_name}</span>

            <strong>Stok</strong>
            <span>{book.stock} Buku</span>

            <strong>Deskripsi</strong>

            <span
              style={{
                color: "#ccc",
                lineHeight: "30px",
              }}
            >
              {book.description}
            </span>
          </div>

          <button
            style={{
              marginTop: "40px",
              background: "#e50914",
              color: "#fff",
              border: "none",
              padding: "15px 35px",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "17px",
              fontWeight: "bold",
            }}
          >
            📚 Pinjam Buku
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
