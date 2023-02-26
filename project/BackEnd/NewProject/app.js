const cookieParser = require('cookie-parser');
const express = require('express');
require("./config");
const { dirname } = require('path');
const app = express();
const {json} = require('body-parser');
const body = require('body-parser');
app.use(body.urlencoded({ extended: true }));
const dotenv = require('dotenv');
dotenv.config();
const verf = require('./routes/VerifyToken');
const cors = require('cors');
app.use(cors());
//import routes
const Authroute= require('./routes/Auth');
const Taskroute= require('./routes/TaskRoute');


const bodyParser = require('body-parser');
app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// add middleware
app.use(express.json());
// route middleware

app.use('/api/user', Authroute);

app.use('/api/task', Taskroute);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
