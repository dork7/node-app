const express = require('express');

const router = express.Router();
const userRoutes = require('./user.route');
const mailRoutes = require('./mail.route');
const jwtRoutes = require('./jwt.route');
const productRoutes = require('./product.route');
const authRoutes = require('./auth.route');
const imageRoute = require('./image.route');
const smsRoute = require('./sms.route');
const sseRoute = require('./sse.route');
const redisRoute = require('./redis.route');
const jsonRoute = require('./json.route');
// const longPooling = require('./longPooling.route');
const { authorize } = require('../middlewares/auth.middleware');
const { graphqlHTTP } = require('express-graphql');

const os = require('os');
/**
 * GET v1/status
 */
router.get('/test', (req, res) => {
  console.log('req', req);
  res.send('OK');
});

router.get('/', (req, res, next) => {
  [1, 2, 3, 4, 5].map((i) => {
    console.log(`${os.hostname()} - ${i}`);
    router.get('/test');
  });
  res.send({ message: 'node app update', host: os.hostname() });
});

router.use('/auth', authRoutes);
router.use('/jwt', jwtRoutes);
router.use('/users', userRoutes);
router.use('/mail', mailRoutes);
// router.use("/product", authorize, productRoutes);
router.use('/product', productRoutes);
router.use('/image', imageRoute);
router.use('/sms', smsRoute);
router.use('/sse', sseRoute);
router.use('/redis', redisRoute);
router.use('/json-store', jsonRoute);

// router.use('/long-pooling', longPooling);

router.use(
  '/graphql',
  graphqlHTTP({
    schema: require('../graphql/schema'),
    graphiql: true,
  })
);

module.exports = router;
