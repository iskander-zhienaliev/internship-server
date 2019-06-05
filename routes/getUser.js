const db = require("../models");
const express = require('express');
const router = express.Router();

const getEmployee = async function(req, res, next) {
	try {
		const employee = await db.Employee.findOne({email: req.body.email});
		res.status(200).json(employee)
	} catch (e) {
		return next({ status: 400});
	}
};

const getStudent = async function(req, res, next) {
	try {
		const student =  await db.Student.findOne({email: req.body.email});
		res.status(200).json(student)
	} catch (e) {
		return next({ status: 400});
	}
};

const getJobs = async function(req, res, next) {
	try {
		const job = await db.Job.find({}, function (err, jobs) {
			if (err) {
				return err
			}
			return res.send(jobs)
		});
		res.status(200).json(job)
	} catch (e) {
		return next({ status: 400});
	}
};


router.get('/jobs', getJobs);
router.post('/employee', getEmployee);
router.post('/student', getStudent);

module.exports = router;