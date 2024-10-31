DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id serial primary key,
    username varchar(20),
    role varchar(6)
);

INSERT INTO users (username, role) VALUES
('user1', 'admin'),
('user2', 'admin'),
('user3', 'client'),
('user4', 'client'),
('user5', 'guest');

DROP TABLE IF EXISTS contact;
CREATE TABLE contact (
    id serial primary key,
    phone char(10),
    email varchar(45)
);

INSERT INTO contact (phone, email) VALUES
('1234567890', 'john.doe@example.com'),
('2345678901', 'jane.smith@example.com'),
('3456789012', 'david.johnson@example.com'),
('4567890123', 'sarah.williams@example.com'),
('5678901234', 'thomas.brown@example.com'),
('6789012345', 'emily.davis@example.com'),
('7890123456', 'michael.miller@example.com'),
('8901234567', 'olivia.wilson@example.com'),
('9012345678', 'noah.taylor@example.com'),
('0123456789', 'emma.moore@example.com'),
('1234567890', 'liam.harris@example.com'),
('2345678901', 'sophia.martin@example.com'),
('3456789012', 'william.jones@example.com'),
('4567890123', 'isabella.anderson@example.com'),
('5678901234', 'benjamin.clark@example.com'),
('6789012345', 'ava.lewis@example.com'),
('7890123456', 'jacob.hall@example.com'),
('8901234567', 'mia.allen@example.com'),
('9012345678', 'ethan.wright@example.com'),
('0123456789', 'amelia.thomas@example.com'),
('1234567890', 'john.doe2@example.com'),
('2345678901', 'jane.smith2@example.com'),
('3456789012', 'david.johnson2@example.com'),
('4567890123', 'sarah.williams2@example.com'),
('5678901234', 'thomas.brown2@example.com'),
('6789012345', 'emily.davis2@example.com'),
('7890123456', 'michael.miller2@example.com'),
('8901234567', 'olivia.wilson2@example.com'),
('9012345678', 'noah.taylor2@example.com'),
('0123456789', 'emma.moore2@example.com'),
('4123456789', 'john.doe3@example.com'),
('5234567890', 'jane.smith3@example.com'),
('6345678901', 'david.johnson3@example.com'),
('7456789012', 'sarah.williams3@example.com'),
('8567890123', 'thomas.brown3@example.com'),
('9678901234', 'emily.davis3@example.com'),
('0789012345', 'michael.miller3@example.com'),
('1890123456', 'olivia.wilson3@example.com'),
('2901234567', 'noah.taylor3@example.com'),
('3012345678', 'emma.moore3@example.com'),
('4123456789', 'liam.harris3@example.com'),
('5234567890', 'sophia.martin3@example.com'),
('6345678901', 'william.jones3@example.com'),
('7456789012', 'isabella.anderson3@example.com'),
('8567890123', 'benjamin.clark3@example.com'),
('9678901234', 'ava.lewis3@example.com'),
('0789012345', 'jacob.hall3@example.com'),
('1890123456', 'mia.allen3@example.com'),
('2901234567', 'ethan.wright3@example.com'),
('3012345678', 'amelia.thomas3@example.com'),
('4123456789', 'john.doe4@example.com'),
('5234567890', 'jane.smith4@example.com'),
('6345678901', 'david.johnson4@example.com'),
('7456789012', 'sarah.williams4@example.com'),
('8567890123', 'thomas.brown4@example.com'),
('9678901234', 'emily.davis4@example.com'),
('0789012345', 'michael.miller4@example.com'),
('1890123456', 'olivia.wilson4@example.com'),
('2901234567', 'noah.taylor4@example.com'),
('3012345678', 'emma.moore4@example.com');

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

