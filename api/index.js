const apiRouter = require('express').Router();

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here

const userRouter = require('./users');
apiRouter.use('/users', userRouter);

const iconRouter = require('./icons')
apiRouter.use('/icons', iconRouter)

const mapRouter = require('./maps')
apiRouter.use('/maps', mapRouter)

module.exports = apiRouter;