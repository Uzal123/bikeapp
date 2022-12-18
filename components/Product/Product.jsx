import React from "react";
import Bookmark from "../../assets/Product/bookmark.svg"
import Heart from "../../assets/Product/heart.svg";

const Product = ({price,title,...props}) => {
  return (
    <div>
      <a className=" bg-white rounded-xl relative" href="/product">
        <div className="aspect-square bg-gray-400 rounded-lg"></div>
        <div className="p-2 relative">
          <Bookmark className="absolute right-2 bottom-4 h-6" />
          <div className="flex justify-between">
            <p className="font-semibold text-md">Rs. {price}</p>
            <p className="text-xs">1.5 Km</p>
          </div>

          <h2>{title}</h2>
          <p className="text-xs">14th jan</p>
        </div>
      </a>
    </div>
  );
};

export default Product;
