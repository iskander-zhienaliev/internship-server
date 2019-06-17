const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileModel = require("../models/File");
const path = require('path');


const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

const upload = multer({
	storage: storage
});

router.post('/uploadfile', upload.single('fileData'), async (req, res, next) => {
	console.log(req, 'll')
	const newFile = await new fileModel({
		fileName: req.body.fileName,
		fileData: req.file.path
	});

	newFile.save().then((result) => {
		res.status(200).json({
			success: true,
			result: result
		})
	}).catch(err => next(err))
});


module.exports = router;