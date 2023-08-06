const client = require('../client')
const bcrypt = require('bcrypt');
const SALT = 13;

async function createUser (userInfo) {
    try {

        const hashedPassword = await bcrypt.hash(userInfo.password, SALT);
        userInfo.password = hashedPassword;

        const valueString = Object.keys(userInfo).map(
            (key, index) => `$${ index+1 }`
          ).join(', ');

          const keyString = Object.keys(userInfo).map(
            (key) => `"${ key }"`
          ).join(', ');

        const {rows: [newUser]} = await client.query(`
        INSERT INTO users (${keyString})
        VALUES (${valueString})
        RETURNING *;
        `,Object.values(userInfo));

        delete newUser.password;
        delete newUser.email;
        console.log('newUser',newUser)


        return newUser
    } catch (error) {
        console.log(error)
    }
}

async function getAllUsers () {
    try {
        const {rows} = await client.query(`
        SELECT *
        FROM users;
        `)

        for(let user of rows){

            
            delete user.password;
            delete user.email;
        }
        console.log("user mofo",rows)

        return rows
    } catch (error) {
        console.log(error)
    }
}

async function getUserByUserAndPassword (username, password) {
    try {
        const {rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username = $1
        `, [username])

        const passwordMatch = await bcrypt.compare(password, user.password);

        delete user.password;
        delete user.email;

        console.log('heheheh',user)
        
        if(user === undefined){
            return user
        }
        if(passwordMatch){
            return user
        } else {
            throw new Error('username or password incorrect')
        }

    } catch (error) {
        console.log(error)
    }
}

async function getUserByUsername (username) {
    try {
        const {rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username = $1
        `, [username])

        delete user.password;
        delete user.email;

        return user
    } catch (error) {
        console.log(error)
    }
}

async function getUserById(id) {
  const {rows: [user] } = await client.query(`
  SELECT *
  FROM users
  WHERE id = $1
  `,[id])

  delete user.password
  delete user.email
  return user
}

async function updateUserWorldHistory(id, newWorldHistory){

    
    const {rows: [user]} = await client.query(`
    UPDATE users
    SET worldhistory = $2
    WHERE id = $1
    RETURNING *
    `,[id, newWorldHistory])
    
    delete user.password
    delete user.email
    
    console.log('bruh',id, newWorldHistory)
    console.log(user)
    
    return user
}

module.exports = {
    createUser,
    getAllUsers,
    getUserByUsername,
    getUserByUserAndPassword,
    getUserById, 
    updateUserWorldHistory
}