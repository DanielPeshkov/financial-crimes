DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id serial primary key,
    username varchar(20),
    role varchar(5)
);

DROP TABLE IF EXISTS individual;
CREATE TABLE individual (
    id serial primary key,
    firstName varchar(20),
    middleName varchar(20),
    lastName varchar(20),
    birth date,
    approx boolean,
    age int,
    contactId int references contact(id),
    addressId int references address(id)
);

DROP TABLE IF EXISTS business;
CREATE TABLE business (
    id serial primary key,
    name varchar(45),
    contactId int references contact(id),
    addressId int references address(id)
);

DROP TABLE IF EXISTS contact;
CREATE TABLE contact (
    id serial primary key,
    phone char(10),
    email varchar(45),
);

DROP TABLE IF EXISTS address;
CREATE TABLE address (
    id serial primary key,
    type varchar(8),
    street varchar(45),
    street2 varchar(45),
    city varchar(45),
    state varchar(45),
    zip char(5),
    country varchar(45)
);

DROP TABLE IF EXISTS otherReport;
CREATE TABLE otherReport (
    id serial primary key,
    amount int,
    type varchar(20), <-- Type of crime -->
    source varchar(200), <-- How do you know -->
    incidentDate date, <-- When it happened -->
    approx boolean, <-- Is the date exact --> 
    location varchar(100), <-- Where it happened -->
    documentation boolean, <-- Do you have documentation? -->
    description varchar(200),
    contactId int references contact(id), <-- Optional contact info -->
    status int, <-- Report Status -->
    created timestamp,
    updated timestamp
);

DROP TABLE IF EXISTS other_individual;
CREATE TABLE other_individual (
    id serial primary key,
    reportId int references otherReport(id),
    individualId int references individual(id)
);

DROP TABLE IF EXISTS other_business;
CREATE TABLE other_business (
    id serial primary key,
    reportId int references otherReport(id),
    businessId int references business(id)
);

DROP TABLE IF EXISTS launderingReport;
CREATE TABLE launderingReport (
    id serial primary key,
    amount int,
    source varchar(200), <-- How do you know -->
    method varchar(200), <-- How is it laundered -->
    processing varchar(200), <-- How are transactions processed -->
    location varchar(100), <-- Where is it happening -->
    incidentDate date, <-- When it happened -->
    approx boolean,
    organized varchar(5), <-- Is money from organized crime? (mafia, cartel, etc) -->
    documentation boolean, <-- Do you have documentation? -->
    description varchar(200),
    contactId int references contact(id), <-- Optional contact info -->
    status int, <-- Report Status -->
    created timestamp
);

DROP TABLE IF EXISTS laundering_individual;
CREATE TABLE laundering_individual (
    id serial primary key,
    reportId int references launderingReport(id),
    individualId int references individual(id)
);

DROP TABLE IF EXISTS laundering_business;
CREATE TABLE laundering_business (
    id serial primary key,
    reportId int references launderingReport(id),
    businessId int references business(id)
);

DROP TABLE IF EXISTS institutionReport;
CREATE TABLE institutionReport (
    id serial primary key,
    amount int, 
    institution varchar(20), <-- Type of financial institution -->
    incidentDate date, <-- When it happened -->
    approx boolean,
    method varchar(200), <-- How the fraud was perpetrated -->
    employee boolean,  <-- Was the individual employed by the institution? -->
    source varchar(200), <-- How do you know about it? -->
    documentation boolean, <-- Do you have documentation? -->
    description varchar(200),
    contactId int references contact(id), <-- Optional contact info -->
    status int, <-- Report Status -->
    created timestamp,
    updated timestamp
);

DROP TABLE IF EXISTS institution_individual;
CREATE TABLE institution_individual (
    id serial primary key,
    reportId int references institutionReport(id),
    individualId int references individual(id)
);

DROP TABLE IF EXISTS institution_business;
CREATE TABLE institution_business (
    id serial primary key,
    reportId int references institutionReport(id),
    businessId int references business(id)
);
