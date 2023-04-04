const { getAllUserWorldMaps, getMapByName, getMapByUserAndName, createMap, updateChildren, updateMap } = require('../db/models/maps');

const multer = require('multer')
const upload = multer( { dest: 'uploads/' } )

const {uploadIconFile, deleteIconFile, uploadMapFile} = require('../s3')

const fs = require('fs')
const util = require('util');
const { getIconbyIconImageUrl } = require('../db/models/icons');
const unlinkFile = util.promisify(fs.unlink)
const mapRouter = require('express').Router();

mapRouter.get('/:userId/:name', async (req,res,next) => {
    try {
        const {userId, name} = req.params;
        console.log(userId, name)

        const map = await getMapByUserAndName(userId,name)
        console.log('api',map)
        res.send(map)
    } catch (error) {
        console.error(error)
    }
})

mapRouter.get('/:userId', async (req,res,next) => {
    try {
        const {userId} = req.params;

        const userWorldMaps = await getAllUserWorldMaps(userId)
        
        res.send(userWorldMaps)
    } catch (error) {
        console.error(error)
    }
})

mapRouter.post('/:userId',upload.single('image'), async (req,res,next) => {
    try {
        const {userId} = req.params;
        const {fileProps,currentMap} = req.body;
        const file = req.file

        const result = await uploadMapFile(file)
        
        const props = JSON.parse(fileProps)
        props.userid = userId

        if(props.icon){
        const icon =  await getIconbyIconImageUrl(props.icon)
        props.icon = icon.id
        }
        
        
        props.mapurl = result.Location
        
        
        props.iconx = Number(props.iconx)
        props.icony = Number(props.icony)
        
        console.log('props',props)
        const newMap = await createMap(props)
        await unlinkFile(file.path)

        if(currentMap){
        const curMap = JSON.parse(currentMap)
        curMap.children.push(newMap.name)

        await updateChildren(curMap.id,curMap.children)
        }
        
        res.send(newMap)
    } catch (error) {
        console.error(error)
    }
})

mapRouter.patch('/:mapId', async (req,res,next) => {
    try {
        const {city} = req.body;
        city.icon = city.icon.id
        console.log('here', city)

        const updatedMap = await updateMap(city.id, city.iconx, city.icony)

        res.send(updatedMap)

    } catch (error) {
        console.error(error)
    }
})

module.exports = mapRouter;