/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80300
 Source Host           : localhost
 Source Database       : julycms

 Target Server Type    : MySQL
 Target Server Version : 80300
 File Encoding         : utf-8

 Date: 05/14/2024 15:04:32 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `july_album`
-- ----------------------------
DROP TABLE IF EXISTS `july_album`;
CREATE TABLE `july_album` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `listorder` smallint NOT NULL DEFAULT '99' COMMENT '排序',
  `imgId` int DEFAULT NULL,
  `documentId` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL COMMENT '图片描述',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_321cf51dca8ce5cb884ea3b98a0` (`documentId`),
  CONSTRAINT `FK_321cf51dca8ce5cb884ea3b98a0` FOREIGN KEY (`documentId`) REFERENCES `july_document` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_album`
-- ----------------------------
BEGIN;
INSERT INTO `july_album` VALUES ('1', '2023-12-25 10:48:52.411257', '2023-12-25 10:48:52.411257', '1', '9', '5', null), ('2', '2023-12-26 19:30:19.934032', '2023-12-26 19:30:19.934032', '1', '2', '6', null);
COMMIT;

-- ----------------------------
--  Table structure for `july_attachement`
-- ----------------------------
DROP TABLE IF EXISTS `july_attachement`;
CREATE TABLE `july_attachement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `url` varchar(128) DEFAULT NULL COMMENT 'url',
  `size` int DEFAULT '0' COMMENT '文件大小',
  `operatorType` tinyint(1) DEFAULT '1' COMMENT '操作人类型；0 未知； 1 管理员；2 用户',
  `operatorId` int DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1' COMMENT '关联数据状态；0 未使用；1 正在使用',
  `mimetype` varchar(255) DEFAULT NULL COMMENT '文件类型',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_f3b889d308bd04baf8e5abcf69f` (`operatorId`),
  CONSTRAINT `FK_f3b889d308bd04baf8e5abcf69f` FOREIGN KEY (`operatorId`) REFERENCES `july_manager` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Table structure for `july_category`
