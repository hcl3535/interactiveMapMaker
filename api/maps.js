const { getAllUserWorldMaps, getMapByName, getMapByUserAndName } = require('../db/models/maps');

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

module.exports = mapRouter;