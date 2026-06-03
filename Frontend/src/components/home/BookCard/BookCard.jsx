function BookCard({ book }) {
  return (
    <div
      style={{
        width: "180px",
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

      <h4>{book.title}</h4>

      <p>{book.author}</p>
    </div>
  );
}

export default BookCard;