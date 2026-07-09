# ReadZone

ReadZone is a web-based Digital Library Management System that enables users to browse, search, and borrow books while providing administrators with tools to manage books, categories, and borrowing records. The application is built with React, Express.js, and MySQL.

## Features

### User
- Register, Login, and Logout
- Browse Books
- Search Books
- View Books by Category
- Borrow Books
- View Borrowing History

### Admin
- Book Management (CRUD)
- Category Management (CRUD)
- Borrowing Management
- Upload Book Covers
- Book Stock Management
- JWT Authentication & Role-Based Authorization

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS Modules

### Backend
- Node.js
- Express.js
- JWT
- bcrypt

### Database
- MySQL

## Installation

Clone the repository.

```bash
git clone https://github.com/khrlanaam/ReadZone.git
cd ReadZone
```

### Backend

Install dependencies.

```bash
cd Backend
npm install
```

Create a `.env` file in the **Backend** directory and configure it according to your local environment (database connection, server port, and JWT settings).

Start the backend server.

```bash
npm run dev
```

### Frontend

Open a new terminal.

```bash
cd Frontend
npm install
npm run dev
```

## License

This project was developed for academic purposes.
