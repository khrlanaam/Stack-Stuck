import Book from "../Book/Book";
import styles from "./Books.module.css";
import data from "../../../utils/constant/data";
import { useState } from "react";

function Books() {
  const [books] = useState(data);

  return (
    <div className={styles.rowWrapper}>
      <h2>Trending Books</h2>

      <div className={styles.row}>
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Books;