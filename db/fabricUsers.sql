drop table fabricusers;
create table fabricusers
(
    userid int primary key auto_increment,
    username varchar(50) not null,
    userpassword varchar(50) not null,
    phonenumber varchar(20) not null,
    org varchar(100) not null,
    balance double 
);