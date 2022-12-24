import { React, useState } from "react";
import ProductItem from "../Product/ProductItem";
import Product from "../Product/ProductItem";
import Search from "../../assets/TopBar/search.svg";
import Category from "./Category/Category";

const Dashboard = ({ rent, sell, ...props }) => {
  const [homeItems, sethomeItems] = useState(0);
  return (
    <div className="container bg-customGray-light rounded-lg ">
      <div className="flex gap-6 font-semibold text-lg w-full pb-6">
        <button
          className={
            !homeItems ? "text-primary underline" : "hover:text-primary"
          }
          onClick={(e) => sethomeItems(0)}
        >
          For Rent
        </button>
        <button
          className={
            homeItems ? "text-primary underline" : "hover:text-primary"
          }
          onClick={(e) => sethomeItems(1)}
        >
          For Sell
        </button>
      </div>
      <div className="flex border-2 rounded-lg  h-10 items-center p-2 w-full ">
        <input
          type="text"
          className="w-full outline-none placeholder:text-customGray-dark font-semibold bg-customGray-light"
          placeholder="Search for Cars,bikes,scooty"
        />
        <div className="flex items-center justify-center bg-primary rounded-full">
          <div className="p-2">
            <Search className="h-6" />
          </div>
        </div>
      </div>
      <Category />

      <h2 className="font-bold text-xl">Discover</h2>
      {!homeItems ? (
        <div className="grid lg:grid-cols-5 gap-4 md:grid-cols-3">
          {rent &&
            rent.getAllRentedProducts.map((item, i) => (
              <ProductItem key={item._id} data={item} />
            ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-4 md:grid-cols-3">
          {sell &&
            sell.getAllSellingProducts.map((item, i) => (
              <ProductItem data={item} key={item._id} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
