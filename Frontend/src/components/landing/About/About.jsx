import { FaUserCircle } from "react-icons/fa";
import styles from "./About.module.css";

const photoModules = import.meta.glob("../../../assets/team/*.jpg", {
  eager: true,
});

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

const team = [
  {
    name: "ABIYAN ABDULROHMAN",
    role: "Category Feature Developer",
    desc: "Mengembangkan fitur Category Management untuk pengelolaan kategori buku.",
    photoFile: "Abiyan Abdulrohman.jpg",
  },
  {
    name: "MUHAMMAD RAISA QISTI RAIHAN",
    role: "Book Search Developer",
    desc: "Mengembangkan fitur Pencarian Buku sehingga pengguna dapat mencari buku berdasarkan judul maupun penulis.",
    photoFile: "Muhammad Raisa Qisti Raihan.jpg",
  },
  {
    name: "MUHAMMAD KHOIRUL ANAM",
    role: "Authentication Developer",
    desc: "Mengembangkan fitur Login menggunakan JWT Authentication.",
    photoFile: "Muhammad Khoirul Anam.jpg",
  },
  {
    name: "FERDY PRATAMA",
    role: "Borrowing System Developer",
    desc: "Mengembangkan fitur Peminjaman Buku dan pengelolaan status peminjaman.",
    photoFile: "Ferdy Pratama.jpg",
  },
  {
    name: "MUHAMMAD THORIQ AL FATH",
    role: "Book Management Developer",
    desc: "Mengembangkan fitur CRUD Buku serta manajemen data buku.",
    photoFile: "Muhammad Thoriq Al Fath.jpg",
  },
];

function getPhotoUrl(photoFile) {
  if (!photoFile) return null;
  const key = Object.keys(photoModules).find((k) => k.includes(photoFile));
  return key ? photoModules[key].default : null;
}

function About() {
  return (
    <>
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

      <section className={styles.section} id="about">
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>Tim Pengembang</h2>
            <p>
              Dikembangkan oleh lima mahasiswa dengan semangat kolaborasi
              dan ketertarikan pada pengembangan aplikasi web modern.
            </p>
          </div>

          <div className={styles.teamGrid}>
            {team.slice(0, 3).map((member, i) => {
              const photoUrl = getPhotoUrl(member.photoFile);
              return (
                <div className={styles.teamCard} key={i}>
                  <div className={styles.teamPhotoWrap}>
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={member.name}
                        className={styles.teamPhoto}
                      />
                    ) : (
                      <div className={styles.teamPhotoPlaceholder}>
                        <FaUserCircle />
                      </div>
                    )}
                  </div>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                  <p className={styles.teamDesc}>{member.desc}</p>
                </div>
              );
            })}
          </div>

          <div className={styles.teamGridCenter}>
            {team.slice(3).map((member, i) => {
              const photoUrl = getPhotoUrl(member.photoFile);
              return (
                <div className={styles.teamCard} key={i}>
                  <div className={styles.teamPhotoWrap}>
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={member.name}
                        className={styles.teamPhoto}
                      />
                    ) : (
                      <div className={styles.teamPhotoPlaceholder}>
                        <FaUserCircle />
                      </div>
                    )}
                  </div>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                  <p className={styles.teamDesc}>{member.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.section} id="about-info">
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>Tentang ReadZone</h2>
            <p>
              ReadZone merupakan aplikasi perpustakaan digital yang
              dikembangkan sebagai proyek mata kuliah Fullstack Developer.
              Kami menyediakan platform modern untuk mengelola koleksi buku,
              meminjam, dan mencari buku secara mudah dan intuitif.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