INSERT INTO address (type, street, street2, city, state, zip, country) VALUES
('home', '123 Main St', '', 'Anytown', 'California', '90210', 'United States'),
('work', '456 Business Rd', '', 'Big City', 'New York', '10001', 'United States'),
('home', '789 Oak Ave', '', 'Smallville', 'Texas', '75201', 'United States'),
('work', '1011 Elm Blvd', '', 'Metro City', 'Florida', '33131', 'United States'),
('home', '1213 Pine Dr', '', 'Countryside', 'Colorado', '80202', 'United States'),
('work', '1415 Maple Ct', '', 'Suburbia', 'Illinois', '60606', 'United States'),
('home', '1617 Willow Ln', '', 'Riverside', 'Michigan', '48202', 'United States'),
('work', '1819 Birch Ave', '', 'Downtown', 'Ohio', '44101', 'United States'),
('home', '2021 Cedar St', '', 'Lakeside', 'Minnesota', '55404', 'United States'),
('work', '2223 Walnut Blvd', '', 'Uptown', 'Washington', '20001', 'United States'),
('home', '2425 Chestnut Dr', '', 'Hillside', 'Oregon', '97202', 'United States'),
('work', '2627 Sycamore Ct', '', 'Beachfront', 'Virginia', '23202', 'United States'),
('home', '2829 Hickory Ln', '', 'Mountainview', 'Kentucky', '40202', 'United States'),
('work', '3031 Ash Ave', '', 'Meadows', 'Tennessee', '37202', 'United States'),
('home', '3233 Poplar St', '', 'Riverview', 'North Carolina', '27702', 'United States'),
('work', '3435 Elm Blvd', '', 'Downtown', 'South Carolina', '29202', 'United States'),
('home', '3637 Pine Dr', '', 'Suburbia', 'Georgia', '30303', 'United States'),
('work', '3839 Maple Ct', '', 'Lakeside', 'Alabama', '35202', 'United States'),
('home', '4041 Willow Ln', '', 'Meadows', 'Mississippi', '39402', 'United States'),
('work', '4243 Birch Ave', '', 'Hillside', 'Arkansas', '72202', 'United States'),
('home', '4445 Cedar St', '', 'Beachfront', 'Louisiana', '70802', 'United States'),
('work', '4647 Walnut Blvd', '', 'Uptown', 'Oklahoma', '73101', 'United States'),
('home', '4849 Chestnut Dr', '', 'Countryside', 'Texas', '78702', 'United States'),
('work', '5051 Sycamore Ct', '', 'Suburbia', 'New Mexico', '87101', 'United States'),
('home', '5253 Hickory Ln', '', 'Riverside', 'Arizona', '85202', 'United States'),
('work', '5455 Ash Ave', '', 'Downtown', 'Nevada', '89101', 'United States'),
('home', '5657 Poplar St', '', 'Meadows', 'Utah', '84101', 'United States'),
('work', '5859 Elm Blvd', '', 'Lakeside', 'Idaho', '83702', 'United States'),
('home', '5860 Poplar St', '', 'Meadows', 'Wyoming', '82001', 'United States'),
('work', '5861 Elm Blvd', '', 'Lakeside', 'Montana', '59402', 'United States');

DROP TABLE IF EXISTS individual;
CREATE TABLE individual (
    id serial primary key,
    firstName varchar(20),
    middleName varchar(20),
    lastName varchar(20),
    birth date,
    approx boolean,
    age int,
    contactId int,
    addressId int
);

INSERT INTO individual (firstName, middleName, lastName, birth, approx, age, contactId, addressId) VALUES
('John', 'Doe', 'Smith', '1980-01-01', true, 44, 1, 1),
('Jane', 'Emily', 'Doe', '1990-05-15', false, 34, 2, 2),
('David', 'Michael', 'Johnson', '1975-12-25', true, 49, 3, 3),
('Sarah', 'Anne', 'Williams', '1995-09-08', false, 29, 4, 4),
('Thomas', 'James', 'Brown', '1960-03-20', true, 64, 5, 5),
('Emily', 'Elizabeth', 'Davis', '1985-11-10', false, 39, 6, 6),
('Michael', 'Joseph', 'Miller', '1970-07-05', true, 54, 7, 7),
('Olivia', 'Marie', 'Wilson', '1998-02-22', false, 26, 8, 8),
('Noah', 'Jacob', 'Taylor', '1965-06-12', true, 59, 9, 9),
('Emma', 'Ava', 'Moore', '2000-04-04', false, 24, 10, 10),
('Liam', 'Ethan', 'Harris', '1972-08-08', true, 52, 11, 11),
('Sophia', 'Amelia', 'Martin', '1987-10-16', false, 37, 12, 12),
('William', 'Oliver', 'Jones', '1992-12-28', true, 32, 13, 13),
('Isabella', 'Mia', 'Anderson', '1997-05-20', false, 27, 14, 14),
('Benjamin', 'Elijah', 'Clark', '1968-01-15', true, 56, 15, 15),
('Ava', 'Olivia', 'Lewis', '2002-03-25', false, 22, 16, 16),
('Jacob', 'Noah', 'Hall', '1974-07-07', true, 50, 17, 17),
('Mia', 'Sophia', 'Allen', '1989-11-12', false, 35, 18, 18),
('Ethan', 'William', 'Wright', '1994-06-18', true, 30, 19, 19),
('Amelia', 'Emma', 'Thomas', '1999-02-24', false, 25, 20, 20);

