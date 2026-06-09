import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard"; // Pastikan jalurnya sesuai dengan kartu buku kelompok Anda

function BookList({ selectedCategory }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/books")
      .then((res) => {
        setBooks(res.data);
        setFilteredBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data buku:", err);
        // CADANGAN: Jika database lokal kosong/error, pakai data tiruan agar halaman tidak kosong putih
        const dummyBooks = [
          { id: 1, title: "Belajar Node.js", author: "Andi", category_id: 1 },
          { id: 2, title: "Express Guide", author: "Eko", category_id: 1 },
          { id: 3, title: "MySQL Dasar", author: "Rudi", category_id: 2 },
          {
            id: 4,
            title: "Computer Networks",
            author: "Tanenbaum",
            category_id: 3,
          },
        ];
        setBooks(dummyBooks);
        setFilteredBooks(dummyBooks);
        setLoading(false);
      });
  }, []);

  // Logika Filter: Otomatis berjalan setiap kali selectedCategory dari tombol diklik
  useEffect(() => {
    if (selectedCategory === null) {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (book) => book.category_id === selectedCategory,
      );
      setFilteredBooks(filtered);
    }
  }, [selectedCategory, books]);

  return (
    <div style={{ marginTop: "20px" }}>
      {/* PERBAIKAN UTAMA: Indikator loading dibuat manis dan tidak memblokir seluruh halaman */}
      {loading && (
        <p style={{ color: "#fff", opacity: 0.5 }}>Loading books...</p>
      )}

      {!loading && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
