import styles from "./WhyReadzone.module.css";

function WhyReadzone() {
  return (
    <section className={styles.section}>
      <h2>Why ReadZone?</h2>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Easy Discovery</h3>
          <p>
            Temukan buku favorit berdasarkan kategori dan
            rekomendasi.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Modern Experience</h3>
          <p>
            Tampilan sederhana dan cepat seperti layanan
            streaming modern.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Personal Library</h3>
          <p>
            Kelola daftar bacaan dan riwayat peminjaman dalam
            satu tempat.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyReadzone;