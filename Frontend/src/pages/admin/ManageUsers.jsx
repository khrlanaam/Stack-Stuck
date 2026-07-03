import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import styles from "./Admin.module.css";

import { getAllUsers } from "../../services/userService";

function ManageUsers() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const fetchData = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.page}>
            <button
                onClick={() => navigate("/admin")}
                className={styles.backBtn}
            >
                <FaArrowLeft /> Kembali ke Dashboard
            </button>

            <h1 className={styles.title}>
                Manajemen Pengguna
            </h1>

            <p className={styles.subtitle}>
                Daftar seluruh pengguna yang telah terdaftar
            </p>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Tanggal Daftar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>
                                        <span
                                            className={
                                                user.role === "admin"
                                                    ? styles.badgeAdmin
                                                    : styles.badgeUser
                                            }
                                        >
                                            {user.role.toUpperCase()}
                                        </span>
                                    </td>

                                    <td>
                                        {new Date(user.created_at).toLocaleDateString("id-ID")}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    style={{
                                        textAlign: "center",
                                        padding: "35px",
                                        color: "#999",
                                    }}
                                >
                                    Tidak ada data pengguna
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageUsers;