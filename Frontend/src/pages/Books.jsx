import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

import AppNavbar from "../components/layout/AppNavbar/AppNavbar";
import Footer from "../components/layout/Footer/Footer";

import { getBooks, searchBooks } from "../services/bookService";
import { borrowBook } from "../services/borrowingService";

function Books() {
  const [books, setBooks] = useState([]);
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search") || "";

  const fetchBooks = async () => {
    try {
      const result = searchKeyword
        ? await searchBooks(searchKeyword)
        : await getBooks();

      setBooks(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Error Fetch Books:", err);
    }
  };

  const handleBorrow = async (bookId) => {
    const confirmBorrow = await Swal.fire({
      title: "Ajukan Peminjaman?",
      text: "Permintaan akan dikirim ke admin untuk disetujui.",
      icon: "question",
      background: "#161616",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#e50914",
      cancelButtonColor: "#444",
      confirmButtonText: "Ya, Ajukan",
      cancelButtonText: "Batal",
    });

    if (!confirmBorrow.isConfirmed) {
      return;
    }

    try {
      const result = await borrowBook(bookId);

      await Swal.fire({
        title: "Berhasil!",
        text:
          result.message ||
          "Permintaan peminjaman berhasil dikirim dan menunggu persetujuan admin",
        icon: "success",
        background: "#161616",
        color: "#fff",
        confirmButtonColor: "#e50914",
      });

      fetchBooks();

    } catch (err) {
      console.error(err);

      Swal.fire({
        title: "Gagal!",
        text:
          err.response?.data?.message ||
          "Gagal mengirim permintaan peminjaman",
        icon: "error",
        background: "#161616",
        color: "#fff",
        confirmButtonColor: "#e50914",
      });
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchKeyword]);

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <AppNavbar />

      <div
        style={{
          padding: "100px 40px",
        }}
      >
        <h1>{searchKeyword ? `Hasil Pencarian: "${searchKeyword}"` : "Books"}</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {books.map((book) => (
            <div
              key={book.id}
              style={{
                background: "#1f1f1f",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>{book.title}</h3>

              <p>Author: {book.author}</p>

              <p>Stock: {book.stock}</p>

              <button
                onClick={() => handleBorrow(book.id)}
                disabled={book.stock <= 0}
                style={{
                  marginTop: "10px",
                  padding: "10px 14px",
                  background:
                    book.stock <= 0
                      ? "#555"
                      : "#e50914",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor:
                    book.stock <= 0
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {book.stock <= 0
                  ? "Stok Habis"
                  : "Ajukan Peminjaman"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Books;
