CREATE TABLE `MODEL_TYPE` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PHONE_MODEL_ID` int(11) NOT NULL,
  `VENDOR_ID` varchar(255) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `ITEM_ID` varchar(255) NOT NULL,
  `LINK` varchar(255) NOT NULL,
  `LAST_UPDATED` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`ID`),
  KEY `PHONE_MODEL_ID` (`PHONE_MODEL_ID`),
  KEY `VENDOR_ID` (`VENDOR_ID`),
  FOREIGN KEY (`PHONE_MODEL_ID`) REFERENCES `PHONE_MODEL` (`ID`),
  FOREIGN KEY (`VENDOR_ID`) REFERENCES `VENDOR` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;