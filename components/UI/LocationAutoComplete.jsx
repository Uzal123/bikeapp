import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

const LocationAutoComplete = ({
  setCenter,
  address,
  setAddress,
  setLocation,
}) => {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    usePlacesService({});
  const [placesList, setPlacesList] = useState(0);

  Geocode.setApiKey(process.env.GOOGLE_MAP_API_KEY);

  const onClick = async (item) => {
    try {
      setPlacesList(0);
      console.log(item);
      // Get latitude & longitude from address.
      const response = await Geocode.fromAddress(item.description);

      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
      setAddress(item.description);
      setCenter({ lat: lat, lng: lng });
      setLocation({
        coordinates: [lat, lng],
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full">
      <input
        className="w-full p-2 rounded-md "
        placeholder="Enter product location..."
        value={address}
        onChange={(evt) => {
          evt.preventDefault();
          setPlacesList(1);
          console.log(evt.target.value);
          getPlacePredictions({ input: evt.target.value });
          setAddress(evt.target.value);
        }}
        onClick={() => setPlacesList(1)}
        loading={isPlacePredictionsLoading.toString()}
      />
      {placesList === 1 && (
        <div className="bg-white rounded-md absolute top-14 z-20 w-full right-0 left-0">
          {placePredictions.map((item, i) => (
            <li
              className="cursor-pointer hover:text-black text-gray-500 list-none px-2 py-2"
              onClick={(_) => onClick(item)}
              key={i}
            >
              {item.description}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationAutoComplete;
