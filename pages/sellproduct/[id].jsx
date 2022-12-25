import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import App from "../../components/Layout/App";
import TopBar from "../../components/Topbar/TopBar";
import ProductItem from "../../components/Product/ProductItem";
import GET_SELLING from "../../graphql/Query/GetAllSellingProducts";
import GET_SELL_DETAILS from "../../graphql/Query/GetSellProductInfo";

const ProductInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);

  const [discoverDataItem, setDiscoverDataItem] = useState(null);

  const { loading, error, data } = useQuery(GET_SELL_DETAILS, {
    variables: { productId: id },
  });

  const { discoverData } = useQuery(GET_SELLING);

  useEffect(() => {
    if (!loading && data?.getSellProductDetails.success) {
      setProduct(data.getSellProductDetails.sellProduct);
    }

    if (!loading && discoverData?.getAllSellingProducts) {
      setDiscoverDataItem(discoverData);
    }
  }, [data, discoverData]);

  return (
    <App>
      <TopBar />
      <div className="container">
        {console.log({ id, error, data, product })}
        <div className="grid w-full lg:grid-cols-5 gap-4">
          {!error && product ? (
            <Fragment>
              <div className="h-96 w-full bg-gray-300 rounded-lg lg:col-span-2 order-0"></div>

              <div className="lg:col-span-3 ">
                <div className="py-2">
                  <h1 className="text-3xl font-bold">{product.title}</h1>
                  <p>RS. {product.price}</p>
                </div>
                <div className="py-2">
                  <h2 className="font-semibold text-xl">Description</h2>
                  <p>{product.description}</p>
                </div>
                <div className="flex flex-col gap-4 py-2">
                  <div className="flex gap-4">
                    <div className="bg-gray-400 rounded-full h-14 w-14"></div>
                    <div>
                      <p className="font-semibold">
                        {product.createdBy.fullName}
                      </p>
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
                      <p className="w-36">Brand</p>
                      <p>{product.brand}</p>
                    </div>
                    <div className="flex">
                      <p className="w-36">Made Year</p>
                      <p>{product.madeYear}</p>
                    </div>
                    <div className="flex">
                      <p className="w-36">Fuel Type</p>
                      <p>{product.fuleType}</p>
                    </div>

                    <div className="flex">
                      <p className="w-36">Milage</p>
                      <p>{product.milege}</p>
                    </div>
                    <div className="flex">
                      <p className="w-36">Engine(CC)</p>
                      <p>{product.engine + " CC"}</p>
                    </div>
                    <div className="flex">
                      <p className="w-36">Transmission</p>
                      <p>{product.transmission}</p>
                    </div>
                    <div className="flex">
                      <p className="w-36">KMs Run</p>
                      <p>{product.kmRun}</p>
                    </div>
                    <div className="flex">
                      <p className="w-36">Used For</p>
                      <p>{product.usedFor + " Months"}</p>
                    </div>
                    <div className="flex">
                      <p className="w-36">Lot Number</p>
                      <p>{product.lotNo}</p>
                    </div>
                    <div className="flex">
                      <p className="w-36">Color</p>
                      <p>{product.color}</p>
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
                <h2 className="text-lg font-semibold">
                  Discover More Products
                </h2>
                <div className="grid lg:grid-cols-3 gap-4">
                  {discoverDataItem?.getAllSellingProducts
                    ? discoverDataItem.getAllSellingProducts.map((item, i) => (
                        <ProductItem data={item} key={item._id} />
                      ))
                    : ""}
                </div>
              </div>
            </Fragment>
          ) : (
            <p>loading...</p>
          )}
        </div>
      </div>
    </App>
  );
};

export default ProductInfo;
