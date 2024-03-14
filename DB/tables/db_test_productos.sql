-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (x86_64)
--
-- Host: localhost    Database: db_test
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clave_producto` varchar(255) DEFAULT NULL,
  `nombre_producto` varchar(255) DEFAULT NULL,
  `precio_venta` decimal(38,2) DEFAULT NULL,
  `id_tipo_producto` int DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_tipo_producto` (`id_tipo_producto`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_tipo_producto`) REFERENCES `tipos_productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (17,'Pinol300','Pinol Test Prueba Update',20.00,1,1),(18,'Fabuloso300','Fabuloso',30.00,1,1),(19,'Tv60','Samsung TV 60',8000.00,4,1),(20,'VillitaQueso1','Queso Oaxaca La Villita',45.00,3,1),(21,'Cloralex300','Cloralex',50.00,1,1),(22,'Roma300','Roma',20.00,1,1),(23,'Suavitel150','Suavitel',109.00,1,1),(24,'Bose100','Audifonos Bose',3000.00,4,1),(25,'SecadoraLg','LG Dry',7000.00,4,1),(26,'LicuadoraTFal','Licuadora T-Fal',800.00,4,1),(27,'FudJamon','Jamon Fud',45.00,3,1),(28,'LecheLala','Leche Lala',30.00,3,1),(29,'LecheAlpura','Leche Alpura',30.00,3,1),(30,'LecheSantaClara','Leche Santa Clara',31.00,3,1),(31,'OaxQueso','Queso Oaxaca',50.00,3,1),(32,'LecheL100','Leche Light',32.00,4,0),(33,'ComputadoraLG','Computadora',10000.00,4,1),(34,'Test1','Test',23.00,2,1),(35,'test p 2','test 2',100.00,2,1),(36,'tet23','test 3',100.00,2,1),(37,'334tew5','test 34',100.00,2,0),(38,'tesr 5','Test 4',100.00,2,0),(39,'test4','test4',200.00,2,1),(40,'test6','test5',20.00,2,1),(41,'test7','test6',10.00,2,1),(42,'tets73','test8',103.00,2,1),(43,'cama200','Cama',200.00,2,0);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-13 18:47:45
