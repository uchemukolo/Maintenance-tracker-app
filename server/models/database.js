import dotenv from 'dotenv';

dotenv.config();

const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

const client = new pg.Client(connectionString);
client.connect();

const users = `
DROP TABLE IF EXISTS users cascade;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(40) not null unique,
    firstName VARCHAR(40) not null,
    lastName VARCHAR(40) not null,
    email VARCHAR(40) not null unique,
    hashPassword VARCHAR(255) not null,
    role VARCHAR(20) default 'user',
    created_at timestamp (0) without time zone default now())`;


const seedUsers = `
INSERT INTO users VALUES( default, 'muche', 'Uche', 'Mukolo', 'muche@email.com', '$asdflkj', 'Admin', default )`;

const requests = `
DROP TABLE IF EXISTS requests cascade;
DROP TYPE category_type;
DROP TYPE urgency_level_type;
DROP TYPE status_type;
DROP TYPE complete_status_type;
CREATE TYPE category_type AS ENUM ('Repair', 'Maintenance');
CREATE TYPE urgency_level_type AS ENUM ('High', 'Medium', 'Low');
CREATE TYPE status_type AS ENUM ('Pending', 'Approved', 'Disapproved');
CREATE TYPE complete_status_type AS ENUM ('Pending','In Progress', 'Resolved');
CREATE TABLE requests(
  id SERIAL PRIMARY KEY,
  userId int,
  title VARCHAR(40) not null,
  category category_type,
  UrgencyLevel urgency_level_type,
  description TEXT not null,
  status status_type,
  completeStatus complete_status_type,
  created_at timestamp (0) without time zone default now(),
  FOREIGN KEY (userId) REFERENCES users(id)
   )
`;

client.query(users).then((res, err) => {
  console.log(res);
});

client.query(seedUsers).then((res, err) => {
  console.log(res);
});

client.query(requests).then((res, err) => {
  console.log(res);
  client.end();
});
