-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2024 at 12:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanlysuckhoe`
--
DROP DATABASE IF EXISTS `quanlysuckhoe`;
CREATE DATABASE IF NOT EXISTS `quanlysuckhoe` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `quanlysuckhoe`;
-- --------------------------------------------------------

--
-- Table structure for table `bacsi`
--

CREATE TABLE `bacsi` (
  `MaBacSi` varchar(255) NOT NULL,
  `TenBacSi` varchar(255) NOT NULL,
  `NgaySinh` date NOT NULL,
  `SoDienThoai` varchar(10) NOT NULL,
  `Mail` varchar(255) NOT NULL,
  `ChuyenMon` varchar(255) NOT NULL,
  `GioiTinh` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `bacsi`
--

INSERT INTO `bacsi` (`MaBacSi`, `TenBacSi`, `NgaySinh`, `SoDienThoai`, `Mail`, `ChuyenMon`, `GioiTinh`) VALUES
('BS001', 'Trần Văn Khôi', '1988-02-01', '0789171899', 'tranvankhoi@gmail.com', 'Khoa', 'Nam'),
('BS002', 'Lê Thị Thảo', '1991-12-02', '0932860481', 'thao@gmail.com', 'Đa khoa', 'Nữ');

-- --------------------------------------------------------

--
-- Table structure for table `benhan`
--

CREATE TABLE `benhan` (
  `MaBenhAn` varchar(255) NOT NULL,
  `MaBenhNhan` varchar(255) NOT NULL,
  `TenBenhVien` varchar(255) NOT NULL,
  `DuongDan` varchar(255) NOT NULL,
  `NgayTao` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `benhan`
--

INSERT INTO `benhan` (`MaBenhAn`, `MaBenhNhan`, `TenBenhVien`, `DuongDan`, `NgayTao`) VALUES
('BA001', 'BN001', '', '', '2024-03-24'),
('BA002', 'BN001', '', '', '2024-03-24');

-- --------------------------------------------------------

--
-- Table structure for table `benhnhan`
--

CREATE TABLE `benhnhan` (
  `MaBenhNhan` varchar(255) NOT NULL,
  `TenBenhNhan` varchar(255) NOT NULL,
  `NgaySinh` date NOT NULL,
  `SoDienThoai` varchar(10) NOT NULL,
  `Mail` varchar(255) NOT NULL,
  `SoDienThoaiNguoiThan` varchar(10) NOT NULL,
  `DiaChi` text NOT NULL,
  `GioiTinh` varchar(3) NOT NULL,
  `CanNang` float NOT NULL,
  `MaBacSi` varchar(255) NOT NULL,
  `Avatar` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `benhnhan`
--

INSERT INTO `benhnhan` (`MaBenhNhan`, `TenBenhNhan`, `NgaySinh`, `SoDienThoai`, `Mail`, `SoDienThoaiNguoiThan`, `DiaChi`, `GioiTinh`, `CanNang`, `MaBacSi`, `Avatar`) VALUES
('BN001', 'Nguyễn Thị Ngọc', '1991-01-02', '0978981234', 'ngoc@gmail.com', '0937899789', 'Long Xuyên, An Giang', 'Nữ', 65, 'BS002', '1681843722484.png');

-- --------------------------------------------------------

--
-- Table structure for table `cauhoi`
--

CREATE TABLE `cauhoi` (
  `ID` int(11) NOT NULL,
  `ID_BenhNhan` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `NoiDung` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitiet_uongthuoc`
--

