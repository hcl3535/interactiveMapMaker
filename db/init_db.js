const {client} = require('./');
const { getAllIcons, createIcon, getIconsByUser, getIconsByUsername, getIconsByUserId } = require('./models/icons');
const { createMap, getAllMaps } = require('./models/maps');
const {createUser, getAllUsers, getUserByUsername} = require('./models/users')



async function buildTables() {
    try {
        await client.connect();

        await client.query(`
          DROP TABLE IF EXISTS maps;
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
          );

          CREATE TABLE maps (
            id SERIAL PRIMARY KEY,
            initialmap BOOLEAN,
            name VARCHAR(255),
            mapurl VARCHAR(255),
            icon INTEGER REFERENCES icons(id),
            iconx FLOAT,
            icony FLOAT,
            children VARCHAR ARRAY,
            userid INTEGER REFERENCES users(id)
          );
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


      const mapsToCreate = [
        {'initialmap': true,'name': 'dorphil', 'mapurl': 'https://interactivemapmaps.s3.us-east-2.amazonaws.com/worldMap.png','icon': null, 'iconx': null, 'icony': null, 'children': ['shriple', 'blurson'], 'userid': 1},
        {'initialmap': false,'name': 'shriple', 'mapurl': 'https://interactivemapmaps.s3.us-east-2.amazonaws.com/city1map.jpg', 'icon': 1, 'iconx': 31, 'icony': 60, 'children': ['shop'], 'userid': 1},
        {'initialmap': false, 'name': 'blurson', 'mapurl': 'https://interactivemapmaps.s3.us-east-2.amazonaws.com/city2Map.jpg', 'icon': 2, 'iconx': 60, 'icony': 60, 'children': [], 'userid': 1},
        {'initialmap': false, 'name': 'shop', 'mapurl': 'https://interactivemapmaps.s3.us-east-2.amazonaws.com/shopMap.png', 'icon': 3, 'iconx': 60, 'icony': 60, 'children': [], 'userid': 1},
        {'initialmap': true,'name': 'peentrap', 'mapurl': 'https://interactivemapmaps.s3.us-east-2.amazonaws.com/5UTeF1B.png','icon': null, 'iconx': null, 'icony': null, 'children': [], 'userid': 1},
      ]

      await Promise.all(mapsToCreate.map(createMap))
      
      console.log('allMaps',await getAllMaps())
      
    } catch (error) {
      
    }
  }

  buildTables()
    .then(populateInitialData)
    .catch(console.error)
    .finally(()=> client.end())