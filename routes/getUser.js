const db = require("../models");
const express = require('express');
const router = express.Router();

const getEmployee = async function(req, res, next) {
	try {
		const employee = await db.Employee.findOne({email: req.body.email});
		res.send(employee)
	} catch (e) {
		return next({ status: 400});
	}
};

const getStudent = async function(req, res, next) {
	try {
		const student =  await db.Student.findOne({email: req.body.email});
		res.send(student)
	} catch (e) {
		return next({ status: 400});
	}
};

const getJobs = async function(req, res, next) {
	try {
		const job = await db.Job.find({});
		res.send(job)
	} catch (e) {
		return next({ status: 400});
	}
};


router.get('/jobs', getJobs);
router.post('/employee', getEmployee);
router.post('/student', getStudent);

module.exports = router;