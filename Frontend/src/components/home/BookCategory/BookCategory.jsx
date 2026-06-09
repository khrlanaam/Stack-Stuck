import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./BookCategory.module.css";

function BookCategory({ selectedCategory, onSelectCategory }) {
  // Isi data awal langsung agar tombol tidak gaib saat loading internet tersendat
  const [categories, setCategories] = useState([
    { id: 1, name: "Programming" },
    { id: 2, name: "Database" },
    { id: 3, name: "Networking" },
    { id: 13, name: "Teknologi" },
    { id: 15, name: "Novel" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/categories")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setCategories(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data kategori dari backend:", err);
        setLoading(false);
      });
  }, []);

  // Inline style cadangan untuk menjamin tombol terlihat di background gelap
  const containerStyle = {
    display: "flex",
    gap: "12px",
    overflowX: "auto",
    padding: "15px 0",
    marginBottom: "25px",
  };

  const buttonStyle = (isActive) => ({
    padding: "10px 20px",
    borderRadius: "25px",
    border: isActive ? "1px solid #fff" : "1px solid #444",
    backgroundColor: isActive ? "#fff" : "#222",
    color: isActive ? "#000" : "#fff",
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontWeight: isActive ? "bold" : "normal",
    fontSize: "14px",
  });

  return (
    <div className={styles.categoryContainer || ""} style={containerStyle}>
      {/* Tombol All Books */}
      <button
        className={`${styles.categoryButton || ""} ${selectedCategory === null ? styles.activeCategory || "" : ""}`}
        style={buttonStyle(selectedCategory === null)}
        onClick={() => onSelectCategory(null)}
      >
        All Books
      </button>

      {/* Looping tombol kategori */}
      {categories.map((category) => {
        const isActive = selectedCategory === category.id;
        return (
          <button
            key={category.id}
            className={`${styles.categoryButton || ""} ${isActive ? styles.activeCategory || "" : ""}`}
            style={buttonStyle(isActive)}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}

export default BookCategory;
