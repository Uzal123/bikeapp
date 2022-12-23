import React from "react";
import App from "../../components/Layout/App";
import Product from "../../components/Product/ProductItem";

const ProductInfo = () => {
  return (
    <App>
      <div className="flex w-full px-6">
        <div className="flex flex-col gap-4 w-2/5 pr-6">
          <div className="h-96 w-full bg-gray-300 rounded-lg"></div>
          <div className="flex flex-col gap-4">
            <h2>Ktm duke 300</h2>
            <p className="font-bold text-xl">Rs. 25000</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>Location</p>
            <div className="flex flex-col gap-1">
              <div className="h-48 w-full bg-gray-300 rounded-xl"></div>
              <p>Koteswor-5,Ktm</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="bg-gray-400 rounded-full h-14 w-14"></div>
              <div>
                <p className="font-semibold">Gobardhan Kumar</p>
                <p>5 Ads</p>
              </div>
            </div>

            <div className="flex w-full gap-6">
              <button className="bg-primary text-white px-8 p-2 rounded-lg w-full">
                Bid Price
              </button>
              <button className="bg-primary text-white px-8 p-2 rounded-lg w-full">
                Chat
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-3/5 gap-4 pl-8">
          <div>
            <h1 className="text-3xl font-bold">Ktm Duke 300 ABS</h1>
            <p>RS. 20000</p>
          </div>
          <div>
            <h2 className="font-semibold text-xl">Description</h2>
            <p>Swift desire new condition new tyres only 53000km used</p>
          </div>
          <div className="w-3/5 flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="bg-gray-400 rounded-full h-14 w-14"></div>
              <div>
                <p className="font-semibold">Gobardhan Kumar</p>
                <p>5 Ads</p>
              </div>
            </div>

            <div className="flex w-full gap-6">
              <button className="bg-primary text-white px-8 p-2 rounded-lg w-full">
                Bid Price
              </button>
              <button className="bg-primary text-white px-8 p-2 rounded-lg w-full">
                Chat
              </button>
            </div>
          </div>
          <div className="bg-customGray-light rounded-xl p-4">
            <h2 className="text-lg font-semibold py-2">Specification</h2>
            <div className="flex flex-col gap-1">
              <div className="flex">
                <p className="w-36">Model</p>
                <p>2019</p>
              </div>
              <div className="flex">
                <p className="w-36">Color</p>
                <p>Red</p>
              </div>
              <div className="flex">
                <p className="w-36">Company</p>
                <p>Bajaj</p>
              </div>
              <div className="flex">
                <p className="w-36">Engine Type</p>
                <p>Petrol</p>
              </div>
              <div className="flex">
                <p className="w-36">Model</p>
                <p>2019</p>
              </div>
              <div className="flex">
                <p className="w-36">Model</p>
                <p>2019</p>
              </div>
              <div className="flex">
                <p className="w-36">Model</p>
                <p>2019</p>
              </div>
              <div className="flex">
                <p className="w-36">Model</p>
                <p>2019</p>
              </div>
              <div className="flex">
                <p className="w-36">Model</p>
                <p>2019</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <Product price="4000" title="New bike" />
            <Product price="67890" title="hero splendor" />
            <Product price="67890" title="hero splendor" />
          </div>
        </div>
      </div>
    </App>
  );
};

export default ProductInfo;
