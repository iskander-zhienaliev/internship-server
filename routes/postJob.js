const db = require("../models");
const express = require('express');
const router = express.Router();

const postJob = async function(req, res, next) {
	try {
		await db.Job.create(req.body);
		await db.Employee.findOneAndUpdate({email: req.body.email}, { $push: { jobs: req.body  } })
		return res.status(200).json(req.body)
	} catch (e) {
		return next({ status: 400, message: "Invalid Email/Password." });
	}
};

router.post('/postjob', postJob);

module.exports = router;