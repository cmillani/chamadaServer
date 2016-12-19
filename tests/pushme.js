var apn = require('apn');

let provider = new apn.Provider({
	cert: "../cert.pem",
	key: "../key.pem",
});

let deviceTokens = "2163153cf350ed27fa590b383c5f29e50a64494ba72120a6997676c0dc720f21";

let notification = new apn.Notification();
notification.alert = "Haha";
notification.body = "Hello World";

provider.send(notification, deviceTokens).then( (response) => {
	console.log(response.sent);
	console.log(response.failed);
        // response.sent: Array of device tokens to which the notification was sent succesfully
        // response.failed: Array of objects containing the device token (`device`) and either an `error`, or a `status` and `response` from the API
});
