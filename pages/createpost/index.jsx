import React from "react";
import { useState } from "react";
import App from "../../components/Layout/App";
import Cross from "../../assets/createpost/cross.svg";
import Circle from "../../assets/createpost/circle.svg";
import Car from "../../assets/Category/car.svg";
import Bike from "../../assets/Category/bike.svg";
import Back from "../../assets/createpost/back.svg";
import CarBrand from "../../assets/fakeData/CarBrand";
import Condition from "../../assets/fakeData/Condition";
import Transmission from "../../assets/fakeData/Transmission";
import BikeBrand from "../../assets/fakeData/BikeBrand";
import { useMutation } from "@apollo/client";
import CREATING_RENT from "../../graphql/Mutation/CreatingRent";
import FuelType from "../../assets/fakeData/FuelType";

const index = () => {
  const [postData, setpostData] = useState({
    title: "",
    vehicleType: "bi",
    brand: "ya",
    color: "",
    fuleType: "pe",
    description: "",
    price: 500,
    priceType:"ne"
  });

  const [offer,setOffer] = useState(0)

  const [formStage, setformStage] = useState(1);

  const handleSelection = (key, val) => {
    setpostData((prevs) => ({ ...prevs, [key]: val }));
  };

  const onChange = (e) => {
    setpostData((prevs) => ({ ...prevs, [e.target.name]: e.target.value }));
  };

  const [submit, { loading, error, data }] = useMutation(CREATING_RENT);

  console.log(data);
  console.log(error);

  const onSubmit = (e) => {
    e.preventDefault();
    setformStage(
      formStage < 4
        ? formStage + 1
        : formStage
    );
    !offer
      ? submit({
          variables: { rentProductInput: postData },
        })
      : submit({
          variables: { sellProductInput: postData },
        });


  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {console.log(postData)}
      <div className="flex flex-col bg-customGray-navbar gap-6 p-6 w-2/5 h-5/6 overflow-scroll rounded-2xl ">
        <div className="flex justify-between w-full">
          <h2 className="font-bold text-2xl">Post Ad</h2>
          <button>
            <Cross className="h-6" />
          </button>
        </div>

        {formStage === 1 && (
          <div className="flex items-center">
            <div className="h-24 w-24 rounded-full border-4 flex justify-center items-center">
              <h2>1 of 4</h2>
            </div>
            <div className="p-2">
              <h2 className="text-lg font-semibold">
                Select Ad Type and Title
              </h2>
              <p>Next step: Upload Image</p>
            </div>
          </div>
        )}

        {formStage === 2 && (
          <div className="flex items-center">
            <div className="h-24 w-24 rounded-full border-4 flex justify-center items-center">
              <h2>2 of 4</h2>
            </div>
            <div className="p-2">
              <h2 className="text-lg font-semibold">Upload Image</h2>
              <p>Next step: Product Details</p>
            </div>
          </div>
        )}

        {formStage === 3 && (
          <div className="flex items-center">
            <div className="h-24 w-24 rounded-full border-4 flex justify-center items-center relative">
              <h2>3 of 4</h2>
              <Circle className="absolute h-24" />
            </div>

            <div className="p-2">
              <h2 className="text-lg font-semibold">Product Details</h2>
              <p>Next Step: Location and Price</p>
            </div>
          </div>
        )}

        {formStage === 4 && (
          <div className="flex items-center">
            <div className="h-24 w-24 rounded-full border-4 flex justify-center items-center relative">
              <h2>3 of 4</h2>
              <Circle className="absolute h-24" />
            </div>

            <div className="p-2">
              <h2 className="text-lg font-semibold">Location and Price</h2>
              <p>Next Step: Confirm and Submit</p>
            </div>
          </div>
        )}

        <section>
          {formStage === 1 && (
            <form className="flex flex-col gap-2">
              <label>I want to</label>
              <div className="flex gap-2 justify-center w-full">
                <div
                  onClick={(e) => setOffer(0)}
                  className={
                    offer === 0
                      ? " border-primary text-primary bg-white rounded-lg  border-2 hover:border-primary hover:text-primary w-full  py-4 text-center cursor-pointer"
                      : "bg-white w-full  py-4 rounded-lg border-transparent border-2 hover:border-primary hover:text-primary text-center cursor-pointer"
                  }
                >
                  Rent my Vehicle
                </div>
                <div
                  onClick={(e) => setOffer(1)}
                  className={
                    offer === 1
                      ? " border-primary text-primary bg-white rounded-lg  border-2 hover:border-primary hover:text-primary w-full  py-4 text-center cursor-pointer"
                      : "bg-white w-full py-4 rounded-lg border-transparent border-2 hover:border-primary hover:text-primary text-center cursor-pointer"
                  }
                >
                  Sell my Vehicle
                </div>
              </div>
              <label>Select Vehicle Type</label>
              <div className="flex gap-6">
                <div
                  className={
                    postData.vehicleType === `bi`
                      ? "bg-white shadow-md h-28 w-28 flex  flex-col justify-center items-center rounded-2xl border-2 border-primary cursor-pointer text-primary"
                      : "bg-white shadow-md h-28 w-28 flex  flex-col justify-center items-center rounded-2xl border-2 border-transparent  cursor-pointer hover:border-primary hover:text-primary"
                  }
                  onClick={(e) => handleSelection("vehicleType", "bi")}
                >
                  <Bike className="h-14 " />
                  <h2>Bike</h2>
                </div>
                <div
                  className={
                    postData.vehicleType === `ca`
                      ? "bg-white shadow-md h-28 w-28 flex  flex-col justify-center items-center rounded-2xl border-2 border-primary cursor-pointer text-primary"
                      : "bg-white shadow-md h-28 w-28 flex  flex-col justify-center items-center rounded-2xl border-2 border-transparent  cursor-pointer hover:border-primary hover:text-primary"
                  }
                  onClick={(e) => handleSelection("vehicleType", "ca")}
                >
                  <Car className="h-14 " />
                  <h2>Car</h2>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2>Ad Title</h2>
                <input
                  type="text"
                  className="p-2 rounded-lg focus:outline-none"
                  placeholder="Enter the title of the Ad"
                  name="title"
                  val={postData.title}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </form>
          )}

          {formStage === 2 && (
            <div>
              <p>Upload the images of the Vehicle</p>
              <div className="w-48 h-48 bg-gray-50">
                <input type="file" className="" />
              </div>
            </div>
          )}

          {formStage === 3 && offer === 0 && (
            <form className="grid grid-cols-2">
              <div className="flex flex-col p-2">
                <label className="p-2">Brand</label>
                {postData.vehicleType === `ca` && (
                  <select
                    id="brand"
                    name="brand"
                    className="w-full p-2 rounded-lg"
                    onChange={(e) => onChange(e)}
                  >
                    {CarBrand.map((d, key) => (
                      <option
                        key={key}
                        value={d}
                        selected={key === 1 ? true : false}
                      >
                        {d}
                      </option>
                    ))}
                  </select>
                )}
                {postData.vehicleType === `bi` && (
                  <select
                    id="brand"
                    name="brand"
                    className="w-full p-2 rounded-lg"
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
                  value={postData.color}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="col-span-2 p-2">
                <label className="p-2">Description</label>
                <textarea
                  className="w-full rounded-lg h-24 p-2 focus:outline-none"
                  name="description"
                  value={postData.description}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </form>
          )}

          {formStage === 3 && offer === 1 && (
            <form className="grid grid-cols-2">
              <div className="flex flex-col p-2">
                <label className="p-2">Brand</label>
                {postData.vehicleType === `ca` && (
                  <select
                    id="brand"
                    name="brand"
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
                {postData.vehicleType === `bi` && (
                  <select
                    id="brand"
                    name="brand"
                    className="w-full p-2 rounded-lg"
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
                  id="condition"
                  name="condition"
                  className="w-full p-2 rounded-lg"
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
                  type="text"
                  name="usedFor"
                  className="p-2 rounded-lg"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="col-span-2 p-2">
                <label className="p-2">Description</label>
                <textarea
                  className="w-full rounded-lg h-24 p-2 focus:outline-none"
                  name="description"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="p-2 flex flex-col gap-2">
                <label>Make Year</label>
                <input
                  type="text"
                  name="madeYear"
                  className="p-2 rounded-lg"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="p-2 flex flex-col gap-2">
                <label>Engine (CC)</label>
                <input
                  type="text"
                  name="engine"
                  className="p-2 rounded-lg"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="p-2 flex flex-col gap-2">
                <label>Milege</label>
                <input
                  type="text"
                  name="milege"
                  className="p-2 rounded-lg"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="flex flex-col p-2">
                <label className="whitespace-nowrap p-2">Transmission</label>
                <select
                  id="transmission"
                  name="transmission"
                  className="w-full p-2 rounded-lg"
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
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="p-2 flex flex-col gap-2">
                <label>Kilometer run</label>
                <input
                  type="text"
                  name="kmRun"
                  className="p-2 rounded-lg"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="p-2 flex flex-col gap-2">
                <label>Color</label>
                <input
                  type="text"
                  name="color"
                  className="p-2 rounded-lg"
                  onChange={(e) => onChange(e)}
                />
              </div>
            </form>
          )}

          {formStage === 4 && (
            <form className="grid grid-cols-2">
              <div className="p-2 flex flex-col">
                <label className="p-2">Price</label>
                <input
                  type="Number"
                  className="p-2 rounded-lg"
                  name="price"
                  value={postData.price}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="p-2 flex flex-col">
                <label className="p-2">Price Type</label>
                <select
                  id="priceType"
                  name="priceType"
                  className="p-2 rounded-lg"
                  onChange={(e) => onChange(e)}
                >
                  <option value="fi">Fixed</option>
                  <option value="ne">Negotiable</option>
                </select>
              </div>
              <div className="p-2 col-span-2 flex flex-col">
                <label className="p-2">Location</label>
                <input type="text" className="p-2 rounded-lg" />
              </div>
            </form>
          )}

          <div
            className={
              formStage === 1
                ? "flex justify-end my-2  w-full  px-4 items-end"
                : "flex justify-between my-2  w-full   px-4 items-end"
            }
          >
            {formStage >= 2 && (
              <button
                className="flex gap-2 p-2  rounded-lg w-2/5 justify-center border-2 border-transparent text-primary hover:border-primary"
                onClick={(e) => setformStage(formStage - 1)}
              >
                <Back className="h-6" fill="#1FC39E" /> Back
              </button>
            )}
            <button
              className="bg-primary w-2/5 p-2 rounded-xl text-white border-2 border-transparent"
              onClick={(e) => onSubmit(e)}
            >
              {formStage === 4 ? "Submit" : "Next"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default index;
