import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Map, TileLayer } from "react-leaflet";
import StationPoint from './stationPoint'

class App extends Component {
  constructor() {
    super();

    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001",
      lat: 25.761681,
      lng: -80.191788,
      zoom: 13,
      stations: [],
      replay: false
    };

  }
  componentDidMount() {
    const { endpoint, replay } = this.state;
    const socket = socketIOClient(endpoint);

    socket.on("onStations", data => {
      if (!replay) {
        this.setState({stations: data})
      }
    }) 
  }

  getData (hour) {
    const { endpoint } = this.state;
    fetch(`${endpoint}/get-station-from/${hour}`).then(res => res.json()).then(data => this.setState({ stations: data.stations.items, replay: true }));
  }

  render() {
    const { stations } = this.state;
    const position = [this.state.lat, this.state.lng]
    return (

      <div className="map">
        <h1> City Bikes in Miami </h1>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            stations.map(station => <StationPoint station={station}/>)
          }
        </Map>
        <p> get stations from ago </p>
        <select onChange={(e => this.getData(e.target.value))}>
          <option>Choose an option</option>
          {
            [1,2,3,4,5,6].map(value => <option value={1}>{`${value} hour${value > 1 ? 's' : ''}`}</option>   )
            
          }
        </select>
      </div>
    );
  }
}
export default App;
