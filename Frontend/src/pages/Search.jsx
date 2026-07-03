import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import AppNavbar from "../components/layout/AppNavbar/AppNavbar";
import Footer from "../components/layout/Footer/Footer";
import BookCard from "../components/home/BookCard/BookCard";

import { searchBooks } from "../services/bookService";

function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!keyword.trim()) {
      setBooks([]);
      setSearched(false);
      return;
    }

    const fetchSearch = async () => {
      setLoading(true);
      setSearched(true);

      try {
        const result = await searchBooks(keyword);
        setBooks(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error("Error searching books:", err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [keyword]);

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <AppNavbar />

      <div style={{ padding: "100px 40px" }}>
        <h1>
          {keyword
            ? `Hasil Pencarian: "${keyword}"`
            : "Cari Buku"}
        </h1>

        {/* Keyword kosong */}
        {!keyword.trim() && (
          <p style={{ opacity: 0.6, marginTop: "20px" }}>
            Masukkan kata kunci untuk mencari buku.
          </p>
        )}

        {/* Loading */}
        {loading && (
          <p style={{ opacity: 0.5, marginTop: "20px" }}>
            Mencari buku...
          </p>
        )}

        {/* Hasil kosong */}
        {!loading && searched && keyword.trim() && books.length === 0 && (
          <p style={{ opacity: 0.6, marginTop: "20px" }}>
            Tidak ada buku yang ditemukan.
          </p>
        )}

        {/* Grid hasil */}
        {!loading && books.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Search;
