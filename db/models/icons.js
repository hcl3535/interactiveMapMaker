const client = require('../client')

async function createIcon (newIcon) {
    try {
        
        const {rows: [icon]} = await client.query(`
        INSERT INTO icons (iconimageurl, userid, s3key)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,[newIcon.iconimageurl, newIcon.userid, newIcon.s3key]);
        

        return icon
    } catch (error) {
        console.log(error)
    }
}

async function getAllIcons () {
    try {
        const {rows} = await client.query(`
        SELECT *
        FROM icons;
        `)
        return rows
    } catch (error) {
        console.log(error)
    }
}

async function getIconsByUserId(id) {
    try {
        const {rows: userIcons} = await client.query(`
        Select *
        FROM icons
        WHERE userid = $1;
        `,[id]);
        return userIcons
    } catch (err) {
        console.log(err)
    }
}

async function deleteIconById(iconId) {
    try {

        const {rows: deletedIcon} = await client.query(`
            DELETE FROM icons
            WHERE id = $1
            RETURNING *;
        `,[iconId]);

        return deletedIcon
    } catch (error) {
        console.log(error)
    }
}

async function getIconById(id) {
    try {

        const {rows: [icon]} = await client.query(`
            SELECT *
            FROM icons
            WHERE id = $1;
        `,[id]);

        return icon
    } catch (error) {
        console.log(error)
    }
}

async function getIconbyIconImageUrl(url) {
    try {
        const {rows: [icon]} = await client.query(`
            SELECT *
            FROM icons
            WHERE iconimageurl = $1;
        `,[url])
        return icon
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createIcon,
    getAllIcons,
    getIconsByUserId,
    deleteIconById,
    getIconById,
    getIconbyIconImageUrl
}