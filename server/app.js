require('dotenv').config();
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var authRouter = require ('./routes/auth');

var app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoose = require("mongoose");
const mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/auth', authRouter);


module.exports = app;
