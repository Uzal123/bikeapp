import React from "react";
import { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const MapContainer = ({ isLoaded, lat, lng, setLng, setLat }) => {
  const containerStyle = {
    width: "100%",
    height: "200px",
  };

  const getCurrentCoords = (e) => {
    setLng(e.latLng.lng());
    setLat(e.latLng.lat());
  };

  useEffect(() => {}, [lat, lng]);

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={14}
        center={{
          lat: lat,
          lng: lng,
        }}
      >
        <Marker
          draggable={true}
          onDragEnd={(e) => getCurrentCoords(e)}
          position={{ lat: lat, lng: lng }}
        />
      </GoogleMap>
    )
  );
};

export default MapContainer;
