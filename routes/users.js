var express = require('express');
var router = express.Router();
var usersBO = require(__dirname + '/../business/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
	if(req.body.name == null) res.json("missing");
	else if(req.body.token == null) res.json("missing");
	else {
		usersBO.create(req.body.name, req.connection.remoteAddress.replace(/^.*:/, ''), req.body.token).then(res => {
			res.json('ok');
		}).catch(err => {
			res.json(err);
		});
	}
});

module.exports = router;
