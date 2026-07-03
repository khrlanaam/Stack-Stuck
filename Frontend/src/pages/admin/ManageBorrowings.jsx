import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import {
    FaArrowLeft,
    FaCheck,
    FaTimes,
    FaUndo,
} from "react-icons/fa";

import styles from "./Admin.module.css";

import {
    getAllBorrowings,
    approveBorrowing,
    rejectBorrowing,
    returnBook,
} from "../../services/borrowingService";

function ManageBorrowings() {

    const navigate = useNavigate();

    const [borrowings, setBorrowings] = useState([]);
    const [filter, setFilter] = useState("all");

    const fetchData = async () => {
        try {
            const data = await getAllBorrowings();
            setBorrowings(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApprove = async (id) => {

        const result = await Swal.fire({
            title: "Setujui peminjaman?",
            icon: "question",
            background: "#181818",
            color: "#fff",
            showCancelButton: true,
            confirmButtonColor: "#00c853",
            confirmButtonText: "Setujui",
            cancelButtonText: "Batal",
        });

        if (!result.isConfirmed) return;

        try {

            await approveBorrowing(id);

            Swal.fire({
                title: "Berhasil",
                text: "Peminjaman berhasil disetujui",
                icon: "success",
                background: "#181818",
                color: "#fff",
            });

            fetchData();

        } catch (err) {

            Swal.fire({
                title: "Gagal",
                text: err.response?.data?.message || "Terjadi kesalahan",
                icon: "error",
                background: "#181818",
                color: "#fff",
            });

        }

    };
    const handleReject = async (id) => {

        const result = await Swal.fire({
            title: "Tolak peminjaman?",
            icon: "warning",
            background: "#181818",
            color: "#fff",
            showCancelButton: true,
            confirmButtonColor: "#e50914",
            confirmButtonText: "Tolak",
            cancelButtonText: "Batal",
        });

        if (!result.isConfirmed) return;

        try {

            await rejectBorrowing(id);

            Swal.fire({
                title: "Berhasil",
                text: "Peminjaman berhasil ditolak",
                icon: "success",
                background: "#181818",
                color: "#fff",
            });

            fetchData();

        } catch (err) {

            Swal.fire({
                title: "Gagal",
                text: err.response?.data?.message || "Terjadi kesalahan",
                icon: "error",
                background: "#181818",
                color: "#fff",
            });

        }

    };

    const handleReturn = async (id) => {

        const result = await Swal.fire({
            title: "Kembalikan buku?",
            icon: "question",
            background: "#181818",
            color: "#fff",
            showCancelButton: true,
            confirmButtonColor: "#2196f3",
            confirmButtonText: "Kembalikan",
            cancelButtonText: "Batal",
        });

        if (!result.isConfirmed) return;

        try {

            await returnBook(id);

            Swal.fire({
                title: "Berhasil",
                text: "Buku berhasil dikembalikan",
                icon: "success",
                background: "#181818",
                color: "#fff",
            });

            fetchData();

        } catch (err) {

            Swal.fire({
                title: "Gagal",
                text: err.response?.data?.message || "Terjadi kesalahan",
                icon: "error",
                background: "#181818",
                color: "#fff",
            });

        }

    };

    const filteredBorrowings =
        filter === "all"
            ? borrowings
            : borrowings.filter(
                (item) => item.status === filter
            );

    return (
        <div className={styles.page}>

            <button
                onClick={() => navigate("/admin")}
                className={styles.backBtn}
            >
                <FaArrowLeft /> Kembali ke Dashboard
            </button>

            <h1 className={styles.title}>
                Manajemen Peminjaman
            </h1>

            <p className={styles.subtitle}>
                Kelola seluruh data peminjaman buku.
            </p>

            <div style={{ margin: "25px 0" }}>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    id="q7n4xz"
                    className={styles.filterSelect}
                >
                    <option value="all">Semua</option>
                    <option value="pending">Pending</option>
                    <option value="borrowed">Dipinjam</option>
                    <option value="returned">Dikembalikan</option>
                    <option value="rejected">Ditolak</option>
                </select>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Peminjam</th>
                            <th>Buku</th>
                            <th>Status</th>
                            <th>Jatuh Tempo</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredBorrowings.length > 0 ? (

                            filteredBorrowings.map((item) => (

                                <tr key={item.id}>

                                    <td>{item.id}</td>

                                    <td>{item.user_name}</td>

                                    <td>{item.book_title}</td>

                                    <td>

                                        <span
                                            className={
                                                item.status === "pending"
                                                    ? styles.badgePending
                                                    : item.status === "borrowed"
                                                        ? styles.badgeBorrowed
                                                        : item.status === "returned"
                                                            ? styles.badgeReturned
                                                            : styles.badgeRejected
                                            }
                                        >
                                            {item.status.toUpperCase()}
                                        </span>

                                    </td>

                                    <td>
                                        {item.due_date
                                            ? new Date(item.due_date).toLocaleDateString("id-ID")
                                            : "-"}
                                    </td>

                                    <td>

                                        {item.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() => handleApprove(item.id)}
                                                    className={styles.successBtn}
                                                >
                                                    <FaCheck /> Setujui
                                                </button>

                                                <button
                                                    onClick={() => handleReject(item.id)}
                                                    className={styles.dangerBtn}
                                                >
                                                    <FaTimes /> Tolak
                                                </button>
                                            </>
                                        )}

                                        {item.status === "borrowed" && (
                                            <button
                                                onClick={() => handleReturn(item.id)}
                                                className={styles.primaryBtn}
                                            >
                                                <FaUndo /> Kembalikan
                                            </button>
                                        )}
                                        {(item.status === "returned" ||
                                            item.status === "rejected") && (
                                                <span style={{ color: "#888" }}>
                                                    -
                                                </span>
                                            )}

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>
                                <td
                                    colSpan="6"
                                    style={{
                                        textAlign: "center",
                                        padding: "35px",
                                        color: "#999",
                                    }}
                                >
                                    Tidak ada data peminjaman
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );

}

export default ManageBorrowings;