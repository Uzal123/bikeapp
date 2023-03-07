import React from "react";
import Car from "../../../assets/Category/car.svg";
import Bike from "../../../assets/Category/bike.svg";

const Category = ({ vehicleType, setVehicleType }) => {
  return (
    <div className="py-4 relative flex overflow-x-scroll md:overflow-x-hidden">
      <div>
        <div className="-rotate-90 absolute top-10 md:top-12 -left-8 text-white bg-primary text-sm md:text-lg p-2 md:p-3 rounded-lg ">
          categories
        </div>
      </div>
      <div className="flex gap-6 ml-10 md:ml-16">
        <div
          className={`bg-white shadow-md h-20 w-20 md:h-28 md:w-28 flex  flex-col justify-center items-center cursor-pointer rounded-2xl ${
            vehicleType.length > 2 && `border-2 border-primary text-primary`
          } `}
          onClick={() => {
            setVehicleType(["bi", "ca", "sc"]);
          }}
        >
          <h1 className="text-2xl font-medium">All</h1>
        </div>
        <div
          className={`bg-white shadow-md h-20 w-20 md:h-28 md:w-28 flex cursor-pointer flex-col justify-center items-center rounded-2xl ${
            vehicleType.length === 1 &&
            vehicleType[0] === "ca" &&
            `border-2 border-primary text-primary`
          } `}
          onClick={() => {
            setVehicleType(["ca"]);
          }}
        >
          <Car className="md:h-12 md:w-12 h-10 w-10" />
          <h2>Car</h2>
        </div>
        <div
          className={`bg-white shadow-md h-20 w-20 md:h-28 md:w-28 flex cursor-pointer flex-col justify-center items-center rounded-2xl ${
            vehicleType.length === 1 &&
            vehicleType[0] === "bi" &&
            `border-2 border-primary text-primary`
          } `}
          onClick={() => {
            setVehicleType(["bi"]);
          }}
        >
          <Bike className="md:h-12 md:w-12 h-10 w-10" />
          <h2>Bike</h2>
        </div>
      </div>
    </div>
  );
};

export default Category;
