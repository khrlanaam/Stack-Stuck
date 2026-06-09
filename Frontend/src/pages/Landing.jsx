import Navbar from "../components/layout/Navbar/Navbar";
import Hero from "../components/landing/Hero/Hero";
import Books from "../components/landing/Books/Books";

function Landing() {
  return (
    <div
      style={{
        background: "#0b0b0f",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <Hero />

      <section style={{ paddingBottom: "60px" }}>
        <Books title="Trending Books" />
        <Books title="New Releases" />
        <Books title="Editor's Picks" />
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "80px 40px",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            marginBottom: "12px",
          }}
        >
          Start Reading Today
        </h2>

        <p
          style={{
            opacity: 0.7,
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Discover thousands of books and build your personal
          reading library.
        </p>
      </section>
    </div>
  );
}

export default Landing;