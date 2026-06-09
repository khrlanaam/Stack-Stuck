import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaClipboardList } from "react-icons/fa";

function ManageBorrowings() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#0f0f0f",
                color: "#fff",
                padding: "40px",
            }}
        >
            <button
                onClick={() => navigate("/admin")}
                style={{
                    background: "#e50914",
                    color: "#fff",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginBottom: "30px",
                }}
            > <FaArrowLeft /> Back Dashboard </button>


            <div
                style={{
                    background: "#181818",
                    padding: "40px",
                    borderRadius: "15px",
                    textAlign: "center",
                }}
            >
                <FaClipboardList
                    size={70}
                    style={{
                        color: "#e50914",
                        marginBottom: "20px",
                    }}
                />

                <h1>Manage Borrowings</h1>

                <p
                    style={{
                        color: "#aaa",
                        marginTop: "10px",
                    }}
                >
                    Halaman manajemen peminjaman akan dibuat pada tahap berikutnya.
                </p>
            </div>
        </div>
    );
}

export default ManageBorrowings;
