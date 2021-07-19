const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const connectionString = 'mongodb://localhost:27017/citybike';
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection refused !!!!!"));
db.once("open", console.log.bind(console, "connection success !!!!!"));

module.exports = db;
