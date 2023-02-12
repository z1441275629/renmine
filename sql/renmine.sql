# Host: localhost  (Version: 5.7.26)
# Date: 2023-02-13 00:46:46
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "message"
#

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `parentId` int(11) DEFAULT NULL,
  `replyId` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` text,
  `userId` int(11) NOT NULL DEFAULT '0',
  `time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

#
# Data for table "message"
#

/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,NULL,NULL,NULL,NULL,NULL,'ABCD',1,'1676043097137'),(2,NULL,NULL,NULL,NULL,NULL,'666',1,'1676043172303'),(3,NULL,NULL,NULL,NULL,NULL,'666999',1,'1676043310585'),(4,NULL,NULL,NULL,NULL,NULL,'123123',1,'1676121348795'),(5,NULL,NULL,NULL,NULL,NULL,'123123',1,'1676122255880'),(6,NULL,NULL,NULL,NULL,'girl','smiles',1,'1676134169736'),(7,NULL,NULL,NULL,NULL,'girl','睡着了没',1,'1676134339940'),(8,7,NULL,NULL,NULL,NULL,'窈窕淑女，君子好逑',1,'1676135984685'),(9,7,NULL,NULL,NULL,NULL,'我还在搬砖，miss you',1,'1676136146692'),(10,7,NULL,NULL,NULL,NULL,'开心快乐每一天',1,'1676136238894'),(11,9,NULL,NULL,NULL,NULL,'晚安',1,'1676136559675'),(12,9,NULL,NULL,NULL,NULL,'好梦',1,'1676136595987'),(13,7,NULL,NULL,2,NULL,'睡觉了，wan\'an',1,'1676136994587'),(14,NULL,7,NULL,3,NULL,'早上好啊',1,'1676173991446'),(15,NULL,14,NULL,3,NULL,'13',1,'1676174428229'),(16,NULL,15,NULL,3,NULL,'6666',1,'1676174444168'),(17,16,16,NULL,3,NULL,'999',1,'1676174474396'),(18,16,16,NULL,3,NULL,'anathoer one',3,'1676184827357'),(19,NULL,NULL,NULL,1,'hello world','message content message content message content message content message content message content message content message content message content message content ',3,'1676184869217'),(20,NULL,NULL,NULL,1,'abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc ','abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc ',3,'1676189446247'),(21,8,8,NULL,3,NULL,'You are right',3,'1676193647863'),(22,8,8,NULL,3,NULL,'666',3,'1676193714364'),(23,7,NULL,NULL,2,NULL,'你若化成风',3,'1676193794428'),(24,23,23,NULL,3,NULL,'我换化成雨',3,'1676193848659'),(25,NULL,NULL,NULL,3,NULL,'想带你回家见妈妈',3,'1676194497922'),(26,NULL,NULL,NULL,3,NULL,'123',3,'1676194535296'),(27,23,NULL,NULL,3,NULL,'123',3,'1676194623712'),(28,23,NULL,NULL,3,NULL,'46',3,'1676194681202'),(29,23,28,NULL,3,NULL,'99',3,'1676194863414'),(30,23,NULL,NULL,3,NULL,'99',3,'1676195073767'),(31,23,30,NULL,3,NULL,'963',3,'1676195170267'),(32,7,NULL,NULL,2,NULL,'新评论',3,'1676195443376'),(33,7,NULL,NULL,2,NULL,'又一个评论',3,'1676195606819'),(34,NULL,NULL,1,1,'how to register','who can help me',3,'1676216202554'),(35,34,NULL,NULL,2,NULL,'what can i do for you?',3,'1676217365929'),(36,35,NULL,NULL,3,NULL,'sleep at time',3,'1676217383808'),(37,35,36,NULL,3,NULL,'ok',3,'1676217394860'),(38,8,NULL,NULL,3,NULL,'who',2,'1676218294135'),(39,7,NULL,NULL,2,NULL,'I need to sleep',2,'1676218325259');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;

#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL DEFAULT '',
  `name` varchar(64) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

#
# Data for table "users"
#

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'1441275629@qq.com','zds','123','#e73480'),(2,'zhaodesheng@chemical.ai','zds2','666','#00ffff'),(3,'1339096327@qq.com','赵德升','123456','#0028a9');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
