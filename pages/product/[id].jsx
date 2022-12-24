import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import App from "../../components/Layout/App";
import GET_SELLING from "../../graphql/Query/GetAllSellingProducts";
import Product from "../../components/Product/ProductItem";
import TopBar from "../../components/Topbar/TopBar";
import ProductItem from "../../components/Product/ProductItem";

const ProductInfo = () => {
  const router = useRouter();
  const { id } = router.query;


  const { loading, error, data } = useQuery(GET_SELLING);
  if (loading) return null;
  if (error) return `Error! ${error}`;


  return (
    <App>
      <TopBar />
      <div className="container">
        <div className="grid w-full lg:grid-cols-5 gap-4">
          <div className="h-96 w-full bg-gray-300 rounded-lg lg:col-span-2 order-0"></div>
          <div className="lg:col-span-3 ">
            <div className="py-2">
              <h1 className="text-3xl font-bold">Ktm Duke 300 ABS</h1>
              <p>RS. 20000</p>
            </div>
            <div className="py-2">
              <h2 className="font-semibold text-xl">Description</h2>
              <p>Swift desire new condition new tyres only 53000km used</p>
            </div>
            <div className="flex flex-col gap-4 py-2">
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
          <div className="lg:col-span-2">
            <div className="bg-customGray-light rounded-xl p-4 ">
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
            <div className="flex flex-col gap-2 py-2">
              <p className="text-lg font-semibold">Location</p>
              <div className="flex flex-col gap-1">
                <div className="h-48 w-full bg-gray-300 rounded-xl"></div>
                <p>Koteswor-5,Ktm</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
          <h2 className="text-lg font-semibold">Discover More Products</h2>
            <div className="grid lg:grid-cols-3 gap-4">
              {data &&
                data.getAllSellingProducts.map((item, i) => (
                  <ProductItem data={item} key={item._id} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </App>
  );
};

export default ProductInfo;
