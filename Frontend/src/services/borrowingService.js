import api from "./api";

// GET semua borrowing
export const getMyBorrowings = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/api/borrowings/my",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// PINJAM BUKU
export const borrowBook = async (bookId) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/api/borrowings",
    {
      book_id: bookId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// KEMBALIKAN BUKU
export const returnBook = async (borrowingId) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/api/borrowings/return",
    {
      borrowing_id: borrowingId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// BORROWING AKTIF
export const getActiveBorrowings = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/api/borrowings/active",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// BORROWING OVERDUE
export const getOverdueBorrowings = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/api/borrowings/overdue",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// PENDING BORROWINGS (ADMIN)
export const getPendingBorrowings = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/api/borrowings/pending",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// APPROVE BORROWING (ADMIN)
export const approveBorrowing = async (borrowingId) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    "/api/borrowings/approve",
    {
      borrowing_id: borrowingId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// REJECT BORROWING (ADMIN)
export const rejectBorrowing = async (borrowingId) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    "/api/borrowings/reject",
    {
      borrowing_id: borrowingId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};