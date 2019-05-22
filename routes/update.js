const db = require("../models");
const express = require('express');
const router = express.Router();

const putEmployee = async function(req, res, next) {
	try {
		await db.Employee.findOneAndUpdate({email: req.body.email}, req.body);
		return res.status(200).json(req.body)
	} catch (e) {
		return next({ status: 400});
	}
};

const putStudent = async function(req, res, next) {
	try {
		await db.Student.findOneAndUpdate({email: req.body.email}, req.body);
		return res.status(200).json(req.body)
	} catch (e) {
		return next({ status: 400});
	}
};

router.put('/employee', putEmployee);
router.put('/student', putStudent);

module.exports = router;