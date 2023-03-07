const { getAllUsers, getUserByUserAndPassword, getUserById, createUser } = require('../db/models/users');
const jwt = require('jsonwebtoken')
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
        
        const token = jwt.sign({username: username, id: user.id}, secret)

        const confirmation = {
            message: 'your logged in',
            token: token,
            user: user
        }

        res.send(confirmation)

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
    const {username, password, email} = req.body;
    
    const newUser = await createUser({username, password, email})
    console.log('newUser', newUser)

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
    console.log('confirmation', confirmation)
    res.send(confirmation);
})

module.exports = userRouter;
