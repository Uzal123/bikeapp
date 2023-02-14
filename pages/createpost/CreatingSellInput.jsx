import React, { useEffect, useState } from "react";
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
import { useNotificationStore } from "../../store/notifications";
import { uuid } from "uuidv4";

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
  setErrors,
  errors,
}) => {

const setNotification = useNotificationStore((state) => state.setNotification);

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
    color: "bl",
    price: "",
    priceType: "fi",
  });

  const [product, setProduct] = useState({});

  const onNext = (e) => {
    e.preventDefault();
    if (formStage === 1) {
      let newErrors = {};
      if (!title) {
        newErrors.title = "title is required";
      }
      setErrors(newErrors);
      if (!Object.keys(newErrors).length) {
        setformStage(formStage + 1);
      }
    }

    if (formStage === 2) {
      let newErrors = {};
      if (imageLinks.length === 0) {
        newErrors.imageLinks = "Image is required";
      }
      setErrors(newErrors);
      if (!Object.keys(newErrors).length) {
        setformStage(formStage + 1);
      }
    }

    if (formStage === 3) {
      let newErrors = {};
      if (!sellInput.description) {
        newErrors.description = "Description is required";
      }
      setErrors(newErrors);

      if (!sellInput.usedFor) {
        newErrors.usedFor = "Enter the months used";
      }
      setErrors(newErrors);

      if (!sellInput.madeYear) {
        newErrors.madeYear = "Enter the made year";
      }
      setErrors(newErrors);

      if (!sellInput.engine) {
        newErrors.engine = "Enter the engine";
      }
      setErrors(newErrors);
      if (!sellInput.milege) {
        newErrors.milege = "Enter the milege";
      }
      setErrors(newErrors);

      if (!sellInput.lotNo) {
        newErrors.lotNo = "Enter the lot number";
      }
      setErrors(newErrors);

      if (!sellInput.kmRun) {
        newErrors.kmRun = "Enter the km run";
      }
      setErrors(newErrors);

      if (!Object.keys(newErrors).length) {
        setformStage(formStage + 1);
      }
    }

    if (formStage === 4) {
      let newErrors = {};
      if (sellInput.price < 50) {
        newErrors.price = "price must be more than 100";
      }
      if (!location) {
        newErrors.location = "Enter your location";
      }
      setErrors(newErrors);
      if (!Object.keys(newErrors).length) {
        onSubmit(e);
        //setformStage(formStage + 1);
      }
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
    setErrors((prevs) => ({ ...prevs, [key]: "" }));
    console.log(sellInput);
  };

  const handleFloat = (e) => {
    const val = parseFloat(e.target.value);
    const key = e.target.name;
    setSellInput((prevs) => ({ ...prevs, [key]: val }));
    setErrors((prevs) => ({ ...prevs, [key]: "" }));
  };

  const onSubmit = (e) => {
    e?.preventDefault();
    const data = {
      ...sellInput,
      images: imageLinks,
      title: title,
      location: {
        coordinates: [parseFloat(location[0]), parseFloat(location[1])],
        location: address,
      },
      vehicleType: vehicleType,
    };
    submitSellProduct({ variables: { sellProductInput: data } });
  };

  const [submitSellProduct, { data, loading, error }] =
    useMutation(CREATING_SELL);
  useEffect(() => {
    console.log(data);

    if (data?.sellProduct?.success) {
        setNotification(uuid(), "Ad submitted successfully", "Success",5000)
      setformStage(5);
    }
    if(error){
        setNotification(uuid(), "Something went wrong !!!", "Error",5000)
    }
  }, [data, loading,error]);

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
          <ImageUpload
            imageLinks={imageLinks}
            setImageLinks={setImageLinks}
            errors={errors}
            setErrors={setErrors}
          />
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
              placeholder={errors.usedFor}
              errors={errors.usedFor}
              value={sellInput.usedFor}
              onChange={(e) => handleFloat(e)}
            />
          </div>
          <div className="col-span-2 p-2">
            <label className="p-2">Description</label>
            <textarea
              className={
                !errors.description
                  ? "w-full rounded-lg h-24 p-2 focus:outline-none border-2 border-transparent"
                  : "w-full rounded-lg h-24 p-2 focus:outline-none border-2 border-red-500"
              }
              name="description"
              placeholder={errors.description}
              value={sellInput.description}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="p-2 flex flex-col">
            <FormInput
              title="Make Year"
              type="number"
              name="madeYear"
              placeholder={errors.madeYear}
              errors={errors.madeYear}
              value={sellInput.madeYear}
              onChange={(e) => handleFloat(e)}
            />
          </div>
          <div className="p-2 flex flex-col">
            <FormInput
              title="Engine (CC)"
              type="number"
              name="engine"
              errors={errors.engine}
              placeholder={errors.engine}
              value={sellInput.engine}
              onChange={(e) => handleFloat(e)}
            />
          </div>
          <div className="p-2 flex flex-col">
            <FormInput
              title="Milege"
              type="text"
              name="milege"
              errors={errors.milege}
              placeholder={errors.milege}
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
              placeholder={errors.lotNo}
              errors={errors.lotNo}
              value={sellInput.lotNo}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="p-2 flex flex-col">
            <FormInput
              title="Kilometer run"
              type="number"
              name="kmRun"
              placeholder={errors.kmRun}
              value={sellInput.kmRun}
              errors={errors.kmRun}
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
              errors={errors.price}
              placeholder={errors.price}
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
              errors={errors}
              setErrors={setErrors}
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
            onClick={(e) => {
              onNext(e);
            }}
          >
            {formStage === 4 ? (loading ? "Loading..." : "Submit") : "Next"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatingSellInput;
