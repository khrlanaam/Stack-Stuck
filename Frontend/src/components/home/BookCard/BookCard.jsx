function BookCard({ book }) {
  return (
    <div
      style={{
        width: "180px",
        background: "#111",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <img
        src={
          book.cover_url ||
          "https://via.placeholder.com/180x250?text=No+Cover"
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
      >
        <button
          style={{
            flex: 1,
            padding: "8px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>

        <button
          style={{
            flex: 1,
            padding: "8px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookCard;