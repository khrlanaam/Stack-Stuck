import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios"; // Gunakan Axios karena timmu memakainya
import Book from "../Book/Book";
import styles from "./Books.module.css";

function Books({ title }) {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search") || "";

  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setMessage(""); 

      try {
        let url = "http://localhost:3000/api/books";
        if (searchKeyword) {
          url = `http://localhost:3000/api/books/search?search=${encodeURIComponent(searchKeyword)}`;
        }

        // Ambil token JWT dari localStorage (sesuaikan dengan cara timmu menyimpan token)
        const token = localStorage.getItem("token"); 

        // Tembak API menggunakan Axios dengan menyertakan Header Authorization & Kredensial
        const response = await axios.get(url, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", // Mengirim token ke backend
          },
          withCredentials: true, // Diperlukan karena backend app.js menggunakan credentials: true
        });

        // Axios otomatis menyimpan hasil json di properti .data
        const result = response.data;

        if (result && result.data && result.data.length > 0) {
          setBooks(result.data);
        } else {
          setBooks([]);
          setMessage(`Buku dengan kata kunci "${searchKeyword}" tidak tersedia.`);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);

        // Jika backend merespon dengan status 401 (Belum Login / Token Expired)
        if (error.response && error.response.status === 401) {
          setMessage("Sesi Anda telah berakhir. Silakan login kembali untuk melihat buku.");
        } else {
          setMessage(`Buku dengan kata kunci "${searchKeyword}" tidak tersedia.`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchKeyword]); 

  return (
    <div className={styles.rowwrapper}>
      <h2>{searchKeyword ? `Hasil Pencarian: "${searchKeyword}"` : title || "Koleksi Buku"}</h2>

      <div className={styles.row}>
        {loading ? (
          <p style={{ color: "#fff", opacity: 0.7 }}>Sedang mencari buku...</p>
        ) : message ? (
          
          /* ================= KONDISI BUKU TIDAK TERSEDIA / ERROR 401 ================= */
          <div style={{ 
            width: "100%",
            padding: "30px 20px", 
            background: "#111", 
            borderRadius: "12px", 
            border: "1px dashed #444",
            textAlign: "center",
            color: "#ff4d4d",
            fontWeight: "500"
          }}>
            {message}
          </div>
        ) : (
          
          /* ================= KONDISI BUKU TERSEDIA ================= */
          books.map((book) => (
            <Book 
              key={book.id} 
              book={book} 
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Books;