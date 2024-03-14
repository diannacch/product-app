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
-- Table structure for table `productos_proveedores`
--

DROP TABLE IF EXISTS `productos_proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_proveedores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_producto` int DEFAULT NULL,
  `id_proveedor` int DEFAULT NULL,
  `clave_proveedor` varchar(255) DEFAULT NULL,
  `costo` decimal(38,2) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_producto` (`id_producto`),
  KEY `id_proveedor` (`id_proveedor`),
  CONSTRAINT `productos_proveedores_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  CONSTRAINT `productos_proveedores_ibfk_2` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_proveedores`
--

LOCK TABLES `productos_proveedores` WRITE;
/*!40000 ALTER TABLE `productos_proveedores` DISABLE KEYS */;
INSERT INTO `productos_proveedores` VALUES (14,17,4,'Pinol100',17.00,1),(15,18,4,'Fab100',17.00,1),(16,17,5,'Pinol200',16.00,1),(17,19,14,'Tv60',5500.00,1),(18,19,11,'TVSamrt60',7000.00,1),(19,20,4,'QuesoVillita',17.00,1),(20,20,9,'QuesoVill',17.50,1),(21,21,5,'Clorx100',16.00,1),(22,21,4,'Cloralex',17.00,1),(23,22,12,'Clx100',12.00,1),(24,22,13,'Clx',12.50,1),(25,23,10,'SuavitelGln',80.00,1),(26,23,11,'Suavitel',100.00,1),(27,23,4,'Suavitel150',60.00,1),(28,23,5,'Suav150',68.00,1),(29,24,13,'Aud',2100.00,1),(30,24,14,'AudiBoss',2000.00,1),(31,25,14,'LavLg',6000.00,1),(32,25,13,'LavLgSmart',6700.00,1),(33,26,14,'LicTfal',750.00,1),(34,26,12,'LicNegTFal',700.00,1),(35,27,4,'JamFud',13.00,1),(36,27,8,'FudJamon',17.00,1),(37,27,5,'FudJamon',22.00,1),(38,28,4,'LecheLala',27.00,1),(39,28,5,'Lala100',26.00,1),(40,29,5,'AlpLeche',28.00,1),(41,29,4,'LechAlp',27.00,1),(42,30,6,'SantaClara100',26.00,1),(43,30,4,'Clara100',29.00,1),(44,30,7,'LecheSC100',30.00,0),(45,17,5,'ETSLOP',100.00,1),(46,17,6,'CLOROX1232',20.00,1),(47,17,8,'KD393',30.00,1),(48,22,11,'TSXT283',200.00,1);
/*!40000 ALTER TABLE `productos_proveedores` ENABLE KEYS */;
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
