import styles from "./Book.module.css";

function Book({ book }) {
  return (
    <div className={styles.card}>
      <img
        src={book.poster}
        alt={book.title}
      />

      <div className={styles.overlay}>
        <h4>{book.title}</h4>
      </div>
    </div>
  );
}

export default Book;