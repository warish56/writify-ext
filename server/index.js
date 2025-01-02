require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')


const aiRoutes = require('./routes/ai');
const creditsRoutes = require('./routes/credits');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const ordersRoutes = require('./routes/orders');


const {
  initAppWriteSdk,
  prepareDatabase
} = require('./db/init')

const {
  preparePlanCollection,
  seedPlansCollection
} = require('./db/plan')

const {
  prepareUserCollection
} = require('./db/user')

const {
  prepareAccountsCollection
} = require('./db/accounts')

const {
  prepareOtpCollection
} = require('./db/otp')

const {
  prepareOrdersCollection
} = require('./db/orders');

const {
  prepareIpCollection
} = require('./db/ip');


const { runMigrations } = require('./migrations');

const app = express();
const PORT = process.env.PORT || 8000;

// addinf cookie parser to read and set cookies
app.use(cookieParser())

// Middleware
app.use(cors({
  origin: [process.env.EXTENSION_ORIGIN],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

//When your app is behind a proxy, req.ip might show the proxy's IP address. To retrieve the original client IP adding this middleware
app.set('trust proxy', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/ai', aiRoutes);
app.use('/credits', creditsRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/orders', ordersRoutes);



const initializeDbAndCollections = async () => {
  try{
    
      await initAppWriteSdk();
      await prepareDatabase();
      await preparePlanCollection();
      await seedPlansCollection();
      await prepareUserCollection();
      await prepareAccountsCollection();
      await prepareOtpCollection();
      await prepareOrdersCollection();
      await prepareIpCollection();
      await runMigrations();

  }catch(err){
    console.log(err);
    throw new Error(`Failed to initialize DB - ${err}`)
  }
}

initializeDbAndCollections().then(() => {
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  });
})


