/*
Navicat MySQL Data Transfer

Source Server         : jadite
Source Server Version : 50022
Source Host           : 127.0.0.1:3366
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50022
File Encoding         : 65001

Date: 2017-11-14 12:43:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL auto_increment COMMENT '管理员id',
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `gp` varchar(500) NOT NULL COMMENT '权限id',
  `createtime` timestamp NULL default CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', '111111', '1', '2011-07-30 14:46:09');
INSERT INTO `admin` VALUES ('2', 'ljb', 'aaf79a8e87847eb4ca30e9319beb7579', '1', '2016-12-14 13:03:40');
INSERT INTO `admin` VALUES ('3', 'lx', '111111', '1', '2016-12-14 13:03:53');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` varchar(100) NOT NULL COMMENT 'id:数据唯一标识',
  `url` varchar(100) default '' COMMENT 'url:菜单点击访问的路径',
  `name` varchar(100) default NULL COMMENT '菜单名称:菜单展示的名称',
  `icon` varchar(100) default NULL COMMENT '图标:菜单前展示的小图标',
  `pid` varchar(100) NOT NULL COMMENT '父菜单:父菜单的id',
  `pName` varchar(100) default NULL COMMENT '父菜单名称:父菜单名称',
  `turn` int(100) default NULL,
  `newpage` int(1) default NULL COMMENT '是否新页面打开:1为是新页面打开，0为否',
  `createby` varchar(100) default NULL COMMENT '创建人:创建该数据的用户名',
  `createtime` varchar(100) default NULL COMMENT '创建时间:创建该数据的时间',
  `updateby` varchar(100) default NULL COMMENT '修改人:修改该数据的用户名',
  `updatetime` varchar(100) default NULL COMMENT '修改时间:修改该数据的时间',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('1', '', '流程管理', 'am-icon-sitemap', '0', '菜单配置', '10', '0', null, null, null, null);
INSERT INTO `sys_menu` VALUES ('1033d61509505367721', '/user', '用户管理', 'am-icon-user', 'deb048150935', '系统管理', '20', '0', null, null, null, null);
INSERT INTO `sys_menu` VALUES ('2dcca61509506481904', '/mem', '会员管理', 'am-icon-universal-access', 'deb048150935', '系统管理', '50', '0', null, null, null, null);
INSERT INTO `sys_menu` VALUES ('5e07b71509589550885', '/generate', '代码生成', 'am-icon-bed', 'deb048150935', '系统管理', '60', '0', null, null, null, null);
INSERT INTO `sys_menu` VALUES ('6e70251509505394088', '/role', '角色管理', 'am-icon-blind', 'deb048150935', '系统管理', '40', '0', null, null, null, null);
INSERT INTO `sys_menu` VALUES ('961e451507619511015', '/customform', '自定义表单', 'am-icon-braille', '1', '流程管理', '10', '1', null, null, null, null);
INSERT INTO `sys_menu` VALUES ('bdf8fc1509505353057', '/org', '部门管理', 'am-icon-users', 'deb048150935', '系统管理', '30', '0', null, null, null, null);
INSERT INTO `sys_menu` VALUES ('deb048150935', '', '系统管理', 'am-icon-cogs', '0', '菜单配置', '20', '0', null, null, null, null);
INSERT INTO `sys_menu` VALUES ('deb0481509352973422', '/menu', '菜单管理', 'am-icon-cutlery', 'deb048150935', '系统管理', '10', '0', null, null, null, null);

-- ----------------------------
-- Table structure for sys_menu_copy
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu_copy`;
CREATE TABLE `sys_menu_copy` (
  `id` varchar(100) NOT NULL COMMENT 'id:数据唯一标识',
  `url` varchar(100) default '' COMMENT 'url:菜单点击访问的路径',
  `name` varchar(100) default NULL COMMENT '菜单名称:菜单展示的名称',
  `icon` varchar(100) default NULL COMMENT '图标:菜单前展示的小图标',
  `pid` varchar(100) NOT NULL COMMENT '父菜单:父菜单的id',
  `pName` varchar(100) default NULL COMMENT '父菜单名称:父菜单名称',
  `turn` int(100) default NULL,
  `newpage` int(1) default NULL COMMENT '是否新页面打开:1为是新页面打开，0为否',
  `createby` varchar(100) default NULL COMMENT '创建人:创建该数据的用户名',
  `createtime` varchar(100) default NULL COMMENT '创建时间:创建该数据的时间',
  `updateby` varchar(100) default NULL COMMENT '修改人:修改该数据的用户名',
  `updatetime` varchar(100) default NULL COMMENT '修改时间:修改该数据的时间',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_menu_copy
-- ----------------------------
INSERT INTO `sys_menu_copy` VALUES ('1', '', '流程管理', 'am-icon-sitemap', '0', '菜单配置', '10', '0', null, null, null, null);
INSERT INTO `sys_menu_copy` VALUES ('1033d61509505367721', '/user', '用户管理', 'am-icon-user', 'deb048150935', '系统管理', '20', '0', null, null, null, null);
INSERT INTO `sys_menu_copy` VALUES ('2dcca61509506481904', '/mem', '会员管理', 'am-icon-universal-access', 'deb048150935', '系统管理', '50', '0', null, null, null, null);
INSERT INTO `sys_menu_copy` VALUES ('5e07b71509589550885', '/generate', '代码生成', 'am-icon-bed', 'deb048150935', '系统管理', '60', '0', null, null, null, null);
INSERT INTO `sys_menu_copy` VALUES ('6e70251509505394088', '/role', '角色管理', 'am-icon-blind', 'deb048150935', '系统管理', '40', '0', null, null, null, null);
INSERT INTO `sys_menu_copy` VALUES ('961e451507619511015', '/customform', '自定义表单', 'am-icon-braille', '1', '流程管理', '10', '1', null, null, null, null);
INSERT INTO `sys_menu_copy` VALUES ('bdf8fc1509505353057', '/org', '部门管理', 'am-icon-users', 'deb048150935', '系统管理', '30', '0', null, null, null, null);
INSERT INTO `sys_menu_copy` VALUES ('deb048150935', '', '系统管理', 'am-icon-cogs', '0', '菜单配置', '20', '0', null, null, null, null);
INSERT INTO `sys_menu_copy` VALUES ('deb0481509352973422', '/menu', '菜单管理', 'am-icon-cutlery', 'deb048150935', '系统管理', '10', '0', null, null, null, null);

-- ----------------------------
-- Table structure for sys_org
-- ----------------------------
DROP TABLE IF EXISTS `sys_org`;
CREATE TABLE `sys_org` (
  `id` varchar(100) NOT NULL COMMENT 'id:数据唯一标识',
  `name` varchar(100) default NULL COMMENT '菜单名称:菜单展示的名称',
  `pid` varchar(100) NOT NULL COMMENT '父菜单:父菜单的id',
  `pName` varchar(100) default NULL COMMENT '父菜单名称:父菜单名称',
  `turn` int(100) default NULL,
  `createby` varchar(100) default NULL COMMENT '创建人:创建该数据的用户名',
  `createtime` varchar(100) default NULL COMMENT '创建时间:创建该数据的时间',
  `updateby` varchar(100) default NULL COMMENT '修改人:修改该数据的用户名',
  `updatetime` varchar(100) default NULL COMMENT '修改时间:修改该数据的时间',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_org
-- ----------------------------
INSERT INTO `sys_org` VALUES ('ddb8fa1510150214481', '管理员', '', '部门管理', '30', null, null, null, null);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` varchar(100) NOT NULL COMMENT 'id:数据唯一标识',
  `username` varchar(100) default '' COMMENT '用户名:用户名称',
  `password` varchar(100) default NULL COMMENT '密码:用户登录密码',
  `nick` varchar(100) default NULL COMMENT '昵称:用户显示昵称',
  `photo` varchar(100) default NULL COMMENT '头像:用户头像',
  `email` varchar(100) default NULL COMMENT 'email:用户邮箱',
  `phone` varchar(100) default NULL COMMENT '电话:用户电话',
  `qq` varchar(100) default NULL COMMENT 'qq:用户qq号码',
  `weixin` varchar(100) default NULL COMMENT '微信:用户微信号码',
  `openid` varchar(100) default NULL COMMENT '微信id:微信号唯一id',
  `position` varchar(100) default NULL COMMENT '职位:员工职位',
  `createby` varchar(100) default NULL COMMENT '创建人:创建该数据的用户名',
  `createtime` varchar(100) default NULL COMMENT '创建时间:创建该数据的时间',
  `updateby` varchar(100) default NULL COMMENT '修改人:修改该数据的用户名',
  `updatetime` varchar(100) default NULL COMMENT '修改时间:修改该数据的时间',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('03d15f1506071560722', '333', '222', null, '', '4', '111', null, null, null, null, null, null, null, null);
INSERT INTO `sys_user` VALUES ('1', '1111', '流程管理', null, '', '0', '菜单配置', null, null, null, null, null, null, null, null);
INSERT INTO `sys_user` VALUES ('2', null, '系统管理', null, null, '0', '菜单配置', null, null, null, null, null, null, null, null);
INSERT INTO `sys_user` VALUES ('3', '/menu', '菜单管理', null, null, '2', '系统管理', null, null, null, null, null, null, null, null);
INSERT INTO `sys_user` VALUES ('4', '222', '222', null, '', '1', '流程管理', null, null, null, null, null, null, null, null);
