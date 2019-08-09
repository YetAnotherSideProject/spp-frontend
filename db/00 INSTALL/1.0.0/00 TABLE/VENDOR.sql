CREATE TABLE `VENDOR` (
  `ID` varchar(255) NOT NULL,
  `ENDPOINT` varchar(255) NOT NULL,
  `ASSOCIATE_TAG` varchar(255) DEFAULT NULL,
  `ACCESS_KEY` varchar(255) DEFAULT NULL,
  `SECRET_KEY` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;