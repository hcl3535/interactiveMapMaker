const client = require('../client')

async function createMaps(map) {
    try {
        
        const {initialmap, name, mapurl, icon, iconx, icony, children, userid} = map;

        const {rows: [addedmap]} = await client.query(`
            INSERT INTO maps (initialmap, name, mapurl, icon, iconx, icony, children, userid)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `,[initialmap, name, mapurl, icon, iconx, icony, children, userid])

        return addedmap
    } catch (error) {
        console.log(error)
    }
}

async function getAllMaps() {
    try {
        const {rows} = await client.query(`
           SELECT *
           FROM maps; 
        `)

        return rows
    } catch (error) {
        console.log(error)
    }
}

async function getAllUserWorldMaps(userId) {
    try {
        const {rows} = await client.query(`
            SELECT *
            FROM maps
            WHERE userid = $1 AND initialmap = true
        `,[userId])
        console.log(rows)
        return rows
    } catch (error) {
        console.log(error)
    }
}

async function getMapByUserAndName(userId,name) {
    try {
        const {rows: [map]} = await client.query(`
            SELECT *
            FROM maps
            WHERE userid = $1 AND name = $2
        `,[userId, name])
        return map
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
  createMaps,
  getAllMaps,
  getAllUserWorldMaps,
  getMapByUserAndName
}