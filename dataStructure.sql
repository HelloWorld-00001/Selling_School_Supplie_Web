/*
 Navicat Premium Data Transfer

 Source Server         : mamp
 Source Server Type    : MySQL
 Source Server Version : 50638
 Source Host           : 127.0.0.1:8889
 Source Schema         : qlbh

 Target Server Type    : MySQL
 Target Server Version : 50638
 File Encoding         : 65001

 Date: 23/08/2018 18:56:44
*/
DROP DATABASE IF EXISTS qlbandodunghoctap;
CREATE DATABASE qlbandodunghoctap;
use qlbandodunghoctap;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for
-- ---------------------------
DROP TABLE IF EXISTS Category;
CREATE TABLE Category (
    CatID INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    CatName VARCHAR(50) COLLATE UTF8_GENERAL_CI NOT NULL,
    PRIMARY KEY (CatID)
)  ENGINE=MYISAM AUTO_INCREMENT=22 DEFAULT CHARSET=UTF8 COLLATE = UTF8_GENERAL_CI;



-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS Product;
CREATE TABLE Product (
  ProductID int(11) unsigned NOT NULL AUTO_INCREMENT,
  ProductName VARCHAR(100) COLLATE UTF8_GENERAL_CI NOT NULL,
  CatID int(11),
  Price float not null,
  TinyDes VARCHAR(200) COLLATE UTF8_GENERAL_CI NOT NULL,
  FullDes Text COLLATE UTF8_GENERAL_CI NOT NULL,
  Image varchar(255),
  Discount float,
  AvgRate float,
  ToTalLike int,
  Quantity  int,
  
  PRIMARY KEY (ProductID),
  Foreign key(CatID) references Category(CatID)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
-- ----------------------------
-- Table structure for CourseDetail
-- ----------------------------
DROP TABLE IF EXISTS Account;
CREATE TABLE Account (
  AccountID int(11) unsigned NOT NULL AUTO_INCREMENT,
  Username varchar(100) not null UNIQUE,
  Password text COLLATE utf8_general_ci NOT NULL,
  Name varchar(50) COLLATE UTF8_GENERAL_CI NOT NULL,
  Email varchar(150) not null UNIQUE,
  DOB date,
  AccountType varchar(11) not null,
  isAdmin bit,
  
  PRIMARY KEY (AccountID)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for products
-- ----------------------------
-- ----------------------------
-- Table structure for Teacher
-- ----------------------------
DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders (
  OrderID int(11) NOT NULL ,
  CustomerID int(11) NOT NULL ,
  OrderDate datetime,
  TotalPrice float,
  Note VARCHAR(100),

  PRIMARY KEY (OrderID),
  foreign key(CustomerID) references Account(AccountID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for Account
-- ----------------------------
DROP TABLE IF EXISTS OrderDetail;
CREATE TABLE OrderDetail (
  OrderID int(11) NOT NULL ,
  ProductID int(11) NOT NULL ,
  Quantity int,
  Price float,

  PRIMARY KEY (OrderID, ProductID),
  foreign key(ProductID) references Product(ProductID),
  foreign key(OrderID) references Orders(OrderID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- ----------------------------
-- Table structure for Account
-- ----------------------------
DROP TABLE IF EXISTS ReviewProduct;
CREATE TABLE ReviewProduct (
  CustomerID int(11) NOT NULL ,
  ProductID int(11) NOT NULL ,
  Rate int,
  isLike bit,
  Comment VARCHAR(250) COLLATE utf8_general_ci,

  PRIMARY KEY (CustomerID, ProductID),
  foreign key(ProductID) references Product(ProductID),
  foreign key(CustomerID) references Account(AccountID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

ALTER TABLE Product ADD FULLTEXT(ProductName);
SET FOREIGN_KEY_CHECKS = 1;
