// const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
const postJob = require('./routes/postJob');
const updateModel = require('./routes/update');
const getUser = require('./routes/getUser');
const db = require("./models");

const API_PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

process.env.PWD = process.cwd();

app.use('/auth', authRoute);
app.use('/api', postJob);
app.use('/update', updateModel);
app.use('/get', getUser);
app.use('/static', express.static(process.env.PWD+'static'));

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'static')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname + '-' + Date.now())
	}
});

const upload = multer({
	storage: storage
});

app.post('/static', async (req, res, next) => {
	upload.single('file')(req, res, function(err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err)
		} else if (err) {
			return res.status(500).json(err)
		}
		return res.status(200).send(req.file)
	})
});

app.use(function(req, res, next) {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));