CREATE TABLE `chitiet_uongthuoc` (
  `ID` int(11) NOT NULL,
  `ID_GIoUongThuoc` int(11) NOT NULL,
  `ID_Thuoc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `giouongthuoc`
--

CREATE TABLE `giouongthuoc` (
  `ID` int(11) NOT NULL,
  `ID_LichUongThuoc` int(11) NOT NULL,
  `GioUong` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hoidap_benhnhan`
--

CREATE TABLE `hoidap_benhnhan` (
  `ID` int(11) NOT NULL,
  `MaBenhNhan` varchar(255) NOT NULL,
  `NoiDung` text NOT NULL,
  `NgayDang` date NOT NULL,
  `TrangThai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `hoidap_benhnhan`
--

INSERT INTO `hoidap_benhnhan` (`ID`, `MaBenhNhan`, `NoiDung`, `NgayDang`, `TrangThai`) VALUES
(1, 'BN001', 'Xin chào, tôi có thể đặt 1 câu hỏi về sức khỏe hiện nay được không? Hiện nay tui đang gặp 1 số vấn về về hô hấp. Bác sĩ có thể giúp tôi một vài lới khuyên được không', '2023-04-19', 1);

-- --------------------------------------------------------

--
-- Table structure for table `lichkham`
--

CREATE TABLE `lichkham` (
  `MaLichKham` int(11) NOT NULL,
  `MaBenhNhan` varchar(255) NOT NULL,
  `MaBacSi` varchar(255) NOT NULL,
  `NgayHen` datetime NOT NULL,
  `TrangThai` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `lichkham`
--

INSERT INTO `lichkham` (`MaLichKham`, `MaBenhNhan`, `MaBacSi`, `NgayHen`, `TrangThai`) VALUES
(1, 'BN001', 'BS002', '2024-03-22 16:07:55', 'Đã đặt'),
(2, 'BN001', 'BS001', '2024-03-11 22:09:49', 'Chưa đặt');

-- --------------------------------------------------------

--
-- Table structure for table `lichuongthuoc`
--

CREATE TABLE `lichuongthuoc` (
  `ID` int(11) NOT NULL,
  `ID_BacSi` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ID_BenhNhan` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `NgayBatDau` date NOT NULL,
  `NgayKetThuc` date NOT NULL,
  `MoTa` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nguoidung`
--

CREATE TABLE `nguoidung` (
  `ID` int(11) NOT NULL,
  `TenDangNhap` varchar(255) NOT NULL,
  `MatKhau` text NOT NULL,
  `Quyen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `nguoidung`
--

INSERT INTO `nguoidung` (`ID`, `TenDangNhap`, `MatKhau`, `Quyen`) VALUES
(1, 'admin1', '$2b$10$kxveS/MI7sYSQA38eSqf1OBBIxGy0nw6FFouT4OYTMq2dJAYIIaYO', 1),
(2, 'BS001', '$2b$10$ik0EuwnjjSGG3s.4wQgzpe4alFwg/GPGVehkuRCQ8B.4pfcwz5aGi', 2),
(3, 'BS002', '$2b$10$cek/Ke2v4t2SChmwDmoKBe7aovwDTEsFMDh4KfChaNtEB9EQybuZK', 2),
(4, 'BN001', '$2b$10$D5WYbrVztp0yfcJo96Ad0uA/6sWQi..2t3we6nIHGnLPLrLFFNwWS', 3);

-- --------------------------------------------------------

--
-- Table structure for table `phanhoi`
--

CREATE TABLE `phanhoi` (
  `ID` int(11) NOT NULL,
  `ID_hoi` int(11) NOT NULL,
  `ID_BacSi` varchar(255) NOT NULL,
  `NoiDung` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thongbao_bacsi`
--

CREATE TABLE `thongbao_bacsi` (
  `ID` int(10) NOT NULL,
  `ID_BacSi` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `NoiDung` varchar(2000) NOT NULL,
  `HinhAnh` varchar(255) NOT NULL,
  `LoaiThongBao` varchar(255) NOT NULL,
  `TrangThai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thongbao_benhnhan`
--

CREATE TABLE `thongbao_benhnhan` (
  `ID` int(10) NOT NULL,
  `ID_BenhNhan` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `NoiDung` varchar(2000) NOT NULL,
  `HinhAnh` varchar(255) NOT NULL,
  `LoaiThongBao` varchar(255) NOT NULL,
  `TrangThai` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thuoc`
--

CREATE TABLE `thuoc` (
  `ID` int(11) NOT NULL,
  `LieuLuong` float NOT NULL,
  `DonVi` varchar(255) NOT NULL,
  `TacDungPhu` varchar(2000) NOT NULL,
  `NoiDungKhac` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bacsi`
--
ALTER TABLE `bacsi`
  ADD PRIMARY KEY (`MaBacSi`);

--
-- Indexes for table `benhan`
--
ALTER TABLE `benhan`
  ADD PRIMARY KEY (`MaBenhAn`),
  ADD KEY `MaBenhNhan` (`MaBenhNhan`);

--
-- Indexes for table `benhnhan`
--
ALTER TABLE `benhnhan`
  ADD PRIMARY KEY (`MaBenhNhan`),
  ADD KEY `MaBacSi` (`MaBacSi`);

--
-- Indexes for table `cauhoi`
--
ALTER TABLE `cauhoi`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_BenhNhan` (`ID_BenhNhan`);

--
-- Indexes for table `chitiet_uongthuoc`
--
ALTER TABLE `chitiet_uongthuoc`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_GIoUongThuoc` (`ID_GIoUongThuoc`),
  ADD KEY `ID_Thuoc` (`ID_Thuoc`);

--
-- Indexes for table `giouongthuoc`
--
ALTER TABLE `giouongthuoc`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_LichUongThuoc` (`ID_LichUongThuoc`);

--
-- Indexes for table `hoidap_benhnhan`
--
ALTER TABLE `hoidap_benhnhan`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `MaBenhNhan` (`MaBenhNhan`);

--
-- Indexes for table `lichkham`
--
ALTER TABLE `lichkham`
  ADD PRIMARY KEY (`MaLichKham`),
  ADD KEY `MaBacSi` (`MaBacSi`),
  ADD KEY `MaBenhNhan` (`MaBenhNhan`);

--
-- Indexes for table `lichuongthuoc`
--
ALTER TABLE `lichuongthuoc`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_BacSi` (`ID_BacSi`),
  ADD KEY `ID_BenhNhan` (`ID_BenhNhan`);

--
-- Indexes for table `phanhoi`
--
ALTER TABLE `phanhoi`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_BacSi` (`ID_BacSi`);

--
-- Indexes for table `thongbao_bacsi`
--
ALTER TABLE `thongbao_bacsi`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_BacSi` (`ID_BacSi`);

--
-- Indexes for table `thongbao_benhnhan`
--
ALTER TABLE `thongbao_benhnhan`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_BenhNhan` (`ID_BenhNhan`);

--
-- Indexes for table `thuoc`
--
ALTER TABLE `thuoc`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cauhoi`
--
ALTER TABLE `cauhoi`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chitiet_uongthuoc`
--
ALTER TABLE `chitiet_uongthuoc`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `giouongthuoc`
--
ALTER TABLE `giouongthuoc`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lichuongthuoc`
--
ALTER TABLE `lichuongthuoc`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `thongbao_bacsi`
--
ALTER TABLE `thongbao_bacsi`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `thongbao_benhnhan`
--
ALTER TABLE `thongbao_benhnhan`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `thuoc`
--
ALTER TABLE `thuoc`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `benhan`
--
ALTER TABLE `benhan`
  ADD CONSTRAINT `benhan_ibfk_1` FOREIGN KEY (`MaBenhNhan`) REFERENCES `benhnhan` (`MaBenhNhan`);

--
-- Constraints for table `benhnhan`
--
ALTER TABLE `benhnhan`
  ADD CONSTRAINT `benhnhan_ibfk_1` FOREIGN KEY (`MaBacSi`) REFERENCES `bacsi` (`MaBacSi`);

--
-- Constraints for table `cauhoi`
--
ALTER TABLE `cauhoi`
  ADD CONSTRAINT `cauhoi_ibfk_1` FOREIGN KEY (`ID_BenhNhan`) REFERENCES `benhnhan` (`MaBenhNhan`);

--
-- Constraints for table `chitiet_uongthuoc`
--
ALTER TABLE `chitiet_uongthuoc`
  ADD CONSTRAINT `chitiet_uongthuoc_ibfk_1` FOREIGN KEY (`ID_GIoUongThuoc`) REFERENCES `giouongthuoc` (`ID`),
  ADD CONSTRAINT `chitiet_uongthuoc_ibfk_2` FOREIGN KEY (`ID_Thuoc`) REFERENCES `thuoc` (`id`);

--
-- Constraints for table `giouongthuoc`
--
ALTER TABLE `giouongthuoc`
  ADD CONSTRAINT `giouongthuoc_ibfk_1` FOREIGN KEY (`ID_LichUongThuoc`) REFERENCES `lichuongthuoc` (`ID`);

--
-- Constraints for table `hoidap_benhnhan`
--
ALTER TABLE `hoidap_benhnhan`
  ADD CONSTRAINT `hoidap_benhnhan_ibfk_1` FOREIGN KEY (`MaBenhNhan`) REFERENCES `benhnhan` (`MaBenhNhan`);

--
-- Constraints for table `lichkham`
--
ALTER TABLE `lichkham`
  ADD CONSTRAINT `lichkham_ibfk_1` FOREIGN KEY (`MaBacSi`) REFERENCES `bacsi` (`MaBacSi`),
  ADD CONSTRAINT `lichkham_ibfk_2` FOREIGN KEY (`MaBenhNhan`) REFERENCES `benhnhan` (`MaBenhNhan`);

--
-- Constraints for table `lichuongthuoc`
--
ALTER TABLE `lichuongthuoc`
  ADD CONSTRAINT `lichuongthuoc_ibfk_1` FOREIGN KEY (`ID_BacSi`) REFERENCES `bacsi` (`MaBacSi`),
  ADD CONSTRAINT `lichuongthuoc_ibfk_2` FOREIGN KEY (`ID_BenhNhan`) REFERENCES `benhnhan` (`MaBenhNhan`);

--
-- Constraints for table `phanhoi`
--
ALTER TABLE `phanhoi`
  ADD CONSTRAINT `phanhoi_ibfk_1` FOREIGN KEY (`ID_BacSi`) REFERENCES `bacsi` (`MaBacSi`);

--
-- Constraints for table `thongbao_bacsi`
--
ALTER TABLE `thongbao_bacsi`
  ADD CONSTRAINT `thongbao_bacsi_ibfk_1` FOREIGN KEY (`ID_BacSi`) REFERENCES `bacsi` (`MaBacSi`);

--
-- Constraints for table `thongbao_benhnhan`
--
ALTER TABLE `thongbao_benhnhan`
  ADD CONSTRAINT `thongbao_benhnhan_ibfk_1` FOREIGN KEY (`ID_BenhNhan`) REFERENCES `benhnhan` (`MaBenhNhan`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
