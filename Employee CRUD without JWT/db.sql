create table IF NOT EXISTS users( 
	Uid serial,
	email text,
	fName text,
	lName text,
	mobile numeric,
	dob date,
	address text,
	createddate Date default current_timestamp,
	constraint pk_email primary key (email)
);

insert into users(email,fName,lName,mobile,dob,address)values('ukkarthi07@gmail.com','Umakarthikeyan','Chinnadurai',9345841850,'26-06-2003','Pollachi');

select * from users;