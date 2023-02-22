import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import CarBrand from "../../assets/fakeData/CarBrand";
import BikeBrand from "../../assets/fakeData/BikeBrand";
import FuelType from "../../assets/fakeData/FuelType";
import Back from "../../assets/createpost/back.svg";
import { useMutation } from "@apollo/client";
import MapContainer from "../../components/UI/Map";
import CREATING_RENT from "../../graphql/Mutation/CreatingRent";
import Link from "next/link";
import PriceType from "../../assets/fakeData/PriceType";
import Colors from "../../assets/fakeData/colors";
import { useNotificationStore } from "../../store/notifications";
import { uuid } from "uuidv4";
import { useAppStore } from "../../store/appState";

const CreatingRentInput = ({
  formStage,
  offerType,
  vehicleType,
  setformStage,
  title,
  imageLinks,
  setImageLinks,
  location,
  setLocation,
  errors,
  setErrors,
}) => {
  const setNotification = useNotificationStore(
    (state) => state.setNotification
  );

  const { city,coordinates } = useAppStore((state) => state);

  const [rentInput, setRentInput] = useState({
    offerType: "re",
    brand: "ho",
    fuleType: "pe",
    color: "bl",
    description: "",
    price: 0,
    priceType: "fi",
  });


  const [address, setAddress] = useState(city);


  const [center, setCenter] = useState(coordinates);


  const onChange = (e) => {
    const val = e.target.value;
    const key = e.target.name;
    setRentInput((prevs) => ({ ...prevs, [key]: val }));
    setErrors((prevs) => ({ ...prevs, [key]: "" }));
  };

  const handleFloat = (e) => {
    const val = parseFloat(e.target.value);
    const key = e.target.name;
    setRentInput((prevs) => ({ ...prevs, [key]: val }));
    setErrors({});
  };

  useEffect(() => {}, [errors]);

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
        setNotification(uuid(), "Image is required", "Error", 3000);
      }
      setErrors(newErrors);
      if (!Object.keys(newErrors).length) {
        setformStage(formStage + 1);
      }
    }

    if (formStage === 3) {
      let newErrors = {};
      if (!rentInput.description) {
        newErrors.description = "Description is required";
      }
      setErrors(newErrors);
      if (!Object.keys(newErrors).length) {
        setformStage(formStage + 1);
      }
    }

    if (formStage === 4) {
      let newErrors = {};
      if (rentInput.price < 50) {
        newErrors.price = "price must be more than 100";
      }
      if (!location) {
        newErrors.location = "Enter your location";
      }
      setErrors(newErrors);
      if (!Object.keys(newErrors).length) {
        onSubmit(e);
        //   setformStage(formStage + 1);
      }
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
      location: {
        coordinates: [parseFloat(location[0]), parseFloat(location[1])],
        location: address,
      },
      vehicleType: vehicleType,
    };
    console.log(data);
    submitRentProduct({ variables: { rentProductInput: data } });
  };

  const [submitRentProduct, { data, loading, error }] =
    useMutation(CREATING_RENT);
  useEffect(() => {

    if (data?.rentProduct?.success) {
      setNotification(uuid(), "Ad submitted successfully", "Success", 5000);
      setformStage(5);
    }
    if (error) {
      setNotification(uuid(), "Something went wrong !!!", "Error", 5000);
    }
  }, [data, loading, error]);

  return (
    <div className="w-full">
      {formStage === 2 && (
        <form onSubmit={(e) => onNext(e)} className="flex flex-col gap-2">
          <p className="p-2">Upload the images of the Vehicle</p>
          <ImageUpload
            imageLinks={imageLinks}
            setImageLinks={setImageLinks}
            errors={errors}
            setErrors={setErrors}
          />
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
              className={
                !errors.description
                  ? "w-full rounded-lg h-24 p-2 focus:outline-none border-2 border-transparent"
                  : "w-full rounded-lg h-24 p-2 focus:outline-none border-2 border-red-500"
              }
              name="description"
              value={rentInput.description}
              onChange={(e) => onChange(e)}
              placeholder={errors.description}
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
              className={
                !errors.price
                  ? "p-2 rounded-lg"
                  : "p-2 rounded-lg border-2 border-red-500"
              }
              name="price"
              placeholder={errors.price}
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
            onClick={(e) => onNext(e)}
          >
            {formStage === 4 ? (loading ? "Submitting..." : "Submit") : "Next"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatingRentInput;
