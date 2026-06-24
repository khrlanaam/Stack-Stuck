import AppNavbar from "../components/layout/AppNavbar/AppNavbar";
import Footer from "../components/layout/Footer/Footer";

function Home() {
  return (
    <div
      style={{
        background: "#000",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <AppNavbar />

      <div style={{ padding: "90px 40px" }}>
        {/* HERO FEATURED */}
        <section
          style={{
            height: "300px",
            background: "linear-gradient(to right, #1a1a1a, #000)",
            borderRadius: "16px",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 style={{ fontSize: "32px" }}>Buku Unggulan</h1>

          <p style={{ opacity: 0.7 }}>
            Mulailah perjalanan membaca Anda dari sini.
          </p>

          <button
            style={{
              marginTop: "20px",
              padding: "10px 16px",
              width: "fit-content",
              background: "#fff",
              color: "#000",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none",
            }}
          >
            Baca Sekarang
          </button>
        </section>

        {/* CONTINUE READING */}
        <section style={{ marginTop: "40px" }}>
          <h2>Lanjutkan Membaca</h2>

          <div
            style={{
              display: "flex",
              gap: "12px",
              overflowX: "auto",
              paddingTop: "10px",
            }}
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                style={{
                  minWidth: "120px",
                  height: "180px",
                  background: "#222",
                  borderRadius: "10px",
                }}
              />
            ))}
          </div>
        </section>

        {/* RECOMMENDED */}
        <section style={{ marginTop: "40px" }}>
          <h2>Merekomendasikan Untuk Kamu</h2>

          <div
            style={{
              display: "flex",
              gap: "12px",
              overflowX: "auto",
              paddingTop: "10px",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                style={{
                  minWidth: "120px",
                  height: "180px",
                  background: "#333",
                  borderRadius: "10px",
                }}
              />
            ))}
          </div>
        </section>

        {/* LIBRARY PREVIEW */}
        <section style={{ marginTop: "40px" }}>
          <h2>pratinjau perpustakaan</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: "12px",
              marginTop: "10px",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                style={{
                  height: "180px",
                  background: "#444",
                  borderRadius: "10px",
                }}
              />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Home;