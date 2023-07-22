
// Connect to DB
const { Client } = require('pg');
require('dotenv').config()

// change the DB_NAME string to whatever your group decides on
const DB_NAME = 'interactiveMap';



if(process.env.NODE_ENV === 'production'){
  DB_URL = process.env.DATABASE_URL
} else {
  DB_URL = process.env.DATABASE_URL
  // DB_URL = `postgres://localhost:5432/${DB_NAME}`
}

console.log("DBURL",DB_URL)


let client;

// github actions client config
if (process.env.CI) {
  client = new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  });
} else {
  // local / heroku client config
  client = new Client(DB_URL);
}
module.exports = client;