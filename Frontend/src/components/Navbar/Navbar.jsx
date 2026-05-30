import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logout berhasil");

    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div>
          <h1 className={styles.navbar__brand}>
            ReadZone
          </h1>
        </div>

        <div>
          <ul className={styles.navbar__list}>
            <li className={styles.navbar__item}>
              Home
            </li>

            <li className={styles.navbar__item}>
              Books
            </li>

            <li className={styles.navbar__item}>
              Categories
            </li>

            <li className={styles.navbar__item}>
              Borrowing
            </li>

            {user && (
              <li className={styles.navbar__item}>
                Hi, {user.name}
              </li>
            )}

            <li
              className={styles.navbar__item}
              onClick={handleLogout}
              style={{
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Logout
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;