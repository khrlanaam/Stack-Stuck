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

      <div
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "12px",
        }}
      ></div>
    </div>
  );
}

export default BookCard;
