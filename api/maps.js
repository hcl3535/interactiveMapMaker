const { getAllUserWorldMaps } = require('../db/models/maps');

const mapRouter = require('express').Router();

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