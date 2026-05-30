import styles from "./Book.module.css";

function Book(props){
    const {book} = props; //digunakan untuk mengirimkan property ke Books.jsx
    return(
         <div className={styles.book}>
                <img className={styles.book__image}
                    src={book.poster} alt={book.title} />
                    <h3 className={styles.book__title}>{book.title}</h3>
                    <p className={styles.book__date}>{book.year}</p>
        </div>
    )
}

export default Book