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
const dbRoute = "mongodb+srv://Slargar:sparksv@cluster0-razvx.mongodb.net/test?retryWrites=true\n";
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

process.env.PWD = process.cwd();

app.use('/auth', authRoute);
app.use('/api', postJob);
app.use('/update', updateModel);
app.use('/get', getUser);

const storage = require('multer-gridfs-storage')({
	url: dbRoute,
	file: (req, file) => {
		return {
			bucketName: 'test',
			fileName: file.originalname
		}
	}
});

let upload = null;
storage.on('connection', (db)=> {
	upload = multer({storage: storage}).single('file');
})

app.post('/file', (req, res, next) => {
	upload(req, res, (err) => {
		if (err) => {
			return res.render('index', {title: 'Uploaded Error', message: 'File could not be uploaded', error: err});
		}
		res.render('index', {title: 'Uploaded', message: `File ${req.file.filename} has been uploaded!`});
	})
})

app.use(function(req, res, next) {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));