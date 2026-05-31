import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.error ||
        "Register gagal"
      );
    }
  };

  return (
    <div className={styles.container}>
      {/* LEFT */}
      <div className={styles.left}>
        <div className={styles.overlay}></div>

        <div className={styles.leftContent}>
          <h1>Join ReadZone</h1>

          <p>
            Create your account and unlock access to
            thousands of books, articles, and learning
            resources.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <div
          className={styles.logo}
          onClick={() => navigate("/")}
        >
          ReadZone
        </div>

        <div className={styles.card}>
          <h2>Create Account</h2>

          <p>Start your reading journey today</p>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Abidin"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

            <label>Email Address</label>

            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button type="submit">
              Create Account
            </button>
          </form>

          <p className={styles.login}>
            Already have an account?{" "}
            <span
              onClick={() =>
                navigate("/login")
              }
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;