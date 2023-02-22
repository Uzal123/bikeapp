import { React, useState, useEffect, Fragment } from "react";
import { useQuery } from "@apollo/client";
import ProductItem from "../Product/ProductItem";
import SearchIcon from "../../assets/TopBar/search.svg";
import Search from "./Search";
import Category from "./Category/Category";
import ButtonTab from "../UI/Tab";
import FETCHPRODUCTS from "../../graphql/Query/Getallproducts";
import Spinner from "../UI/Spinner";
import { client } from "../../graphql/client";
import InfiniteScroll from "react-infinite-scroll-component";

const Dashboard = () => {
  const [tab, setTab] = useState("re");

  const [hasMore, setHasMore] = useState(true);

  const [pageNo, setPageNo] = useState(1);

  const [products, setProducts] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [inputVariables, setInputVariables] = useState({
    fetchInput: {
      offerType: ["re"],
      pageNo: pageNo,
      count: 10,
      vehicleType: ["bi", "ca", "sc"],
    },
  });

  useEffect(() => {
    setProducts([]);
    setInputVariables((prev) => {
      return {
        fetchInput: {
          ...prev.fetchInput,
          offerType: [tab],
          pageNo: 1,
        },
      };
    });
  }, [tab]);

  const getProducts = async () => {
    try {
      const productResponse = await client.query({
        query: FETCHPRODUCTS,
        variables: { fetchInput: inputVariables.fetchInput },
      });
      if (productResponse?.data?.fetchProducts?.products?.length > 0) {
        const newProducts = productResponse.data.fetchProducts.products;
        setProducts((prev) => {
          if (pageNo === 1) return newProducts;
          else return [...prev, ...newProducts];
        });
      }
      setHasMore(productResponse.data.fetchProducts.hasNextPage);
    } catch (error) {}
  };

  const loadMore = (e) => {
    setInputVariables((prev) => {
      return { fetchInput: { ...prev.fetchInput, pageNo: pageNo + 1 } };
    });
  };

  useEffect(() => {
    getProducts();
  }, [inputVariables]);

  return (
    <div className="container bg-customGray-light rounded-lg" id="scrollDiv">
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
      <div className="flex border-2 rounded-lg  h-10 items-center w-full ">
        <input
          type="text"
          className="w-full outline-none placeholder:text-customGray-dark px-2 font-semibold bg-customGray-light"
          placeholder="Search for Cars,bikes,scooty"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="flex items-center justify-center bg-primary rounded-md w-16">
          <div className="p-2 cursor-pointer">
            <SearchIcon className="h-6" />
          </div>
        </div>
      </div>
      {!searchInput && <Category />}

      {!searchInput && <h2 className="font-bold text-xl pt-2">Discover</h2>}
      {searchInput && <Search searchInput={searchInput} tab={tab} />}
      {!products ? (
        <div className="col-start-1 col-end-5">
          <Spinner />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={products.length}
          next={loadMore}
          hasMore={false}
          scrollableTarget="scrollDiv"
          className="grid lg:grid-cols-5 gap-4 md:grid-cols-3"
          loader={<Spinner />}
        >
          {products &&
            products.length > 0 &&
            !searchInput &&
            products.map((item, i) => (
              <ProductItem key={item._id} data={item} />
            ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Dashboard;
