import styles from "./WhyReadzone.module.css";

function WhyReadzone() {
  return (
    <section className={styles.section}>
      <h2>Mengapa Memilih ReadZone?</h2>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Pencarian Buku yang Mudah</h3>
          <p>
            Temukan buku dengan cepat melalui fitur pencarian
            dan kategori yang terorganisir sehingga pengguna
            dapat menemukan referensi yang dibutuhkan dengan lebih efisien.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Peminjaman yang Praktis</h3>
          <p>
            Proses peminjaman buku dilakukan secara digital
            sehingga lebih cepat, mudah, dan dapat diakses
            kapan saja tanpa prosedur yang rumit.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Riwayat dan Pengelolaan Buku</h3>
          <p>
            Pantau riwayat peminjaman, kelola koleksi buku,
            dan akses informasi perpustakaan dalam satu
            platform yang terintegrasi.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyReadzone;