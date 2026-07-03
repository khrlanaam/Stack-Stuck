import styles from "./WhyReadzone.module.css";

const stats = [
  { value: "1000+", label: "Buku Tersedia", accent: true },
  { value: "500+", label: "Pembaca Aktif", accent: false },
  { value: "20+", label: "Kategori Buku", accent: false },
  { value: "24/7", label: "Akses Online", accent: false },
];

function WhyReadzone() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Platform yang Terus Bertumbuh</h2>
        <p>Setiap hari semakin banyak pembaca yang bergabung.</p>
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((s, i) => (
            <div className={styles.item} key={i}>
              <p className={`${styles.number} ${s.accent ? styles.accent : ""}`}>
                {s.value}
              </p>
              <p className={styles.label}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyReadzone;
