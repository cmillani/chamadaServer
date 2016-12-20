var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
	identity: 'users',
	connection: 'default',
	attributes: {
		name: {
			type: 'string',
			required: true,
		},
		macaddr: {
			type: 'string',
			required: true,
			unique: true
		},
		token: {
			type: 'string',
			required: true,
		},
	}
});
