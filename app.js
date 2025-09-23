const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { configDotenv } = require('dotenv');
const { errorMiddleware } = require('./middleware/error');
const allRoutes = require('./routes/user.apiRoutes');
const fileUpload = require('express-fileupload');
const { removeUnverifiedUser } = require('./automation/automation');
configDotenv({ path: './config/config.env' });

app.use(
  cors({
    origin: 'https://sajjad-auth-v2.netlify.app',
    credentials: true,
    methods: ['PUT', 'POST', 'GET', 'DELETE'],
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './temp/',
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', allRoutes);
removeUnverifiedUser();

app.use(errorMiddleware);

module.exports = { app };
