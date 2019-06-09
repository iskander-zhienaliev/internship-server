const db = require("../models");
const express = require('express');
const jwt = require("jsonwebtoken");
const {check, validationResult} = require('express-validator/check');
const router = express.Router();


const signin = async function (req, res, next) {
	try {
		const user = await db.Student.findOne({
			email: req.body.email
		}) || await db.Employee.findOne({
			email: req.body.email
		});
		const {email, password, firstName, lastName, studyPlace, company, area} = user
		let isMatch = await user.comparePassword(req.body.password);
		if (isMatch) {
			let token = jwt.sign(
				{
					...(email && {email}),
					...(password && {password}),
					...(firstName && {firstName}),
					...(lastName && {lastName}),
					...(studyPlace && {studyPlace}),
					...(company && {company}),
					...(area && {area}),
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
		return next({status: 400, message: "Invalid Email/Password."});
	}
};

const signup = async function (req, res, next) {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const isStudent = req.body.isStudent;
			let user;
			if (isStudent) {
				user = await db.Student.create(req.body);
			} else {
				user = await db.Employee.create(req.body);
			}
			const {email, password, firstName, lastName, studyPlace, company, area} = user
			jwt.sign(
				{
					...(email && {email}),
					...(password && {password}),
					...(firstName && {firstName}),
					...(lastName && {lastName}),
					...(studyPlace && {studyPlace}),
					...(company && {company}),
					...(area && {area}),
				},
				'qwerty123456789',
				(err, token) => {
					res.status(200).json({
						token
					})
				}
			);
		}
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

router.post('/signup', [check('email').isEmail(), check('password').isLength({min: 6})], signup);
router.post('/signin', signin);

module.exports = router;

