const client = require('../client')

async function createMap(map) {
    try {
        
        const {initialmap, name, mapurl, icon, iconx, icony, children, userid, iconwidth} = map;

        const {rows: [addedmap]} = await client.query(`
            INSERT INTO maps (initialmap, name, mapurl, icon, iconx, icony, children, userid, iconwidth)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `,[initialmap, name, mapurl, icon, iconx, icony, children, userid,iconwidth])

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

async function updateChildren(id,updatedChildren){
    try {
        const {rows: [map]} = await client.query(`
            UPDATE maps
            SET children = $2
            WHERE id = $1
            RETURNING *
        `,[id, updatedChildren])
        
        return map
    } catch (error) {
        console.log(error)
    }
}

async function updateCitySize(id,width){
    try {
        const {rows: [map]} = await client.query(`
            UPDATE maps
            SET iconwidth = $2
            WHERE id = $1
            RETURNING *
        `, [id, width])

        return map
    } catch (error) {
        console.log(error)
    }
}

async function updateMap(id, iconx, icony) {
    try {
        const {rows} = await client.query(`
            UPDATE maps
            SET iconx = $2, icony =$3
            WHERE id = $1
            RETURNING *
        `, [id, iconx, icony])

        return rows
    } catch (error) {
        console.log(error)
    }
}

async function deleteMap(mapId){
    try {
        const {rows: deletedCity} = await client.query(`
          DELETE FROM maps
          WHERE id = $1
          Returning *
        `,[mapId])
        return deletedCity
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
  createMap,
  getAllMaps,
  getAllUserWorldMaps,
  getMapByUserAndName,
  updateChildren,
  updateMap,
  deleteMap,
  updateCitySize
}