import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useUserStore } from "../../store/auth";
import Router, { withRouter, useRouter } from "next/router";
import Cross from "../../assets/createpost/cross.svg";
import Circle from "../../assets/createpost/circle.svg";
import Check from "../../assets/createpost/check.svg";
import App from "../../components/Layout/App";
import Car from "../../assets/Category/car.svg";
import Bike from "../../assets/Category/bike.svg";
import CreatingRentInput from "./CreatingRentInput";
import CreatingSellInput from "./CreatingSellInput";
import Link from "next/link";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

const CreatePost = () => {
  const user = useUserStore((state) => state.user);

  const router = useRouter();

  const [formStage, setformStage] = useState(1);

  const [title, setTitle] = useState("");

  const [offerType, setOfferType] = useState("re");

  const [vehicleType, setVehicleTye] = useState("bi");

  const [imageLinks, setImageLinks] = useState([]);

  const [location, setLocation] = useState();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!user.email) {
        router.push("/login", { basePath : "/createpost"});
      }
    }
  }, [user]);

  const onNext = (e) => {
    e.preventDefault();
    setformStage(formStage < 4 ? formStage + 1 : formStage);
  };

  return (
    <App>
      <div className="p-4 h-full flex justify-center bg-customGray-navbar">
        <div className="flex justify-start md:px-10 pt-6 overflow-x-hidden  items-center flex-col bg-customGray-navbar gap-6 md:w-3/5 lg:w-1/2 w-full overflow-scroll rounded-2xl h-full relative">
          <div className="flex justify-between w-full">
            <h2 className="font-bold text-2xl">Post Ad</h2>
            <Link className="cursor-pointer" href="/">
              <Cross className="h-6" />
            </Link>
          </div>

          {formStage === 1 && (
            <PageIndexCircle
              currentIndex={1}
              title={"Select Ad Type and Title"}
              nextTitle={"Upload Image"}
            />
          )}

          {formStage === 2 && (
            <PageIndexCircle
              currentIndex={2}
              title={"Upload Image"}
              nextTitle={"Product Details"}
            />
          )}

          {formStage === 3 && (
            <PageIndexCircle
              currentIndex={3}
              title={"Product Details"}
              nextTitle={"Location and Price"}
            />
          )}

          {formStage === 4 && (
            <PageIndexCircle
              currentIndex={4}
              title={"Location and Price"}
              nextTitle={"Confirm and Submit"}
            />
          )}

          {formStage === 5 && (
            <div className="flex items-center">
              <div className="h-24 w-24 rounded-full border-4 flex justify-center items-center relative">
                <Check className="h-10" />
                <Circle className="absolute h-24" />
              </div>
              <div className="p-2">
                <h2 className="text-lg font-semibold">Review</h2>
              </div>
            </div>
          )}

          <section className="w-full ">
            {formStage === 1 && (
              <form
                className="flex flex-col gap-2 h-full "
                onSubmit={(e) => onNext(e)}
              >
                <div className="pb-4">
                  <label className="text-md">I want to</label>
                  <div className="flex gap-2 justify-center w-full">
                    <div
                      onClick={(e) => setOfferType("re")}
                      className={
                        offerType === "re"
                          ? " border-primary text-primary bg-white rounded-lg  border-2 hover:border-primary hover:text-primary text-customWhite-dark text-md w-full  py-4 text-center cursor-pointer"
                          : "bg-white w-full  py-4 rounded-lg border-transparent border-2 hover:border-primary hover:text-primary text-customWhite-dark text-md text-center cursor-pointer"
                      }
                    >
                      Rent my Vehicle
                    </div>
                    <div
                      onClick={(e) => setOfferType("se")}
                      className={
                        offerType === "se"
                          ? " border-primary text-primary bg-white rounded-lg  border-2 hover:border-primary hover:text-primary text-customWhite-dark text-md w-full  py-4 text-center cursor-pointer"
                          : "bg-white w-full py-4 rounded-lg border-transparent border-2 hover:border-primary hover:text-primary text-customWhite-dark text-md text-center cursor-pointer"
                      }
                    >
                      Sell my Vehicle
                    </div>
                  </div>
                </div>

                <div className="pb-4">
                  <label className="text-md">Select Vehicle Type</label>
                  <div className="flex gap-6 py-4">
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
                </div>
                <div className="flex flex-col gap-2 ">
                  <h2 className="text-md">Ad Title</h2>
                  <input
                    type="text"
                    className={
                      !errors.title
                        ? "p-2 border-2 border-transparent rounded-lg focus:outline-none"
                        : "border-2 border-red-500 p-2 rounded-lg focus:outline-none"
                    }
                    placeholder={
                      !errors.title ? "Enter the title of the Ad" : errors.title
                    }
                    required
                    value={title}
                    name="title"
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setErrors({});
                    }}
                  />
                </div>
              </form>
            )}

            {offerType === "re" ? (
              <CreatingRentInput
                formStage={formStage}
                setformStage={setformStage}
                vehicleType={vehicleType}
                title={title}
                offerType="re"
                imageLinks={imageLinks}
                setImageLinks={setImageLinks}
                setLocation={setLocation}
                location={location}
                errors={errors}
                setErrors={setErrors}
              />
            ) : (
              <CreatingSellInput
                formStage={formStage}
                setformStage={setformStage}
                vehicleType={vehicleType}
                title={title}
                offerType="se"
                imageLinks={imageLinks}
                setImageLinks={setImageLinks}
                setLocation={setLocation}
                location={location}
                errors={errors}
                setErrors={setErrors}
              />
            )}
          </section>
        </div>
      </div>
    </App>
  );
};

export default CreatePost;

const PageIndexCircle = ({
  currentIndex = 1,
  lastIndex = 4,
  title,
  nextTitle,
}) => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="md:w-1/3 w-1/4 flex justify-end">
        <div className="h-24 w-24 items-center justify-end relative">
          <CircularProgressbarWithChildren
            value={(currentIndex / lastIndex) * 100}
            styles={buildStyles({
              rotation: 0,
              strokeLinecap: "butt",
              textSize: "16px",
              pathTransitionDuration: 0.5,
              pathColor: `#1FC39E`,
              textColor: "#1FC39E",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          >
            <div className="font-semibold">
              {currentIndex} of {lastIndex}
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>

      <div className="p-2 md:w-2/3 w-3/4 flex-start">
        <h2 className="text-lg font-semibold text-primary">{title}</h2>
        <p>
          <span className="font-semibold">Next step:</span> {nextTitle}
        </p>
      </div>
    </div>
  );
};
