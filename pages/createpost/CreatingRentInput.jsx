import React, { useState, useEffect } from "react";
import Router from "next/router";
import ImageUpload from "./ImageUpload";
import CarBrand from "../../assets/fakeData/CarBrand";
import BikeBrand from "../../assets/fakeData/BikeBrand";
import FuelType from "../../assets/fakeData/FuelType";
import Back from "../../assets/createpost/back.svg";
import Gps from "../../assets/createpost/gps.svg";
import { useMutation } from "@apollo/client";
import MapContainer from "./Map";
import { useJsApiLoader } from "@react-google-maps/api";
import CREATING_RENT from "../../graphql/Mutation/CreatingRent";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
  PlacesAutocomplete,
} from "react-places-autocomplete";

const CreatingRentInput = ({
  formStage,
  offerType,
  vehicleType,
  setformStage,
  title,
  imageLinks,
  setImageLinks,
}) => {
  const [rentInput, setRentInput] = useState({
    offerType: "re",
    brand: "ho",
    fuleType: "pe",
    color: "",
    description: "",
    price: 0,
    priceType: "fi",
    location: {
      coordinates: [],
    },
  });

  const onNext = (e) => {
    e.preventDefault();
    setformStage(formStage < 5 ? formStage + 1 : formStage);
  };

  const onBack = (e) => {
    e.preventDefault();
    setformStage(formStage > 1 ? formStage - 1 : formStage);
  };

  const onChange = (e) => {
    const val = e.target.value;
    const key = e.target.name;
    setRentInput((prevs) => ({ ...prevs, [key]: val }));
    console.log(rentInput);
  };

  const handleFloat = (e) => {
    const val = parseFloat(e.target.value);
    const key = e.target.name;
    setRentInput((prevs) => ({ ...prevs, [key]: val }));
    console.log(rentInput);
  };

  const onSubmit = (e) => {
    e?.preventDefault();
    const data = {
      ...rentInput,
      images: imageLinks,
      title: title,
      vehicleType: vehicleType,
    };
    console.log(data);
    submitRentProduct({ variables: { rentProductInput: data } });
    onNext(e);
  };

  const [submitRentProduct, { data, loading, error }] =

    useMutation(CREATING_RENT);
  if (data) {
    console.log(data);
  }
  const [lat, setLat] = useState(-3.745);
  const [lng, setLng] = useState(-38.523);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setRentInput((prevs) => ({
        ...prevs,
        location: {
          coordinates: [position.coords.latitude, position.coords.longitude],
        },
      }));
      setLng(position.coords.longitude);
    });
  };

  const { isLoaded } = useJsApiLoader({
    id: "AIzaSyCfR_KurrIFg6SkS1Lmmlp2PQfeuVc9Anw",
    googleMapsApiKey: "AIzaSyCfR_KurrIFg6SkS1Lmmlp2PQfeuVc9Anw",
  });

  return (
    <div>
      {formStage === 2 && (
        <form onSubmit={(e) => onNext(e)}>
          <p className="p-2">Upload the images of the Vehicle</p>
          <ImageUpload imageLinks={imageLinks} setImageLinks={setImageLinks} />
          <div className="flex gap-2 justify-between my-2">
            <button
              className="flex gap-2 p-2  rounded-lg w-2/5 justify-center border-2 border-transparent text-primary hover:border-primary"
              onClick={(e) => onBack(e)}
            >
              <Back className="h-6" fill="#1FC39E" /> Back
            </button>
            <button
              className="bg-primary w-2/5 p-2 rounded-xl text-white border-2 border-transparent"
              type="submit"
            >
              Next
            </button>
          </div>
        </form>
      )}
      {formStage === 3 && offerType === "re" && (
        <form className="grid grid-cols-2" onSubmit={(e) => onNext(e)}>
          <div className="flex flex-col p-2">
            <label className="p-2">Brand</label>
            {vehicleType === `ca` && (
              <select
                id="brand"
                name="brand"
                value={rentInput.brand}
                className="w-full p-2 rounded-lg"
                onChange={(e) => onChange(e)}
              >
                {CarBrand.map((d, key) => (
                  <option key={key} value={d.value}>
                    {d.brand}
                  </option>
                ))}
              </select>
            )}
            {vehicleType === `bi` && (
              <select
                id="brand"
                name="brand"
                className="w-full p-2 rounded-lg"
                value={rentInput.brand}
                onChange={(e) => onChange(e)}
              >
                {BikeBrand.map((d, i) => (
                  <option key={i} value={d.value}>
                    {d.brand}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex flex-col p-2">
            <label className="whitespace-nowrap p-2">Fuel</label>
            <select
              id="fuleType"
              name="fuleType"
              className="w-full p-2 rounded-lg"
              value={rentInput.fuleType}
              onChange={(e) => onChange(e)}
            >
              {FuelType.map((d, i) => (
                <option key={i} value={d.value}>
                  {d.brand}
                </option>
              ))}
            </select>
          </div>

          <div className="p-2 flex flex-col ">
            <label className="p-2">Color</label>
            <input
              type="text"
              className="p-2 rounded-lg"
              name="color"
              value={rentInput.color}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="col-span-2 p-2">
            <label className="p-2">Description</label>
            <textarea
              className="w-full rounded-lg h-24 p-2 focus:outline-none"
              name="description"
              value={rentInput.description}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="flex gap-2 justify-between my-2 col-span-2">
            <button
              className="flex gap-2 p-2  rounded-lg w-2/5 justify-center border-2 border-transparent text-primary hover:border-primary"
              onClick={(e) => onBack(e)}
            >
              <Back className="h-6" fill="#1FC39E" /> Back
            </button>
            <button
              className="bg-primary w-2/5 p-2 rounded-xl text-white border-2 border-transparent"
              type="submit"
            >
              Next
            </button>
          </div>
        </form>
      )}
      {formStage === 4 && (
        <form className="grid grid-cols-2" onSubmit={(e) => onSubmit(e)}>
          <div className="p-2 flex flex-col">
            <label className="p-2">Price per day</label>
            <input
              type="number"
              className="p-2 rounded-lg"
              name="price"
              required
              value={rentInput.price}
              onChange={(e) => handleFloat(e)}
            />
          </div>
          <div className="p-2 flex flex-col">
            <label className="p-2">Price Type</label>
            <select
              id="priceType"
              name="priceType"
              value={rentInput.priceType}
              className="p-2 rounded-lg"
              onChange={(e) => onChange(e)}
            >
              <option value="fi">Fixed</option>
              <option value="ne">Negotiable</option>
            </select>
          </div>
          <div className="p-2 col-span-2 flex flex-col">
            <label className="p-2">Location</label>
            <div className="flex w-full justify-between gap-2">
              <input type="text" className="p-2 rounded-lg w-full" />
              <Gps
                className="h-8 "
                fill="#1FC39E"
                onClick={() => getLocation()}
              />
            </div>
          </div>
          <div className="p-2 col-span-2 flex flex-col">
            <MapContainer
              isLoaded={isLoaded}
              lat={lat}
              lng={lng}
              setLat={setLat}
              setLng={setLng}
            />
          </div>

          <div className="flex gap-2 justify-between my-2 col-span-2">
            <button
              className="flex gap-2 p-2  rounded-lg w-2/5 justify-center border-2 border-transparent text-primary hover:border-primary"
              onClick={(e) => onBack(e)}
            >
              <Back className="h-6" fill="#1FC39E" /> Back
            </button>
            <button
              className="bg-primary w-2/5 p-2 rounded-xl text-white border-2 border-transparent"
              type="submit"
            >
              Next
            </button>
          </div>
        </form>
      )}
      {formStage === 5 && (
        <div>
          <p className="text-center">
            You Ad is submitted and is currently in review.We will notify you
            when the ad in live.
          </p>
          <div className="flex justify-center p-2">
            <a
              className="bg-primary w-2/5 p-2 rounded-xl text-white border-2 border-transparent text-center"
              href="/"
            >
              Ok
            </a>
          </div>
        </div>
      )}
      {/* // ) && data?.rentProduct?.success */}
    </div>
  );
};

export default CreatingRentInput;
