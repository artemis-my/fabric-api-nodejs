use fabricexplorer;
drop table if exists fabricusers;
create table fabricusers
(
    userid int primary key auto_increment,
    username varchar(50) not null,
    userpassword varchar(50) not null,
    phonenumber varchar(20) not null,
    org varchar(100) not null
);
drop table if exists logsinfo;
create table logsinfo
(
	logid int primary key auto_increment,
	logname varchar(200) not null,
	logpath varchar(500) not null,
	saveflag int not null
);
