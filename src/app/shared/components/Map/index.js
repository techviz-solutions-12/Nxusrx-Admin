import React, { useState } from "react";
import "./map.scss";
import GoogleMapReact from "google-map-react";
import LocationMarker from "../LocationMarker";
import RigsInfoBox from "../RigsInfoBox";

const Map = ({ center, zoom, mapStyle }) => {
  const [rigsInfo, setRigsInfo] = useState(null);

  const locations = [
    {
      id: 1,
      lat: 52.187323,
      lng: -110.09635,
      title: "New South Wales rigs",
    },
    { id: 2, lat: 53.187323, lng: -110.09635, title: "american rigs" },
    { id: 3, lat: 54.187323, lng: -112.09635, title: "Candian rigs" },
    { id: 4, lat: 55.187323, lng: -113.09635, title: "indoia rigs" },
    { id: 5, lat: 56.187323, lng: -114.09635, title: "kuwait rigs" },
  ];

  const markers = locations.map((location) => {
    return (
      <LocationMarker
        key={location.id}
        lat={location.lat}
        lng={location.lng}
        title={location.title}
        onClick={() => setRigsInfo({ id: location.id, title: location.title })}
      />
    );
  });
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBJPocRE0tfeVLP-z316XS4TViHpIApqCQ" }}
        defaultCenter={center}
        defaultZoom={zoom}
        // options={{styles:mapStyle}}

        // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {markers}
      </GoogleMapReact>
      {rigsInfo && <RigsInfoBox info={rigsInfo} />}
    </div>
  );
};
Map.defaultProps = {
  center: {
    lat: 54.627843,
    lng: -110.485603,
  },
  zoom: 11,
};

export default Map;
