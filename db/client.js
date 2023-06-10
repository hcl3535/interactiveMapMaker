
// Connect to DB
const { Client } = require('pg');

// change the DB_NAME string to whatever your group decides on
const DB_NAME = 'interactiveMap';


if(process.env.NODE_ENV === 'production'){
  DB_URL = 'postgresql://postgres:SDst8e79BQYcL7OjQr8M@containers-us-west-76.railway.app:7135/railway'
} else {
  // DB_URL = 'postgresql://postgres:SDst8e79BQYcL7OjQr8M@containers-us-west-76.railway.app:7135/railway'
  DB_URL = `postgres://localhost:5432/${DB_NAME}`
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