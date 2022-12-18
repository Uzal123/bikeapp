import React from "react";
import Car from "../../../assets/Category/car.svg";
import Bike from "../../../assets/Category/bike.svg";

const Category = () => {
  return (
    <div className="py-4 relative">
      <div>
        <div className="-rotate-90 absolute top-12 -left-8 text-white bg-primary p-3 rounded-lg">
          categories
        </div>
      </div>
      <div className="flex gap-6 ml-16">
        <div
          className="bg-white shadow-md h-28 w-28 flex  flex-col justify-center items-center rounded-2xl"
        >
          <Car className="h-14 " />
          <h2>Car</h2>
        </div>
        <div
          className="bg-white shadow-md h-28 w-28 flex  flex-col justify-center items-center rounded-2xl"
        >
          <Bike className="h-14 " />
          <h2>Bike</h2>
        </div>
      </div>
    </div>
  );
};

export default Category;