DROP TABLE IF EXISTS business;
CREATE TABLE business (
    id serial primary key,
    name varchar(45),
    contactId int,
    addressId int
);

INSERT INTO business (name, contactId, addressId) VALUES
('Acme Corporation', 21, 21),
('Tech Solutions', 22, 22),
('Retail Mart', 23, 23),
('Global Services', 24, 24),
('Innovative Ideas', 25, 25),
('Creative Designs', 26, 26),
('Reliable Systems', 27, 27),
('Efficient Solutions', 28, 28),
('Advanced Technologies', 29, 29),
('Strategic Planning', 30, 30);

DROP TABLE IF EXISTS otherReport;
CREATE TABLE otherReport (
    id serial primary key,
    amount int,
    type varchar(20), -- Type of crime
    source varchar(200), -- How do you know 
    incidentDate date, -- When it happened 
    approx boolean, -- Is the date exact 
    location varchar(100), -- Where it happened
    documentation boolean, -- Do you have documentation?
    description varchar(200),
    contactId int, -- Optional contact info
    status int, -- Report Status
    created timestamp,
    updated timestamp
);

INSERT INTO otherReport (amount, type, source, incidentDate, approx, location, documentation, description, contactId, status, created, updated) VALUES
(1000, 'Theft', 'Witness', '2023-10-23', false, 'Grocery store', true, 'Saw someone stealing a wallet.', 30, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(500, 'Vandalism', 'Victim', '2024-01-01', true, 'Home', false, 'Someone broke my window.', 31, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(200, 'Assault', 'Victim', '2023-05-15', false, 'Park', true, 'Someone punched me.', 32, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(100, 'Harassment', 'Witness', '2024-03-20', true, 'School', false, 'Heard someone being bullied.', 33, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(50, 'Disturbance', 'Witness', '2023-11-10', false, 'Restaurant', true, 'Saw a fight.', 34, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(300, 'Theft', 'Victim', '2024-02-25', true, 'Car', false, 'Someone stole my car radio.', 35, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(200, 'Vandalism', 'Witness', '2023-08-15', false, 'Building', true, 'Saw someone spray-painting a wall.', 36, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(100, 'Assault', 'Victim', '2024-04-20', true, 'Street', false, 'Someone pushed me.', 37, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(50, 'Harassment', 'Witness', '2023-12-10', false, 'Workplace', true, 'Heard someone being yelled at.', 38, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(300, 'Disturbance', 'Victim', '2024-03-25', true, 'Party', false, 'Got into a fight.', 49, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

DROP TABLE IF EXISTS other_individual;
CREATE TABLE other_individual (
    id serial primary key,
    reportId int,
    individualId int
);

INSERT INTO other_individual (reportId, individualId) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(3, 5),
(4, 6),
(5, 7),
(6, 8),
(7, 9),
(7, 10),
(8, 11);

DROP TABLE IF EXISTS other_business;
CREATE TABLE other_business (
    id serial primary key,
    reportId int,
    businessId int
);

INSERT INTO other_business (reportId, businessId) VALUES
(9, 1),
(10, 1),
(10, 2),
(10, 3);

DROP TABLE IF EXISTS launderingReport;
CREATE TABLE launderingReport (
    id serial primary key,
    amount int,
    source varchar(200), -- How do you know 
    method varchar(200), -- How is it laundered 
    processing varchar(200), -- How are transactions processed 
    location varchar(100), -- Where is it happening 
    incidentDate date, -- When it happened 
    approx boolean,
    organized varchar(5), -- Is money from organized crime? (mafia, cartel, etc) 
    documentation boolean, -- Do you have documentation? 
    description varchar(200),
    contactId int, -- Optional contact info
    status int, -- Report Status
    created timestamp,
    updated timestamp
);

INSERT INTO launderingReport (amount, source, method, processing, location, incidentDate, approx, organized, documentation, description, contactId, status, created, updated) VALUES
(100000, 'Witness', 'Cash Smuggling', 'Cash Deposits', 'Border', '2023-10-23', false, 'Yes', true, 'Saw someone smuggling cash across the border.', 40, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(50000, 'Victim', 'Real Estate Investment', 'Wire Transfers', 'City', '2024-01-01', true, 'No', false, 'My money was used to buy a property.', 41, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(200000, 'Victim', 'Business Purchase', 'Check Deposits', 'State', '2023-05-15', false, 'Yes', true, 'My money was used to buy a business.', 42, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10000, 'Witness', 'Cryptocurrency Exchange', 'Online Transactions', 'Country', '2024-03-20', true, 'No', false, 'Saw someone using cryptocurrency to launder money.', 43, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5000, 'Victim', 'Gambling', 'Cash Payments', 'Casino', '2023-11-10', false, 'Yes', true, 'My money was lost in a casino.', 44, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(300000, 'Witness', 'Invoice Fraud', 'Bank Transfers', 'City', '2024-02-25', true, 'No', false, 'Saw someone using fake invoices to launder money.', 45, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(200000, 'Victim', 'Charity Donation', 'Cash Donations', 'State', '2023-08-15', false, 'Yes', true, 'My money was donated to a fake charity.', 46, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10000, 'Witness', 'Stock Manipulation', 'Stock Purchases', 'Country', '2024-04-20', true, 'No', false, 'Saw someone manipulating the stock market to launder money.', 47, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5000, 'Victim', 'Counterfeit Goods', 'Cash Sales', 'City', '2023-12-10', false, 'Yes', true, 'My money was used to buy counterfeit goods.', 48, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(300000, 'Witness', 'Money Mule', 'Cash Transfers', 'State', '2024-03-25', true, 'No', false, 'Saw someone acting as a money mule.', 49, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

DROP TABLE IF EXISTS laundering_individual;
CREATE TABLE laundering_individual (
    id serial primary key,
    reportId int,
    individualId int
);

INSERT INTO laundering_individual (reportId, individualId) VALUES
(1, 12),
(2, 12),
(3, 13),
(4, 14),
(5, 15),
(5, 16);

DROP TABLE IF EXISTS laundering_business;
CREATE TABLE laundering_business (
    id serial primary key,
    reportId int,
    businessId int
);

INSERT INTO laundering_business (reportId, businessId) VALUES
(6, 2),
(7, 2),
(8, 3),
(9, 4),
(10, 5),
(10, 6);

DROP TABLE IF EXISTS institutionReport;
CREATE TABLE institutionReport (
    id serial primary key,
    amount int, 
    institution varchar(20), -- Type of financial institution 
    incidentDate date, -- When it happened 
    approx boolean,
    method varchar(200), -- How the fraud was perpetrated 
    employee boolean,  -- Was the individual employed by the institution? 
    source varchar(200), -- How do you know about it? 
    documentation boolean, -- Do you have documentation? 
    description varchar(200),
    contactId int, -- Optional contact info 
    status int, -- Report Status 
    created timestamp,
    updated timestamp
);

INSERT INTO institutionReport (amount, institution, incidentDate, approx, method, employee, source, documentation, description, contactId, status, created, updated) VALUES
(100000, 'Bank', '2023-10-23', false, 'Phishing', false, 'Victim', true, 'Received a phishing email.', 50, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(50000, 'Credit Union', '2024-01-01', true, 'Identity Theft', false, 'Victim', false, 'Someone used my identity to open an account.', 51, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(200000, 'Insurance Company', '2023-05-15', false, 'Fraudulent Claim', false, 'Witness', true, 'Saw someone filing a false insurance claim.', 52, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10000, 'Investment Firm', '2024-03-20', true, 'Misrepresentation', false, 'Victim', false, 'Was misled about an investment.', 53, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5000, 'Mortgage Company', '2023-11-10', false, 'Loan Fraud', false, 'Witness', true, 'Saw someone applying for a fraudulent loan.', 54, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(300000, 'Bank', '2024-02-25', true, 'Check Fraud', false, 'Victim', false, 'Received a fraudulent check.', 55, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(200000, 'Credit Union', '2023-08-15', false, 'ATM Skimming', false, 'Victim', true, 'Had my card skimmed at an ATM.', 56, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10000, 'Insurance Company', '2024-04-20', true, 'Fraudulent Claim', false, 'Witness', false, 'Saw someone filing a false insurance claim.', 57, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5000, 'Investment Firm', '2023-12-10', false, 'Misrepresentation', false, 'Victim', true, 'Was misled about an investment.', 58, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(300000, 'Mortgage Company', '2024-03-25', true, 'Loan Fraud', false, 'Witness', false, 'Saw someone applying for a fraudulent loan.', 59, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

DROP TABLE IF EXISTS institution_individual;
CREATE TABLE institution_individual (
    id serial primary key,
    reportId int,
    individualId int
);

INSERT INTO institution_individual (reportId, individualId) VALUES
(1, 17),
(2, 18),
(3, 19),
(4, 20),
(5, 15),
(5, 16);

DROP TABLE IF EXISTS institution_business;
CREATE TABLE institution_business (
    id serial primary key,
    reportId int,
    businessId int
);

INSERT INTO institution_business (reportId, businessId) VALUES
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 9),
(10, 10);

/*
 Rest of tables need data
*/

DROP TABLE IF EXISTS mortgageReport;
CREATE TABLE mortgageReport (
    id serial primary key,
    amount int, -- Total fraud amount
    loan int,  -- Mortgage Loan amount
    payments boolean,  -- Are payments still being made
    owner varchar(80), --Property Owner
    addressId int, -- Address of the property
    mortgage varchar(45), -- Name of Mortgage Company
    title varchar(45), -- Name of Title Company
    agent varchar(45), -- Name of Closing agent
    type varchar(45),  -- Type of mortgage fraud
    source varchar(45), -- How do you know
    documentation boolean, -- Do you have documentation
    description varchar(200),
    contactId int, -- Optional contact info 
    status int, -- Report Status 
    created timestamp,
    updated timestamp
)

DROP TABLE IF EXISTS mortgage_individual;
CREATE TABLE mortgage_individual (
    id serial primary key,
    reportId int,
    individualId int
);

DROP TABLE IF EXISTS mortgage_business;
CREATE TABLE mortgage_business (
    id serial primary key,
    reportId int,
    businessId int
);

DROP TABLE IF EXISTS investmentReport;
CREATE TABLE investmentReport (
    id serial primary key,
    amount int, -- Total investment amount
    loss int,  -- Total loss amount
    source varchar(200), -- How do you know about it? 
    force boolean, -- Did the subject use forceful or manipulative tactics
    promise varchar(200), -- What were you promised for the investment
    contract boolean, -- Was there a contract
    method varchar(45), -- How was the money transferred?
    funds boolean,  -- Are you having trouble retreiving your funds
    communication boolean, -- Are you able to contact the subject
    documentation boolean, -- Do you have documentation
    description varchar(200),
    contactId int, -- Optional contact info 
    status int, -- Report Status 
    created timestamp,
    updated timestamp
)

DROP TABLE IF EXISTS investment_individual;
CREATE TABLE investment_individual (
    id serial primary key,
    reportId int,
    individualId int
);

DROP TABLE IF EXISTS investment_business;
CREATE TABLE investment_business (
    id serial primary key,
    reportId int,
    businessId int
);


DROP TABLE IF EXISTS embezzlementReport;
CREATE TABLE embezzlementReport (
    id serial primary key,
    amount int, -- Total embezzled amount
    employee boolean,  -- Was the subject employed by the victim?
    type varchar(45), -- Was money, property or information taken
    location varchar(100), -- Where are the funds now
    source varchar(200), -- How do you know about it? 
    documentation boolean, -- Do you have documentation
    description varchar(200),
    contactId int, -- Optional contact info 
    status int, -- Report Status 
    created timestamp,
    updated timestamp
)

DROP TABLE IF EXISTS embezzlement_individual;
CREATE TABLE embezzlement_individual (
    id serial primary key,
    reportId int,
    individualId int
);

DROP TABLE IF EXISTS embezzlement_business;
CREATE TABLE embezzlement_business (
    id serial primary key,
    reportId int,
    businessId int
);
