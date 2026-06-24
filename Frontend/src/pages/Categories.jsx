import { useState } from "react";

import AppNavbar from "../components/layout/AppNavbar/AppNavbar";
import Footer from "../components/layout/Footer/Footer";

import BookCategory from "../components/home/BookCategory/BookCategory";
import BookList from "../components/home/BookList/BookList";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

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
        <h1>Cari Berdasarkan Kategori</h1>

        <BookCategory
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <BookList
          selectedCategory={selectedCategory}
        />
      </div>

      <Footer />
    </div>
  );
}

export default Categories;