require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = require('./routes/router');
const userRoute = require('./routes/user.route');
const memoRoute = require('./routes/memory.route');
const { sequelize } = require('./models');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

sequelize
  .authenticate()
  .then(() => {
    console.log('database connection has been established successfully');
  })
  .catch((error) => {
    console.log('connection error', error);
  });

app.use('/', router);
app.use('/user', userRoute);
app.use('/memo', memoRoute);

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server Running');
});
