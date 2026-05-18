-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 18, 2026 at 07:43 PM
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
-- Database: `JeWePe`
--

-- --------------------------------------------------------

--
-- Table structure for table `catalogues`
--

CREATE TABLE `catalogues` (
  `package_id` int(2) NOT NULL,
  `image` varchar(100) NOT NULL,
  `package_name` varchar(30) NOT NULL,
  `description` text NOT NULL,
  `price` int(9) NOT NULL,
  `status_publish` enum('Y','N') NOT NULL DEFAULT 'Y',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `catalogues`
--

INSERT INTO `catalogues` (`package_id`, `image`, `package_name`, `description`, `price`, `status_publish`, `created_at`, `updated_at`) VALUES
(2, 'media_post-1778682851529-790659605.png', 'Test Paket', 'Test Paket', 69420, 'Y', '2026-05-13 21:34:11', '2026-05-13 21:34:11'),
(3, 'media_post-1779112736021-199616051.png', 'Test Paket 2', 'Test Paket 2', 99000, 'Y', '2026-05-18 20:58:56', '2026-05-18 20:58:56'),
(4, 'media_post-1779112786703-959420986.png', 'Test Paket 3', 'Test Paket 3', 100000, 'Y', '2026-05-18 20:59:46', '2026-05-18 20:59:46'),
(5, 'media_post-1779124945578-417133450.png', 'Paket Basic', 'Tenda\r\nSound Horeg\r\nPrasmanan\r\nPhotographer', 50000000, 'Y', '2026-05-19 00:22:25', '2026-05-19 00:22:25');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `order_id` int(2) NOT NULL,
  `package_id` int(2) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(60) NOT NULL,
  `message` text NOT NULL DEFAULT 'Tak ada pesan',
  `wedding_date` date NOT NULL,
  `status` enum('requested','approved') NOT NULL DEFAULT 'requested',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`order_id`, `package_id`, `name`, `email`, `message`, `wedding_date`, `status`, `created_at`, `updated_at`) VALUES
(2, 3, 'Muhammad Fiqri', 'bloodcyka101@gmail.com', 'Tak ada pesan', '2026-05-31', 'approved', '2026-05-18 21:58:31', '2026-05-18 21:58:31'),
(4, 4, 'aaa', 'aaa@gmail.com', 'Tes Pesan', '2026-05-31', 'approved', '2026-05-18 22:45:53', '2026-05-18 22:45:53');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id_post` int(5) NOT NULL,
  `title` varchar(50) NOT NULL,
  `image` varchar(200) NOT NULL,
  `author` varchar(50) NOT NULL DEFAULT 'admin fiqri',
  `description` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id_post`, `title`, `image`, `author`, `description`, `created_at`, `updated_at`) VALUES
(14, 'Test Post', 'media-1779120108486-791633884.png', 'admin fiqri', 'Test Isi post', '2026-05-18 23:01:48', '2026-05-18 23:01:48'),
(15, 'Test Post 2', 'media-1779123552178-368081739.png', 'admin fiqri', 'Test Post 2', '2026-05-18 23:59:12', '2026-05-18 23:59:12');

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `id_setting` int(2) NOT NULL,
  `website_name` varchar(100) NOT NULL,
  `phone_number1` varchar(16) NOT NULL,
  `phone_number2` varchar(16) DEFAULT NULL,
  `email1` varchar(80) NOT NULL,
  `email2` varchar(80) DEFAULT NULL,
  `address` text NOT NULL,
  `maps` text DEFAULT NULL,
  `Logo` varchar(80) NOT NULL,
  `Facebook_url` varchar(256) DEFAULT NULL,
  `Instagram_url` varchar(256) DEFAULT NULL,
  `Youtube_url` varchar(256) DEFAULT NULL,
  `Header_bussines_hour` varchar(160) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(5) NOT NULL,
  `profile_picture` varchar(80) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `profile_picture`, `username`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'default_profile_picture.svg', 'fiqri', 'mfiqrischool101@gmail.com', 'brbrpatapI', '2026-05-11 21:50:02', '2026-05-11 21:50:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `catalogues`
--
ALTER TABLE `catalogues`
  ADD PRIMARY KEY (`package_id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_package_id_order&catalogues` (`package_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id_post`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id_setting`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `catalogues`
--
ALTER TABLE `catalogues`
  MODIFY `package_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `order_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id_post` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `id_setting` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `fk_package_id_order&catalogues` FOREIGN KEY (`package_id`) REFERENCES `catalogues` (`package_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
