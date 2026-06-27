import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBook } from "react-icons/fa";

import { getBooks, createBook, updateBook, deleteBook } from "../../services/bookService";

import { getCategories } from "../../services/categoryService";

function ManageBooks() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    category_id: "",
    stock: 0,
  });

  const [cover, setCover] = useState(null);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Gagal mengambil buku:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Gagal mengambil kategori:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      title: "",
      author: "",
      description: "",
      category_id: "",
      stock: 0,
    });
    setCover(null);
    setEditingBook(null);
  };

  const handleEditClick = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      description: book.description || "",
      category_id: book.category_id,
      stock: book.stock,
    });
    setCover(null);
    setEditingBook(book);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleSubmit = async () => {
    try {
      if (!form.title || !form.author || !form.category_id) {
        Swal.fire({
          icon: "warning",
          title: "Form Belum Lengkap",
          text: "Title, Author, dan Category wajib diisi",
          background: "#181818",
          color: "#fff",
          confirmButtonColor: "#e50914",
        });

        return;
      }

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("author", form.author);
      formData.append("description", form.description);
      formData.append("category_id", form.category_id);
      formData.append("stock", form.stock);

      if (cover) {
        formData.append("cover", cover);
      }

      if (editingBook) {
        await updateBook(editingBook.id, formData);

        Swal.fire({
          icon: "success",
          title: "Book Updated",
          text: "Buku berhasil diperbarui",
          background: "#181818",
          color: "#fff",
          confirmButtonColor: "#e50914",
        });
      } else {
        await createBook(formData);

        Swal.fire({
          icon: "success",
          title: "Book Added",
          text: "Buku berhasil ditambahkan",
          background: "#181818",
          color: "#fff",
          confirmButtonColor: "#e50914",
        });
      }

      resetForm();
      fetchBooks();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Gagal menyimpan buku");
    }
  };

  const handleDeleteBook = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus buku ini?");

    if (!confirmDelete) return;

    try {
      await deleteBook(id);

      Swal.fire({
        icon: "success",
        title: "Book Deleted",
        text: "Buku berhasil dihapus",
        background: "#181818",
        color: "#fff",
        confirmButtonColor: "#e50914",
      });

      fetchBooks();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Gagal menghapus buku");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        color: "#fff",
        padding: "40px",
      }}
    >
      {/* HEADER */}
      <button
        onClick={() => navigate("/admin")}
        style={{
          background: "#e50914",
          color: "#fff",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "30px",
        }}
      >
        <FaArrowLeft /> Back Dashboard
      </button>

      {/* FORM TAMBAH BUKU */}
      <div
        style={{
          background: "#181818",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          <FaBook /> {editingBook ? "Edit Book" : "Add New Book"}
        </h2>

        <div
          style={{
            display: "grid",
            gap: "15px",
          }}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            style={{
              ...inputStyle,
              minHeight: "100px",
            }}
          />

          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCover(e.target.files[0])}
            style={inputStyle}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleSubmit}
              style={{
                flex: 1,
                background: editingBook ? "#2196f3" : "#00c853",
                color: "#fff",
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {editingBook ? "Update Book" : "Add Book"}
            </button>

            {editingBook && (
              <button
                onClick={handleCancelEdit}
                style={{
                  background: "#555",
                  color: "#fff",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* LIST BUKU */}
      <div
        style={{
          background: "#181818",
          padding: "30px",
          borderRadius: "15px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Book List
        </h2>

        {books.length === 0 ? (
          <p>Belum ada buku.</p>
        ) : (
          books.map((book) => (
            <div
              key={book.id}
              style={{
                background: "#222",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    book.cover_url ||
                    "https://via.placeholder.com/80x100?text=No+Cover"
                  }
                  alt={book.title}
                  style={{
                    width: "80px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                <div>
                  <h3>{book.title}</h3>

                  <p>Author: {book.author}</p>

                  <p>Stock: {book.stock}</p>

                  <p>Category ID: {book.category_id}</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleEditClick(book)}
                  style={{
                    background: "#2196f3",
                    color: "#fff",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteBook(book.id)}
                  style={{
                    background: "#e50914",
                    color: "#fff",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #333",
  background: "#222",
  color: "#fff",
};

export default ManageBooks;
