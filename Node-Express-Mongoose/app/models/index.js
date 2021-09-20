
const mongoose = require("mongoose");
mongoose.Promise ;

const db = {};
db.mongoose = mongoose;
db.url = "mongodb://localhost:27017/nodejs-express-mongodb"
db.contact = require("./contact.model");
db.contact = require('./contact.model');

module.exports = db;