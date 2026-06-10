import React, { useEffect, useState } from "react";
import { getBooks } from "../../../services/bookService";
import BookCard from "../BookCard/BookCard"; // Pastikan jalurnya sesuai dengan kartu buku kelompok Anda

function BookList({ selectedCategory }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchBooks = async () => {
    try {
      const result = await getBooks();

      const booksData = result.data || result;

      setBooks(booksData);
      setFilteredBooks(booksData);
    } catch (err) {
      console.error("Gagal mengambil data buku:", err);

      const dummyBooks = [
        {
          id: 1,
          title: "Belajar Node.js",
          author: "Andi",
          category_id: 1,
        },
      ];

      setBooks(dummyBooks);
      setFilteredBooks(dummyBooks);
    } finally {
      setLoading(false);
    }
  };

  fetchBooks();
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
