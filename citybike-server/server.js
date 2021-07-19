require("./app/db")
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const citybikeurl = "http://api.citybik.es/v2/networks/decobike-miami-beach"
const request = require("request")
const Station = require("./models/station")

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();


app.use(index);

const server = http.createServer(app);
const io = socketIo(server); // < Interesting!
let interval = 60000;

setInterval(()=>{
    emitStations()
},interval)


const emitStations = () => {
  request(citybikeurl, { json: true }, (err, response, body) => {
    const { stations } = body.network
    Station.create({ items: stations }, function (err, res) {
      io.emit("onStations", stations)
    })
  })
}

io.on("connection", socket => {
  var socketId = socket.id;
  var clientIp = socket.request.connection.remoteAddress;
  console.log('New connection ' + socketId + ' from ' + clientIp);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  emitStations()

});



server.listen(port, () => console.log(`Listening on port ${port}`));



