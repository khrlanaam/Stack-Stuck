import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../../services/categoryService";

function ManageCategories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  // Ambil semua kategori
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error mengambil kategori:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Tambah kategori
  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Kategori Kosong",
        text: "Nama kategori tidak boleh kosong",
        background: "#181818",
        color: "#fff",
        confirmButtonColor: "#e50914",
      });
      return;
    }

    try {
      await createCategory(newCategory);

      setNewCategory("");

      fetchCategories();

      Swal.fire({
        icon: "success",
        title: "Kategori Berhasil Ditambahkan",
        text: "Kategori baru berhasil disimpan ke database",
        background: "#181818",
        color: "#fff",
        confirmButtonColor: "#e50914",
      });
    } catch (error) {
      console.error("Error tambah kategori:", error);
    }
  };

  // Hapus kategori
  const handleDeleteCategory = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus kategori ini?");

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);

      fetchCategories();

      Swal.fire({
        icon: "success",
        title: "Kategori Berhasil Dihapus",
        text: "Kategori telah berhasil dihapus dari database",
        background: "#181818",
        color: "#fff",
        confirmButtonColor: "#e50914",
      });
    } catch (error) {
      console.error("Error hapus kategori:", error);
    }
  };

  return (
    <div
      style={{
        background: "#111",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Manage Categories</h1>

        <button
          onClick={() => navigate("/admin")}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>

      {/* Form Tambah */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Masukkan nama kategori..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <button
          onClick={handleAddCategory}
          style={{
            background: "green",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add Category
        </button>
      </div>

      {/* Daftar Kategori */}
      <div>
        <h2>Category List</h2>

        {categories.length === 0 ? (
          <p>Belum ada kategori.</p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              style={{
                background: "#222",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{category.name}</span>

              <button
                onClick={() => handleDeleteCategory(category.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageCategories;
