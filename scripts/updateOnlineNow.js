#!/usr/bin/env node
var apn = require('apn');
var models = require(__dirname + '/../models');

let devices = JSON.parse(process.argv[2]);

function diffmac(a, b) {
	var purgea = [];
	var purgeb = [];
	var resa = [];
	var resb = [];
	for (var i in a) {
		for (var j in b) {
			if (a[i].macaddr === b[j].macaddr) { //Remove the ones with the same macaddr
				purgea.push(i);
				purgeb.push(j);
			}
		}
	}
	purgeb = purgeb.sort();
	console.log(purgea, purgeb);
	var current = 0;
	for (var i in a) {
		if (i === purgea[current]) {
			current++;
			continue;
		} else {
			resa.push(a[i]);
		}
	}
	current = 0;
	for (var i in b) {
		if (i === purgeb[current]) {
			current++;
			continue;
		} else {
			resb.push(b[i]);
		}
	}
	return [resa, resb]; //We can know now which ones are in and out since last check
};

function samemac(a,b) {
	var result = [];
	for (var i in a) {
		for (var j in b) {
			if (a[i].macaddr === b[j].macaddr) { //Remove the ones with the same macaddr
				result.push(a[i]);
			}
		}
	}
	return result;
};

models.waterline.initialize(models.config, function(err, models) {
	if (err) throw err;
	let provider = new apn.Provider({
		cert: __dirname + "/../cert.pem",
		key: __dirname + "/../key.pem",
	});

	models.collections.users.find({}).then(users => {
		return models.collections.devices.find({}).then(oldDevices => {
			console.log("Users ", users)
			console.log("Old ", oldDevices);
			console.log("Now ", devices);
			var diff = diffmac(oldDevices, devices); 
			var outs = samemac(diff[0], users);
			var ins = samemac(diff[1], users);
			console.log("DIff ", diff);
			console.log("In", ins);
			console.log("Outs", outs);
			for (var i in outs) {
				outs[i].type = "out";
			};
			for (var i in ins) {
				ins[i].type = "in";
			}
			return models.collections.logs.create(ins.concat(outs));
		});
	}).then(devs => {
			return models.collections.devices.destroy({}); //Clean devices cache
	}).then(destroyes => {
			return models.collections.devices.create(devices); //Put new devices
	}).catch(err => {
		console.log(err);
	});

	//let notification = new apn.Notification();
	//notification.alert = "KnockKnock";

	//provider.send(notification, deviceTokens).then( (response) => {
	//	console.log(response.sent);
	//	console.log(response.failed);
		// response.sent: Array of device tokens to which the notification was sent succesfully
		// response.failed: Array of objects containing the device token (`device`) and either an `error`, or a `status` and `response` from the API
	//});
});
