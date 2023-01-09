import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import App from "../../components/Layout/App";
import TopBar from "../../components/Topbar/TopBar";
import ProductItem from "../../components/Product/ProductItem";
import GET_PRODUCT_DETAILS from "../../graphql/Query/GetProductDetails";
import BikeBrand from "../../assets/fakeData/BikeBrand";
import CarBrand from "../../assets/fakeData/CarBrand";
import FuelType from "../../assets/fakeData/FuelType";
import Transmission from "../../assets/fakeData/Transmission";
import MapContainer from "../../components/UI/Map";
import { useJsApiLoader } from "@react-google-maps/api";


const ProductInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);

  const [images, setImages] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: {
      productId: id,
      fetchInput: { offerType: ["re", "se"], pageNo: 1, count: 10 },
    },
  });

  console.log(data);

  const nextImage = (e) => {
    setCurrentImageIndex(
      currentImageIndex < data.getProductDetails.product.images.length - 1
        ? currentImageIndex + 1
        : currentImageIndex
    );
  };

  const previousImage = (e) => {
    setCurrentImageIndex(
      currentImageIndex > 0 ? currentImageIndex - 1 : currentImageIndex
    );
  };

  useEffect(() => {
    if (!loading && data?.getProductDetails.success) {
      setProduct(data.getProductDetails.product);
      setImages(data.getProductDetails.product.images);
    }
  }, [data]);

  const onChat = (product) => {
    console.table(product._id, product.createdBy._id);
    router.push({
      pathname: `/chat/q`,
      query: { uid: product.createdBy._id, pid: product._id },
    });
  };

  const { isLoaded } = useJsApiLoader({
    id: process.env.GOOGLE_MAP_API_KEY,
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
  });
  return (
    <App>
      <TopBar />
      <div className="container">
        <div className="grid w-full lg:grid-cols-5 gap-4">
          {!error && product && product.offerType === "re" ? (
            <Fragment>
              <div className="h-96 w-full lg:col-span-2 order-0 relative">
                {images ? (
                  <img
                    src={product.images[currentImageIndex].url}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  ""
                )}

                <div className="absolute left-0 top-0 h-full flex items-center">
                  <p
                    className={
                      currentImageIndex === 0
                        ? "text-2xl  cursor-pointer bg-gray-500 hidden"
                        : "text-2xl bg-white cursor-pointer "
                    }
                    onClick={(e) => previousImage(e)}
                  >
                    {"<"}
                  </p>
                </div>
                <div className="absolute bottom-0 flex gap-2 w-full justify-center p-2">
                  {product.images.map((d, index) => (
                    <div
                      className={
                        currentImageIndex === index
                          ? " rounded-full h-3 w-3 cursor-pointer bg-gray-200"
                          : "bg-black rounded-full h-3 w-3 cursor-pointer hover:bg-gray-200"
                      }
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                    ></div>
                  ))}
                </div>
                <div className="absolute right-0 top-0 h-full flex items-center">
                  <p
                    className={
                      currentImageIndex === product.images.length - 1
                        ? "text-2xl  cursor-pointer bg-gray-500 hidden"
                        : "text-2xl bg-white cursor-pointer "
                    }
                    onClick={(e) => nextImage(e)}
                  >
                    {">"}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-3 ">
                <div className="py-2">
                  <h1 className="text-3xl font-bold">{product.title}</h1>
                  <p>RS. {product.price} per day</p>
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
                  <div className="flex w-full md:w-3/5 gap-6">
                    <button className="bg-primary text-white px-8 p-2 rounded-lg w-full">
                      Bid Price
                    </button>
                    <button
                      onClick={() => onChat(product)}
                      className="bg-primary text-white px-8 p-2 rounded-lg w-full"
                    >
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
                      <p>
                        {BikeBrand[product.brand] || CarBrand[product.brand]}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="w-36">Color</p>
                      <p>{product.color}</p>
                    </div>
                    <div className="flex">
                      <p className="w-36">Fuel Type</p>
                      <p>{FuelType[product.fuleType]}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <p className="text-lg font-semibold">Location</p>
                  <div className="flex flex-col gap-1">
                    <MapContainer
                      isLoaded={isLoaded}
                      lat={product.location.coordinates[0]}
                      lng={product.location.coordinates[1]}
                      drag={true}
                    />
                    <p>Koteswor-5,Ktm</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <h2 className="text-lg font-semibold">
                  Discover More Products For Rent
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {data &&
                    data.fetchProducts.products.map((item, i) => (
                      <ProductItem data={item} offer="rent" key={item._id} />
                    ))}
                </div>
              </div>
            </Fragment>
          ) : (
            ""
          )}

          {!error && product && product.offerType === "se" ? (
            <Fragment>
              <div className="h-96 w-full lg:col-span-2 order-0 relative">
                {images ? (
                  <img
                    src={product.images[currentImageIndex].url}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  "no image"
                )}

                <div className="absolute left-0 top-0 h-full flex items-center">
                  <p
                    className={
                      currentImageIndex === 0
                        ? "text-2xl  cursor-pointer bg-gray-500 hidden"
                        : "text-2xl bg-white cursor-pointer "
                    }
                    onClick={(e) => previousImage(e)}
                  >
                    {"<"}
                  </p>
                </div>
                <div className="absolute bottom-0 flex gap-2 w-full justify-center p-2">
                  {product.images.map((d, index) => (
                    <div
                      className={
                        currentImageIndex === index
                          ? " rounded-full h-3 w-3 cursor-pointer bg-gray-200"
                          : "bg-black rounded-full h-3 w-3 cursor-pointer hover:bg-gray-200"
                      }
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                    ></div>
                  ))}
                </div>

                <div className="absolute right-0 top-0 h-full flex items-center">
                  <p
                    className={
                      currentImageIndex === product.images.length - 1
                        ? "text-2xl  cursor-pointer bg-gray-500 hidden"
                        : "text-2xl bg-white cursor-pointer "
                    }
                    onClick={(e) => nextImage(e)}
                  >
                    {">"}
                  </p>
                </div>
              </div>

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
                  <div className="flex w-full md:w-3/5 gap-6">
                    <button className="bg-primary text-white px-8 p-2 rounded-lg w-full">
                      Bid Price
                    </button>
                    <button
                      className="bg-primary text-white px-8 p-2 rounded-lg w-full"
                      onClick={() => onChat(product)}
                    >
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
                      <p>
                        {BikeBrand[product.brand] || CarBrand[product.brand]}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="w-36">Made Year</p>
                      <p>{product.madeYear}</p>
                    </div>
                    <div className="flex">
                      <p className="w-36">Fuel Type</p>
                      <p>{FuelType[product.fuleType]}</p>
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
                      <p>{Transmission[product.transmission]}</p>
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
                    <MapContainer
                      isLoaded={isLoaded}
                      lat={product.location.coordinates[0]}
                      lng={product.location.coordinates[1]}
                      drag={true}
                    />
                    <p>Koteswor-5,Ktm</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <h2 className="text-lg font-semibold">
                  Discover More Products for Sell
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {data &&
                    data.fetchProducts.products.map((item, i) => (
                      <ProductItem data={item} offer="sell" key={item._id} />
                    ))}
                </div>
              </div>
            </Fragment>
          ) : (
            ""
          )}
        </div>
      </div>
    </App>
  );
};

export default ProductInfo;
