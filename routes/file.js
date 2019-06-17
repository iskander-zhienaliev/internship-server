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
});

router.post('/uploadfile', async (req, res, next) => {
	upload.single('file')(req, res, function(err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err)
		} else if (err) {
			return res.status(500).json(err)
		}
		return res.status(200).send(req.file)
	})
});


module.exports = router;