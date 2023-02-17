import { React, useState, useEffect, Fragment } from "react";
import { useQuery } from "@apollo/client";
import ProductItem from "../Product/ProductItem";
import Search from "../../assets/TopBar/search.svg";
import Category from "./Category/Category";
import ButtonTab from "../UI/Tab";
import FETCHPRODUCTS from "../../graphql/Query/Getallproducts";
import Spinner from "../UI/Spinner";

const Dashboard = () => {
  const [tab, setTab] = useState("re");

  const [inputVariables, setInputVariables] = useState({
    fetchInput: {
      offerType: ["re"],
      pageNo: 1,
      count: 10,
    },
  });

  useEffect(() => {
    setInputVariables((prev) => {
      return {
        fetchInput: {
          ...prev.fetchInput,
          offerType: [tab],
        },
      };
    });
  }, [tab]);

  const { loading, error, data } = useQuery(FETCHPRODUCTS, {
    variables: {
      fetchInput: inputVariables.fetchInput,
    },
  });

  return (
    <div className="container bg-customGray-light rounded-lg ">
      <div className="flex gap-6 font-semibold text-lg w-full pb-6">
        <ButtonTab
          val="re"
          onClick={() => setTab("re")}
          label="For Rent"
          tab={tab}
        />

        <ButtonTab
          val="se"
          onClick={() => setTab("se")}
          label="For Sell"
          tab={tab}
        />
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
      {!data || data.fetchProducts.products.length === 0 ? (
        <div className="col-start-1 col-end-5">
          <Spinner />
        </div>
      ) : (
        <Fragment>
          {inputVariables.fetchInput.offerType === "re" ? (
            <div className="grid lg:grid-cols-5 gap-4 md:grid-cols-3">
              {data &&
                data.fetchProducts.products.length > 0 &&
                data.fetchProducts.products.map((item, i) => (
                  <ProductItem key={item._id} data={item} offer="rent" />
                ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-4 md:grid-cols-3">
              {data &&
                data.fetchProducts.products.length > 0 &&
                data.fetchProducts.products.map((item, i) => (
                  <ProductItem data={item} key={item._id} offer="sell" />
                ))}
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
