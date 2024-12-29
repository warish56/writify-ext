require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

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
} = require('./db/orders')

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: [process.env.EXTENSION_ORIGIN],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

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


