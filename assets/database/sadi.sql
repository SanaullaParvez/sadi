-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 25, 2017 at 01:03 PM
-- Server version: 5.5.52-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sadi`
--

-- --------------------------------------------------------

--
-- Table structure for table `buyers`
--

CREATE TABLE IF NOT EXISTS `buyers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_no` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_no` (`account_no`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Table structure for table `buys`
--

CREATE TABLE IF NOT EXISTS `buys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_data` date NOT NULL,
  `receipt_no` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `seller_id` int(11) NOT NULL,
  `stone_id` int(11) NOT NULL,
  `quantity` decimal(8,2) NOT NULL,
  `rate` decimal(8,2) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `details` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cash` decimal(8,2) NOT NULL,
  `due` decimal(8,2) NOT NULL,
  `sector_id` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `receipt_no` (`receipt_no`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE IF NOT EXISTS `expenses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_data` date NOT NULL,
  `receipt_no` int(11) NOT NULL,
  `sector_id` int(11) NOT NULL,
  `buyer_id` int(11) DEFAULT NULL,
  `amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `cash` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `receipt_no` (`receipt_no`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

-- --------------------------------------------------------

--
-- Table structure for table `expense_sectors`
--

CREATE TABLE IF NOT EXISTS `expense_sectors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=15 ;

--
-- Dumping data for table `expense_sectors`
--

INSERT INTO `expense_sectors` (`id`, `name`) VALUES
(12, 'অন্যান্য'),
(6, 'অফিস খরচ'),
(7, 'খওয়া খরচ'),
(2, 'টমটম'),
(9, 'দান অনুদান'),
(1, 'পাথর'),
(11, 'ভাড়া'),
(5, 'মালিক'),
(3, 'মিস্ত্রী / ড্রাইভার'),
(8, 'মেহমান খরচ'),
(4, 'ম্যানেজার'),
(10, 'লেবার');

-- --------------------------------------------------------

--
-- Table structure for table `incomes`
--

CREATE TABLE IF NOT EXISTS `incomes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_data` date NOT NULL,
  `receipt_no` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `amount` decimal(15,2) DEFAULT '0.00',
  `cash` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `receipt_no` (`receipt_no`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE IF NOT EXISTS `sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_data` date NOT NULL,
  `receipt_no` int(50) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `stone_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `rate` decimal(8,2) NOT NULL DEFAULT '0.00',
  `amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `details` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cash` decimal(10,2) NOT NULL DEFAULT '0.00',
  `arrears` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `receipt_no` (`receipt_no`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=15 ;

-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE TABLE IF NOT EXISTS `sellers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_no` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_no` (`account_no`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `stones`
--

CREATE TABLE IF NOT EXISTS `stones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=10 ;

--
-- Dumping data for table `stones`
--

INSERT INTO `stones` (`id`, `name`) VALUES
(2, 'ভুতু'),
(8, 'ভুতু ১/২'),
(7, 'ভুতু ৩/৪'),
(9, 'ভুতু ৫/১০'),
(1, 'ভোন্ভার'),
(5, 'ভোন্ভার ১/২'),
(4, 'ভোন্ভার ৩/৪'),
(6, 'ভোন্ভার ৫/১০'),
(3, 'সিঙ্গেল');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
