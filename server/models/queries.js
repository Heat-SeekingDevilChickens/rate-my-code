/*

creates new users table:

CREATE TABLE posts (
_id SERIAL PRIMARY KEY,
topic varchar(255),
date int,
upvotes int,
downvotes int,
title varchar(255),
issue varchar(255),
tried varchar(255),
cause varchar(255),
code varchar(255),
user_id int,
FOREIGN KEY (user_id) REFERENCES users(_id)
);


creates a new comments table:

CREATE TABLE comments (
_id SERIAL PRIMARY KEY,
comment varchar,
code varchar,
upvotes int,
downvotes int,
date int,
post_id int,
user_id int,
FOREIGN KEY (post_id) REFERENCES posts(_id),
FOREIGN KEY (user_id) REFERENCES users(_id)
);
	
creates new users table:

CREATE TABLE users (
_id SERIAL PRIMARY KEY,
username varchar(255),
password varchar(255)
);


	
	*/

