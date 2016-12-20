#!/usr/bin/env node
var apn = require('apn');
var models = require(__dirname + '/../models');

let devices = JSON.parse(process.argv[2]);

models.waterline.initialize(models.config, function(err, models) {
	if (err) throw err;
	let provider = new apn.Provider({
		cert: __dirname + "/../cert.pem",
		key: __dirname + "/../key.pem",
	});

	models.collections.users.find().then(users => {
		console.log(users);
	}).catch(err => {
		console.log(err);
	});
	//TODO: mix this devices with devices that still has timeout to mark out
	models.collections.devices.create(devices).then(devs => {
		console.log("Created Devs", devs.length);
	}).catch(err => {
		console.log("Err Creating", err);
	});

	let notification = new apn.Notification();
	notification.alert = "KnockKnock";

	//provider.send(notification, deviceTokens).then( (response) => {
	//	console.log(response.sent);
	//	console.log(response.failed);
		// response.sent: Array of device tokens to which the notification was sent succesfully
		// response.failed: Array of objects containing the device token (`device`) and either an `error`, or a `status` and `response` from the API
	//});
});
