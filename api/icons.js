const { getIconsByUserId, createIcon, deleteIconById, getIconById } = require('../db/models/icons');
const multer = require('multer')
const upload = multer( { dest: 'uploads/' } )

const {uploadIconFile, deleteIconFile} = require('../s3')

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const iconRouter = require('express').Router();



// iconRouter.get('/', async (req,res,next) => {
//     try {
//         res.send('help')
//     } catch (error) {
//         console.error(error)
//     }
// })

iconRouter.get('/user/:userId',async (req,res,next) => {
    try {
        
      const {userId} = req.params;

      const icons = await getIconsByUserId(userId)

      res.send(icons)


    } catch (error) {
        console.error(error)
    }
})

iconRouter.get('/:iconId', async (req,res,next) => {
    try {
        const {iconId} = req.params;
        console.log('iconid',iconId)

        const icon = await getIconById(iconId)
        
        res.send(icon)
    } catch (error) {
        console.error(error)
    }
})

iconRouter.post('/',upload.single('image'), async (req, res, next) => {
    try {
        const {userId} = req.body
        const file = req.file
        const result = await uploadIconFile(file)
        const icon = createIcon({iconimageurl: result.Location, userid: userId, s3key: result.key})
        await unlinkFile(file.path)
        res.send(icon)
        
    } catch (error) {
        console.error(error)
    }
})

iconRouter.delete('/:iconId', async (req,res,next) => {
    
    try {
        const {iconId} = req.params;
        const icon = await getIconById(iconId)

        await deleteIconFile(icon.s3key)

        await deleteIconById(iconId)

        res.send()
    } catch (error) {
        console.error(error)
    }
})

module.exports = iconRouter;