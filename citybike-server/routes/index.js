const express = require("express");
const router = express.Router();
const Station = require("./../models/station");

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.get("/get-station-from/:hours", async (req, res) => {
  const { hours = 0 } = req.params
  let date = new Date();
  date.setHours(date.getHours() - Number(hours))

  const stations = await Station.findOne({ createdAt: { $gt: date } })
  res.send({ stations }).status(200);
});
module.exports = router;