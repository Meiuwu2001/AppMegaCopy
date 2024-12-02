-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: integradora10.c9oysu6q83x5.us-east-2.rds.amazonaws.com    Database: integradora10
-- ------------------------------------------------------
-- Server version	8.0.39

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `idClientes` int NOT NULL AUTO_INCREMENT,
  `Nombre` text NOT NULL,
  `ApellidoPa` text NOT NULL,
  `ApellidoMa` text,
  `Telefono` varchar(45) DEFAULT NULL,
  `CorreoElectronico` varchar(45) DEFAULT NULL,
  `users_idusers` int NOT NULL,
  PRIMARY KEY (`idClientes`),
  KEY `fk_clientes_users1_idx` (`users_idusers`),
  CONSTRAINT `fk_clientes_users1` FOREIGN KEY (`users_idusers`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Carlos','Ramírez','Sánchez','5551122334','carlos.ramirez@example.com',0),(3,'Carla','Ramírez','Sánchez','5551122334','Carla.ramirez@example.com',0),(8,'desde el front','desde el front','si ','51541412','si@si.com',13),(13,'client','de ','prueba 1','617128321','prueba@gmail.com',41),(14,'Iván','Garcia','Lopez','6181234567','si@si.com',45),(16,'pepo','uwu','uuw','6232','pepo@gmail.com',75),(17,'alma','soto','cervantes','567890','alma@gamil.com',77);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactus`
--

DROP TABLE IF EXISTS `contactus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactus` (
  `IdContactUS` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `mensaje` varchar(500) NOT NULL,
  PRIMARY KEY (`IdContactUS`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactus`
--

LOCK TABLES `contactus` WRITE;
/*!40000 ALTER TABLE `contactus` DISABLE KEYS */;
INSERT INTO `contactus` VALUES (1,'samuel','reyna','samuel@gmail.com','124','quiero una pagina web'),(3,'Carlos','Pérez','carlos.perez@hotmail.com','4449876543','¿Ofrecen soporte técnico 24/7?'),(5,'María','González','maria.gonzalez@yahoo.com','3331236789','Quisiera agendar una llamada para discutir detalles del proyecto.'),(6,'samuel','reyna','samuel@gmail.com','124','quiero dos paginas web'),(7,'samuel','reyna','samuel@gmail.com','124','quiero dos paginas web y verla en rancheritos tech '),(8,'Paola','Herrera Ortiz','paola08@gmail.com','6181234567','No me hables nunca Samuelito '),(9,'Paola','Herrera Ortiz','paola08@gmail.com','6181234567','No me hables nunca Samuelito '),(10,'Samuel','Reyna','samuel.reyna434@gmail.com','6183100616','Mensaje desde la pagina web de rancheritos solicitando un servicio'),(11,'samuel','reyna','samuel.reyna434@gmail.com','6183100616','prueba desde la pag web'),(12,'y ahora','que tal','samuel.reyna434@gmail.com','61818','sjajdasd'),(13,'Samuel ','Rg','samuel.reyna434@gmail.com','610310616','Ayuda'),(14,'ivan','garcia','ivan@gmail.com','123544','algo'),(15,'','','','',''),(16,'','','','','');
/*!40000 ALTER TABLE `contactus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipos`
--

DROP TABLE IF EXISTS `equipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipos` (
  `idEquipos` int NOT NULL AUTO_INCREMENT,
  `Estatus` enum('activo','inventariado','reparacion') DEFAULT NULL,
  `NumeroEquipo` varchar(100) DEFAULT NULL,
  `NumeroSerie` varchar(100) DEFAULT NULL,
  `IdProductos` int NOT NULL,
  `idUbicaciones` int NOT NULL,
  PRIMARY KEY (`idEquipos`),
  UNIQUE KEY `Equiposcol_UNIQUE` (`NumeroSerie`),
  UNIQUE KEY `NumeroEquipo_UNIQUE` (`NumeroEquipo`),
  KEY `fk_equipos_productos1_idx` (`IdProductos`),
  KEY `fk_equipos_ubicaciones1_idx` (`idUbicaciones`),
  CONSTRAINT `fk_equipos_productos1` FOREIGN KEY (`IdProductos`) REFERENCES `productos` (`idProductos`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_equipos_ubicaciones1` FOREIGN KEY (`idUbicaciones`) REFERENCES `ubicaciones` (`idUbicaciones`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos`
--

LOCK TABLES `equipos` WRITE;
/*!40000 ALTER TABLE `equipos` DISABLE KEYS */;
INSERT INTO `equipos` VALUES (4,'inventariado','EQ0011','NS00112315',3,14),(6,'activo','EQ0012','NS0011232',4,14),(8,'activo','EQ0013','NS0011233',4,8),(13,'activo','CED3','SAKLJFH235235H',17,8),(16,'reparacion','OP1','ASDKH235345H2',3,14),(25,'activo','ASDA','ASDKJAD',13,8),(30,'activo','ASDAadas','ASDKJsdad',7,8),(31,'activo','sdas1q132','asdas2312',3,8),(32,'activo','M219304','NOSE123',3,14),(33,'activo','MM99','6543',42,15),(34,'activo','5432','76543',42,14),(35,'activo','ASDFG123','ASDFG123',3,8),(36,'activo','ASDFGH1234','ASDFGH1234',16,8),(37,'activo','0000','0000',42,8),(38,'activo','00','000',40,8),(39,'activo','111','111',20,8),(41,'activo','asdaasdasda','asdasasda',3,8),(42,'activo','M43','MHH366HG1I',7,14);
/*!40000 ALTER TABLE `equipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimientos_inventario`
--

DROP TABLE IF EXISTS `movimientos_inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimientos_inventario` (
  `idMovimiento` int NOT NULL AUTO_INCREMENT,
  `idEquipo` int DEFAULT NULL,
  `idProducto` int DEFAULT NULL,
  `idUbicacion` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `tipoMovimiento` enum('Entrada','Salida','Movimiento Interno') DEFAULT NULL,
  `fechaMovimiento` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idMovimiento`),
  KEY `idEquipo` (`idEquipo`),
  KEY `idProducto` (`idProducto`),
  KEY `idUbicacion` (`idUbicacion`),
  CONSTRAINT `fk_movimientos_equipo` FOREIGN KEY (`idEquipo`) REFERENCES `equipos` (`idEquipos`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_movimientos_productos` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProductos`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_movimientos_ubicaciones` FOREIGN KEY (`idUbicacion`) REFERENCES `ubicaciones` (`idUbicaciones`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimientos_inventario`
--

LOCK TABLES `movimientos_inventario` WRITE;
/*!40000 ALTER TABLE `movimientos_inventario` DISABLE KEYS */;
/*!40000 ALTER TABLE `movimientos_inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `idProductos` int NOT NULL AUTO_INCREMENT,
  `modelo` varchar(100) DEFAULT NULL,
  `Categoria` varchar(100) DEFAULT NULL,
  `Marca` varchar(100) DEFAULT NULL,
  `Tipo` text,
  `Existencia` int DEFAULT NULL,
  `Caracteristicas` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`idProductos`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (3,'MFC-L6900DW1','Impresora','Brother','Escáner',621,'Impresión láser, conexión Wi-Fi, impresión duplex, velocidad de impresión 40 ppm.'),(4,'SP 4510DN','Impresora','Ricoh','Impresora',20,'Impresión láser, conexión Ethernet, impresión duplex, velocidad de impresión 42 ppm.'),(7,'SCX-5637FR','Multifuncional','Samsung','Impresora',15,'Impresión láser, escaneo, fax, impresión duplex, velocidad de impresión 35 ppm.'),(9,'TN-820','Toner','Brother','Suministro',50,'Tóner negro de alto rendimiento, compatible con impresoras Brother de la serie MFC-L6900.'),(10,'SP C830DN Toner','Toner','Ricoh','Suministro',40,'Tóner de alto rendimiento color, compatible con impresoras Ricoh serie SP.'),(11,'TK-1170','Toner','Kyocera','Suministro',45,'Tóner negro, compatible con impresoras Kyocera ECOSYS P2040dw.'),(12,'CF258X','Toner','HP','Suministro',60,'Cartucho de tóner de alto rendimiento negro, compatible con impresoras HP LaserJet Pro M404.'),(13,'MLT-D205L','Toner','Samsung','Suministro',30,'Cartucho de tóner negro, compatible con impresoras Samsung SCX-5637FR.'),(14,'ADS-2700W','Escáner','Brother','Escáner',10,'Escaneo dúplex, conexión Wi-Fi y Ethernet, resolución de escaneo hasta 600 dpi.'),(16,'TASKalfa 308ci','Impresora Multifuncional','Kyocera','Impresora',9,'Impresión láser color, escaneo, copia, fax, velocidad de impresión 30 ppm.'),(17,'ENVY 6055e','Impresora','HP','Impresora',20,'Impresión a color, conexión Wi-Fi, compatible con impresión móvil, velocidad de impresión 10 ppm en negro y 7 ppm en color.'),(19,'PT-P900W','Impresora de Etiquetas','Brother','Impresora',5,'Impresión de etiquetas, conexión Wi-Fi, resolución de impresión 360 dpi, compatible con etiquetas de hasta 36 mm de ancho.'),(20,'GC41KH','Cartucho de Tinta','Ricoh','Suministro',50,'Cartucho de tinta negra, compatible con impresoras Ricoh de la serie SG.'),(32,'54321','Multifuncional','ppp','',9,'uuu'),(40,'111','Toner','111','Suministro',1,'pp'),(41,'mmm','Laser','mmm','Escáner',7,'p'),(42,'tgbh','Multifuncional','hhh','Impresora',6,'u'),(43,'asa','','asa','',2,'asdas'),(44,'asa','','asa','',2,'asdas'),(45,'aadas','','sdad','',100,'asdasda'),(47,'76543','Multifuncional','5432','Escáner',44,'7654');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportes`
--

DROP TABLE IF EXISTS `reportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportes` (
  `IdReporte` int NOT NULL AUTO_INCREMENT,
  `TituloReporte` varchar(200) DEFAULT NULL,
  `FolioReporte` varchar(45) DEFAULT NULL,
  `fechaCreacion` datetime DEFAULT NULL,
  `fechaHoraActualizacion` datetime DEFAULT NULL,
  `estado` enum('pendiente','ejecucion','concluido') DEFAULT NULL,
  `comentarios` varchar(1000) DEFAULT NULL,
  `ComentariosFinales` varchar(1000) DEFAULT NULL,
  `creadorReporte` int NOT NULL,
  `tecnicoAsignado` int DEFAULT NULL,
  `idEquipos` int NOT NULL,
  PRIMARY KEY (`IdReporte`),
  KEY `fk_reportes_clientes1_idx` (`creadorReporte`),
  KEY `fk_reportes_tecnicos1_idx` (`tecnicoAsignado`),
  KEY `fk_reportes_equipos1_idx` (`idEquipos`),
  CONSTRAINT `fk_reportes_clientes1` FOREIGN KEY (`creadorReporte`) REFERENCES `clientes` (`idClientes`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reportes_equipos1` FOREIGN KEY (`idEquipos`) REFERENCES `equipos` (`idEquipos`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reportes_tecnico1` FOREIGN KEY (`tecnicoAsignado`) REFERENCES `tecnicos` (`idTecnicos`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportes`
--

LOCK TABLES `reportes` WRITE;
/*!40000 ALTER TABLE `reportes` DISABLE KEYS */;
INSERT INTO `reportes` VALUES (54,'Atascos de papel','12345','2024-11-26 22:11:30','2024-11-27 18:05:27','concluido','Ocurren con frecuencia y pueden deberse a una mala alineación del papel, calidad inadecuada o problemas en el mecanismo de alimentación',NULL,1,15,4),(56,'Problemas con los cartuchos de tinta o tóner si','4567','2024-11-26 22:14:02','2024-11-28 04:04:35','concluido','Fugas, cartuchos secos, incompatibilidad o falta de tinta/tóner si.','asdasdadasdasdasdasdaaasd',14,15,13),(58,'tinta','75432','2024-11-27 02:24:41','2024-11-28 04:03:48','concluido','tinta 2','sipi',3,15,32),(89,'No imprime','4321','2024-11-27 17:58:26','2024-11-27 20:25:24','ejecucion','reportar al tecnico','resolverlo a la brevedad',14,17,8),(91,'tira tinta','','2024-11-27 21:41:04','2024-11-28 04:51:43','concluido','tira tinta','Jskdjdkfjf',14,15,4),(111,'Atasco de papel','654321','2024-11-28 02:10:30','2024-11-28 04:49:49','concluido','Se atasco el papel','Hdidjdjfj',14,15,8),(112,'Ya imprime pero no escanea','','2024-11-28 03:01:56','2024-11-29 06:09:58','concluido','Pruebas con driver de escaneo programadas ',NULL,14,21,13),(114,'Udusheishsk','','2024-11-28 03:15:35','2024-11-28 03:15:35','pendiente','Hdjdbdofhdk',NULL,14,NULL,36),(115,'alskdfjhl','71236','2024-11-28 04:14:52','2024-11-28 04:49:33','concluido','slkdjhfkljsahdfkjlashjdfk','Eywidueue',14,15,13),(116,'Heudbdj','','2024-11-28 04:25:32','2024-11-29 05:50:28','concluido','Ejdidhf',NULL,14,22,31),(117,'Falta tóner','6867','2024-11-28 04:25:46','2024-11-29 18:39:16','concluido','El equipo se quedó sin tóner ','Se cambio toner',14,15,32),(119,'Ya no imprime','','2024-11-28 17:28:08','2024-11-28 17:28:08','pendiente','Falso contacto en la entrada del cable hacia la pc',NULL,14,NULL,13),(120,'No detecta las hojas','','2024-11-28 17:29:20','2024-11-28 19:19:22','concluido','Sensores en el depósito de papel dañados ',NULL,14,15,13),(121,'Equipo dejó de funcionar','3241432','2024-11-29 05:59:17','2024-11-29 05:59:17','ejecucion','El equipo se apagó de repente y ya no quiere encender',NULL,14,15,35);
/*!40000 ALTER TABLE `reportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tareas`
--

DROP TABLE IF EXISTS `tareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tareas` (
  `idTareas` int NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(100) DEFAULT NULL,
  `Descripcion` varchar(500) DEFAULT NULL,
  `Observaciones` varchar(500) DEFAULT NULL,
  `Estatus` enum('pendiente','proceso','finalizada') DEFAULT NULL,
  `idReportes` int DEFAULT NULL,
  PRIMARY KEY (`idTareas`),
  KEY `fk_tareas_reportes` (`idReportes`),
  CONSTRAINT `fk_tareas_reportes` FOREIGN KEY (`idReportes`) REFERENCES `reportes` (`IdReporte`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tareas`
--

LOCK TABLES `tareas` WRITE;
/*!40000 ALTER TABLE `tareas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tareas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tecnicos`
--

DROP TABLE IF EXISTS `tecnicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tecnicos` (
  `idTecnicos` int NOT NULL AUTO_INCREMENT,
  `Nombre` text,
  `ApellidoPa` text,
  `ApellidoMa` varchar(45) DEFAULT NULL,
  `Telefono` varchar(45) DEFAULT NULL,
  `CorreoElectronico` varchar(45) DEFAULT NULL,
  `Estatus` enum('activo','inactivo','ocupado') DEFAULT NULL,
  `users_idusers` int NOT NULL,
  PRIMARY KEY (`idTecnicos`),
  KEY `fk_tecnicos_users1_idx` (`users_idusers`),
  CONSTRAINT `fk_tecnicos_users1` FOREIGN KEY (`users_idusers`) REFERENCES `users` (`idusers`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tecnicos`
--

LOCK TABLES `tecnicos` WRITE;
/*!40000 ALTER TABLE `tecnicos` DISABLE KEYS */;
INSERT INTO `tecnicos` VALUES (3,'Carlos','López','Lopez','555-9876',NULL,'inactivo',0),(15,'Samuel','Reyna ','Gonzalez ','12346678','Samuel08@gmail.com','activo',27),(16,'Ivan','Garcia','Lopez','6181234567','Ivan@gmail.com','activo',28),(17,'Jonathan','Gurrola','Antuna','6181234567','Jonathan1@gmail.com','activo',31),(21,'juan','perez','perez','234567','perez1@gmail.com','inactivo',79),(22,'uwu','uwu','uwu','13411','uwu@gmail.com','activo',80);
/*!40000 ALTER TABLE `tecnicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicaciones`
--

DROP TABLE IF EXISTS `ubicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ubicaciones` (
  `idUbicaciones` int NOT NULL AUTO_INCREMENT,
  `Nombre` tinytext,
  `Ciudad` tinytext,
  `Estado` varchar(100) DEFAULT NULL,
  `CodigoPostal` varchar(10) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `clientes_idClientes` int NOT NULL,
  PRIMARY KEY (`idUbicaciones`),
  KEY `fk_ubicaciones_clientes1_idx` (`clientes_idClientes`),
  CONSTRAINT `fk_ubicaciones_clientes1` FOREIGN KEY (`clientes_idClientes`) REFERENCES `clientes` (`idClientes`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicaciones`
--

LOCK TABLES `ubicaciones` WRITE;
/*!40000 ALTER TABLE `ubicaciones` DISABLE KEYS */;
INSERT INTO `ubicaciones` VALUES (8,'Recursos Humanos','Durango','Durango','340001','Blvd. Luis Donaldo Colosio',14),(14,'Nueva ubicacion','Durango','Durango','34000','Centro',14),(15,'ppp','Durango','Durango','34194','guerrero #115\nmexico',1),(18,'nn','Durango','Durango','34194','guerrero #115\nmexico',14),(28,'paola','Durango','Durango','34194','guerrero #115\nmexico',1),(29,'pao','Durango','Durango','34194','guerrero #115\nmexico',8);
/*!40000 ALTER TABLE `ubicaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idusers` int NOT NULL AUTO_INCREMENT,
  `user` varchar(45) DEFAULT NULL,
  `password` varchar(500) NOT NULL,
  `rol` enum('cliente','tecnico','admin') NOT NULL,
  PRIMARY KEY (`idusers`),
  UNIQUE KEY `user_UNIQUE` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'usuario2','$2a$10$.TLoCLKPcjL5E9CAhmxdXeXfjzxRWN8e7V6jUAKrV8jVuw90T00eW','cliente'),(7,'nuevoUsuario','$2a$10$A.uoYVF2ne02Rd7cKnUCaON8aJVD8W1rhm2xNobigubKqMPuAxPQi','admin'),(8,'Cliente1','$2a$10$wE3R8QugjA.omr76q6eaBeq2cfekVaVW4V06bCymo6Tj0.FJtKvsG','cliente'),(9,'tecnico2','$2a$10$Gi5974twip5m9bfxYPJmk.sfSYcG3PjHXy.S6L79M5lYLFl9dCdYu','tecnico'),(10,'si','$2a$10$3aUJQUEhYViJuJnszan3f.dHtj7EiJ1kf2hm3dHAkW.UUCCOkmPdq','cliente'),(11,'meimei','$2a$10$SMv6hVtYLTrCx34Tp/1OWeJhQRjp2F3YDWimrhNUXQeXujju1Nokq','admin'),(12,'desdeelfront','$2a$10$2isBwALbqUJuvjwsSVjlfOSDl89ExZHwf7ndbuK2Ptq/hHtx6ccAa','cliente'),(13,'desdeelfront2','$2a$10$H5XpZ8fpgU8c7e3ceapbqOMKdgycagJRkQTrd8plQQroqgBbpJJ4i','cliente'),(16,'owo','$2a$10$FgJBNQ1idPmlH/.vfKrQdudLydUjlBrsk1brr4WUyGbRANPABKexi','tecnico'),(17,'nose','$2a$10$WgJKm2vUHO2dM9iBi8jjqeRrhK9uDHNADyrdZnKf/KmAU3f3Lx5Pe','tecnico'),(18,'TecnicoUser','$2a$10$GO.Q0nEevLOTHii2SzYry.xS6SVb/PKvBk7RsB6JGypvp7Zt0vlgS','tecnico'),(20,'Meimei1','$2a$10$rAyAvcOtvIOfvFDPsSBZJ.7F5.5cadfWGqZUIohIVf4LCD4P/LMcq','tecnico'),(25,'owo12','$2a$10$fAPHvUV./xIzUd82nrApFuCepDwvt71GdHMCK6.wSFrJofdqZ8ElK','tecnico'),(26,'Paola','$2a$10$pAUnnOivdnvys1p/Ew2ZfOWLvq2gJ./aEVvLqJcG6F4LqkYCeKK6q','tecnico'),(27,'Pao','$2a$10$/xR.Wcuj0GvEQVXMOhNZBe5NGDRNWXl0I/b2Wy/9XD7tFMq8dgoku','tecnico'),(28,'Ivan','$2a$10$B3WkxaQYj6FzLXutaw645uNdq3MMwwh5Z5m.C0LtMsyz2N3Q6uhoq','tecnico'),(31,'Jona','$2a$10$xIKmzYnWOLjR.h.1hHrk7emVMjYGq2s7IvFwUvDKa930hS1SV5Wyi','tecnico'),(36,'NuevoCliente','$2a$10$orF1XFxy/I.Az1vGXWD.VuCbtFurIx83SnnLP53gqJrApqQM3I00K','cliente'),(39,'NuevoCliente1','$2a$10$x6i.kvW1l..SzDeg/9kS2umhJqgNpG5N1EYISbMfKhZnM4/UUyVgW','cliente'),(41,'NuevoCliente4','$2a$10$PrFeLGcFPqGhbX1be2moW.0afl1dcmJnTlCVn0AHGitedHuU/inRG','cliente'),(44,'cosmi','$2a$10$.Md5Bzd7VgzgabeW8yr4Je7kjyh3YK0uG960xg7J6Fb.uiq77RIjq','admin'),(45,'pepo','$2a$10$oRoogudHbePQXUH72XIxkuUKOgxibADHHrFsQbb22sjPDOYVPWL0y','cliente'),(48,'samuelito','$2a$10$nnl2r9n17S2DtysYr30ZlOHDul0V1j4NOlWdOUlOUos4vixjZH6tG','cliente'),(55,'yahir','$2a$10$c/CeoiLG7cEp.0HBEftN0O3tN76ELjZT0tZEgHFcyGYAnrcG7N6Sa','cliente'),(57,'PPP','$2a$10$dkNwgoKq.zeYTnFMoOinauaWIlyZrI/aRellMC76g5FUCSAlWiaFi','tecnico'),(59,'pedro','$2a$10$vbrsZxhY3zdQogGzecfmDOhSoScU9aC1D54gEXgLBacb2vZ.SxOLW','cliente'),(60,'ttt','$2a$10$L82Ysj/n8OtQgpkQmUTW3ufVKgTWP7cNDsNzoS5u0T0A23dhYVRUy','tecnico'),(61,'jj','$2a$10$SUfYyNS9yEiOslfpHu9X.uTBZhYJxhRPVqQCzRPQrdwz6g1MkuWse','tecnico'),(62,'PaoPao','$2a$10$3vX0lsl.ex8lCc6MVQp5Lehg0Oc5Gls9xKV/PEqhhqlw.8mQgbpOC','tecnico'),(64,'PaoPao1','$2a$10$HZ26BYR4OZOaHJdJiaJiWOitEBEtBmfO4G2D9MtF6ag757hSYSpPK','tecnico'),(66,'PaoPao4','$2a$10$CuY8oOeWftvYGbYGsI.dNeNFeLJKxivbhGD.GC3M/hWex3o8Uq4S2','tecnico'),(67,'Pao123','$2a$10$5jctLkIALKOGel0LTXuZLerQ2yWvKaOYFjwIAyRHjQOwgt6xcXsxy','tecnico'),(68,'Pao1233','$2a$10$fP8oFDd5MUIXjjf1VtKJouBpykEQNx.r1wcjyUsUlFEPouZeA/X1K','tecnico'),(69,'Pao1224134','$2a$10$RDh3CkqDY5KrcIIyCosWn.ooMC6zNr0C.Ub.DT9za/cfllox/wIRO','tecnico'),(70,'Paola124341','$2a$10$lGNhCgJxGJRjQ0s1Cu3EEezpTnWkPJT/e9vgOR5PI3FVpWMCmnGdO','tecnico'),(75,'pepo3','$2a$10$Ot8AK5U/5QU6Gcv7ZdNBGOrdPAb.gY6.Laay59oZD39p4cqxR5vjm','cliente'),(77,'alma','$2a$10$I10d36jAPquRmmLOknBZ5.0uu2DJYNgeVWS2F619384G14JgvgoVK','cliente'),(79,'juan','$2a$10$UFrlMVGqiB96HtVlY.qmO.5ChEyDMZr/ystEUO2XZdROu4j1V/GWO','tecnico'),(80,'uwu1213414','$2a$10$bi4JuqVduiz9a2Lq8NePeekbG5gt86E7NRJr9AfT3xxMeKeDhqXvC','tecnico');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-02  0:15:49
