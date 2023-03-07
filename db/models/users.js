const client = require('../client')

async function createUser (userInfo) {
    try {

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

        if(password === user.password){
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
  return user
}

module.exports = {
    createUser,
    getAllUsers,
    getUserByUsername,
    getUserByUserAndPassword,
    getUserById
}