import Book from "../Book/Book";
import styles from "./Books.module.css";
import data from "../../utils/constant/data";
import { useState } from "react";

function Books(){
    // const mbooks = data;

    const [books, setBooks] = useState(data);
    //ketika handleClick diproses, data akan disimpan di State
    function handleClick(){
        const book = {
            id: "xyz", title: "Jigsaw",
            year: 2021, type: "Book",
            poster: "https://picsum.photos/200/300"
        };
        // books.push(book);
        //melakukan update dengan spread Operator
        setBooks([...books, book]);
    }
    return(
        <div className={styles.container}>
            <section>
                <h2>
                    Latest Books
                </h2>
                <div className={styles.books__container}>

            {/* looping data */}
                 {books.map((book)=>{
                    return <Book key={book.id} book={book} />
                 })}
                </div>
                <button onClick={handleClick}>Add Book</button>
            </section>

        </div>
    )
}
export default Books