const mongoose = require("mongoose");
const multer = require('multer');
const dbRoute = "mongodb+srv://Slargar:sparksv@cluster0-razvx.mongodb.net/test?retryWrites=true\n";
mongoose.set("debug", true);

mongoose.Promise = Promise;

// connects our back end code with the database
mongoose.connect(
	dbRoute,
	{useNewUrlParser: true}
);

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const Student = require('./Student');

module.exports.Student = require("./Student");
module.exports.Employee = require("./Employee");
module.exports.Job = require("./Job");
module.exports.File = require("./File");

const collection = db.collection('pdf.files');
const collectionChunks = db.collection('pdf.chunks');
const storage = require('multer-gridfs-storage')({
	url: dbRoute,
	file: (req, file) => {
		collection.find({filename: file.originalname}).toArray(function (err, docs) {
			if (err) {
				console.log('ERROR')
			}
			if (!docs || docs.length === 0) {
				console.log('not Found')
			} else {
				collection.deleteOne({filename: file.originalname}, (err) => {
					if (err) {
						console.log('remove err')
					}
				});
				collectionChunks.deleteOne({files_id: docs[0]._id}, (err) => {
					if (err) {
						console.log('remove err')
					}
				});
			}
		});
		return {
			filename: file.originalname,
			bucketName: 'pdf'
		}
	},
	root: 'files'
});

let upload = null;
storage.on('connection', (db) => {
	upload = multer({storage: storage}).single('file');
});

module.exports.postFile = (req, res, next) => {
	upload(req, res, (err) => {
		if (err) {
			return res.json({title: 'Uploaded Error', message: 'File could not be uploaded', error: err});
		}
		res.json({title: 'Uploaded', message: `File ${req.file.originalname} has been uploaded!`});
	})
};

module.exports.getStudents = (req, res) => {
	collection.find().toArray(async function (err, docs) {
		if (err) {
			return res.json({title: 'file error', message: 'No file found'})
		}
		if (!docs || docs.length === 0) {
			return res.json({title: 'Download Error', message: 'No file found'});
		} else {
			const acc = [];
			for (const doc of docs) {
				const student = await Student.findOne({email: doc.filename}).then(user=>{
					const {email, firstName, lastName, year, studyPlace, spec, photo} = user;
					return {
						...(email && {email}),
						...(firstName && {firstName}),
						...(lastName && {lastName}),
						...(year && {year}),
						...(studyPlace && {studyPlace}),
						...(spec && {spec}),
						...(photo && {photo})
					}
				})
				await acc.push(student);
				// await collectionChunks.find({files_id: doc._id}).toArray(function (err, chunks) {
				// 	student.file = 'data:' + doc.contentType + ';base64,' + chunks[0].data.toString('base64');
				// 	acc.push(student);
				// });
			}
			res.json(acc)
		}
	})
};

module.exports.getFile = (req, res) => {
	let fileName = req.body.fileName;

	collection.find({filename: fileName}).toArray(function (err, docs) {
		if (err) {
			return res.json({title: 'file error', message: 'No file found'})
		}
		if (!docs || docs.length === 0) {
			return res.json({title: 'Download Error', message: 'No file found'});
		} else {
			collectionChunks.find({files_id: docs[0]._id}).sort({n: 1}).toArray(function (err, chunks) {
				if (err) {
					return res.json({title: 'Download Error', message: 'Error retrieving chunks', error: err});
				}
				if (!chunks || chunks.length === 0) {
					return res.json({title: 'Download Error', message: 'No data found'});
				}
				let fileData = [];
				for (let i = 0; i < chunks.length; i++) {
					fileData.push(chunks[i].data.toString('base64'));
				}
				let finalFile = 'data:' + docs[0].contentType + ';base64,' + fileData.join('');
				res.json({title: 'Image File', message: 'Image loaded from MongoDB GridFS', url: finalFile});
			});
		}
	})
};
