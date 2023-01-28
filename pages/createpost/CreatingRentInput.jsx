import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import CarBrand from "../../assets/fakeData/CarBrand";
import BikeBrand from "../../assets/fakeData/BikeBrand";
import FuelType from "../../assets/fakeData/FuelType";
import Back from "../../assets/createpost/back.svg";
import Gps from "../../assets/createpost/gps.svg";
import { useMutation } from "@apollo/client";
import MapContainer from "../../components/UI/Map";
import CREATING_RENT from "../../graphql/Mutation/CreatingRent";
import Link from "next/link";
import PriceType from "../../assets/fakeData/PriceType";
import Geocode from "react-geocode";
import Colors from "../../assets/fakeData/colors";

const CreatingRentInput = ({
  formStage,
  offerType,
  vehicleType,
  setformStage,
  title,
  imageLinks,
  setImageLinks,
  location,
  setLocation
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

  const onNext = (e) => {
    e.preventDefault();
    if (formStage === 4) {
      onSubmit(e);
      setformStage(formStage + 1);
    } else {
      setformStage(formStage + 1);
    }
  };

   const onBack = (e) => {
     e.preventDefault();
     setformStage(formStage - 1);
   };

  const onSubmit = (e) => {
    e?.preventDefault();
    const data = {
      ...rentInput,
      images: imageLinks,
      title: title,
      location: location,
      vehicleType: vehicleType,
    };
    console.log(data);
    submitRentProduct({ variables: { rentProductInput: data } });
  };

  const [submitRentProduct, { data, loading, error }] =
    useMutation(CREATING_RENT);
  if (data) {
    console.log(data);
  }

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const [address, setAddress] = useState("");


  return (
    <div className="w-full">
      {formStage === 2 && (
        <form onSubmit={(e) => onNext(e)} className="flex flex-col gap-2 ">
          <p className="p-2">Upload the images of the Vehicle</p>
          <ImageUpload imageLinks={imageLinks} setImageLinks={setImageLinks} />
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
                {Object.keys(CarBrand).map((key, i) => (
                  <option key={i} value={key}>
                    {CarBrand[key]}
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
                {Object.keys(BikeBrand).map((key, i) => (
                  <option key={i} value={key}>
                    {BikeBrand[key]}
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
              {Object.keys(FuelType).map((key, i) => (
                <option key={i} value={key}>
                  {FuelType[key]}
                </option>
              ))}
            </select>
          </div>

          <div className="p-2 flex flex-col ">
            <label className="p-2">Color</label>
            <select
              name="color"
              className="w-full p-2 rounded-lg"
              value={rentInput.color}
              onChange={(e) => onChange(e)}
            >
              {Object.keys(Colors).map((key, i) => (
                <option key={i} value={key}>
                  {Colors[key]}
                </option>
              ))}
            </select>
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
        </form>
      )}
      {formStage === 4 && (
        <form className="grid grid-cols-2 pb-20" onSubmit={(e) => onSubmit(e)}>
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
              {Object.keys(PriceType).map((key, i) => (
                <option key={i} value={key}>
                  {PriceType[key]}
                </option>
              ))}
            </select>
          </div>
          <div className="p-2 col-span-2 flex flex-col">
            <label className="px-2 pt-2">Location</label>
          </div>
          {/* <LocationAutoComplete /> */}
          <div className="p-2 col-span-2 h-full flex flex-col relative">
            <MapContainer
              drag={true}
              center={center}
              setCenter={setCenter}
              address={address}
              setAddress={setAddress}
              setRentInput={setRentInput}
              setLocation={setLocation}
              location={location}
            />
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
            <Link
              className="bg-primary w-2/5 p-2 rounded-xl text-white border-2 border-transparent text-center"
              href="/"
            >
              Ok
            </Link>
          </div>
        </div>
      )}

      {formStage !== 5 && (
        <div
          className={`flex gap-2  ${
            formStage == 1 ? "justify-end" : "justify-between "
          } my-2`}
        >
          {formStage !== 1 && (
            <button
              className="flex gap-2 p-2  rounded-lg w-2/5 justify-center border-2 border-transparent text-primary hover:border-primary"
              onClick={(e) => onBack(e)}
            >
              <Back className="h-6" fill="#1FC39E" /> Back
            </button>
          )}
          <button
            className="bg-primary w-2/5 p-2 rounded-xl text-white border-2 border-transparent"
            type="submit"
            onClick={(e) => onNext(e)}
          >
            {formStage === 4 ? "Submit" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatingRentInput;
