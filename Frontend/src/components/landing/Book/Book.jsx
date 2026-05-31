import styles from "./Book.module.css";

function Book({ book }) {
  return (
    <div className={styles.card}>
      <img src={book.poster} alt={book.title} />
      <h4>{book.title}</h4>
    </div>
  );
}

export default Book;