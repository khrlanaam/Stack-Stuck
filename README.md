# ReadZone

ReadZone is a web-based Digital Library Management System that helps users browse, search, and borrow books while providing administrators with tools to manage books, categories, and borrowing records. Built using React, Express.js, and MySQL.

## Key Features

### User
- Register, Login & Logout
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

## Technology

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

```bash
git clone https://github.com/khrlanaam/ReadZone.git
cd ReadZone
```

### Backend

```bash
cd backend
npm install
```

Copy the environment configuration.

```bash
cp .env.example .env
```

Start the backend server.

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory.

```env
PORT=

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=
JWT_EXPIRES=
```

## License

This project was developed for academic purposes.
