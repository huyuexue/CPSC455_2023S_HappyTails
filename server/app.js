const mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var petsRouter = require('./routes/pets');

var app = express();


app.use(cors());
require('dotenv').config();
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const url = `mongodb+srv://${username}:${password}@ht-cluster.o1aefmq.mongodb.net/`

const dbName = 'happytails';
async function connectDB(){
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, dbName });
    const db = mongoose.connection;
    //console.log(db);
    return db;
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pets', petsRouter);
connectDB();

module.exports = app;