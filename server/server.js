const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongojs = require('mongojs');
const path = require('path');

const jsforce = require('jsforce');
const session = require('express-session');
const util = require('util');

var users = require('./routes/user');
var index = require('./routes/index');
var salesforce = require('./routes/salesforce');

const app = express();

var port = 8080;
var db = mongojs('mongodb://rahul:rahul123@ds125684.mlab.com:25684/powersupport', ['users']);

app.use(function(req,res,next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	next();
});

//initialize session
app.use(session({secret: 'S3CRE7', resave: true, saveUninitialized: true}));

var accessToken;
var instanceUrl;
var refreshToken;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.engine('html', require('ejs').renderFile);

app.set('powersupport', db);

app.use('/', salesforce);
app.use('/api', users);
//app.use('/', index); 

// app.get('*', function(req, res) {
// 	res.send('hello');
// });

app.listen(port, function() {
	console.log('Server started on Port: '+ port);
});
