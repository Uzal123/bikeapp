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
import MapContainer from "../../components/UI/Map";
import { useJsApiLoader } from "@react-google-maps/api";
import { Router } from "next/router";
import Link from "next/link";
import PriceType from "../../assets/fakeData/PriceType";
import DropInput from "../../components/UI/DropInput";
import FormInput from "../../components/UI/FormInput";
import Colors from "../../assets/fakeData/colors";

const CreatingSellInput = ({
  formStage,
  offerType,
  vehicleType,
  setformStage,
  title,
  imageLinks,
  setImageLinks,
  setLocation,
  location,
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
  });

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

  const onChange = (e) => {
    const val = e.target.value;
    const key = e.target.name;
    setSellInput((prevs) => ({ ...prevs, [key]: val }));
    console.log(sellInput);
  };

  const handleFloat = (e) => {
    const val = parseFloat(e.target.value);
    const key = e.target.name;
    setSellInput((prevs) => ({ ...prevs, [key]: val }));
  };

  const onSubmit = (e) => {
    e?.preventDefault();
    const data = {
      ...sellInput,
      images: imageLinks,
      title: title,
      location: location,
      vehicleType: vehicleType,
    };
    submitSellProduct({ variables: { sellProductInput: data } });
  };

  const [submitSellProduct, { data, loading, error }] =
    useMutation(CREATING_SELL);
  if (data) {
    console.log(data);
  }

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const [address, setAddress] = useState("");

  return (
    <div className="flex flex-col">
      {formStage === 2 && (
        <form className="h-full grid grid-cols-1" onSubmit={(e) => onNext(e)}>
          <p className="p-2">Upload the images of the Vehicle</p>
          <ImageUpload imageLinks={imageLinks} setImageLinks={setImageLinks} />
        </form>
      )}

      {formStage === 3 && offerType === "se" && (
        <form className="h-full grid grid-cols-2" onSubmit={(e) => onNext(e)}>
          <div className="flex flex-col p-2">
            <DropInput
              title="Brand"
              name="brand"
              onChange={(e) => onChange(e)}
              items={vehicleType === `ca` ? CarBrand : BikeBrand}
              value={sellInput.brand}
            />
          </div>
          <div className="flex flex-col p-2">
            <DropInput
              title="Condition"
              name="vehicleCondition"
              onChange={(e) => onChange(e)}
              items={Condition}
              value={sellInput.vehicleCondition}
            />
          </div>
          <div className="flex flex-col p-2">
            <DropInput
              title="Fuel"
              name="fuleType"
              onChange={(e) => onChange(e)}
              items={FuelType}
              value={sellInput.fuleType}
            />
          </div>
          <div className="p-2 flex flex-col">
            <FormInput
              title="Used For"
              type="number"
              name="usedFor"
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
          <div className="p-2 flex flex-col">
            <FormInput
              title="Make Year"
              type="number"
              name="madeYear"
              value={sellInput.madeYear}
              onChange={(e) => handleFloat(e)}
            />
          </div>
          <div className="p-2 flex flex-col">
            <FormInput
              title="Engine (CC)"
              type="number"
              name="engine"
              value={sellInput.engine}
              onChange={(e) => handleFloat(e)}
            />
          </div>
          <div className="p-2 flex flex-col">
            <FormInput
              title="Milege"
              type="text"
              name="milege"
              value={sellInput.milege}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="flex flex-col p-2">
            <DropInput
              title="Transmission"
              name="transmission"
              onChange={(e) => onChange(e)}
              items={Transmission}
              value={sellInput.transmission}
            />
          </div>

          <div className="p-2 flex flex-col">
            <FormInput
              title="Lot Number"
              type="text"
              name="lotNo"
              value={sellInput.lotNo}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="p-2 flex flex-col">
            <FormInput
              title="Kilometer run"
              type="number"
              name="kmRun"
              value={sellInput.kmRun}
              onChange={(e) => handleFloat(e)}
            />
          </div>
          <div className="p-2 flex flex-col">
            <DropInput
              title="Color"
              name="color"
              onChange={(e) => onChange(e)}
              items={Colors}
              value={sellInput.color}
            />
          </div>
        </form>
      )}

      {formStage === 4 && (
        <form className="h-full grid grid-cols-2">
          <div className="p-2 flex flex-col">
            <FormInput
              title="Price"
              type="number"
              name="price"
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
              {Object.keys(PriceType).map((key) => (
                <option key={key} value={key}>
                  {PriceType[key]}
                </option>
              ))}
            </select>
          </div>
          <div className="p-2 col-span-2 flex flex-col">
            <label className="px-2 pt-2">Location</label>
          </div>
          <div className="p-2 col-span-2 h-full flex flex-col relative">
            <MapContainer
              drag={true}
              center={center}
              setCenter={setCenter}
              address={address}
              setAddress={setAddress}
              setSellInput={setSellInput}
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

export default CreatingSellInput;
