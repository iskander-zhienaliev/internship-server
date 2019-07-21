const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const jobSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	spec: {
		type: String,
		required: true,
	},
	area: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	salary: {
		type: String,
	},
	schedule: {
		type: String,
		required: true
	},
	company: {
		type: String,
		required: true
	},
	companyImg: {
		type: String,
		required: true
	},
	companyEmail: {
		type: String
	},
	email: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	}
});

jobSchema.plugin(AutoIncrement, {inc_field: 'id'});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;