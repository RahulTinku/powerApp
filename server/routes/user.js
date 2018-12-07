var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var _ = require('underscore')

//Get All Users
router.get('/users', function(req, res) {
	var db = req.app.get('powersupport');

	db.users.find(function(err, test) {
		if(err) res.send(err);
		else res.json(test);
	});
});

//Get Single User
router.get('/user/login', function(req, res) {
	var db = req.app.get('powersupport');
	console.log(req.query.Username);
	console.log(req.query.Password);

	db.users.findOne({
		$and: [
			{Username: req.query.Username},
			{Password: req.query.Password}
			]}, function(err, task) {
		if(err) res.send(err);
		else res.json(task);
	});
});

router.post('/user/create', function(req, res) {
	var db = req.app.get('powersupport');
	var user = req.body;

	db.users.save(user, function(err, user) {
		if(err) res.send(err);
		else res.send(user);
	});
});

// // //save Users
// router.post('/todos', function(req, res) {
// 	var db = req.app.get('todo');
// 	var user = req.body;

// 	db.todoList.save(user, function(err, user) {
// 		if(err) res.send(err);
// 		else res.send(user);
// 	});
// });

// // //Update Users
// router.put('/todos/:id', function(req, res) {
// 	var db = req.app.get('todo');
	

// 	console.log('req.body', req.body);
// 	var user = _.omit(req.body, '_id');

// 	db.todoList.update({_id: mongojs.ObjectId(req.params._id)}, user, {}, function(err, user) {
// 		if(err) res.send(err);
// 		else res.send(user);
// 	});
// });

// //Delete Users
// router.delete('/todos/:id', function(req, res) {
// 	var db = req.app.get('todo');

// 	db.todoList.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, user) {
// 		if(err) res.send(err);
// 		else res.send(user);
// 	});
// });

module.exports = router;
