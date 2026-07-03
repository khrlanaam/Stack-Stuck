import styles from "./About.module.css";

const features = [
  {
    emoji: "\uD83D\uDCDA",
    title: "Koleksi Lengkap",
    desc: "Ribuan buku dari berbagai kategori siap menemani perjalanan membacamu.",
  },
  {
    emoji: "\u23F1\uFE0F",
    title: "Peminjaman Mudah",
    desc: "Pinjam buku favorit hanya dalam beberapa klik, tanpa ribet.",
  },
  {
    emoji: "\uD83D\uDD16",
    title: "Akses Kapan Saja",
    desc: "Baca dan kelola koleksi buku di mana pun dan kapan pun kamu mau.",
  },
  {
    emoji: "\uD83D\uDEE1\uFE0F",
    title: "Aman & Terpercaya",
    desc: "Data akun dan aktivitasmu terlindungi dengan sistem yang aman.",
  },
];

function About() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Kenapa Memilih ReadZone?</h2>
          <p>
            Kami hadir untuk membuat pengalaman membaca digitalmu
            lebih nyaman, mudah, dan menyenangkan.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <div className={styles.card} key={i}>
              <span className={styles.iconEmoji}>{f.emoji}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
