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

create table Category(
  id int PRIMARY KEY auto_increment not null,
  name varchar(255) not null,
  description varchar(255)
);

create table Brand(
  id int PRIMARY KEY auto_increment not null,
  name varchar(255) not null,
  country varchar(255) not null,
  description varchar(255)
);

create table Product(
  id int PRIMARY KEY auto_increment not null,
  categoryId int not null,
  name varchar(255) not null,
  price int not NULL,
  quantity int not null DEFAULT 1,
  image text not null,
  star FLOAT not null DEFAULT 5,
  quantityVote int not null DEFAULT 1
);

create table ProductDetail(
  id int PRIMARY KEY auto_increment not null,
  productId int not null,
  FOREIGN key(productId) references Product(id),
  description varchar(255),
  brandId int not null,
  FOREIGN key(brandId) references Brand(id),
  code int
);