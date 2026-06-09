import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";

import {
  getActiveBorrowings,
  returnBook,
} from "../services/borrowingService";

function MyBorrowings() {
  const [borrowings, setBorrowings] = useState([]);

  const fetchBorrowings = async () => {
    try {
      const result = await getActiveBorrowings();

      setBorrowings(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReturn = async (borrowingId) => {
    try {
      await returnBook({
        borrowing_id: borrowingId,
      });

      alert("Buku berhasil dikembalikan");

      fetchBorrowings();
    } catch (err) {
      console.error(err);

      alert("Gagal mengembalikan buku");
    }
  };

  useEffect(() => {
    fetchBorrowings();
  }, []);

  return (
    <div
      style={{
        background: "#000",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <div
        style={{
          padding: "100px 40px",
        }}
      >
        <h1>My Borrowings</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(300px,1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {borrowings.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#1f1f1f",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>{item.book_title}</h3>

              <p>User: {item.user_name}</p>

              <p>Status: {item.status}</p>

              <p>
                Borrow Date:
                {" "}
                {new Date(item.borrow_date).toLocaleDateString()}
              </p>

              <p>
                Due Date:
                {" "}
                {new Date(item.due_date).toLocaleDateString()}
              </p>

              <button
                onClick={() =>
                  handleReturn(item.id)
                }
                style={{
                  marginTop: "10px",
                  padding: "10px 14px",
                  background: "#ff0000",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Return Book
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MyBorrowings;