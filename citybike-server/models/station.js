const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StationSchema = new Schema({
  items: [Schema.Types.Mixed],
}, {
  timestamps: true
});

const Station = mongoose.model("Station", StationSchema);
module.exports = Station;
