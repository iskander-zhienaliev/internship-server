const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
	from: {
		type: String,
		required: true
	},
	to: {
		type: String,
		required: true
	},
	text: {
		type: String
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	company: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	},
	isRead: {
		type: Boolean
	}
});


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;