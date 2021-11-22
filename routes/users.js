var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.get('/', function(req, res, next) {
	res.send("Mysql API");
});

router.get('/getUsers', function(req, res, next) {
	connection.query('SELECT * FROM users', function (error, results, fields) {
		if (error) throw error;
		res.json({"status": 200, "error": null, "response": results});
	});
});

router.get('/getUserCount', function(req, res, next) {
	connection.query('SELECT COUNT(1) as count FROM userInfo', function (error, results, fields) {
		if (error) throw error;
		res.json({"status": 200, "error": null, "response": results});
	});
});

router.post('/getUserGender', jsonParser, function(req, res, next) {
	connection.query('SELECT gender FROM userInfo WHERE mail = ?', [req.body.mail], function (error, results, fields) {
		if (error) throw error;
		res.json({"status": 200, "error": null, "response": results});
	});
});

router.post('/loginRequest', jsonParser, function(req, res, next) {
	connection.query('SELECT 1 as exist FROM userInfo WHERE mail = ?', [req.body.mail], function (error, results, fields) {
		if (error) throw error;
		if (!results.length)
			res.json({"status": 200, "error": null, "response": { action: "CreateUser" }});
		else if (results[0].exist === 1)
		{
			connection.query('SELECT 1 as login FROM userInfo WHERE mail = ? AND password = ?', [req.body.mail, req.body.password], function (error, results, fields) {
				if (error) throw error;
				if (!results.length)
					res.json({"status": 200, "error": null, "response": { action: "InvalidPassword" }});
				else if (results[0].login === 1)
					res.json({"status": 200, "error": null, "response": { action: "Login" }});
			});
		}
	});
});

router.post('/createUser', jsonParser, function(req, res, next) {
	connection.query('INSERT INTO userInfo (mail, password, gender) VALUES (?, ?, ?)', [req.body.mail, req.body.password, req.body.gender], function (error, results, fields) {
		if (error) throw error;
		res.json({"status": 200, "error": null, "response": results});
	});
});

router.put('/updateUser',  jsonParser, function (req, res) {
	connection.query('UPDATE userInfo SET gender = ? WHERE mail = ?', [req.body.gender,req.body.mail], function (error, results, fields) {
	 if (error) throw error;
	 res.json(results);
 });
});

router.delete('/deleteUser', jsonParser, function (req, res) {
	connection.query('DELETE FROM userInfo WHERE mail=?', [req.body.mail], function (error, results, fields) {
	 if (error) throw error;
	 res.json(results);
 });
});

module.exports = router;
