const mongoose = require('mongoose')

const fileSchema =  mongoose.Schema({
	fileName: {
		type: String
	},
	fileData: {
		type: String
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('File', fileSchema);