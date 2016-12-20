var users = {};
var models = require(__dirname + "/../models");

users.create = function(name, ip, token) {
	console.log(name, ip, token);
	return models.waterline.collections.devices.findOne({ip:ip}).then(device => {
		return models.waterline.collections.users.create({name: name, macaddr:device.macaddr, token: token});
	});
}

module.exports = users;
