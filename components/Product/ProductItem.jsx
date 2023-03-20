import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Ellipsis from "../../assets/Product/ellipsis.svg";
import { useAuth } from "../../store/auth";
import { useNotification } from "../../store/notifications";
import { uuid } from "uuidv4";

const ProductItem = ({
  handleDelete,
  data: { price, title, images, _id, createdAt, createdBy },
  ...props
}) => {
  const setNotification = useNotification(
    (state) => state.setNotification
  );

  const user = useAuth((state) => state.user);
  const router = useRouter();

  const date = new Date(createdAt);
  const options = {
    day: "numeric",
    month: "short",
  };
  const localDate = date.toLocaleString("en-US", options);

  const [showOptions, setShowOptions] = useState(false);
  return (
    <div
      className=" bg-white shadow-md rounded-xl relative border-gray-100 border-2 z-100 cursor-pointer"
      onClick={(event) => {
        setNotification(_id, "Loading", "Loading", 3000);
        // if (swipeRef.current.swipe) {
        //   event.preventDefault(); // prevent click if swipe was detected
        // } else {
        router.push(`/product/${_id}`);
        // }
      }}
    >
      <div className="aspect-square  ">
        <img
          src={images[0].url}
          className="aspect-square object-cover rounded-lg h-full w-full"
          alt="Product Image"
        />
      </div>
      <div className="p-2 relative">
        <div className="flex justify-between">
          <p className="font-semibold text-md">Rs. {price}</p>
          <p className="text-xs">1.5 Km</p>
        </div>

        <div className="flex justify-between">
          <div className="">
            <h2>{title}</h2>
            <p className="text-xs">{localDate}</p>
          </div>

          {user.id === createdBy._id &&
            router.pathname.startsWith("/profile") && (
              <div className="absolute right-2 bottom-2 flex items-center">
                {showOptions ? (
                  <div className="bg-white shadow-md rounded-md py-1 px-2 absolute right-0 bottom-8 z-20">
                    <button
                      className="flex items-center gap-2 text-red-500 hover:text-red-600 "
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(e, _id);
                      }}
                    >
                      Delete product
                    </button>
                  </div>
                ) : null}
                <button
                  className="absolute right-0 bottom-0 hover:scale-110 "
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowOptions(!showOptions);
                  }}
                >
                  <Ellipsis className="h-5" />
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
