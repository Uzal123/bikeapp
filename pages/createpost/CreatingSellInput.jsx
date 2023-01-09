import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import CarBrand from "../../assets/fakeData/CarBrand";
import Condition from "../../assets/fakeData/Condition";
import Transmission from "../../assets/fakeData/Transmission";
import FuelType from "../../assets/fakeData/FuelType";
import BikeBrand from "../../assets/fakeData/BikeBrand";
import Back from "../../assets/createpost/back.svg";
import Gps from "../../assets/createpost/gps.svg";
import { useMutation } from "@apollo/client";
import CREATING_SELL from "../../graphql/Mutation/CreatingSell";
import MapContainer from "./Map";
import { useJsApiLoader } from "@react-google-maps/api";
import { Router } from "next/router";
import Link from "next/link";

const CreatingSellInput = ({
  formStage,
  offerType,
  vehicleType,
  setformStage,
  title,
  imageLinks,
  setImageLinks,
}) => {
  const [sellInput, setSellInput] = useState({
    offerType: "se",
    brand: "ba",
    vehicleCondition: "ln",
    fuleType: "di",
    usedFor: "",
    description: "",
    madeYear: "",
    engine: "",
    milege: "",
    transmission: "au",
    lotNo: "",
    kmRun: "",
    color: "",
    price: "",
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
    setSellInput((prevs) => ({ ...prevs, [key]: val }));
  };

  const handleFloat = (e) => {
    const val = parseFloat(e.target.value);
    const key = e.target.name;
    setSellInput((prevs) => ({ ...prevs, [key]: val }));
  };

  const { isLoaded } = useJsApiLoader({
    id: process.env.GOOGLE_MAP_API_KEY,
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
  });

  const onSubmit = (e) => {
    e?.preventDefault();
    const data = {
      ...sellInput,
      images: imageLinks,
      title: title,
      vehicleType: vehicleType,
    };
    submitSellProduct({ variables: { sellProductInput: data } });
    onNext(e);
  };

  const [submitSellProduct, { data, loading, error }] =
    useMutation(CREATING_SELL);
  if (data) {
    console.log(data);
  }

  const [lat, setLat] = useState(-3.745);
  const [lng, setLng] = useState(-38.523);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setSellInput((prevs) => ({
        ...prevs,
        location: {
          coordinates: [position.coords.latitude, position.coords.longitude],
        },
      }));
      setLng(position.coords.longitude);
    });
  };

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

      {formStage === 3 && offerType === "se" && (
        <form className="grid grid-cols-2" onSubmit={(e) => onNext(e)}>
          <div className="flex flex-col p-2">
            <label className="p-2">Brand</label>
            {vehicleType === `ca` && (
              <select
                id="brand"
                name="brand"
                className="w-full p-2 rounded-lg"
                value={sellInput.brand}
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
                value={sellInput.brand}
                onChange={(e) => onChange(e)}
              >
                {BikeBrand.map((d, key) => (
                  <option key={key} value={d.value}>
                    {d.brand}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex flex-col p-2">
            <label className="whitespace-nowrap p-2">Condition</label>
            <select
              id="vehicleCondition"
              name="vehicleCondition"
              className="w-full p-2 rounded-lg"
              value={sellInput.vehicleCondition}
              onChange={(e) => onChange(e)}
            >
              {Condition.map((d, i) => (
                <option key={i} value={d.value}>
                  {d.brand}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col p-2">
            <label className="whitespace-nowrap p-2">Fuel</label>
            <select
              id="fuleType"
              name="fuleType"
              className="w-full p-2 rounded-lg"
              value={sellInput.fuleType}
              onChange={(e) => onChange(e)}
            >
              {FuelType.map((d, key) => (
                <option key={key} value={d.value}>
                  {d.brand}
                </option>
              ))}
            </select>
          </div>
          <div className="p-2 flex flex-col">
            <label className="p-2">Used For</label>
            <input
              type="number"
              name="usedFor"
              className="p-2 rounded-lg"
              value={sellInput.usedFor}
              onChange={(e) => handleFloat(e)}
            />
          </div>
          <div className="col-span-2 p-2">
            <label className="p-2">Description</label>
            <textarea
              className="w-full rounded-lg h-24 p-2 focus:outline-none"
              name="description"
              value={sellInput.description}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="p-2 flex flex-col gap-2">
            <label>Make Year</label>
            <input
              type="number"
              name="madeYear"
              className="p-2 rounded-lg"
              value={sellInput.madeYear}
              onChange={(e) => handleFloat(e)}
            />
          </div>
          <div className="p-2 flex flex-col gap-2">
            <label>Engine (CC)</label>
            <input
              type="number"
              name="engine"
              className="p-2 rounded-lg"
              value={sellInput.engine}
              onChange={(e) => handleFloat(e)}
            />
          </div>
          <div className="p-2 flex flex-col gap-2">
            <label>Milege</label>
            <input
              type="text"
              name="milege"
              className="p-2 rounded-lg"
              value={sellInput.milege}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="flex flex-col p-2 gap-2 ">
            <label className="whitespace-nowrap">Transmission</label>
            <select
              id="transmission"
              name="transmission"
              className="w-full p-2 rounded-lg"
              value={sellInput.transmission}
              onChange={(e) => onChange(e)}
            >
              {Transmission.map((d, key) => (
                <option key={key} value={d.value}>
                  {d.brand}
                </option>
              ))}
            </select>
          </div>

          <div className="p-2 flex flex-col gap-2">
            <label>Lot Number</label>
            <input
              type="text"
              name="lotNo"
              className="p-2 rounded-lg"
              value={sellInput.lotNo}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="p-2 flex flex-col gap-2">
            <label>Kilometer run</label>
            <input
              type="number"
              name="kmRun"
              className="p-2 rounded-lg"
              value={sellInput.kmRun}
              onChange={(e) => handleFloat(e)}
            />
          </div>
          <div className="p-2 flex flex-col gap-2">
            <label>Color</label>
            <input
              type="text"
              name="color"
              className="p-2 rounded-lg"
              value={sellInput.color}
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
            <label className="p-2">Price</label>
            <input
              type="number"
              className="p-2 rounded-lg"
              name="price"
              required
              value={sellInput.price}
              onChange={(e) => handleFloat(e)}
            />
          </div>
          <div className="p-2 flex flex-col">
            <label className="p-2">Price Type</label>
            <select
              id="priceType"
              name="priceType"
              value={sellInput.priceType}
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
              Submit
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
            <Link
              className="bg-primary w-2/5 p-2 rounded-xl text-white border-2 border-transparent text-center"
              href="/"
            >
              Ok
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatingSellInput;
