const mongoose = require('mongoose');

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
	created: {
		type: Date,
		default: Date.now
	}
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;