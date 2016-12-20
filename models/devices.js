var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
	identity: 'devices',
	connection: 'default',
	attributes: {
		ip: {
			type: 'string',
			required: true,
		},
		macaddr: {
			type: 'string',
			required: true,
		}
	}
});

