const db = require("../models");
const express = require('express');
const router = express.Router();

const postJob = async function(req, res, next) {
	try {
		const job = await db.Job.create(req.body);
		await db.Employee.findOneAndUpdate({email: req.body.email}, { $push: { jobs: job  } });
		return res.status(200).json(req.body)
	} catch (e) {
		return next({ status: 400, message: "Invalid Email/Password." });
	}
};

const deleteJob = async function(req, res, next) {
	try {
		console.log(req)
		await db.Job.findByIdAndDelete(req.body._id);
		await db.Employee.updateOne({email: req.body.email}, { $pull: {jobs: {id: req.body.id} } });
		res.status(200)
	} catch (e) {
		return next({status: 400, message: "Delete Job can't resolve"})
	}
}

router.post('/postjob', postJob);
router.delete('/deleteJob', deleteJob);

module.exports = router;