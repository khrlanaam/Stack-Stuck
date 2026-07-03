-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2026 at 02:37 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `readzone_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `author` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `cover` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `author`, `description`, `category_id`, `stock`, `cover`, `created_at`, `updated_at`) VALUES
(1, 'Belajar Node.js', 'Andi', 'Dasar backend Node.js', 1, 5, NULL, '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(2, 'Express Guide', 'Eko', 'Framework Node.js', 1, 3, NULL, '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(3, 'MySQL Dasar', 'Rudi', 'Belajar database', 2, 4, NULL, '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(4, 'Computer Networks', 'Tanenbaum', 'Jaringan komputer', 3, 6, NULL, '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(5, 'Docker Basics', 'Budi', 'Containerization', 4, 5, NULL, '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(6, 'Cyber Security 101', 'Kevin', 'Keamanan sistem', 5, 4, NULL, '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(7, 'Flutter Guide', 'Sinta', 'Mobile dev', 6, 7, NULL, '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(8, 'Laravel Advanced', 'Rizky', 'Backend PHP', 7, 5, NULL, '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(9, 'Data Science Intro', 'Ahmad', 'Analisis data', 8, 6, NULL, '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(10, 'AI Fundamentals', 'John', 'Machine learning', 9, 5, NULL, '2026-04-29 11:39:32', '2026-04-29 11:39:32');

-- --------------------------------------------------------

--
-- Table structure for table `borrowings`
--

CREATE TABLE `borrowings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `borrow_date` date NOT NULL,
  `due_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `status` enum('pending','borrowed','returned','rejected','late') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `borrowings`
--

INSERT INTO `borrowings` (`id`, `user_id`, `book_id`, `borrow_date`, `due_date`, `return_date`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 1, '2026-01-01', '2026-01-08', NULL, 'borrowed', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(2, 3, 2, '2026-01-02', '2026-01-09', NULL, 'borrowed', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(3, 4, 3, '2026-01-03', '2026-01-10', '2026-01-09', 'returned', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(4, 5, 4, '2026-01-04', '2026-01-11', NULL, 'late', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(5, 6, 5, '2026-01-05', '2026-01-12', NULL, 'borrowed', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(6, 7, 6, '2026-01-06', '2026-01-13', '2026-01-12', 'returned', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(7, 8, 7, '2026-01-07', '2026-01-14', NULL, 'borrowed', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(8, 9, 8, '2026-01-08', '2026-01-15', NULL, 'late', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(9, 10, 9, '2026-01-09', '2026-01-16', NULL, 'borrowed', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(10, 2, 10, '2026-01-10', '2026-01-17', '2026-01-16', 'returned', '2026-04-29 11:39:32', '2026-04-29 11:39:32');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Programming', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(2, 'Database', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(3, 'Networking', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(4, 'DevOps', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(5, 'Cyber Security', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(6, 'Mobile Development', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(7, 'Web Development', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(8, 'Data Science', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(9, 'Artificial Intelligence', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(10, 'Cloud Computing', '2026-04-29 11:39:32', '2026-04-29 11:39:32');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@mail.com', '$2b$10$N1o.c.jhDmu3CGUpHAdFW.aJhPhjaaDk/gvcdqRYzOw/EBar6vui.', 'admin', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(2, 'Anam', 'anam@mail.com', '$2b$10$EXAJlOwwo5k6KKb7s8vSJ.Fz5SMcR8PviafYCICLkLKXjD0g2crI6', 'user', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(3, 'Budi', 'budi@mail.com', '$2b$10$e975.RXQ0N7SBhQzkg2spe/4uYGh3dfoaeV4uw4P4nogEAai50qh2', 'user', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(4, 'Citra', 'citra@mail.com', '$2b$10$hdghvUkzq3s8kTXT8axchuJVKiWgcdvtEb.oEu89etWYDeFehHq82', 'user', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(5, 'Dewi', 'dewi@mail.com', '$2b$10$no.qL.kqSkilw/4cgVV6fe.8zQ3qnhxz987u08G9nekEZoJ.r5F/6', 'user', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(6, 'Eko', 'eko@mail.com', '$2b$10$Jai4W58SjIDYVzZamd4iCOGrSfowS.pjDqb5yiI54wM5AbdfyV1BW', 'user', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(7, 'Fajar', 'fajar@mail.com', '$2b$10$clUdeGGQq7ipffcIwoHXE.7CTcASJaCmuJTHnl0rUQgm9nXRI7N.i', 'user', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(8, 'Gina', 'gina@mail.com', '$2b$10$m58ttBoxsXMKhTUvvGhy7e35PiHXRsdbNjM1S339ezLp4A1paJRH.', 'user', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(9, 'Hadi', 'hadi@mail.com', '$2b$10$aVvvPSEptNjLLYKAHS8kXeEvOSS.gO2n4nPlWRo84n7EYHohy/VEO', 'user', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(10, 'Indra', 'indra@mail.com', '$2b$10$zTI25DKZ7u/RywrlUnczGuK36jQoQgVoMbkalkYovrTs3X6VYtp1.', 'user', '2026-04-29 11:39:32', '2026-04-29 11:39:32'),
(11, 'mail', 'mail@mail.com', '$2b$10$sDvpqivbL9hZyQJ9cQMAf.p0EQRW4WJOXDlVnBMabxQ4b8CT0bPJ.', 'user', '2026-04-29 11:42:41', '2026-04-29 11:42:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_books_category_id` (`category_id`);

--
-- Indexes for table `borrowings`
--
ALTER TABLE `borrowings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_borrowings_user_id` (`user_id`),
  ADD KEY `idx_borrowings_book_id` (`book_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `borrowings`
--
ALTER TABLE `borrowings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `borrowings`
--
ALTER TABLE `borrowings`
  ADD CONSTRAINT `borrowings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `borrowings_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
