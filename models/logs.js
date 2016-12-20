var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
	identity: 'logs',
	connection: 'default',
	attributes: {
		macaddr: {
			type: 'string',
			required: true,
		},
		type: {
			type: 'string',
			enum: ['in', 'out'],
			required: true,
		}
	}
});

