import { useEffect, useState } from "react";

import AppNavbar from "../components/layout/AppNavbar/AppNavbar";
import Footer from "../components/layout/Footer/Footer";
import BookCard from "../components/home/BookCard/BookCard";

import { getBooks } from "../services/bookService";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Gagal mengambil buku:", err);
        setError("Gagal memuat buku. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div
      style={{
        background: "#000",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <AppNavbar />

      <div style={{ padding: "90px 40px" }}>
        {/* HERO FEATURED */}
        <section
          style={{
            height: "300px",
            background: "linear-gradient(to right, #1a1a1a, #000)",
            borderRadius: "16px",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 style={{ fontSize: "32px" }}>Buku Unggulan</h1>

          <p style={{ opacity: 0.7 }}>
            Mulailah perjalanan membaca Anda dari sini.
          </p>

          <button
            style={{
              marginTop: "20px",
              padding: "10px 16px",
              width: "fit-content",
              background: "#fff",
              color: "#000",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none",
            }}
          >
            Baca Sekarang
          </button>
        </section>

        {/* LOADING */}
        {loading && (
          <p style={{ textAlign: "center", marginTop: "40px", opacity: 0.5 }}>
            Memuat buku...
          </p>
        )}

        {/* ERROR */}
        {error && (
          <p
            style={{
              textAlign: "center",
              marginTop: "40px",
              color: "#e50914",
            }}
          >
            {error}
          </p>
        )}

        {/* ALL BOOKS */}
        {!loading && !error && books.length > 0 && (
          <>
            {/* RECOMMENDED */}
            <section style={{ marginTop: "40px" }}>
              <h2>Merekomendasikan Untuk Kamu</h2>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  overflowX: "auto",
                  paddingTop: "10px",
                }}
              >
                {books.slice(0, 6).map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </section>

            {/* LIBRARY PREVIEW */}
            <section style={{ marginTop: "40px" }}>
              <h2>Pratinjau Perpustakaan</h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: "20px",
                  marginTop: "10px",
                }}
              >
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </section>
          </>
        )}

        {!loading && !error && books.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "40px", opacity: 0.5 }}>
            Belum ada buku tersedia.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;