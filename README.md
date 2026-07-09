#  ReadZone

ReadZone is a web-based Digital Library Management System that helps users browse, search, and borrow books while providing administrators with tools to manage books, categories, and borrowing records. Built using React, Express.js, and MySQL.

## Key Features

### User
- User Authentication (Register, Login, Logout)
- Browse & Search Books
- View Books by Category
- Borrow Books
- View Borrowing History

### Admin
- Book Management (CRUD)
- Category Management (CRUD)
- Borrowing Management
- Book Cover Upload
- Stock Management
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
git clone https://github.com/username/readzone.git
cd readzone
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file and configure your database.

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=readzone_db

JWT_SECRET=your_secret_key
JWT_EXPIRES=1d
```

Run the backend server.

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```
