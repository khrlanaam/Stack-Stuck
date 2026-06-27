import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/books/${book.id}`)}
      style={{
        width: "180px",
        background: "#111",
        borderRadius: "10px",
        padding: "10px",
        cursor: "pointer",
        transition: "0.3s",
      }}
    >
      <img
        src={
          book.cover_url || "https://via.placeholder.com/180x250?text=No+Cover"
        }
        alt={book.title}
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />

      <h4
        style={{
          marginTop: "10px",
          marginBottom: "5px",
        }}
      >
        {book.title}
      </h4>

      <p
        style={{
          margin: 0,
          opacity: 0.8,
        }}
      >
        {book.author}
      </p>

      {book.category_name && (
        <p
          style={{
            margin: "5px 0 0",
            fontSize: "12px",
            opacity: 0.6,
          }}
        >
          {book.category_name}
        </p>
      )}

      <p
        style={{
          margin: "5px 0 0",
          fontSize: "13px",
          color: book.stock > 0 ? "#00c853" : "#e50914",
        }}
      >
        {book.stock > 0 ? `${book.stock} tersedia` : "Stok Habis"}
      </p>
    </div>
  );
}

export default BookCard;
