const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileModel = require("../models/File");
const path = require('path');


const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname + '-' + Date.now())
	}
});

const upload = multer({
	storage: storage
}).single('file');

router.post('/uploadfile', async (req, res, next) => {
	upload(req, res, function(err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err)
		} else if (err) {
			return res.status(500).json(err)
		}
		const newFile = new fileModel({
			fileName: req.body.fileName,
			fileData: req.file.path
		});

		newFile.save().then((result) => {
			res.status(200).json({
				success: true,
				result: result
			})
		}).catch(err => next(err))
	})
});


module.exports = router;