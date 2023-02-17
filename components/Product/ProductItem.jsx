import Link from "next/link";
import React from "react";
// import Bookmark from "../../assets/Product/bookmark.svg";
// import Heart from "../../assets/Product/heart.svg";

const ProductItem = ({
  data: { price, title, images, _id, createdAt },
  ...props
}) => {
  const date = new Date(createdAt);
  const options = {
    day: "numeric",
    month: "short",
  };
  const localDate = date.toLocaleString("en-US", options);

  return (
    <div className=" bg-white shadow-md rounded-xl relative border-gray-100 border-2">
      {console.log(createdAt)}
      <Link href={`/product/${_id}`}>
        <div className="aspect-square  ">
          <img
            src={images[0].url}
            className="aspect-square object-cover rounded-lg h-full w-full"
          />
        </div>
        <div className="p-2 relative">
          {/* <Bookmark className="absolute right-2 bottom-4 h-6" /> */}
          <div className="flex justify-between">
            <p className="font-semibold text-md">Rs. {price}</p>
            <p className="text-xs">1.5 Km</p>
          </div>

          <h2>{title}</h2>
          <p className="text-xs">{localDate}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
