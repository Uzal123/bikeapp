import React, { Fragment, useCallback } from "react";
import { useEffect, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  useJsApiLoader,
} from "@react-google-maps/api";
import Geocode from "react-geocode";
import LocationAutoComplete from "./LocationAutoComplete";
import Gps from "../../assets/createpost/gps.svg";
import { useNotificationStore } from "../../store/notifications";
import { uuid } from "uuidv4";

const LIBRARIES = ["places", "marker", "geometry"];
const MapContainer = ({
  setCenter,
  center,
  drag,
  address,
  setAddress,
  setLocation,
  errors,
  setErrors,
  location,
}) => {
  const setNotification = useNotificationStore(
    (state) => state.setNotification
  );

  const getLocation = () => {
    setNotification(uuid(), "Fetching Location", "Loading", 3000);
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        setLocation([position.coords.latitude, position.coords.longitude]);
        if(position){
            setNotification(uuid(), "Location Fetched", "Success", 3000);
        }
        Geocode.setApiKey(process.env.GOOGLE_MAP_API_KEY);
        const response = await Geocode.fromLatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        setAddress(response.results[0].formatted_address);
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        setNotification(uuid(), error.message, "Error", 3000);
      }
    );
  };

  const { isLoaded } = useLoadScript({
    id: process.env.GOOGLE_MAP_API_KEY,
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
    libraries: LIBRARIES,
  });

  const containerStyle = {
    width: "100%",
    height: "200px",
  };

  Geocode.setApiKey(process.env.GOOGLE_MAP_API_KEY);
  const getCurrentCoords = async (e) => {
    try {
      const response = await Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng());

      setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      setAddress(response.results[0].formatted_address);
      setLocation([e.latLng.lat(), e.latLng.lng()]);
    } catch (error) {}
  };

  useEffect(() => {}, [center]);

  return (
    isLoaded && (
      <Fragment>
        <div className="flex flex-col gap-2 h-full w-full">
          {drag && (
            <div className="flex w-full justify-between gap-2">
              <LocationAutoComplete
                setCenter={setCenter}
                address={address}
                setAddress={setAddress}
                setLocation={setLocation}
                errors={errors}
                setErrors={setErrors}
              />
              <Gps
                className="h-8 "
                fill="#1FC39E"
                onClick={() => getLocation()}
              />
            </div>
          )}

          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={14}
            center={center}
          >
            <MarkerF
              draggable={drag}
              onDragEnd={(e) => getCurrentCoords(e)}
              position={center}
            />
          </GoogleMap>
        </div>
      </Fragment>
    )
  );
};

export default MapContainer;
