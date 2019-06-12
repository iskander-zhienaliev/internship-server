const mongoose = require("mongoose");
const dbRoute = "mongodb+srv://Slargar:sparksv@cluster0-razvx.mongodb.net/test?retryWrites=true\n";
mongoose.set("debug", true);

mongoose.Promise = Promise;

// connects our back end code with the database
mongoose.connect(
	dbRoute,
	{ useNewUrlParser: true }
);

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports.Student = require("./Student");
module.exports.Employee = require("./Employee");
module.exports.Job = require("./Job");
module.exports.File = require("./File");