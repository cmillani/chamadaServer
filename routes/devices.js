var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	//TODO: send all users registered
	res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
	if(req.body.name == null) res.json("missing");
	else if(req.body.device == null) res.json("missing");
	else {
		//TODO: Register device for user
	}
})

module.exports = router;
