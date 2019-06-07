const db = require("../models");
const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();

const signin = async function(req, res, next) {
	// finding a user
	try {
		// const isStudent = req.body.isStudent;
		const user = await db.Student.findOne({
			email: req.body.email
		}) || await db.Employee.findOne({
			email: req.body.email
		});
		// if (isStudent) {
		// } else {
		// }
		const { jobs, ...clone } = user;
		let isMatch = await user.comparePassword(req.body.password);
		if (isMatch) {
			let token = jwt.sign(
				{
					clone
				},
				'qwerty123456789'
			);
			res.status(200).json({
				token
			});
		} else {
			return next({
				status: 400,
				message: "Invalid Email/Password."
			});
		}
	} catch (e) {
		return next({ status: 400, message: "Invalid Email/Password." });
	}
};

const signup = async function(req, res, next) {
	try {
		const isStudent = req.body.isStudent;
		let user;
		if (isStudent) {
			user = await db.Student.create(req.body);
		} else {
			user = await db.Employee.create(req.body);
		}
		const { jobs, ...clone } = user;
		jwt.sign(
			{
				clone
			},
			'qwerty123456789',
			(err, token) => {
				res.status(200).json({
					token
				})
			}
		);
	} catch (err) {
		if (err.code === 11000) {
			err.message = "Sorry, that username and/or email is taken";
		}
		return next({
			status: 400,
			message: err.message
		});
	}
};

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;

