create table User(
  id int PRIMARY KEY auto_increment not null,
  email varchar(255) not null,
  password varchar(255) not null,
  fullName varchar(255) not null,
  phoneNumber varchar(10),
  birthday date,
  avatar varchar(255),
  street varchar(40),
  ward varchar(20),
  district varchar(20),
  province varchar(20),
  role varchar(10) not null default 'guest',
  isActive boolean not null default false,
  UNIQUE(email)
);

UPDATE mysql.user SET Password=PASSWORD('password') WHERE User='root'; 