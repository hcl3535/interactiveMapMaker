const { getAllUserWorldMaps, getMapByName, getMapByUserAndName, createMap, updateChildren, updateMap, deleteMap, updateCitySize, getMapById, getCommunityMaps, updateIfMapIsShared, deleteAllMapsByIconId, getAllUserMaps } = require('../db/models/maps');

const multer = require('multer')
const upload = multer( { dest: 'uploads/' } )

const {uploadIconFile, deleteIconFile, uploadMapFile} = require('../s3')

const fs = require('fs')
const util = require('util');
const { getIconbyIconImageUrl } = require('../db/models/icons');
const unlinkFile = util.promisify(fs.unlink)
const mapRouter = require('express').Router();

mapRouter.get('/communityMaps', async(req,res,next) => {
    try {
        const maps = await getCommunityMaps()
        res.send(maps)
    } catch (error) {
        console.error(error)
    }
})

mapRouter.patch('/communityMaps', async(req,res,next) => {
    try {
        const {bool, worldId} = req.body;
        
        const changedMap = await updateIfMapIsShared(bool, worldId)
        res.send(changedMap)
    } catch (error) {
        console.error(error)
    }
})

mapRouter.delete('/mapIconId/:id', async (req,res,next) => {
    try {
        const {id} = req.params;

        
        
        const deletedMaps = await deleteAllMapsByIconId(id)
        res.send(deletedMaps)
    } catch (error) {
        console.error(error)
    }
})

mapRouter.patch(`/removeChildrenIfDeleted`, async (req,res,next) => {
    try {
        const {deletedMaps} = req.body;
        const userId = deletedMaps.userid
        console.log(deletedMaps)
        if(!deletedMaps.children[0]){
            res.send()
            next()
        }
        
        const userWorldMaps = await getAllUserMaps(userId)

        const hasChild = userWorldMaps.filter((map) => {
          return(map.children.includes(deletedMaps.id))
        })

        const newChildren = hasChild[0].children.filter((child)=>{
            return (child !== deletedMaps.id)
        })

        const updatedMap = await updateChildren(hasChild[0].id,newChildren)

        res.send(updatedMap)
    
    } catch (error) {
        console.error(error)
    }
})

mapRouter.get('/mapid/:mapId', async(req,res,next) => {
    try {
        const {mapId} = req.params;
        const map = await getMapById(mapId)
        res.send(map)
    } catch (error) {
        console.error(error)
    }
})

mapRouter.get('/allMaps/:userId', async (req,res,next) => {
    try {
        const {userId} = req.params;

        console.log('butthole')
        const userWorldMaps = await getAllUserWorldMaps(userId)
        
        res.send(userWorldMaps)
    } catch (error) {
        console.error(error)
    }
})
mapRouter.get('/:userId/:name', async (req,res,next) => {
    try {
        const {userId, name} = req.params;
        const map = await getMapByUserAndName(userId,name)
        res.send(map)
    } catch (error) {
        console.error(error)
    }
})

mapRouter.get('/:name', async (req,res,next) => {
    try {
        const {name} = req.params;
        const map = await getMapByName(name)
        res.send(map)
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
        
        const newMap = await createMap(props)
        console.log(newMap)
        await unlinkFile(file.path)

        if(currentMap){
        const curMap = JSON.parse(currentMap)
        console.log(newMap.id)
        curMap.children.push(newMap.id)

        const children = await updateChildren(curMap.id,curMap.children)
        console.log('children',children)
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

        const updatedMap = await updateMap(city.id, city.iconx, city.icony)
        res.send(updatedMap)

    } catch (error) {
        console.error(error)
    }
})

mapRouter.delete('/:mapId', async (req, res, next) => {
    try {
        const {mapId} = req.params;
        const deletedMap = await deleteMap(mapId)
        res.send(deletedMap)
    } catch (error) {
        console.error(error)
    }
})

mapRouter.patch('/removeChild/:parrentId', async (req,res,next) => {
    try {
        const {parrentId} = req.params;
        const {childToRemove,parrentMap} = req.body

        console.log('childtoremove',childToRemove)
        console.log('delete from',parrentMap)
        

        const index = parrentMap.children.indexOf(childToRemove.id);
        parrentMap.children.splice(index,1);

        const updatedChildren = await updateChildren(parrentId, parrentMap.children)
        
        res.send(updatedChildren)
        
        
    } catch (error) {
        console.error(error)
    }
})

mapRouter.patch('/changeCitySize/:cityId', async (req, res, next) => {
    try {
        const {cityId} = req.params;
        const {width} = req.body;

        const updatedCity = await updateCitySize(cityId, width)
        
        res.send(updatedCity)
    } catch (error) {
        console.error(error)
    }
})
module.exports = mapRouter;