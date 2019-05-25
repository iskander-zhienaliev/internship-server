const db = require("../models");
const express = require('express');
const router = express.Router();

const getEmployee = async function(req, res, next) {
	try {
		const employee = await db.Employee.findOne({email: req.body.email});
		return res.status(200).json(employee)
	} catch (e) {
		return next({ status: 400});
	}
};

const getStudent = async function(req, res, next) {
	try {
		await db.Student.findOne({email: req.body.email});
		return res.status(200).json(res)
	} catch (e) {
		return next({ status: 400});
	}
};

const getJobs = async function(req, res, next) {
	try {
		const job = await db.Job.find({}, function (err, jobs) {
			if (err) return err;
			return res.send(jobs)
		});
		return res.status(200).json(job)
	} catch (e) {
		return next({ status: 400});
	}
};


router.get('/jobs', getJobs);
router.post('/employee', getEmployee);
router.post('/student', getStudent);

module.exports = router;