-- ----------------------------
DROP TABLE IF EXISTS `july_category`;
CREATE TABLE `july_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `catname` varchar(64) NOT NULL COMMENT '栏目名称',
  `catnameEn` varchar(64) DEFAULT NULL COMMENT '栏目名称英文',
  `seoTitle` varchar(128) DEFAULT NULL COMMENT 'SEO标题',
  `parentId` int DEFAULT NULL,
  `siteModelId` int DEFAULT NULL,
  `display` tinyint(1) DEFAULT '1' COMMENT '是否显示',
  `listorder` smallint DEFAULT '99' COMMENT '排序',
  `coverId` int DEFAULT NULL,
  `count` smallint DEFAULT '0' COMMENT '文档数量',
  `catdir` varchar(64) NOT NULL COMMENT '栏目目录',
  `description` varchar(255) DEFAULT NULL COMMENT '栏目描述',
  `seoKeywords` varchar(255) DEFAULT NULL COMMENT 'SEO关键词',
  `seoDescription` varchar(255) DEFAULT NULL COMMENT 'SEO描述',
  `linkUrl` varchar(255) DEFAULT NULL COMMENT '链接地址',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_47742d742c4a1f9e15f9e0d4bb` (`catname`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `IDX_f607b9c3aea27173f218f7a4d7` (`catdir`),
  KEY `FK_f213424a63b736ae66d2cd823ea` (`parentId`),
  CONSTRAINT `FK_f213424a63b736ae66d2cd823ea` FOREIGN KEY (`parentId`) REFERENCES `july_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_category`
-- ----------------------------
BEGIN;
INSERT INTO `july_category` VALUES ('1', '2023-07-17 19:15:49.308632', '2024-04-22 02:51:51.000000', '关于我们', 'about', '关于我们 - Julycms七月内容管理系统，专业级CMS平台解决方案', null, '3', '1', '99', '1', '1', 'about', null, null, null, null), ('4', '2023-07-17 19:25:38.860728', '2024-01-26 17:05:52.000000', '产品中心', 'products', null, null, '2', '1', '99', '2', '2', 'products', null, null, null, null), ('5', '2023-07-17 19:26:15.825790', '2024-01-26 17:05:52.000000', '历史案例', 'cases', null, null, '2', '1', '99', '3', '0', 'cases', null, null, null, null), ('6', '2023-07-17 19:26:43.061144', '2024-01-26 17:05:52.000000', '新闻动态', 'news', null, null, '1', '1', '99', '15', '0', 'news', null, null, null, null), ('7', '2023-07-17 19:27:25.030557', '2024-01-26 17:05:52.000000', '联系我们', 'contact', null, null, '3', '1', '99', '14', '1', 'contact', null, null, null, null), ('8', '2023-08-29 17:55:26.361208', '2024-01-26 17:05:52.000000', '111', '111', '11', null, '1', '1', '99', '4', '0', '111', null, null, null, null), ('10', '2023-08-30 06:54:34.075648', '2024-01-26 17:05:52.000000', '222', '222', '22', '8', '3', '1', '99', null, '1', '222', null, null, null, null), ('11', '2023-08-30 06:59:57.414649', '2024-01-26 17:05:52.000000', '友情链接', 'links', null, '8', '4', '1', '99', '16', '0', 'links', null, null, null, null);
COMMIT;

-- ----------------------------
--  Table structure for `july_category_closure`
-- ----------------------------
DROP TABLE IF EXISTS `july_category_closure`;
CREATE TABLE `july_category_closure` (
  `id_ancestor` int NOT NULL,
  `id_descendant` int NOT NULL,
  PRIMARY KEY (`id_ancestor`,`id_descendant`),
  KEY `IDX_d0a398a234e04989dec925b112` (`id_ancestor`),
  KEY `IDX_ee9757ef93c81e4d1ad5348946` (`id_descendant`),
  CONSTRAINT `FK_d0a398a234e04989dec925b1123` FOREIGN KEY (`id_ancestor`) REFERENCES `july_category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ee9757ef93c81e4d1ad5348946d` FOREIGN KEY (`id_descendant`) REFERENCES `july_category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_category_closure`
-- ----------------------------
BEGIN;
INSERT INTO `july_category_closure` VALUES ('1', '1'), ('4', '4'), ('5', '5'), ('6', '6'), ('7', '7'), ('8', '8'), ('8', '10'), ('8', '11'), ('10', '10'), ('11', '11');
COMMIT;

-- ----------------------------
--  Table structure for `july_content`
-- ----------------------------
DROP TABLE IF EXISTS `july_content`;
CREATE TABLE `july_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `content` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_content`
-- ----------------------------
BEGIN;
INSERT INTO `july_content` VALUES ('1', '2023-12-21 16:01:23.098140', '2023-12-21 16:02:57.000000', '<p>关于我们</p>'), ('2', '2023-12-21 16:03:42.771645', '2023-12-21 16:03:49.000000', '<p>联系我们</p>'), ('3', '2023-12-21 16:03:52.366560', '2023-12-21 16:03:52.366560', '222'), ('4', '2023-12-21 16:15:38.122157', '2024-04-24 08:14:20.000000', '<p>关于我们121313123<img src=\"http://localhost/uploads/20240424/1713946281989.png\"></p>'), ('5', '2023-12-21 16:15:42.040726', '2023-12-21 16:15:42.040726', '联系我们'), ('6', '2023-12-21 16:15:45.117129', '2023-12-21 16:15:45.117129', '222'), ('7', '2023-12-25 10:48:52.399484', '2023-12-25 10:48:52.399484', '<p>2123</p>'), ('8', '2023-12-26 19:30:19.917095', '2023-12-26 19:30:19.917095', '<p>sdasDasd</p>');
COMMIT;

-- ----------------------------
--  Table structure for `july_counter`
-- ----------------------------
DROP TABLE IF EXISTS `july_counter`;
CREATE TABLE `july_counter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `type` enum('document') NOT NULL DEFAULT 'document' COMMENT '统计类型',
  `documentId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_8999063326d308cec29b4aee6ec` (`documentId`),
  CONSTRAINT `FK_8999063326d308cec29b4aee6ec` FOREIGN KEY (`documentId`) REFERENCES `july_document` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_counter`
-- ----------------------------
BEGIN;
INSERT INTO `july_counter` VALUES ('1', '2023-12-21 15:28:48.225602', '2023-12-27 17:11:18.683016', 'document', '1'), ('2', '2023-12-21 15:29:21.152608', '2023-12-27 17:11:18.684526', 'document', '1'), ('3', '2023-12-22 15:29:21.154170', '2023-12-27 17:11:18.685047', 'document', '1'), ('4', '2023-12-22 15:29:39.070487', '2023-12-27 17:11:18.685524', 'document', '2'), ('5', '2023-12-22 15:29:39.072657', '2023-12-27 17:11:18.685982', 'document', '2'), ('6', '2023-12-23 15:29:39.073227', '2023-12-27 17:11:18.686497', 'document', '2'), ('7', '2023-12-23 15:29:39.073817', '2023-12-27 17:11:18.686944', 'document', '2'), ('8', '2023-12-24 15:29:39.074307', '2023-12-27 17:11:18.687433', 'document', '2'), ('9', '2023-12-26 15:37:26.874639', '2023-12-27 15:37:40.345985', 'document', '3'), ('10', '2023-12-26 15:37:26.876239', '2023-12-27 17:45:00.081916', 'document', '6'), ('11', '2023-12-26 15:37:26.876941', '2023-12-27 15:37:40.347927', 'document', '3'), ('12', '2023-12-26 15:37:26.877783', '2023-12-27 15:37:40.348417', 'document', '3'), ('13', '2023-12-26 15:37:26.878984', '2023-12-27 15:37:40.348890', 'document', '3'), ('14', '2023-12-10 17:40:40.552661', '2023-12-27 17:41:35.437675', 'document', '5'), ('15', '2023-12-10 17:40:40.554718', '2023-12-27 17:41:35.439269', 'document', '5'), ('16', '2023-12-10 17:40:40.555303', '2023-12-27 17:41:35.439852', 'document', '6'), ('17', '2023-12-13 17:40:40.555801', '2023-12-27 17:41:35.440398', 'document', '5'), ('18', '2023-12-14 17:40:40.556363', '2023-12-27 17:41:35.440852', 'document', '6'), ('19', '2023-12-12 17:40:40.556989', '2023-12-27 17:41:35.441349', 'document', '2');
COMMIT;

-- ----------------------------
--  Table structure for `july_dict`
-- ----------------------------
DROP TABLE IF EXISTS `july_dict`;
CREATE TABLE `july_dict` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `name` varchar(16) NOT NULL COMMENT '名称',
  `type` varchar(16) NOT NULL COMMENT '标识',
  `display` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否显示',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `IDX_bd208c513acbc616b6ae5d2e4d` (`name`),
  UNIQUE KEY `IDX_710fd381c3fd9ec0236a7bc474` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_dict`
-- ----------------------------
BEGIN;
INSERT INTO `july_dict` VALUES ('1', '2023-08-13 15:21:09.965661', '2023-08-13 15:21:09.965661', '颜色风格', 'style', '1', null), ('3', '2023-09-26 08:45:33.157608', '2023-09-26 08:46:19.000000', '敏感词类别', 'sencetive', '1', null), ('4', '2023-12-24 15:17:06.228946', '2023-12-26 08:29:28.000000', '文件大小管理', 'filesize', '1', null);
COMMIT;

-- ----------------------------
--  Table structure for `july_dict_value`
-- ----------------------------
DROP TABLE IF EXISTS `july_dict_value`;
CREATE TABLE `july_dict_value` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `label` varchar(16) NOT NULL COMMENT '枚举名称',
  `style` varchar(16) NOT NULL COMMENT '颜色风格',
  `display` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否显示',
  `listorder` tinyint unsigned NOT NULL DEFAULT '1' COMMENT '排序',
  `dictId` int DEFAULT NULL,
  `value` varchar(32) NOT NULL COMMENT '枚举值',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `IDX_7b916afec71557446d91493f1d` (`label`),
  KEY `FK_b79a6cfe4a1f13bd524930ae128` (`dictId`),
  CONSTRAINT `FK_b79a6cfe4a1f13bd524930ae128` FOREIGN KEY (`dictId`) REFERENCES `july_dict` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_dict_value`
-- ----------------------------
BEGIN;
INSERT INTO `july_dict_value` VALUES ('1', '2023-08-13 15:21:20.263141', '2023-12-24 15:29:39.000000', '默认', 'default', '1', '99', '1', 'default'), ('2', '2023-08-13 15:26:26.498444', '2023-12-24 15:29:58.000000', '主要', 'primary', '1', '99', '1', 'primary'), ('3', '2023-08-13 15:26:37.280439', '2023-12-24 15:30:04.000000', '成功', 'success', '1', '99', '1', 'success'), ('4', '2023-08-13 15:26:47.134048', '2023-12-24 15:30:28.000000', '信息', 'info', '1', '99', '1', 'info'), ('5', '2023-08-13 15:26:57.432598', '2023-12-24 15:30:37.000000', '警告', 'danger', '1', '99', '1', 'warning'), ('6', '2023-08-13 15:27:12.953670', '2023-12-24 15:30:46.000000', '危险', 'warning', '1', '99', '1', 'danger'), ('8', '2023-09-26 08:46:40.505208', '2023-12-24 15:30:56.000000', '广告', 'default', '1', '99', '3', '1'), ('9', '2023-09-26 08:47:02.258761', '2023-12-24 15:30:59.000000', '政治', 'default', '1', '99', '3', '2'), ('10', '2023-09-26 08:47:10.426439', '2023-12-24 15:31:03.000000', '涉枪涉爆', 'default', '1', '99', '3', '3'), ('11', '2023-09-26 08:47:18.303598', '2023-12-24 15:31:06.000000', '网址', 'default', '1', '99', '3', '4'), ('12', '2023-09-26 08:47:25.138054', '2023-12-24 15:31:09.000000', '色情', 'default', '1', '99', '3', '5'), ('13', '2023-09-26 08:47:52.729666', '2023-12-24 15:31:14.000000', '极限用语', 'default', '1', '99', '3', '6'), ('14', '2023-09-26 08:48:01.464166', '2023-12-24 15:31:17.000000', '权威性词语', 'default', '1', '99', '3', '7'), ('15', '2023-09-26 08:48:08.897946', '2023-12-24 15:31:20.000000', '封建迷信', 'default', '1', '99', '3', '8'), ('16', '2023-09-26 08:48:27.151723', '2023-12-24 15:31:24.000000', '虚假宣传', 'default', '1', '99', '3', '9'), ('17', '2023-12-24 15:17:39.987130', '2023-12-24 15:31:41.000000', '1K以下', 'default', '1', '99', '4', '0-1024'), ('18', '2023-12-24 15:21:05.486786', '2023-12-24 15:31:57.000000', '1K~1M', 'default', '1', '99', '4', '1024-1048576'), ('19', '2023-12-24 15:21:36.521029', '2023-12-24 15:32:10.000000', '1M~5M', 'default', '1', '99', '4', '1048576-5242880'), ('20', '2023-12-24 15:23:43.739383', '2023-12-24 15:32:28.000000', '5M~10M', 'default', '1', '99', '4', '5242880-1073741824');
COMMIT;

-- ----------------------------
--  Table structure for `july_document`
-- ----------------------------
DROP TABLE IF EXISTS `july_document`;
CREATE TABLE `july_document` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `title` varchar(64) NOT NULL COMMENT '标题',
  `subTitle` varchar(64) DEFAULT NULL COMMENT '副标题',
  `seoTitle` varchar(128) DEFAULT NULL COMMENT 'SEO标题',
  `display` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否显示',
  `readNum` int unsigned NOT NULL DEFAULT '999' COMMENT '阅读数',
  `likeNum` int unsigned NOT NULL DEFAULT '999' COMMENT '点赞数',
  `coverId` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `contentId` int DEFAULT NULL,
  `linkId` int DEFAULT NULL,
  `seoKeywords` varchar(255) DEFAULT NULL COMMENT 'SEO关键词',
  `seoDescription` varchar(255) DEFAULT NULL COMMENT 'SEO描述',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_fa09a203cb66ef78ace7beb1c1f` (`categoryId`),
  CONSTRAINT `FK_fa09a203cb66ef78ace7beb1c1f` FOREIGN KEY (`categoryId`) REFERENCES `july_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_document`
-- ----------------------------
BEGIN;
INSERT INTO `july_document` VALUES ('1', '2023-12-21 16:15:38.128289', '2024-04-18 10:07:07.000000', '关于我们', '12', null, '1', '999', '999', null, '1', '4', null, null, null), ('2', '2023-12-21 16:15:42.047019', '2023-12-21 16:15:42.047019', '联系我们', null, null, '1', '999', '999', null, '7', '5', null, null, null), ('3', '2023-12-21 16:15:45.121623', '2023-12-21 16:15:45.121623', '222', null, null, '1', '999', '999', null, '10', '6', null, null, null), ('5', '2023-12-25 10:48:52.409060', '2023-12-25 10:48:52.409060', '1123123', null, null, '1', '999', '999', '8', '4', '7', null, null, null), ('6', '2023-12-26 19:30:19.930182', '2023-12-26 19:30:19.930182', 'adfasdfasd', 'd', null, '1', '1999', '999', '1', '4', '8', null, null, null);
COMMIT;

-- ----------------------------
--  Table structure for `july_document_tags_tag`
-- ----------------------------
DROP TABLE IF EXISTS `july_document_tags_tag`;
CREATE TABLE `july_document_tags_tag` (
  `documentId` int NOT NULL,
  `tagId` int NOT NULL,
  PRIMARY KEY (`documentId`,`tagId`),
  KEY `IDX_91dc1ff23d3b6a6f23d463d6f8` (`documentId`),
  KEY `IDX_6ae49fca0e8e6cc4453dfe44e3` (`tagId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Table structure for `july_link`
-- ----------------------------
DROP TABLE IF EXISTS `july_link`;
CREATE TABLE `july_link` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `listorder` smallint NOT NULL DEFAULT '99' COMMENT '排序',
  `follow` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否追踪: 0 nofollow; 1 follow',
  `target` tinyint(1) NOT NULL DEFAULT '0' COMMENT '打开方式: 0 _self；1 _blank; 2 _parent; 3 _top',
  `url` varchar(255) NOT NULL COMMENT 'url',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_link`
-- ----------------------------
BEGIN;
INSERT INTO `july_link` VALUES ('1', '2023-12-21 16:16:00.337595', '2023-12-21 16:16:20.000000', '99', '1', '0', '');
COMMIT;

-- ----------------------------
--  Table structure for `july_login_log`
-- ----------------------------
DROP TABLE IF EXISTS `july_login_log`;
CREATE TABLE `july_login_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `username` varchar(32) NOT NULL COMMENT '登录用户',
  `ip` varchar(16) DEFAULT NULL COMMENT 'ip地址',
  `address` varchar(64) DEFAULT NULL COMMENT 'ip地址所在地区',
  `os` varchar(32) DEFAULT NULL COMMENT '操作系统信息',
  `browser` varchar(32) DEFAULT NULL COMMENT '浏览器信息',
  `status` tinyint(1) DEFAULT '1' COMMENT '操作结果',
  `description` varchar(128) DEFAULT NULL COMMENT '操作描述',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Table structure for `july_manager`
-- ----------------------------
DROP TABLE IF EXISTS `july_manager`;
CREATE TABLE `july_manager` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL COMMENT '账号',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `realname` varchar(16) DEFAULT NULL COMMENT '真实姓名',
  `email` varchar(32) DEFAULT NULL COMMENT '邮箱',
  `phoneNumber` varchar(16) DEFAULT NULL COMMENT '电话号码',
  `lastLoginTime` timestamp NULL DEFAULT NULL COMMENT '最后登录时间',
  `lastLoginIp` varchar(32) DEFAULT NULL COMMENT '最后登录Ip',
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否超级管理员， 1 是； 0 否',
  `avatarId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_50af724acca470f2149d1d9524` (`username`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_manager`
-- ----------------------------
BEGIN;
INSERT INTO `july_manager` VALUES ('1', 'julycms', '$2a$10$qHQnW7fROy6hR/MzNxKwluAHPEDv3km3DG6S3dY/OowwncVjoQZnm', 'julycms', null, null, null, null, '2023-07-16 14:50:38.594480', '2023-12-25 16:11:14.000000', '1', '4'), ('2', 'admin', '$2a$10$ofLRPQCmnH/HwX7MAfbBLuE.x65HLftLIMhxnMzekMcyaCP.4mR.m', 'admin', null, null, null, null, '2023-07-16 14:50:38.000000', '2023-07-16 14:50:38.000000', '0', null), ('5', 'test', '$2a$10$SPv7EsaUxU8a0igI8suwEufPSjPH4LatWatrAJp.IYKYiutab.hVG', 'test', null, null, null, null, '2024-01-11 18:29:37.820153', '2024-01-11 18:29:37.820153', '0', null);
COMMIT;

-- ----------------------------
--  Table structure for `july_manager_roles_role`
-- ----------------------------
DROP TABLE IF EXISTS `july_manager_roles_role`;
CREATE TABLE `july_manager_roles_role` (
  `managerId` int NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`managerId`,`roleId`),
  KEY `IDX_223c0fb16cd352126ae8f5e916` (`managerId`),
  KEY `IDX_a01440796aa572c25f42faae15` (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_manager_roles_role`
-- ----------------------------
BEGIN;
INSERT INTO `july_manager_roles_role` VALUES ('1', '1'), ('2', '2'), ('5', '2');
COMMIT;

-- ----------------------------
--  Table structure for `july_menu`
-- ----------------------------
DROP TABLE IF EXISTS `july_menu`;
CREATE TABLE `july_menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '类型; 0目录 1菜单 2按钮',
  `name` varchar(32) NOT NULL COMMENT '名称',
  `mark` varchar(32) DEFAULT NULL COMMENT '标识',
  `icon` varchar(32) DEFAULT NULL COMMENT '图标名称',
  `componentName` varchar(32) DEFAULT NULL COMMENT '组件名称',
  `componentRoute` varchar(128) DEFAULT '/' COMMENT '路由地址',
  `componentPath` varchar(128) DEFAULT 'Layout' COMMENT '组件路径',
  `listorder` smallint DEFAULT '99' COMMENT '排序',
  `display` tinyint(1) DEFAULT '1' COMMENT '是否显示',
  `parentId` int DEFAULT NULL,
  `style` varchar(16) DEFAULT 'default' COMMENT '按钮分割',
  `quickmenu` tinyint(1) DEFAULT '0' COMMENT '是否快捷菜单',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_356054d147bb81bfb416f44b8b0` (`parentId`),
  CONSTRAINT `FK_356054d147bb81bfb416f44b8b0` FOREIGN KEY (`parentId`) REFERENCES `july_menu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_menu`
-- ----------------------------
BEGIN;
INSERT INTO `july_menu` VALUES ('1', '2023-07-16 13:27:00.924430', '2024-01-01 12:05:09.000000', '1', '首页', 'home', 'el-icon-s-home', 'home', '/home', 'Layout', '99', '1', null, 'default', '0'), ('2', '2023-07-16 13:27:00.929240', '2023-12-28 09:21:18.153903', '0', '网站管理', 'site', 'el-icon-s-platform', 'site', '/site', 'Layout', '99', '1', null, 'default', '1'), ('3', '2023-07-16 13:27:00.932674', '2023-12-28 09:21:18.155482', '0', '内容管理', 'content', 'el-icon-s-management', 'content', '/contect', 'Layout', '99', '1', null, 'default', '1'), ('5', '2023-07-16 13:27:00.938013', '2024-01-10 14:07:02.000000', '0', '系统管理', 'system', 'el-icon-s-tools', 'system', '/setting', 'Layout', '99', '1', null, 'default', '1'), ('6', '2023-07-16 13:27:39.676864', '2023-12-28 09:19:07.523722', '1', '站点设置', 'site:setting', null, 'setting', '/site/setting', 'site/Setting.vue', '99', '1', '2', 'default', '1'), ('7', '2023-07-16 13:27:39.683203', '2023-12-28 09:19:07.524382', '1', '导航栏目', 'site:category', null, 'category', '/site/category', 'site/CategoryList.vue', '1', '1', '3', 'default', '1'), ('8', '2023-07-16 13:27:39.686646', '2024-04-18 00:38:24.000000', '1', '模型管理', 'site:model', null, 'model', '/site/sitemodel', 'site/SiteModel.vue', '99', '1', '2', 'default', '1'), ('9', '2023-07-16 13:27:39.689548', '2023-12-28 09:19:07.525993', '1', '标签管理', 'site:tag', null, 'tag', '/site/tag', 'site/Tag.vue', '3', '1', '3', 'default', '1'), ('10', '2023-07-16 13:27:39.692367', '2023-12-28 09:19:07.526615', '1', '敏感词管理', 'site:sencetive', null, 'sencetive', '/site/sencetive', 'site/Sencetive.vue', '99', '1', '2', 'default', '1'), ('12', '2023-07-16 13:28:05.231532', '2023-12-28 09:19:07.527774', '1', '发布内容', 'content:list', null, 'contentList', '/content/list', 'content/ContentList.vue', '2', '1', '3', 'default', '1'), ('14', '2023-07-16 13:28:05.240965', '2023-12-28 09:19:07.528276', '1', '碎片管理', 'content:patch', null, 'contentPatch', '/content/patch', 'content/Patch.vue', '4', '1', '3', 'default', '1'), ('16', '2023-07-16 13:28:05.246696', '2023-12-28 09:19:07.529411', '1', '附件管理', 'content:attachment', null, 'attachement', '/content/attachement', 'content/Attachement.vue', '5', '1', '3', 'default', '1'), ('22', '2023-07-16 13:28:37.811295', '2024-01-10 17:11:46.000000', '1', '管理员', 'system:manager', null, 'manager', '/system/manager', 'system/ManageList.vue', '1', '1', '5', 'default', '1'), ('23', '2023-07-16 13:28:37.818504', '2024-01-10 17:11:51.000000', '1', '角色设置', 'system:role', null, 'role', '/system/role', 'system/RoleList.vue', '2', '1', '5', 'default', '1'), ('24', '2023-07-16 13:28:37.822220', '2024-01-10 17:11:55.000000', '1', '后台菜单', 'system:menu', null, 'menu', '/system/menu', 'system/MenuList', '3', '1', '5', 'default', '1'), ('25', '2023-07-16 13:28:37.826112', '2024-01-10 17:12:00.000000', '1', '字典管理', 'system:dict', null, 'dict', '/system/dict', 'system/DictList', '4', '1', '5', 'default', '1'), ('27', '2023-07-16 13:28:37.831914', '2023-12-28 10:00:44.329533', '0', '操作日志', 'system:logs', 'el-icon-document', null, null, 'LayPage', '99', '1', '5', 'default', '1'), ('28', '2023-07-16 13:29:07.390590', '2023-12-29 18:11:49.000000', '1', '登录日志', 'system:logLogin', null, 'LogLogin', '/system/loginlog', 'system/LogLoginList', '99', '1', '27', 'default', '0'), ('29', '2023-07-16 13:29:07.398747', '2024-01-01 16:02:02.000000', '1', '操作日志', 'system:logAction', null, 'LogAction', '/system/operationlog', 'system/LogActionList', '99', '1', '27', 'default', '0'), ('30', '2023-07-16 13:50:29.560701', '2023-12-28 09:19:07.534926', '2', '查询', 'system:manager:query', null, null, '/', 'Layout', '99', '1', '22', 'default', '0'), ('31', '2023-07-16 13:50:29.567196', '2023-12-28 09:19:07.535333', '2', '添加', 'system:manager:create', null, null, '/', 'Layout', '99', '1', '22', 'default', '0'), ('32', '2023-07-16 13:50:29.570512', '2023-12-28 09:19:07.535737', '2', '修改', 'system:manager:update', null, null, '/', 'Layout', '99', '1', '22', 'default', '0'), ('33', '2023-07-16 13:50:29.573260', '2023-12-28 09:19:07.536074', '2', '删除', 'system:manager:delete', null, null, '/', 'Layout', '99', '1', '22', 'default', '0'), ('34', '2023-07-16 13:50:29.575481', '2023-12-28 09:19:07.536453', '2', '详细', 'system:manager:detail', null, null, '/', 'Layout', '99', '1', '22', 'default', '0'), ('35', '2023-07-16 13:56:45.969053', '2023-12-28 09:19:07.536918', '2', '查询', 'system:role:query', null, null, '/', 'Layout', '99', '1', '23', 'default', '0'), ('36', '2023-07-16 13:56:45.975209', '2023-12-28 09:19:07.537304', '2', '添加', 'system:role:create', null, null, '/', 'Layout', '99', '1', '23', 'default', '0'), ('37', '2023-07-16 13:56:45.978422', '2023-12-28 09:19:07.537672', '2', '修改', 'system:role:update', null, null, '/', 'Layout', '99', '1', '23', 'default', '0'), ('38', '2023-07-16 13:56:45.981735', '2023-12-28 09:19:07.538522', '2', '删除', 'system:role:delete', null, null, '/', 'Layout', '99', '1', '23', 'default', '0'), ('39', '2023-07-16 13:56:45.984665', '2023-12-28 09:19:07.538877', '2', '详细', 'system:role:detail', null, null, '/', 'Layout', '99', '1', '23', 'default', '0'), ('40', '2023-07-16 13:57:40.673323', '2023-12-28 09:19:07.539392', '2', '查询', 'system:menu:query', null, null, '/', 'Layout', '99', '1', '24', 'default', '0'), ('41', '2023-07-16 13:57:40.679661', '2023-12-28 09:19:07.539848', '2', '添加', 'system:menu:create', null, null, '/', 'Layout', '99', '1', '24', 'default', '0'), ('42', '2023-07-16 13:57:40.683749', '2023-12-28 09:19:07.540257', '2', '修改', 'system:menu:update', null, null, '/', 'Layout', '99', '1', '24', 'default', '0'), ('43', '2023-07-16 13:57:40.687586', '2023-12-28 09:19:07.540714', '2', '删除', 'system:menu:delete', null, null, '/', 'Layout', '99', '1', '24', 'default', '0'), ('44', '2023-07-16 13:57:40.691227', '2023-12-28 09:19:07.541243', '2', '详细', 'system:menu:detail', null, null, '/', 'Layout', '99', '1', '24', 'default', '0'), ('45', '2023-07-16 13:58:09.763510', '2024-01-10 17:07:45.000000', '2', '查询', 'system:dict:query', null, null, '/', 'Layout', '1', '1', '25', 'default', '0'), ('46', '2023-07-16 13:58:09.769423', '2024-01-10 17:07:47.000000', '2', '添加', 'system:dict:create', null, null, '/', 'Layout', '2', '1', '25', 'default', '0'), ('47', '2023-07-16 13:58:09.772507', '2024-01-10 17:07:51.000000', '2', '修改', 'system:dict:update', null, null, '/', 'Layout', '3', '1', '25', 'default', '0'), ('48', '2023-07-16 13:58:09.775551', '2024-01-10 17:08:10.000000', '2', '删除', 'system:dict:delete', null, null, '/', 'Layout', '4', '1', '25', 'default', '0'), ('49', '2023-07-16 13:58:09.777929', '2024-01-10 17:08:16.000000', '2', '详细', 'system:dict:detail', null, null, '/', 'Layout', '5', '1', '25', 'default', '0'), ('55', '2023-07-16 14:02:06.242078', '2023-12-28 09:19:07.543597', '2', '修改密码', 'system:manager:password', null, null, '/', 'Layout', '99', '1', '22', 'default', '0'), ('56', '2023-07-16 14:10:52.362634', '2024-01-10 17:16:27.000000', '2', '查询', 'system:login-log:query', null, null, '/', 'Layout', '99', '1', '28', 'default', '0'), ('57', '2023-07-16 14:10:52.368356', '2024-01-10 17:16:36.000000', '2', '删除', 'system:login-log:delete', null, null, '/', 'Layout', '99', '1', '28', 'default', '0'), ('58', '2023-07-16 14:10:52.371134', '2024-01-10 17:17:10.000000', '2', '批量删除', 'system:login-log:batchDel', null, null, '/', 'Layout', '99', '1', '28', 'default', '0'), ('59', '2023-07-16 14:11:20.212967', '2024-01-10 17:13:59.000000', '2', '查询', 'system:operation-log:query', null, null, '/', 'Layout', '99', '1', '29', 'default', '0'), ('60', '2023-07-16 14:11:20.219028', '2024-01-10 17:14:10.000000', '2', '删除', 'system:operation-log:delete', null, null, '/', 'Layout', '99', '1', '29', 'default', '0'), ('61', '2023-07-16 14:11:20.223298', '2024-01-10 17:14:39.000000', '2', '清除', 'system:operation-log:clear', null, null, '/', 'Layout', '99', '1', '29', 'default', '0'), ('62', '2023-08-05 19:44:41.395608', '2023-12-28 09:19:07.546620', '2', '是否显示', 'system:menu:display', null, null, '/', 'Layout', '99', '1', '24', 'default', '0'), ('63', '2023-08-05 19:59:14.598921', '2023-12-28 09:19:07.547049', '2', '排序', 'system:menu:listorder', null, null, '/', 'Layout', '99', '1', '24', 'default', '0'), ('68', '2023-08-06 13:20:11.870665', '2023-12-28 09:19:07.547505', '2', '重置密码', 'system:manager:reset-pass', null, null, '/', 'Layout', '99', '1', '22', 'default', '0'), ('69', '2023-08-11 06:58:15.445874', '2023-12-28 09:19:07.547993', '2', '禁用/启用', 'system:role:status', null, null, '/', 'Layout', '99', '1', '23', 'default', '0'), ('70', '2023-08-13 16:03:07.666598', '2023-12-28 09:19:07.548527', '2', '字典值查询', 'system:dict-value:query', null, null, '/', 'Layout', '99', '1', '25', 'default', '0'), ('71', '2023-08-13 16:05:18.740506', '2023-12-28 09:19:07.548923', '2', '字典值添加', 'system:dict-value:create', null, null, '/', 'Layout', '99', '1', '25', 'default', '0'), ('72', '2023-08-13 16:05:40.627927', '2023-12-28 09:19:07.549329', '2', '字典值修改', 'system:dict-value:updata', null, null, '/', 'Layout', '99', '1', '25', 'default', '0'), ('73', '2023-08-13 16:06:04.081579', '2023-12-28 09:19:07.549684', '2', '字典值删除', 'system:dict-value:delete', null, null, '/', 'Layout', '99', '1', '25', 'default', '0'), ('74', '2023-08-13 16:06:26.600544', '2023-12-28 09:19:07.550140', '2', '字典值详细', 'system:dict-value:detail', null, null, '/', 'Layout', '99', '1', '25', 'default', '0'), ('75', '2024-01-10 17:00:33.632446', '2024-01-10 17:00:33.632446', '2', '快捷菜单', 'system:menu:quickmenu', null, null, '/', 'Layout', '99', '1', '24', 'default', '0'), ('76', '2024-01-10 17:07:38.400757', '2024-01-10 17:08:21.000000', '2', '显示隐藏', 'system:dict:display', null, null, '/', 'Layout', '6', '1', '25', 'default', '0'), ('77', '2024-01-10 17:10:44.946191', '2024-01-10 17:10:44.946191', '2', '字典值显示隐藏', 'system:dict-value:display', null, null, '/', 'Layout', '99', '1', '25', 'default', '0'), ('78', '2024-01-10 17:11:17.118016', '2024-01-10 17:11:17.118016', '2', '字典值排序', 'system:dict-value:listorder', null, null, '/', 'Layout', '99', '1', '25', 'default', '0'), ('79', '2024-01-10 17:15:00.909783', '2024-01-10 17:15:00.909783', '2', '批量删除', 'system:operation-log:batchDel', null, null, '/', 'Layout', '99', '1', '29', 'default', '0'), ('80', '2024-01-10 17:17:32.710025', '2024-01-10 17:17:32.710025', '2', '清除', 'system:login-log:clear', null, null, '/', 'Layout', '99', '1', '28', 'default', '0'), ('81', '2024-01-10 17:20:45.492880', '2024-01-10 17:20:45.492880', '2', '查询', 'site:setting:queryByType', null, null, '/', 'Layout', '99', '1', '6', 'default', '0'), ('82', '2024-01-10 17:21:05.354659', '2024-01-10 17:21:05.354659', '2', '更新', 'site:setting:update', null, null, '/', 'Layout', '99', '1', '6', 'default', '0'), ('83', '2024-01-10 17:22:45.900463', '2024-01-10 17:22:45.900463', '2', '查询', 'site:model:query', null, null, '/', 'Layout', '99', '1', '8', 'default', '0'), ('84', '2024-01-10 17:23:03.397724', '2024-01-10 17:23:03.397724', '2', '添加', 'site:model:create', null, null, '/', 'Layout', '99', '1', '8', 'default', '0'), ('85', '2024-01-10 17:23:21.737916', '2024-01-10 17:23:21.737916', '2', '修改', 'site:model:update', null, null, '/', 'Layout', '99', '1', '8', 'default', '0'), ('86', '2024-01-10 17:23:38.201453', '2024-01-10 17:23:38.201453', '2', '详细', 'site:model:detail', null, null, '/', 'Layout', '99', '1', '8', 'default', '0'), ('87', '2024-01-10 17:23:57.121148', '2024-01-10 17:23:57.121148', '2', '删除', 'site:model:delete', null, null, '/', 'Layout', '99', '1', '8', 'default', '0'), ('88', '2024-01-10 17:25:38.405695', '2024-01-10 17:25:38.405695', '2', '查询', 'site:sencetive:query', null, null, '/', 'Layout', '99', '1', '10', 'default', '0'), ('89', '2024-01-10 17:25:54.638534', '2024-01-10 17:25:54.638534', '2', '添加', 'site:sencetive:create', null, null, '/', 'Layout', '99', '1', '10', 'default', '0'), ('90', '2024-01-10 17:26:09.759451', '2024-01-10 17:26:09.759451', '2', '修改', 'site:sencetive:update', null, null, '/', 'Layout', '99', '1', '10', 'default', '0'), ('91', '2024-01-10 17:26:27.396279', '2024-01-10 17:26:27.396279', '2', '详细', 'site:sencetive:detail', null, null, '/', 'Layout', '99', '1', '10', 'default', '0'), ('92', '2024-01-10 17:26:43.810173', '2024-01-10 17:26:43.810173', '2', '删除', 'site:sencetive:delete', null, null, '/', 'Layout', '99', '1', '10', 'default', '0'), ('93', '2024-01-10 17:27:04.466189', '2024-01-10 17:27:04.466189', '2', '批量删除', 'site:sencetive:batDel', null, null, '/', 'Layout', '99', '1', '10', 'default', '0'), ('94', '2024-01-10 17:31:50.040208', '2024-01-10 17:31:50.040208', '2', '查询', 'content:category:query', null, null, '/', 'Layout', '99', '1', '7', 'default', '0'), ('95', '2024-01-10 17:33:23.356599', '2024-01-10 17:33:23.356599', '2', '添加', 'content:category:create', null, null, '/', 'Layout', '99', '1', '7', 'default', '0'), ('96', '2024-01-10 17:33:47.217492', '2024-01-10 17:33:47.217492', '2', '修改', 'content:category:update', null, null, '/', 'Layout', '99', '1', '7', 'default', '0'), ('97', '2024-01-10 17:33:58.793290', '2024-01-10 17:33:58.793290', '2', '详细', 'content:category:detail', null, null, '/', 'Layout', '99', '1', '7', 'default', '0'), ('98', '2024-01-10 17:34:13.696544', '2024-01-10 17:34:13.696544', '2', '删除', 'content:category:delete', null, null, '/', 'Layout', '99', '1', '7', 'default', '0'), ('99', '2024-01-10 17:34:33.769065', '2024-01-10 17:34:33.769065', '2', '显示隐藏', 'content:category:display', null, null, '/', 'Layout', '99', '1', '7', 'default', '0'), ('100', '2024-01-10 17:34:51.730562', '2024-01-10 17:34:51.730562', '2', '排序', 'content:category:listorder', null, null, '/', 'Layout', '99', '1', '7', 'default', '0'), ('101', '2024-01-10 17:35:11.270432', '2024-01-10 17:35:11.270432', '2', '重新统计数据', 'content:category:recount', null, null, '/', 'Layout', '99', '1', '7', 'default', '0'), ('102', '2024-01-10 17:35:27.392024', '2024-01-10 17:36:12.000000', '2', '批量移动', 'content:category:move', null, null, '/', 'Layout', '99', '1', '7', 'default', '0'), ('103', '2024-01-10 17:38:10.615759', '2024-01-10 17:38:10.615759', '2', '查询', 'content:document:query', null, null, '/', 'Layout', '99', '1', '12', 'default', '0'), ('104', '2024-01-10 17:39:02.330340', '2024-01-10 17:39:02.330340', '2', '添加', 'content:document:create', null, null, '/', 'Layout', '99', '1', '12', 'default', '0'), ('105', '2024-01-10 17:39:14.503316', '2024-01-10 17:39:14.503316', '2', '修改', 'content:document:update', null, null, '/', 'Layout', '99', '1', '12', 'default', '0'), ('106', '2024-01-10 17:39:27.216848', '2024-01-10 17:39:27.216848', '2', '详细', 'content:document:detail', null, null, '/', 'Layout', '99', '1', '12', 'default', '0'), ('107', '2024-01-10 17:39:58.040210', '2024-01-10 17:39:58.040210', '2', '显示隐藏', 'content:document:display', null, null, '/', 'Layout', '99', '1', '12', 'default', '0'), ('108', '2024-01-10 17:40:10.826032', '2024-01-10 17:40:10.826032', '2', '删除', 'content:document:delete', null, null, '/', 'Layout', '99', '1', '12', 'default', '0'), ('109', '2024-01-10 17:41:47.610318', '2024-01-10 17:41:47.610318', '2', '显示隐藏', 'site:model:display', null, null, '/', 'Layout', '99', '1', '8', 'default', '0'), ('110', '2024-01-10 17:45:56.563611', '2024-01-10 17:45:56.563611', '2', '查询', 'content:tag:query', null, null, '/', 'Layout', '99', '1', '9', 'default', '0'), ('111', '2024-01-10 17:46:09.567890', '2024-01-10 17:46:09.567890', '2', '添加', 'content:tag:create', null, null, '/', 'Layout', '99', '1', '9', 'default', '0'), ('112', '2024-01-10 17:46:19.987192', '2024-01-10 17:46:19.987192', '2', '修改', 'content:tag:update', null, null, '/', 'Layout', '99', '1', '9', 'default', '0'), ('113', '2024-01-10 17:46:41.690827', '2024-01-10 17:46:41.690827', '2', '详细', 'content:tag:detail', null, null, '/', 'Layout', '99', '1', '9', 'default', '0'), ('114', '2024-01-10 17:46:59.058680', '2024-01-10 17:46:59.058680', '2', '显示隐藏', 'content:tag:display', null, null, '/', 'Layout', '99', '1', '9', 'default', '0'), ('115', '2024-01-10 17:47:08.960323', '2024-01-10 17:47:08.960323', '2', '删除', 'content:tag:delete', null, null, '/', 'Layout', '99', '1', '9', 'default', '0'), ('116', '2024-01-10 17:51:48.839601', '2024-01-10 17:51:48.839601', '2', '查询', 'content:patch:query', null, null, '/', 'Layout', '99', '1', '14', 'default', '0'), ('117', '2024-01-10 17:52:01.898163', '2024-01-10 17:52:01.898163', '2', '添加', 'content:patch:create', null, null, '/', 'Layout', '99', '1', '14', 'default', '0'), ('118', '2024-01-10 17:52:20.542728', '2024-01-10 17:52:20.542728', '2', '修改', 'content:patch:update', null, null, '/', 'Layout', '99', '1', '14', 'default', '0'), ('119', '2024-01-10 17:52:39.578792', '2024-01-10 17:52:39.578792', '2', '详细', 'content:patch:detail', null, null, '/', 'Layout', '99', '1', '14', 'default', '0'), ('120', '2024-01-10 17:52:49.752861', '2024-01-10 17:52:49.752861', '2', '显示隐藏', 'content:patch:display', null, null, '/', 'Layout', '99', '1', '14', 'default', '0'), ('121', '2024-01-10 17:53:02.097069', '2024-01-10 17:53:02.097069', '2', '删除', 'content:patch:delete', null, null, '/', 'Layout', '99', '1', '14', 'default', '0'), ('122', '2024-01-10 17:53:30.839765', '2024-01-10 17:53:30.839765', '2', '批量显示隐藏', 'content:patch:batDisplay', null, null, '/', 'Layout', '99', '1', '14', 'default', '0'), ('123', '2024-01-10 17:53:44.375038', '2024-01-10 17:53:44.375038', '2', '批量删除', 'content:patch:batDelete', null, null, '/', 'Layout', '99', '1', '14', 'default', '0'), ('124', '2024-01-10 17:54:25.151244', '2024-01-10 17:54:25.151244', '2', '富文本 更新', 'content:patch:textUpdate', null, null, '/', 'Layout', '99', '1', '14', 'default', '0'), ('125', '2024-01-10 17:54:53.631933', '2024-01-10 17:54:53.631933', '2', '列表 类型查询', 'content:patch:listQuery', null, null, '/', 'Layout', '99', '1', '14', 'default', '0'), ('126', '2024-01-10 17:55:10.488987', '2024-01-10 17:55:10.488987', '2', '列表 添加', 'content:patch:listCreate', null, null, '/', 'Layout', '99', '1', '14', 'default', '0'), ('127', '2024-01-10 17:55:25.668667', '2024-01-10 17:55:25.668667', '2', '列表 修改', 'content:patch:listUpdate', null, null, '/', 'Layout', '99', '1', '14', 'default', '0'), ('128', '2024-01-10 17:55:45.212093', '2024-01-10 17:55:45.212093', '2', '列表 删除', 'content:patch:listDel', null, null, '/', 'Layout', '99', '1', '14', 'default', '0'), ('129', '2024-01-10 17:56:02.624398', '2024-01-10 17:56:02.624398', '2', '列表 排序', 'content:patch:listListorder', null, null, '/', 'Layout', '99', '1', '14', 'default', '0'), ('130', '2024-01-10 17:58:38.166117', '2024-01-10 17:58:38.166117', '2', '查询', 'content:attachement:query', null, null, '/', 'Layout', '99', '1', '16', 'default', '0'), ('131', '2024-01-10 17:58:49.976389', '2024-01-10 17:58:49.976389', '2', '删除', 'content:attachement:delete', null, null, '/', 'Layout', '99', '1', '16', 'default', '0');
COMMIT;

-- ----------------------------
--  Table structure for `july_menu_closure`
-- ----------------------------
DROP TABLE IF EXISTS `july_menu_closure`;
CREATE TABLE `july_menu_closure` (
  `id_ancestor` int NOT NULL,
  `id_descendant` int NOT NULL,
  PRIMARY KEY (`id_ancestor`,`id_descendant`),
  KEY `IDX_c2b132fbda5327ad4f672dfbc7` (`id_ancestor`),
  KEY `IDX_929ff5dcaf516d8755264dfcae` (`id_descendant`),
  CONSTRAINT `FK_929ff5dcaf516d8755264dfcae0` FOREIGN KEY (`id_descendant`) REFERENCES `july_menu` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_c2b132fbda5327ad4f672dfbc7e` FOREIGN KEY (`id_ancestor`) REFERENCES `july_menu` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_menu_closure`
-- ----------------------------
BEGIN;
INSERT INTO `july_menu_closure` VALUES ('1', '1'), ('2', '2'), ('2', '6'), ('2', '8'), ('2', '10'), ('2', '81'), ('2', '82'), ('2', '83'), ('2', '84'), ('2', '85'), ('2', '86'), ('2', '87'), ('2', '88'), ('2', '89'), ('2', '90'), ('2', '91'), ('2', '92'), ('2', '93'), ('2', '109'), ('3', '3'), ('3', '7'), ('3', '9'), ('3', '12'), ('3', '14'), ('3', '16'), ('3', '94'), ('3', '95'), ('3', '96'), ('3', '97'), ('3', '98'), ('3', '99'), ('3', '100'), ('3', '101'), ('3', '102'), ('3', '103'), ('3', '104'), ('3', '105'), ('3', '106'), ('3', '107'), ('3', '108'), ('3', '110'), ('3', '111'), ('3', '112'), ('3', '113'), ('3', '114'), ('3', '115'), ('3', '116'), ('3', '117'), ('3', '118'), ('3', '119'), ('3', '120'), ('3', '121'), ('3', '122'), ('3', '123'), ('3', '124'), ('3', '125'), ('3', '126'), ('3', '127'), ('3', '128'), ('3', '129'), ('3', '130'), ('3', '131'), ('5', '5'), ('5', '22'), ('5', '23'), ('5', '24'), ('5', '25'), ('5', '27'), ('5', '28'), ('5', '29'), ('5', '30'), ('5', '31'), ('5', '32'), ('5', '33'), ('5', '34'), ('5', '35'), ('5', '36'), ('5', '37'), ('5', '38'), ('5', '39'), ('5', '40'), ('5', '41'), ('5', '42'), ('5', '43'), ('5', '44'), ('5', '45'), ('5', '46'), ('5', '47'), ('5', '48'), ('5', '49'), ('5', '55'), ('5', '56'), ('5', '57'), ('5', '58'), ('5', '59'), ('5', '60'), ('5', '61'), ('5', '62'), ('5', '63'), ('5', '68'), ('5', '69'), ('5', '70'), ('5', '71'), ('5', '72'), ('5', '73'), ('5', '74'), ('5', '75'), ('5', '76'), ('5', '77'), ('5', '78'), ('5', '79'), ('5', '80'), ('6', '6'), ('6', '81'), ('6', '82'), ('7', '7'), ('7', '94'), ('7', '95'), ('7', '96'), ('7', '97'), ('7', '98'), ('7', '99'), ('7', '100'), ('7', '101'), ('7', '102'), ('8', '8'), ('8', '83'), ('8', '84'), ('8', '85'), ('8', '86'), ('8', '87'), ('8', '109'), ('9', '9'), ('9', '110'), ('9', '111'), ('9', '112'), ('9', '113'), ('9', '114'), ('9', '115'), ('10', '10'), ('10', '88'), ('10', '89'), ('10', '90'), ('10', '91'), ('10', '92'), ('10', '93'), ('12', '12'), ('12', '103'), ('12', '104'), ('12', '105'), ('12', '106'), ('12', '107'), ('12', '108'), ('14', '14'), ('14', '116'), ('14', '117'), ('14', '118'), ('14', '119'), ('14', '120'), ('14', '121'), ('14', '122'), ('14', '123'), ('14', '124'), ('14', '125'), ('14', '126'), ('14', '127'), ('14', '128'), ('14', '129'), ('16', '16'), ('16', '130'), ('16', '131'), ('22', '22'), ('22', '30'), ('22', '31'), ('22', '32'), ('22', '33'), ('22', '34'), ('22', '55'), ('22', '68'), ('23', '23'), ('23', '35'), ('23', '36'), ('23', '37'), ('23', '38'), ('23', '39'), ('23', '69'), ('24', '24'), ('24', '40'), ('24', '41'), ('24', '42'), ('24', '43'), ('24', '44'), ('24', '62'), ('24', '63'), ('24', '75'), ('25', '25'), ('25', '45'), ('25', '46'), ('25', '47'), ('25', '48'), ('25', '49'), ('25', '70'), ('25', '71'), ('25', '72'), ('25', '73'), ('25', '74'), ('25', '76'), ('25', '77'), ('25', '78'), ('27', '27'), ('27', '28'), ('27', '29'), ('27', '56'), ('27', '57'), ('27', '58'), ('27', '59'), ('27', '60'), ('27', '61'), ('27', '79'), ('27', '80'), ('28', '28'), ('28', '56'), ('28', '57'), ('28', '58'), ('28', '80'), ('29', '29'), ('29', '59'), ('29', '60'), ('29', '61'), ('29', '79'), ('30', '30'), ('31', '31'), ('32', '32'), ('33', '33'), ('34', '34'), ('35', '35'), ('36', '36'), ('37', '37'), ('38', '38'), ('39', '39'), ('40', '40'), ('41', '41'), ('42', '42'), ('43', '43'), ('44', '44'), ('45', '45'), ('46', '46'), ('47', '47'), ('48', '48'), ('49', '49'), ('55', '55'), ('56', '56'), ('57', '57'), ('58', '58'), ('59', '59'), ('60', '60'), ('61', '61'), ('62', '62'), ('63', '63'), ('68', '68'), ('69', '69'), ('70', '70'), ('71', '71'), ('72', '72'), ('73', '73'), ('74', '74'), ('75', '75'), ('76', '76'), ('77', '77'), ('78', '78'), ('79', '79'), ('80', '80'), ('81', '81'), ('82', '82'), ('83', '83'), ('84', '84'), ('85', '85'), ('86', '86'), ('87', '87'), ('88', '88'), ('89', '89'), ('90', '90'), ('91', '91'), ('92', '92'), ('93', '93'), ('94', '94'), ('95', '95'), ('96', '96'), ('97', '97'), ('98', '98'), ('99', '99'), ('100', '100'), ('101', '101'), ('102', '102'), ('103', '103'), ('104', '104'), ('105', '105'), ('106', '106'), ('107', '107'), ('108', '108'), ('109', '109'), ('110', '110'), ('111', '111'), ('112', '112'), ('113', '113'), ('114', '114'), ('115', '115'), ('116', '116'), ('117', '117'), ('118', '118'), ('119', '119'), ('120', '120'), ('121', '121'), ('122', '122'), ('123', '123'), ('124', '124'), ('125', '125'), ('126', '126'), ('127', '127'), ('128', '128'), ('129', '129'), ('130', '130'), ('131', '131');
COMMIT;

-- ----------------------------
--  Table structure for `july_operation_log`
-- ----------------------------
DROP TABLE IF EXISTS `july_operation_log`;
CREATE TABLE `july_operation_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `username` varchar(32) NOT NULL COMMENT '登录用户',
  `ip` varchar(16) DEFAULT NULL COMMENT 'ip地址',
  `address` varchar(64) DEFAULT NULL COMMENT 'ip地址所在地区',
  `os` varchar(32) DEFAULT NULL COMMENT '操作系统信息',
  `browser` varchar(32) DEFAULT NULL COMMENT '浏览器信息',
  `status` tinyint(1) DEFAULT '1' COMMENT '操作结果',
  `module` varchar(32) DEFAULT NULL COMMENT '模块',
  `operation` varchar(32) DEFAULT NULL COMMENT '操作',
  `taketime` int DEFAULT '0' COMMENT '耗时(毫秒)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Table structure for `july_patch`
-- ----------------------------
DROP TABLE IF EXISTS `july_patch`;
CREATE TABLE `july_patch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `title` varchar(32) NOT NULL COMMENT '标题',
  `display` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否启用;0禁用；1启用',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '类型;0: 富文本； 1:列表',
  `managerId` int DEFAULT NULL,
  `patchTextId` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `IDX_40600306ac1a51c02af75780c4` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Table structure for `july_patch_list`
-- ----------------------------
DROP TABLE IF EXISTS `july_patch_list`;
CREATE TABLE `july_patch_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `title` varchar(32) NOT NULL COMMENT '标题',
  `listorder` smallint DEFAULT '99' COMMENT '排序',
  `imgId` int DEFAULT NULL,
  `patchId` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `url` varchar(255) DEFAULT NULL COMMENT '链接地址',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_37f8b8edeafd5fe230078e1ddf7` (`patchId`),
  CONSTRAINT `FK_37f8b8edeafd5fe230078e1ddf7` FOREIGN KEY (`patchId`) REFERENCES `july_patch` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Table structure for `july_patch_text`
-- ----------------------------
DROP TABLE IF EXISTS `july_patch_text`;
CREATE TABLE `july_patch_text` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `content` text COMMENT '内容',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_patch_text`
-- ----------------------------
BEGIN;
INSERT INTO `july_patch_text` VALUES ('3', '2024-01-10 14:02:20.806168', '2024-01-10 14:03:41.000000', '<p>www</p>');
COMMIT;

-- ----------------------------
--  Table structure for `july_role`
-- ----------------------------
DROP TABLE IF EXISTS `july_role`;
CREATE TABLE `july_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `name` varchar(32) NOT NULL COMMENT '角色名称',
  `status` tinyint(1) DEFAULT NULL COMMENT '启用状态, 0 禁用；1 启用',
  `description` varchar(255) DEFAULT NULL COMMENT '角色描述',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_67d1f93128b988f0437c41ca4b` (`name`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_role`
-- ----------------------------
BEGIN;
INSERT INTO `july_role` VALUES ('1', '2023-07-15 19:16:21.367530', '2024-01-11 18:41:59.000000', '超级管理员', '1', null), ('2', '2023-07-15 19:16:25.542995', '2024-01-11 11:35:57.000000', '普通管理员', '1', null), ('4', '2023-08-08 22:34:37.908026', '2024-01-11 18:43:33.000000', '测试权限', '1', null);
COMMIT;

-- ----------------------------
--  Table structure for `july_role_menus_menu`
-- ----------------------------
DROP TABLE IF EXISTS `july_role_menus_menu`;
CREATE TABLE `july_role_menus_menu` (
  `roleId` int NOT NULL,
  `menuId` int NOT NULL,
  PRIMARY KEY (`roleId`,`menuId`),
  KEY `IDX_740ab0b0ec36c0745b9c774a4c` (`roleId`),
  KEY `IDX_60ba1fddafdc0e6b1282e452e6` (`menuId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_role_menus_menu`
-- ----------------------------
BEGIN;
INSERT INTO `july_role_menus_menu` VALUES ('1', '1'), ('1', '2'), ('1', '3'), ('1', '5'), ('1', '6'), ('1', '7'), ('1', '8'), ('1', '9'), ('1', '10'), ('1', '12'), ('1', '14'), ('1', '16'), ('1', '22'), ('1', '23'), ('1', '24'), ('1', '25'), ('1', '27'), ('1', '28'), ('1', '29'), ('1', '30'), ('1', '31'), ('1', '32'), ('1', '33'), ('1', '34'), ('1', '35'), ('1', '36'), ('1', '37'), ('1', '38'), ('1', '39'), ('1', '40'), ('1', '41'), ('1', '42'), ('1', '43'), ('1', '44'), ('1', '45'), ('1', '46'), ('1', '47'), ('1', '48'), ('1', '49'), ('1', '55'), ('1', '56'), ('1', '57'), ('1', '58'), ('1', '59'), ('1', '60'), ('1', '61'), ('1', '62'), ('1', '68'), ('1', '69'), ('1', '70'), ('1', '71'), ('1', '72'), ('1', '73'), ('1', '74'), ('1', '76'), ('1', '77'), ('1', '78'), ('1', '79'), ('1', '80'), ('1', '81'), ('1', '82'), ('1', '83'), ('1', '84'), ('1', '85'), ('1', '86'), ('1', '87'), ('1', '88'), ('1', '89'), ('1', '90'), ('1', '91'), ('1', '92'), ('1', '93'), ('1', '94'), ('1', '95'), ('1', '96'), ('1', '97'), ('1', '98'), ('1', '99'), ('1', '100'), ('1', '101'), ('1', '102'), ('1', '103'), ('1', '104'), ('1', '105'), ('1', '106'), ('1', '107'), ('1', '108'), ('1', '109'), ('1', '110'), ('1', '111'), ('1', '112'), ('1', '113'), ('1', '114'), ('1', '115'), ('1', '116'), ('1', '117'), ('1', '118'), ('1', '119'), ('1', '120'), ('1', '121'), ('1', '122'), ('1', '123'), ('1', '124'), ('1', '125'), ('1', '126'), ('1', '127'), ('1', '128'), ('1', '129'), ('1', '130'), ('1', '131'), ('2', '1'), ('2', '2'), ('2', '8'), ('2', '83'), ('2', '84'), ('2', '85'), ('2', '86'), ('2', '87'), ('4', '1'), ('4', '3'), ('4', '5'), ('4', '27');
COMMIT;

-- ----------------------------
--  Table structure for `july_sencetive`
-- ----------------------------
DROP TABLE IF EXISTS `july_sencetive`;
CREATE TABLE `july_sencetive` (
  `id` int NOT NULL AUTO_INCREMENT,
  `word` varchar(16) DEFAULT NULL COMMENT '敏感词',
  `replaceWord` varchar(16) DEFAULT NULL COMMENT '替换词',
  `classify` tinyint(1) NOT NULL DEFAULT '1' COMMENT '敏感词类别; 0 广告；1 政治；2 涉枪涉爆；3 网址；4 色情; 5极限用语 6违禁权威性词语 7虚假宣传祈福、涉嫌迷信 8化妆品虚假宣传功效',
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `IDX_801d126befacad1b2d2ffbc65e` (`word`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Table structure for `july_site_model`
-- ----------------------------
DROP TABLE IF EXISTS `july_site_model`;
CREATE TABLE `july_site_model` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `name` varchar(16) NOT NULL COMMENT '模型名称',
  `mark` varchar(32) NOT NULL COMMENT '模型标识',
  `display` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否显示 0 不显示；1 显示',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `IDX_d6d61fe87f3f0c77438a243e4f` (`name`),
  UNIQUE KEY `IDX_6c65e9ca7ed08fc69aba7341e2` (`mark`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_site_model`
-- ----------------------------
BEGIN;
INSERT INTO `july_site_model` VALUES ('1', '2023-07-17 18:54:55.293359', '2023-09-25 20:00:08.000000', '文章模型', 'article', '1', null), ('2', '2023-07-17 18:55:56.598571', '2023-07-17 18:55:56.598571', '图集模型', 'album', '1', null), ('3', '2023-07-17 18:56:30.583319', '2023-07-17 18:56:34.470028', '单页', 'page', '1', null), ('4', '2023-07-17 18:56:52.438884', '2023-07-17 18:56:55.220231', '外链', 'link', '1', null);
COMMIT;

-- ----------------------------
--  Table structure for `july_site_setting`
-- ----------------------------
DROP TABLE IF EXISTS `july_site_setting`;
CREATE TABLE `july_site_setting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `type` smallint NOT NULL COMMENT '类型;0:基本信息；1水印配置；2邮箱配置',
  `name` varchar(32) NOT NULL COMMENT '名称',
  `label` varchar(32) NOT NULL COMMENT '键',
  `value` varchar(255) DEFAULT NULL COMMENT '值',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `july_site_setting`
-- ----------------------------
BEGIN;
INSERT INTO `july_site_setting` VALUES ('1', '2023-08-15 14:58:31.123354', '2024-04-18 03:14:38.000000', '0', 'siteTitle', '站点名称', null), ('2', '2023-08-15 14:59:01.081732', '2024-04-18 03:14:38.000000', '0', 'seoTitle', 'SEO标题', null), ('3', '2023-08-15 14:59:01.084460', '2024-04-18 03:59:34.000000', '0', 'seoKeywords', 'SEO关键词', null), ('4', '2023-08-15 14:59:01.098111', '2024-04-18 03:14:38.000000', '0', 'seoDescription', 'SEO描述', null);
COMMIT;

-- ----------------------------
--  Table structure for `july_tag`
-- ----------------------------
DROP TABLE IF EXISTS `july_tag`;
CREATE TABLE `july_tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `name` varchar(20) NOT NULL COMMENT 'tag名称',
  `pinyin` varchar(64) DEFAULT NULL COMMENT '拼音',
  `seoTitle` varchar(128) DEFAULT NULL COMMENT 'SEO标题',
  `display` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否显示 0 不显示；1 显示',
  `count` smallint DEFAULT '0' COMMENT '文档数量',
  `letter` char(1) DEFAULT NULL COMMENT '首字母',
  `seoKeywords` varchar(255) DEFAULT NULL COMMENT 'SEO关键词',
  `seoDescription` varchar(255) DEFAULT NULL COMMENT 'SEO描述',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_bce51dea1521be40af228fd3c9` (`name`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
