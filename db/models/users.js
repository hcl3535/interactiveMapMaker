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
        return rows
    } catch (error) {
        console.log(error)
    }
}

async function getUserByUserAndPassword (username, password) {
    try {
        const user = await getUserByUsername(username)

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch)
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
  return user
}

async function updateUserWorldHistory(id, newWorldHistory){
    
    const {rows: [user]} = await client.query(`
    UPDATE users
    SET worldhistory = $2
    WHERE id = $1
    `,[id, newWorldHistory])
    
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