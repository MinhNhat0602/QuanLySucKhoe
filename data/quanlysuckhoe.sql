-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2024 at 08:40 AM
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
  `GioiTinh` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `bacsi`
--

INSERT INTO `bacsi` (`MaBacSi`, `TenBacSi`, `NgaySinh`, `SoDienThoai`, `Mail`, `ChuyenMon`, `GioiTinh`) VALUES
('BS001', 'Trần Văn Khôi', '1988-02-01', '0789171899', 'tranvankhoi@gmail.com', 'Khoa', 'Nam'),
('BS002', 'Lê Thị Thảo', '1991-12-02', '0932860481', 'thao@gmail.com', 'Đa khoa', 'Nữ'),
('BS005', 'Trần Văn A', '2000-08-11', '1234567890', 'Tva@gmail.com', 'Ngoại khoa', 'Nam');

-- --------------------------------------------------------

--
-- Table structure for table `benhan`
--

CREATE TABLE `benhan` (
  `Id` int(11) NOT NULL,
  `Id_BenhNhan` varchar(255) DEFAULT NULL,
  `DuongDan` varchar(255) DEFAULT NULL,
  `TenBenhVien` varchar(255) DEFAULT NULL,
  `NgayNhapVien` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `benhnhan`
--

CREATE TABLE `benhnhan` (
  `MaBenhNhan` varchar(255) NOT NULL,
  `TenBenhNhan` varchar(255) NOT NULL,
  `NgaySinh` date NOT NULL,
  `SoDienThoai` varchar(10) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `SoDienThoaiNguoiThan` varchar(10) NOT NULL,
  `DiaChi` varchar(255) NOT NULL,
  `Retoken` varchar(255) NOT NULL,
  `GioiTinh` varchar(10) NOT NULL,
  `CanNang` float NOT NULL,
  `MaBacSi` varchar(255) NOT NULL,
  `Avatar` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `benhnhan`
--

INSERT INTO `benhnhan` (`MaBenhNhan`, `TenBenhNhan`, `NgaySinh`, `SoDienThoai`, `Email`, `SoDienThoaiNguoiThan`, `DiaChi`, `Retoken`, `GioiTinh`, `CanNang`, `MaBacSi`, `Avatar`) VALUES
('BN001', 'Nguyễn Thị Ngọc', '1991-01-02', '0978981234', 'ngoc@gmail.com', '0937899789', 'Long Xuyên, An Giang', '1//0e2P8xwa6wa7gCgYIARAAGA4SNwF-L9IrV0Bc2MMkM66y1yo5zU9IJmUK0tH8PLfGvvor_qBBfDRv9nhoCrfavYPNzfsHxm9RLzo', 'Nữ', 65, 'BS001', '1681843722484.png'),
('BN003', 'Anh', '2022-02-10', '1234567890', 'kn167235@gmail.com', '0376270328', 'long xuyên', '', 'Nữ', 45, 'BS002', '1711202880232.jpg'),
('BN006', 'Nguyễn Văn A', '2012-06-22', '1234567890', 'hanh@gmail.com', '0376270328', 'long xuyên', '', 'Nam', 50, 'BS001', '1711202780292.jpg'),
('BN007', 'Nguyễn Văn An', '2013-02-13', '1234567890', 'pl20092002@gmail.com', '5445655666', 'long xuyên', '1//0e51GvTBsE0yDCgYIARAAGA4SNwF-L9IreDkB8IrDRW4UBFCFHCr0UFFf2R5hLbcFNVL64eZBmgUhYtZ-75A8HqobaUTgsU2aw3g', 'Nam', 50, 'BS001', '1711621090270.jpg'),
('BN009', 'Nguyễn B', '2022-06-15', '1234567890', 'kn167235@gmail.com', '0376270328', 'long xuyên', '1//0ehK_0W4mpFafCgYIARAAGA4SNwF-L9IrM9QHGXeGVxPPBtj8faeUP13XIS0fTlIMrok3FjXTwHYWvvjHQ-jBgR3gp9DOqG3gFhw', 'Nữ', 50, 'BS001', '1711620741331.jpg'),
('BN0123', 'Nhật', '2022-02-02', '1234567890', 'hmnhat2002ap@gmail.com', '0376270328', 'long xuyên', '1//0e1f46yumzlrBCgYIARAAGA4SNwF-L9IrVjIYHj0AcBPo42XMN7dOYc4PTaNLvLLABzfNyvMpaE-0m-FQjsXFigefjSIim3hDa3k', 'Nam', 50, 'BS001', '1711624476598.jpg'),
('BN11', 'Ngân', '2023-04-09', '1234567890', 'hanh@gmail.com', '5445655666', 'long xuyên', '1//0e4zvy3oGdLsKCgYIARAAGA4SNwF-L9IrXmHKY9XGt3HTI3KUDxmArC2VDX3nyPy6T4481mpJC7E0mD8zeCJmwuhE5PGbGwkU2Oo', 'Nữ', 45, 'BS002', '1688786232518.png'),
('BN123', 'Nam', '2018-06-15', '1234567890', 'dtkngan@vnkgu.edu.vn', '0376270328', 'long xuyên', '1//0eLfPPqhVeOgVCgYIARAAGA4SNwF-L9IrbkpfD3lq151rN1Tq6fhJI9G4QBAlEo4kmsYbXuDwrpO2_eaHDDMfEPyLdYSztII6Lvs', 'Nam', 50, 'BS005', '1711624802394.jpg'),
('BN777', 'Phan Quang Thái', '2024-04-17', '0111111111', 'phanquangthai2505@gmail.com', '0111111112', 'AG', '1//0en6g3V7n7RcqCgYIARAAGA4SNwF-L9IrELt6pEgPt7Ay8X_Mt7hsePyQ_8BXP5jt06SQBq1sX0jDUmHRw0XV9VRokXsvO4F6K_w', 'Nam', 20, 'BS002', '1712031865790.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `chisosuckhoe`
--

CREATE TABLE `chisosuckhoe` (
  `Id` int(11) NOT NULL,
  `MaBenhNhan` varchar(255) DEFAULT NULL,
  `NhipTim` float DEFAULT NULL,
  `SpO2` float DEFAULT NULL,
  `HATThu` float DEFAULT NULL,
  `HATTRUONG` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitiet_uongthuoc`
--

CREATE TABLE `chitiet_uongthuoc` (
  `Id` int(11) NOT NULL,
  `Id_Thuoc` int(11) DEFAULT NULL,
  `LieuLuong` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hoidap`
--

CREATE TABLE `hoidap` (
  `Id` int(11) NOT NULL,
  `Id_Noidung` int(11) DEFAULT NULL,
  `Id_BenhNhan` varchar(255) DEFAULT NULL,
  `Id_BacSi` varchar(255) DEFAULT NULL,
  `NoiDung` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lichkham`
--

CREATE TABLE `lichkham` (
  `Id` int(11) NOT NULL,
  `Id_BenhNhan` varchar(255) NOT NULL,
  `Id_BacSi` varchar(255) NOT NULL,
  `NgayHen` date NOT NULL,
  `TrangThai` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `lichkham`
--

INSERT INTO `lichkham` (`Id`, `Id_BenhNhan`, `Id_BacSi`, `NgayHen`, `TrangThai`) VALUES
(1, 'BN001', 'BS002', '2024-04-10', 'Đã đặt');

-- --------------------------------------------------------

--
-- Table structure for table `nguoidung`
--

CREATE TABLE `nguoidung` (
  `Id` int(11) NOT NULL,
  `TenDangNhap` varchar(255) NOT NULL,
  `MatKhau` text NOT NULL,
  `Quyen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `nguoidung`
--

INSERT INTO `nguoidung` (`Id`, `TenDangNhap`, `MatKhau`, `Quyen`) VALUES
(0, 'BN777', '$2b$10$v1T82Dzht1FnpvFnWcI3nOhGZkrobUr0cpsenaVRsys0IM1E9z2x6', 3),
(1, 'admin1', '$2b$10$kxveS/MI7sYSQA38eSqf1OBBIxGy0nw6FFouT4OYTMq2dJAYIIaYO', 1),
(2, 'BS001', '$2b$10$ik0EuwnjjSGG3s.4wQgzpe4alFwg/GPGVehkuRCQ8B.4pfcwz5aGi', 2),
(3, 'BS002', '$2b$10$cek/Ke2v4t2SChmwDmoKBe7aovwDTEsFMDh4KfChaNtEB9EQybuZK', 2),
(4, 'BN001', '$2b$10$D5WYbrVztp0yfcJo96Ad0uA/6sWQi..2t3we6nIHGnLPLrLFFNwWS', 3),
(5, 'BN11', '$2b$10$8Ji9saVLW6Ejg7lBAhZfTOqQZcJsIlJqUPEBp6c27n8fmbmF6euMi', 3),
(6, 'admin2', '$2b$10$Aasw0NxFKnFpS5Wmm6.JDeQf8NeB8ikjyhsThmQJ2rQUvwrKdLvby', 1),
(7, 'BN004', '$2b$10$4oZIwWacJV35aDzFfeQgOejZVmy4vSQj31z2QMEKFKOcDrA3.Zlk2', 2),
(8, 'BS004', '$2b$10$979e9HA5.2artXSppCoNDuQ8/MWbFqbDr.xIokpi1.af3NZYhLLm2', 2),
(9, 'BS003', '$2b$10$Xdrg34RArA5NZEGvKizVvu6ofrqhJte468zsMR5A.1FaHAVaKNx0K', 2),
(10, 'BN006', '$2b$10$jgPHqWiMxYgIbnJaApQ0s.RrkWPU8LJMNCpNn4j6IXfBd1F.3./zK', 3),
(11, 'BN003', '$2b$10$ur2qpp1R4ojnfNLrmyYRCOpuDlT.8bqY27qowGzn2d6kvgQachOsK', 3),
(12, 'BN009', '$2b$10$jmDWwydUiVjEeuEk.ka4auwWUV6cAqa7xmHmoLwl8l5EjY53rNNDy', 3),
(13, 'BN007', '$2b$10$h1jslhyUBVXUPnGcqeidhebLNIlTwmXVEyvaCdHk1q4Hw.ZlpA1mW', 3),
(14, 'BN0123', '$2b$10$phpzEkXKn52gf8OEDnvo5.CYxycBPuuFou0L0bj4DHEmKRLn923iS', 3),
(15, 'BN123', '$2b$10$Yn500ejh3LngHbMpNunBJOUBzAndAeCkjJk1NGtVv3MhBUODrxC5K', 3),
(16, 'BS005', '$2b$10$g6IXlTgtL62visVa70X/5.TsrzGtH8irKr8393HHB/4WUa771sY9i', 2);

-- --------------------------------------------------------

--
-- Table structure for table `thongbao_bacsi`
--

CREATE TABLE `thongbao_bacsi` (
  `Id` int(11) NOT NULL,
  `TieuDe` varchar(255) DEFAULT NULL,
  `NoiDung` varchar(255) DEFAULT NULL,
  `LoaiThongBao` varchar(20) DEFAULT NULL,
  `Id_BacSi` varchar(255) DEFAULT NULL,
  `ThoiGian` datetime DEFAULT NULL,
  `TrangThai` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thongbao_benhnhan`
--

CREATE TABLE `thongbao_benhnhan` (
  `Id` int(11) NOT NULL,
  `TieuDe` varchar(255) DEFAULT NULL,
  `NoiDung` varchar(255) DEFAULT NULL,
  `LoaiThongBao` varchar(20) DEFAULT NULL,
  `Id_BenhNhan` varchar(255) DEFAULT NULL,
  `ThoiGian` datetime DEFAULT NULL,
  `TrangThai` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thuoc`
--

CREATE TABLE `thuoc` (
  `Id` int(11) NOT NULL,
  `TenThuoc` varchar(255) DEFAULT NULL,
  `DonVi` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `uongthuoc`
--

CREATE TABLE `uongthuoc` (
  `Id` int(11) NOT NULL,
  `NhacNho` varchar(255) DEFAULT NULL,
  `GioUong` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Id_BenhNhan` varchar(255) DEFAULT NULL,
  `Id_Bacsi` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vitri_benhnhan`
--

CREATE TABLE `vitri_benhnhan` (
  `Id` int(11) NOT NULL,
  `Id_BenhNhan` varchar(255) DEFAULT NULL,
  `Lat` decimal(9,6) DEFAULT NULL,
  `Long` decimal(9,6) DEFAULT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `ThoiGian` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `vitri_benhnhan`
--

INSERT INTO `vitri_benhnhan` (`Id`, `Id_BenhNhan`, `Lat`, `Long`, `DiaChi`, `ThoiGian`) VALUES
(1, 'BN001', 10.538695, 105.489525, 'Nhà trọ 5 Điền', '2024-04-03 06:14:25'),
(2, 'BN003', 10.372597, 105.434140, 'Circle K', '2024-04-03 04:21:56'),
(3, 'BN006', 10.373071, 105.433553, 'PhotcopyTam', '2024-04-03 04:22:06');

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
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_BenhNhan` (`Id_BenhNhan`);

--
-- Indexes for table `benhnhan`
--
ALTER TABLE `benhnhan`
  ADD PRIMARY KEY (`MaBenhNhan`),
  ADD KEY `MaBacSi` (`MaBacSi`);

--
-- Indexes for table `chisosuckhoe`
--
ALTER TABLE `chisosuckhoe`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `chitiet_uongthuoc`
--
ALTER TABLE `chitiet_uongthuoc`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Thuoc` (`Id_Thuoc`);

--
-- Indexes for table `hoidap`
--
ALTER TABLE `hoidap`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Noidung` (`Id_Noidung`),
  ADD KEY `Id_BenhNhan` (`Id_BenhNhan`),
  ADD KEY `Id_BacSi` (`Id_BacSi`);

--
-- Indexes for table `lichkham`
--
ALTER TABLE `lichkham`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_lk_bs` (`Id_BacSi`),
  ADD KEY `fk_lk_bn` (`Id_BenhNhan`);

--
-- Indexes for table `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `thongbao_bacsi`
--
ALTER TABLE `thongbao_bacsi`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_BacSi` (`Id_BacSi`);

--
-- Indexes for table `thongbao_benhnhan`
--
ALTER TABLE `thongbao_benhnhan`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_BenhNhan` (`Id_BenhNhan`);

--
-- Indexes for table `thuoc`
--
ALTER TABLE `thuoc`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `uongthuoc`
--
ALTER TABLE `uongthuoc`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_BenhNhan` (`Id_BenhNhan`),
  ADD KEY `Id_Bacsi` (`Id_Bacsi`);

--
-- Indexes for table `vitri_benhnhan`
--
ALTER TABLE `vitri_benhnhan`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_BenhNhan` (`Id_BenhNhan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `benhan`
--
ALTER TABLE `benhan`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chitiet_uongthuoc`
--
ALTER TABLE `chitiet_uongthuoc`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hoidap`
--
ALTER TABLE `hoidap`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lichkham`
--
ALTER TABLE `lichkham`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `thongbao_bacsi`
--
ALTER TABLE `thongbao_bacsi`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `thongbao_benhnhan`
--
ALTER TABLE `thongbao_benhnhan`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `thuoc`
--
ALTER TABLE `thuoc`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `uongthuoc`
--
ALTER TABLE `uongthuoc`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vitri_benhnhan`
--
ALTER TABLE `vitri_benhnhan`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `benhan`
--
ALTER TABLE `benhan`
  ADD CONSTRAINT `benhan_ibfk_1` FOREIGN KEY (`Id_BenhNhan`) REFERENCES `benhnhan` (`MaBenhNhan`);

--
-- Constraints for table `benhnhan`
--
ALTER TABLE `benhnhan`
  ADD CONSTRAINT `benhnhan_ibfk_1` FOREIGN KEY (`MaBacSi`) REFERENCES `bacsi` (`MaBacSi`);

--
-- Constraints for table `chitiet_uongthuoc`
--
ALTER TABLE `chitiet_uongthuoc`
  ADD CONSTRAINT `chitiet_uongthuoc_ibfk_1` FOREIGN KEY (`Id_Thuoc`) REFERENCES `thuoc` (`Id`);

--
-- Constraints for table `hoidap`
--
ALTER TABLE `hoidap`
  ADD CONSTRAINT `hoidap_ibfk_1` FOREIGN KEY (`Id_Noidung`) REFERENCES `hoidap` (`Id`),
  ADD CONSTRAINT `hoidap_ibfk_2` FOREIGN KEY (`Id_BenhNhan`) REFERENCES `benhnhan` (`MaBenhNhan`),
  ADD CONSTRAINT `hoidap_ibfk_3` FOREIGN KEY (`Id_BacSi`) REFERENCES `bacsi` (`MaBacSi`);

--
-- Constraints for table `lichkham`
--
ALTER TABLE `lichkham`
  ADD CONSTRAINT `fk_lk_bn` FOREIGN KEY (`Id_BenhNhan`) REFERENCES `benhnhan` (`MaBenhNhan`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_lk_bs` FOREIGN KEY (`Id_BacSi`) REFERENCES `bacsi` (`MaBacSi`) ON DELETE CASCADE;

--
-- Constraints for table `thongbao_bacsi`
--
ALTER TABLE `thongbao_bacsi`
  ADD CONSTRAINT `thongbao_bacsi_ibfk_1` FOREIGN KEY (`Id_BacSi`) REFERENCES `bacsi` (`MaBacSi`);

--
-- Constraints for table `thongbao_benhnhan`
--
ALTER TABLE `thongbao_benhnhan`
  ADD CONSTRAINT `thongbao_benhnhan_ibfk_1` FOREIGN KEY (`Id_BenhNhan`) REFERENCES `benhnhan` (`MaBenhNhan`);

--
-- Constraints for table `uongthuoc`
--
ALTER TABLE `uongthuoc`
  ADD CONSTRAINT `uongthuoc_ibfk_1` FOREIGN KEY (`Id_BenhNhan`) REFERENCES `benhnhan` (`MaBenhNhan`),
  ADD CONSTRAINT `uongthuoc_ibfk_2` FOREIGN KEY (`Id_Bacsi`) REFERENCES `bacsi` (`MaBacSi`);

--
-- Constraints for table `vitri_benhnhan`
--
ALTER TABLE `vitri_benhnhan`
  ADD CONSTRAINT `vitri_benhnhan_ibfk_1` FOREIGN KEY (`Id_BenhNhan`) REFERENCES `benhnhan` (`MaBenhNhan`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
