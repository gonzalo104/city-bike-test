import React from "react"; 
import { Marker, Popup } from "react-leaflet";

const stationPoint = ({ station }) => {
  return ( 
  <Marker key={station.id} position={[station.latitude, station.longitude]}>
      <Popup>
          <h1>{station.name}</h1>
          <h2>Empty slots: {station.empty_slots}</h2>
          <h2>Free bikes: {station.free_bikes}</h2>
      </Popup>
  </Marker>   
  );
}

export default stationPoint;
