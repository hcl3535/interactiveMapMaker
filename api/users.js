const { getAllUsers, getUserByUserAndPassword, getUserById, createUser, updateUserWorldHistory, getUserByUsername } = require('../db/models/users');
const jwt = require('jsonwebtoken');
const { getMapByUserAndName } = require('../db/models/maps');
const secret = process.env.JWT_SECRET;

const userRouter = require('express').Router();

userRouter.get('/all', async (req,res,next) => {
    try {
        const allUsers = await getAllUsers()
        res.send(allUsers)
    } catch (error) {
        next(error)
    }
})

userRouter.post('/login', async (req,res,next) => {

    const {username, password} = req.body;

    try {
        const user = await getUserByUserAndPassword(username, password)

        if(user === undefined){
            res.send(confirmation = {
                message: 'username or password is incorrect'
            })
        }else{
        
        const token = jwt.sign({username: username, id: user.id}, secret)

        const confirmation = {
            message: 'your logged in',
            token: token,
            user: user
        }

        res.send(confirmation)
        }
    } catch (error) {
        next(error)
    }
})

userRouter.get('/:userId/worldhistory', async (req,res,next) => {
    try {
        const {userId} = req.params

        const user = await getUserById(userId)
        
        
        const userWorldHistoryNames = user.worldhistory
        

        let userWorldHistory = await Promise.all(userWorldHistoryNames.map(async (value) => {

            return(await getMapByUserAndName(userId, value))
        }))

        res.send(userWorldHistory)
    } catch (error) {
        next(error)
    }
})

userRouter.patch('/:userId/worldhistory', async (req,res,next) => {
    try {
        const {newWorldHistory} = req.body
        const {userId} = req.params
        
        const updatedWorldHistory = await updateUserWorldHistory(userId, newWorldHistory)
        
        res.send(updatedWorldHistory)
    } catch (error) {
        next(error)
    }
})

userRouter.get('/me', async (req, res, next) => {
    const prefix = 'bearer '

    try {
        const auth = req.headers.authorization
        const token = auth.slice(prefix.length)
        
        let authorizedUser = jwt.verify(token, secret)
        if(authorizedUser.username) {
            const me = await getUserById(authorizedUser.id)
            
            res.send(me)
        }

    } catch (error) {
        next(error)
    }
})

userRouter.post('/register',async (req,res,next) => {

    try {

    const {username, password, email, profileimageurl,worldhistory} = req.body;

    const userNameIsTaken = await getUserByUsername(username)
    
    
    if(userNameIsTaken !== undefined){
        res.send(confirmation = {
            message: "username is allready taken",
        })
    } else if(password.length < 8){
        res.send(confirmation = {
            message: "password must be longer than 8 characters",
        })
    } else if(!email.includes('@') || !email.includes('.com')){
        res.send(confirmation = {
            message: "must provide valid email address",
        })
    } else {
    const newUser = await createUser({username, password, email,profileimageurl,worldhistory})

    const token = jwt.sign({
        username: newUser.username,
        id: newUser.id
    }, secret);

    const confirmation = {
        message: "new user registered!",
        token: token,
        user: {
            id: newUser.id,
            username: newUser.username
        }
    };
    
    res.send(confirmation);
  }
} catch (error) {
    next(error)  
}
})

userRouter.get('/:userId', async (req,res,next) => {
    try {
        const {userId} = req.params;

        const user = await getUserById(userId)
        res.send(user)
    } catch (error) {
        next(error)
    }
})

module.exports = userRouter;
