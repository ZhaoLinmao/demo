/*
Navicat MySQL Data Transfer

Source Server         : jadite
Source Server Version : 50022
Source Host           : 127.0.0.1:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50022
File Encoding         : 65001

Date: 2017-11-20 16:00:40
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
  `id` varchar(20) NOT NULL COMMENT 'id:数据唯一标识',
  `url` varchar(100) default '' COMMENT 'url:菜单点击访问的路径',
  `name` varchar(100) default NULL COMMENT '菜单名称:菜单展示的名称',
  `icon` varchar(100) default NULL COMMENT '图标:菜单前展示的小图标',
  `pid` varchar(100) NOT NULL COMMENT '父菜单:父菜单的id',
  `pName` varchar(100) default NULL COMMENT '父菜单名称:父菜单名称',
  `turn` int(100) default NULL COMMENT '顺序:顺序h号',
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
-- Table structure for sys_org
-- ----------------------------
DROP TABLE IF EXISTS `sys_org`;
CREATE TABLE `sys_org` (
  `id` varchar(20) NOT NULL COMMENT 'id:数据唯一标识',
  `name` varchar(100) default NULL COMMENT '组织名称:组织展示的名称',
  `pid` varchar(100) NOT NULL COMMENT '父组织id:父组织的id',
  `pName` varchar(100) default NULL COMMENT '父组织名称:父组织名称',
  `turn` int(100) default NULL COMMENT '顺序',
  `createby` varchar(100) default NULL COMMENT '创建人:创建该数据的用户名',
  `createtime` varchar(100) default NULL COMMENT '创建时间:创建该数据的时间',
  `updateby` varchar(100) default NULL COMMENT '修改人:修改该数据的用户名',
  `updatetime` varchar(100) default NULL COMMENT '修改时间:修改该数据的时间',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_org
-- ----------------------------
INSERT INTO `sys_org` VALUES ('b73c051511162948807', '技术部', '0', '部门管理', '10', 'admin', '2017-10-1 15:29:8', 'admin', '2017-10-1 15:35:39');

-- ----------------------------
-- Table structure for sys_right
-- ----------------------------
DROP TABLE IF EXISTS `sys_right`;
CREATE TABLE `sys_right` (
  `id` varchar(20) NOT NULL COMMENT 'id:数据唯一标识',
  `menu_id` varchar(20) default NULL COMMENT '菜单id:菜单表的唯一标识',
  `add` int(1) default NULL COMMENT '新增:新增权限1为有权限,0为无权限',
  `del` int(1) default NULL COMMENT '删除:删除权限1为有权限,0为无权限',
  `upd` int(1) default NULL COMMENT '修改:修改权限1为有权限,0为无权限',
  `sel` int(1) default NULL COMMENT '查询:查询权限1为有权限,0为无权限',
  `imp` int(1) default NULL COMMENT '导入:导入权限1为有权限,0为无权限',
  `exp` int(1) default NULL COMMENT '导出:导出权限1为有权限,0为无权限',
  `createby` varchar(100) default NULL COMMENT '创建人:创建该数据的用户名',
  `createtime` varchar(100) default NULL COMMENT '创建时间:创建该数据的时间',
  `updateby` varchar(100) default NULL COMMENT '修改人:修改该数据的用户名',
  `updatetime` varchar(100) default NULL COMMENT '修改时间:修改该数据的时间',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_right
-- ----------------------------
INSERT INTO `sys_right` VALUES ('1', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sys_right` VALUES ('1033d61509505367721', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sys_right` VALUES ('2dcca61509506481904', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sys_right` VALUES ('386f491511154231931', null, null, null, null, null, null, null, 'admin', '2017-10-1 13:3:51', null, null);
INSERT INTO `sys_right` VALUES ('5e07b71509589550885', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sys_right` VALUES ('6e70251509505394088', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sys_right` VALUES ('961e451507619511015', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sys_right` VALUES ('bdf8fc1509505353057', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sys_right` VALUES ('deb048150935', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sys_right` VALUES ('deb0481509352973422', null, null, null, null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` varchar(20) NOT NULL COMMENT 'id:数据唯一标识',
  `right_id` varchar(20) default NULL COMMENT '菜单id:菜单表的唯一标识',
  `add` int(1) default NULL COMMENT '新增:新增权限1为有权限,0为无权限',
  `del` int(1) default NULL COMMENT '删除:删除权限1为有权限,0为无权限',
  `upd` int(1) default NULL COMMENT '修改:修改权限1为有权限,0为无权限',
  `sel` int(1) default NULL COMMENT '查询:查询权限1为有权限,0为无权限',
  `imp` int(1) default NULL COMMENT '导入:导入权限1为有权限,0为无权限',
  `exp` int(1) default NULL COMMENT '导出:导出权限1为有权限,0为无权限',
  `createby` varchar(100) default NULL COMMENT '创建人:创建该数据的用户名',
  `createtime` varchar(100) default NULL COMMENT '创建时间:创建该数据的时间',
  `updateby` varchar(100) default NULL COMMENT '修改人:修改该数据的用户名',
  `updatetime` varchar(100) default NULL COMMENT '修改时间:修改该数据的时间',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` varchar(20) NOT NULL COMMENT 'id:数据唯一标识',
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
