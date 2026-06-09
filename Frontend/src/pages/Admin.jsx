import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Swal from "sweetalert2";

import {
  FaBook,
  FaUsers,
  FaClipboardList,
  FaExchangeAlt,
  FaCheckCircle,
} from "react-icons/fa";

import { getAdminStats } from "../services/adminService";

import {
  getPendingBorrowings,
  approveBorrowing,
  rejectBorrowing,
} from "../services/borrowingService";

function Admin() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalBorrowings: 0,
    activeBorrowings: 0,
  });

  const [pendingBorrowings, setPendingBorrowings] = useState([]);
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const fetchStats = async () => {
    try {
      const result = await getAdminStats();
      setStats(result);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPendingBorrowings = async () => {
    try {
      const data = await getPendingBorrowings();
      setPendingBorrowings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchPendingBorrowings();
  }, []);

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Approve Request?",
      text: "Peminjaman akan disetujui.",
      icon: "question",
      background: "#181818",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#00c853",
      cancelButtonColor: "#444",
      confirmButtonText: "Approve",
    });


    if (!result.isConfirmed) return;

    try {
      await approveBorrowing(id);

      await Swal.fire({
        title: "Berhasil",
        text: "Peminjaman berhasil disetujui",
        icon: "success",
        background: "#181818",
        color: "#fff",
      });

      fetchPendingBorrowings();
      fetchStats();
    } catch (err) {
      Swal.fire({
        title: "Gagal",
        text:
          err.response?.data?.message ||
          "Gagal approve",
        icon: "error",
        background: "#181818",
        color: "#fff",
      });
    }


  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Reject Request?",
      text: "Peminjaman akan ditolak.",
      icon: "warning",
      background: "#181818",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#e50914",
      cancelButtonColor: "#444",
      confirmButtonText: "Reject",
    });


    if (!result.isConfirmed) return;

    try {
      await rejectBorrowing(id);

      await Swal.fire({
        title: "Berhasil",
        text: "Peminjaman berhasil ditolak",
        icon: "success",
        background: "#181818",
        color: "#fff",
      });

      fetchPendingBorrowings();
    } catch (err) {
      Swal.fire({
        title: "Gagal",
        text:
          err.response?.data?.message ||
          "Gagal reject",
        icon: "error",
        background: "#181818",
        color: "#fff",
      });
    }


  };

  const statCard = (
    title,
    value,
    icon,
    color
  ) => (
    <div
      style={{
        background: "#181818",
        borderRadius: "15px",
        padding: "25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    > <div>
        <p
          style={{
            color: "#aaa",
            marginBottom: "10px",
          }}
        >
          {title} </p>


        <h1>{value}</h1>
      </div>

      <div
        style={{
          fontSize: "40px",
          color,
        }}
      >
        {icon}
      </div>
    </div>


  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        color: "#fff",
        padding: "40px",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      > <div>
          <h1
            style={{
              fontSize: "38px",
            }}
          >
            Admin Dashboard </h1>


          < p
            style={{
              color: "#aaa",
            }
            }
          >
            Library Management System
          </p >
        </div >

        <button
          onClick={handleLogout}
          style={{
            background: "#e50914",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div >

      {/* STATS */}
      < div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        {
          statCard(
            "Total Books",
            stats.totalBooks,
            < FaBook />,
            "#2196f3"
          )}

        {
          statCard(
            "Total Users",
            stats.totalUsers,
            <FaUsers />,
            "#ff9800"
          )
        }

        {
          statCard(
            "Borrowings",
            stats.totalBorrowings,
            <FaClipboardList />,
            "#9c27b0"
          )
        }

        {
          statCard(
            "Active Borrowings",
            stats.activeBorrowings,
            <FaExchangeAlt />,
            "#00c853"
          )
        }
      </div >

      {/* PENDING */}
      < div
        style={{
          marginTop: "50px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Pending Requests
        </h2>

        {
          pendingBorrowings.length === 0 ? (
            <div
              style={{
                background: "#181818",
                padding: "30px",
                borderRadius: "15px",
                textAlign: "center",
              }}
            >
              <FaCheckCircle
                size={50}
                color="#00c853"
              />

              <h3
                style={{
                  marginTop: "15px",
                }}
              >
                Tidak ada request pending
              </h3>
            </div>
          ) : (
            pendingBorrowings.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#181818",
                  padding: "20px",
                  borderRadius: "15px",
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3>{item.book_title}</h3>

                  <p>
                    User:
                    {" "}
                    {item.user_name}
                  </p>

                  <p>
                    Due Date:
                    {" "}
                    {new Date(
                      item.due_date
                    ).toLocaleDateString(
                      "id-ID"
                    )}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() =>
                      handleApprove(item.id)
                    }
                    style={{
                      background: "#00c853",
                      color: "#fff",
                      border: "none",
                      padding:
                        "10px 18px",
                      borderRadius:
                        "8px",
                      cursor: "pointer",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      handleReject(item.id)
                    }
                    style={{
                      background: "#e50914",
                      color: "#fff",
                      border: "none",
                      padding:
                        "10px 18px",
                      borderRadius:
                        "8px",
                      cursor: "pointer",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )
        }
      </div >

      {/* MENU */}
      < div
        style={{
          marginTop: "50px",
        }}
      >
        <h2>Management Menu</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            onClick={() =>
              navigate("/admin/books")
            }
            style={{
              background: "#181818",
              padding: "30px",
              borderRadius: "15px",
              cursor: "pointer",
            }}
          >
            <FaBook
              size={40}
              color="#2196f3"
            />
            <h3>Manage Books</h3>
          </div>

          <div
            onClick={() =>
              navigate("/admin/users")
            }
            style={{
              background: "#181818",
              padding: "30px",
              borderRadius: "15px",
              cursor: "pointer",
            }}
          >
            <FaUsers
              size={40}
              color="#ff9800"
            />
            <h3>Manage Users</h3>
          </div>

          <div
            onClick={() =>
              navigate(
                "/admin/borrowings"
              )
            }
            style={{
              background: "#181818",
              padding: "30px",
              borderRadius: "15px",
              cursor: "pointer",
            }}
          >
            <FaClipboardList
              size={40}
              color="#9c27b0"
            />
            <h3>
              Manage Borrowings
            </h3>
          </div>
        </div>
      </div >
    </div >


  );
}

export default Admin;
