const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	company: {
		type: String,
		required: true,
	},
	area: {
		type: String,
		required: true
	},
	phone: {
		type: String
	},
	companyImg: {
		type: String
	},
	jobs: {
		type: Array
	},
	city: {
		type: String
	},
	messages: {
		email: [{created: Date, text: String, isMy: Boolean}]
	}
});

employeeSchema.pre("save", async function(next) {
	try {
		if (!this.isModified("password")) {
			return next();
		}
		let hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		return next();
	} catch (err) {
		return next(err);
	}
});

employeeSchema.methods.comparePassword = async function(candidatePassword, next) {
	try {
		let isMatch = await bcrypt.compare(candidatePassword, this.password);
		return isMatch;
	} catch (err) {
		return next(err);
	}
};

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
