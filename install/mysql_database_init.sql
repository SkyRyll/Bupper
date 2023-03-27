drop database if exists optik;
CREATE DATABASE optik DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE optik;

CREATE TABLE IF NOT EXISTS accounts (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  firstname varchar(50) NOT NULL,
  lastname varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  password varchar(32) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS mailinglist (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

/* create users */
INSERT INTO accounts (email, firstname, lastname, username, password) VALUES ("admin@mail.com", "admin", "login", "administrator", md5("admin"));
INSERT INTO accounts (email, firstname, lastname, username, password) VALUES ("malte@mail.com", "Malte", "Blumenthal", "Lowadon", md5("LowaMalte"));
INSERT INTO accounts (email, firstname, lastname, username, password) VALUES ("nils@mail.com", "Nils", "Simon", "SkyRyll", md5("SkyNils"));
INSERT INTO accounts (email, firstname, lastname, username, password) VALUES ("niklas@mail.com", "Niklas", "Schraff", "Niki28", md5("NikiNiklas"));

/* create mails for mailing list */
INSERT INTO mailinglist (email) VALUES ("admin@mail.com");
INSERT INTO mailinglist (email) VALUES ("malte@mail.com");
INSERT INTO mailinglist (email) VALUES ("nils@mail.com");
INSERT INTO mailinglist (email) VALUES ("niklas@mail.com");