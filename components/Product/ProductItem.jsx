import React from "react";
import Bookmark from "../../assets/Product/bookmark.svg";
import Heart from "../../assets/Product/heart.svg";

const ProductItem = ({ data: { price, title, images, _id },offer, ...props }) => {


  return (
    <div>
      <a className=" bg-white rounded-xl relative" href={offer=== "rent" ? `/rentproduct/${_id}` : `/sellproduct/${_id}`}>
        <div className="aspect-square  ">
          <img
            src={images[0].url}
            className="aspect-square object-cover rounded-lg h-full w-full"
          />
        </div>
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

export default ProductItem;
