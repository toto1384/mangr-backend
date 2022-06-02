const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

//Imports
const authRoute = require('./routes');

dotenv.config();

//Connect to db
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true,useUnifiedTopology: true },
    function(){console.log('Connected to db');});

//Route middlewares
app.use(express.json());
app.use('/api',authRoute);


const port = process.env.PORT || 3000;

app.listen(port,function(){console.log('Listening on port '+port);});