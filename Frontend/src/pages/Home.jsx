import { useEffect, useState } from "react";
import AppNavbar from "../components/layout/AppNavbar/AppNavbar";
import Footer from "../components/layout/Footer/Footer";
import BookCard from "../components/home/BookCard/BookCard";
import { getBooks } from "../services/bookService";
import heroImage from "../assets/hero.png";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(
          Array.isArray(data) ? data : []
        );

      } catch (err) {
        console.error(
          "Gagal mengambil buku:",
          err
        );
        setError(
          "Gagal memuat buku. Silakan coba lagi."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div
      style={{
        background:"#000",
        color:"white",
        minHeight:"100vh",
      }}
    >
      <AppNavbar />

      <div
        style={{
          padding:"90px 40px",
        }}
      >

        {/* HERO FEATURED */}
        <section
          style={{
            height: "300px",
            borderRadius: "16px",
            overflow: "hidden",
            position: "relative",

            backgroundImage: `
              linear-gradient(
                to right,
                rgba(0,0,0,0.85),
                rgba(0,0,0,0.35)
              ),
              url(${heroImage})
            `,

            backgroundSize: "cover",
            backgroundPosition: "center",

            display:"flex",
            alignItems:"center",

            padding:"40px",
          }}
        >
        <div>
        <h1
        style={{
        fontSize:"42px",
        marginBottom:"10px"
        }}
        >
        Buku Unggulan
        </h1>

        <p
        style={{
        opacity:0.8,
        fontSize:"18px"
        }}
        >
        Mulailah perjalanan membaca Anda dari sini.
        </p>
        </div>

          {/* IMAGE */}
          <img
            src={heroImage}
            alt="Buku unggulan"
            style={{
              height:"280px",
              objectFit:"contain",
            }}
          />
        </section>

        {/* LOADING */}
        {loading && (
          <p
            style={{
              textAlign:"center",
              marginTop:"40px",
              opacity:0.5,
            }}
          >
            Memuat buku...
          </p>
        )}

        {/* ERROR */}
        {error && (
          <p
            style={{
              textAlign:"center",
              marginTop:"40px",
              color:"#e50914",
            }}
          >
            {error}
          </p>
        )}

        {/* BOOK LIST */}
        {!loading && !error && books.length > 0 && (
          <>

            {/* RECOMMENDED */}
            <section
              style={{
                marginTop:"40px",
              }}
            >
              <h2>
                Merekomendasikan Untuk Kamu
              </h2>

              <div
                style={{
                  display:"flex",
                  gap:"12px",
                  overflowX:"auto",
                  paddingTop:"10px",
                }}
              >
                {books
                  .slice(0,6)
                  .map((book)=>(
                    <BookCard
                      key={book.id}
                      book={book}
                    />
                ))}
              </div>

            </section>

            {/* LIBRARY PREVIEW */}
            <section
              style={{
                marginTop:"40px",
              }}
            >
              <h2>
                Pratinjau Perpustakaan
              </h2>
              <div
                style={{
                  display:"grid",
                  gridTemplateColumns:
                  "repeat(auto-fill,minmax(180px,1fr))",
                  gap:"20px",
                  marginTop:"10px",
                }}
              >
                {books.map((book)=>(
                  <BookCard
                    key={book.id}
                    book={book}
                  />
                ))}

              </div>
            </section>
          </>
        )}

        {!loading &&
        !error &&
        books.length === 0 && (
          <p
            style={{
              textAlign:"center",
              marginTop:"40px",
              opacity:0.5,
            }}
          >
            Belum ada buku tersedia.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}
export default Home;