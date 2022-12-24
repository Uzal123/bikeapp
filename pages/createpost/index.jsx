import React from "react";
import { useState } from "react";
import Cross from "../../assets/createpost/cross.svg";
import Circle from "../../assets/createpost/circle.svg";
import App from "../../components/Layout/App";
import Car from "../../assets/Category/car.svg";
import Bike from "../../assets/Category/bike.svg";
import CreatingRentInput from "./CreatingRentInput";
import CreatingSellInput from "./CreatingSellInput";

const index = () => {
  const [formStage, setformStage] = useState(3);

  const [title, setTitle] = useState("");

  const [offer, setOffer] = useState(0);

  const [vehicleType, setVehicleTye] = useState("bi");

  const [imageLinks, setImageLinks] = useState([]);

  const onNext = (e) => {
    e.preventDefault();
    setformStage(formStage < 4 ? formStage + 1 : formStage);
  };

  return (
    <App>
      <div className="p-4 h-screen">
        <div className="flex justify-start px-10 items-center flex-col bg-customGray-navbar gap-6 p-6 grow overflow-scroll rounded-2xl h-full">
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

          {formStage === 5 && (
            <div className="flex items-center">
              <div className="h-24 w-24 rounded-full border-4 flex justify-center items-center relative">
                <h2>3 of 4</h2>
                <Circle className="absolute h-24" />
              </div>

              <div className="p-2">
                <h2 className="text-lg font-semibold">Review</h2>
              </div>
            </div>
          )}

          <section>
            {formStage === 1 && (
              <form className="flex flex-col gap-2" onSubmit={(e) => onNext(e)}>
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
                      vehicleType === "bi"
                        ? "bg-white shadow-md h-28 w-28 flex  flex-col justify-center items-center rounded-2xl border-2 border-primary cursor-pointer text-primary"
                        : "bg-white shadow-md h-28 w-28 flex  flex-col justify-center items-center rounded-2xl border-2 border-transparent  cursor-pointer hover:border-primary hover:text-primary"
                    }
                    onClick={(e) => setVehicleTye("bi")}
                  >
                    <Bike className="h-14 " />
                    <h2>Bike</h2>
                  </div>
                  <div
                    className={
                      vehicleType === "ca"
                        ? "bg-white shadow-md h-28 w-28 flex  flex-col justify-center items-center rounded-2xl border-2 border-primary cursor-pointer text-primary"
                        : "bg-white shadow-md h-28 w-28 flex  flex-col justify-center items-center rounded-2xl border-2 border-transparent  cursor-pointer hover:border-primary hover:text-primary"
                    }
                    onClick={(e) => setVehicleTye("ca")}
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
                    required
                    value={title}
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-primary w-2/5 p-2 rounded-xl text-white border-2 border-transparent"
                    type="submit"
                  >
                    Next
                  </button>
                </div>
              </form>
            )}

            {!offer ? (
              <CreatingRentInput
                formStage={formStage}
                setformStage={setformStage}
                offer={offer}
                vehicleType={vehicleType}
                title={title}
                imageLinks={imageLinks}
                setImageLinks={setImageLinks}
              />
            ) : (
              <CreatingSellInput
                formStage={formStage}
                setformStage={setformStage}
                offer={offer}
                vehicleType={vehicleType}
                title={title}
                imageLinks={imageLinks}
                setImageLinks={setImageLinks}
              />
            )}
          </section>
        </div>
      </div>
    </App>
  );
};

export default index;
