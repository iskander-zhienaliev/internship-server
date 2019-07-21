const db = require("../models");
const express = require('express');
const router = express.Router();

const postMessage = async function (req, res, next) {
	try {
		await db.Message.create({
			from: req.body.email,
			to: req.body.recEmail,
			text: req.body.message,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			company: req.body.company,
			isRead: false
		});
		res.status(200)
	} catch (e) {
		return next({status: 400});
	}
};

const getMessages = async function (req, res, next) {
	try {
		const messages = await db.Message.find({$or: [{from: req.body.email}, {to: req.body.email}]});
		return res.status(200).json(messages)
	} catch (e) {
		return next({status: 400});
	}
};

const readMessage = async function (req, res, next) {
	try {
		await db.Message.update({$and: [{from: req.body.recEmail}, {to: req.body.email}]}, {isRead: true});
		return res.status(200)
	} catch (e) {
		return next({status: 400});
	}
};

router.post('/post', postMessage);
router.post('/get', getMessages);
router.post('/read', readMessage);

module.exports = router;