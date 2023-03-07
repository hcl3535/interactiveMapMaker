const {client} = require('./');
const { getAllIcons, createIcon, getIconsByUser, getIconsByUsername, getIconsByUserId } = require('./models/icons');
const {createUser, getAllUsers, getUserByUsername} = require('./models/users')


async function buildTables() {
    try {
        await client.connect();

        await client.query(`
          DROP TABLE IF EXISTS icons;
          DROP TABLE IF EXISTS users;
        `)

        await client.query(`
          CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            profileimageurl VARCHAR(255)
          );
          
          CREATE TABLE icons (
            id SERIAL PRIMARY KEY,
            iconimageurl VARCHAR(255),
            userid INTEGER REFERENCES users(id),
            s3key VARCHAR(255)
          )
        `)
        
    } catch (error) {
        console.log(error)
    }

  }

  async function populateInitialData() {
    try {
      console.log("starting to create users")

      const usersToCreate = [
        {'username':'hunter', password:'Cartman35',email:'hunterl3535@yahoo.com', profileimageurl:'https://interactivemapprofileimages.s3.us-east-2.amazonaws.com/72678382_2718600728191984_7548284394268524544_n.jpg'},
        {'username':'autumn', password:'bleh', email:'aes.strange@gmail.com', profileimageurl:'https://interactivemapprofileimages.s3.us-east-2.amazonaws.com/61648932_2113245415465494_7449850590022074368_n.jpg'}
      ]

      await Promise.all(usersToCreate.map(createUser))
      
      console.log('all users',await getAllUsers())

      console.log('get user hunter', await getUserByUsername('hunter'))

      const iconsToCreate = [
        {'iconimageurl': 'https://interactivemapicons.s3.us-east-2.amazonaws.com/city.png', 'userid': 1, 's3key':'city.png'},
        {'iconimageurl': 'https://interactivemapicons.s3.us-east-2.amazonaws.com/blacksmith.png', 'userid': 1, 's3key':'blacksmith.png'},
        {'iconimageurl': 'https://interactivemapicons.s3.us-east-2.amazonaws.com/5594150-middle-removebg-preview.png', 'userid': 1, 's3key': '5594150-middle-removebg-preview.png'}
      ]

      await Promise.all(iconsToCreate.map(createIcon))

      console.log('allIcons', await getAllIcons())

      console.log('all Icons by user 1', await getIconsByUserId(1))
      
    } catch (error) {
      
    }
  }

  buildTables()
    .then(populateInitialData)
    .catch(console.error)
    .finally(()=> client.end())