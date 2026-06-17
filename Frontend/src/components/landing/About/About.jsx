import styles from "./About.module.css";

function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>

        <span className={styles.label}>
          TENTANG READZONE
        </span>

        <h2>
          Platform Perpustakaan Digital
        </h2>

        <p className={styles.description}>
          ReadZone adalah platform perpustakaan digital yang dirancang untuk
          membantu pengguna menemukan, menjelajahi, dan mengelola koleksi buku
          secara lebih mudah dalam satu sistem yang terintegrasi.
        
          Dengan antarmuka yang modern dan pengalaman pengguna yang sederhana,
          ReadZone memungkinkan pembaca mengakses berbagai kategori buku,
          menemukan rekomendasi bacaan yang relevan, serta membangun kebiasaan
          membaca yang lebih terorganisir dan efisien.
        </p>

        <div className={styles.cards}>

          <div className={styles.card}>
            <div className={styles.icon}>
              🎯
            </div>

            <h3>Misi</h3>

            <p>
            Membantu pengguna menemukan buku yang sesuai dengan minat mereka,
            mengelola aktivitas membaca secara efektif, serta menciptakan
            pengalaman membaca digital yang praktis dan menyenangkan.
            </p>
            
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>
              👁️
            </div>

            <h3>Visi</h3>

            <p>
              Menjadi salah satu platform digital pilihan bagi masyarakat
              dalam mengakses, mengelola, dan menikmati berbagai koleksi
              buku serta sumber pembelajaran secara online.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;