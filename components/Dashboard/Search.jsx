import React, { Fragment } from "react";
import ProductItem from "../Product/ProductItem";
import { useState, useEffect } from "react";
import FETCHPRODUCTS from "../../graphql/Query/Getallproducts";
import { useQuery } from "@apollo/client";
import Loading from "../../assets/createpost/loading.svg";

const Search = ({ searchInput, tab }) => {
  const [inputVariables, setInputVariables] = useState({
    fetchInput: {
      offerType: [tab],
      pageNo: 1,
      count: 10,
      vehicleType: ["bi", "ca", "sc"],
      search: "",
    },
  });

  useEffect(() => {
    setInputVariables((prev) => {
      return {
        fetchInput: {
          ...prev.fetchInput,
          search: searchInput,
          offerType: [tab],
        },
      };
    });
  }, [searchInput, tab]);

  const { loading, error, data } = useQuery(FETCHPRODUCTS, {
    variables: {
      fetchInput: inputVariables.fetchInput,
    },
  });

  return (
    <Fragment>
      <h2 className="p-2 py-4 text-md font-semibold">
        Search Results for {searchInput}...
      </h2>
      {loading ? (
        <div className="flex justify-center w-full">
          <Loading className="h-12" />
        </div>
      ) : null}
      <div className="grid lg:grid-cols-5 gap-4 md:grid-cols-3 pt-2">
        {data?.fetchProducts?.products.length > 0
          ? data?.fetchProducts?.products?.map((item) => (
              <ProductItem key={item._id} data={item} />
            ))
          : !loading && (
              <div className="flex items-center justify-center lg:col-span-5 md:col-span-3">
                <p>No Products Found</p>
              </div>
            )}
      </div>
    </Fragment>
  );
};

export default Search;
