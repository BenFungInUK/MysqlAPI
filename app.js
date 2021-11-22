var express = require('express')
var mysql = require('mysql');
var users = require('./routes/users');

var app = express();

//Database connection
app.use(function(req, res, next){
	global.connection = mysql.createConnection({
		host     : 'testing.cmf2hhpcxznd.eu-west-2.rds.amazonaws.com',
		user     : 'admin',
		password : 'pa$$w0rd',
		database : 'Testing'
	});
	connection.connect();
	next();
});

app.use('/', users);
app.use('/getUsers', users);
app.use('/getUserCount', users);
app.use('/getUserGender', users);
app.use('/createUser', users);
app.use('/updateUser', users);
app.use('/deleteUser', users);
app.use('/loginRequest', users);

module.exports = app;
