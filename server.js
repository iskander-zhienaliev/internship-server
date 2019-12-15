// core
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const AdminBro = require('admin-bro');
const AdminBroExpressjs = require('admin-bro-expressjs');
// routes
const authRoute = require('./routes/auth');
const postJob = require('./routes/postJob');
const updateModel = require('./routes/update');
const getUser = require('./routes/getUser');
const message = require('./routes/message');
// models
const db = require("./models");

const API_PORT = process.env.PORT || 3000;
const dbRoute = "mongodb://mongo:27017/test";
const app = express();
AdminBro.registerAdapter(require('admin-bro-mongoose'))

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

process.env.PWD = process.cwd();

app.use('/auth', authRoute);
app.use('/api', postJob);
app.use('/update', updateModel);
app.use('/get', getUser);
app.use('/message', message);
app.use('/file', db.postFile);
app.use('/getFile', db.getFile);
app.use('/getStudents', db.getStudents);

const adminBro = new AdminBro({
	resources: [db.Student, db.Employee, db.Job],
	rootPath: '/admin',
})
// Build and use a router which will handle all AdminBro routes
const router = AdminBroExpressjs.buildRouter(adminBro);
app.use(adminBro.options.rootPath, router);

app.use(function (req, res, next) {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
