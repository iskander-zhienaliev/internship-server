const express = require('express');
const cors = require('cors');
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
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

process.env.PWD = process.cwd();

app.use('/auth', authRoute);
app.use('/api', postJob);
app.use('/update', updateModel);
app.use('/get', getUser);
app.use('/file', db.postFile);
app.use('/getFile', db.getFile);
app.use('/getStudents', db.getStudents);

app.use(function (req, res, next) {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));