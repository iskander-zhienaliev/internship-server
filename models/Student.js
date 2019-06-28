const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	thirdName: {
		type: String
	},
	birthDate: {
		type: String
	},
	phone: {
		type: String
	},
	year: {
		type: String
	},
	studyPlace: {
		type: String,
		required: true
	},
	spec: {
		type: String
	},
	photo: {
		type: String
	},
	CV: {
		type: Boolean
	}
});

studentSchema.pre("save", async function(next) {
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

studentSchema.methods.comparePassword = async function(candidatePassword, next) {
	try {
		let isMatch = await bcrypt.compare(candidatePassword, this.password);
		return isMatch;
	} catch (err) {
		return next(err);
	}
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
