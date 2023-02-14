import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import App from "../../components/Layout/App";
import TopBar from "../../components/Topbar/TopBar";
import ProductItem from "../../components/Product/ProductItem";
import GET_PRODUCT_DETAILS from "../../graphql/Query/GetProductDetails";
import SEND_MESSAGE from "../../graphql/Mutation/SendMessage";
import BikeBrand from "../../assets/fakeData/BikeBrand";
import CarBrand from "../../assets/fakeData/CarBrand";
import FuelType from "../../assets/fakeData/FuelType";
import Colors from "../../assets/fakeData/colors";
import Transmission from "../../assets/fakeData/Transmission";
import Condition from "../../assets/fakeData/Condition";
import MapContainer from "../../components/UI/Map";
import Geocode from "react-geocode";
import { client } from "../../graphql/client";
import { useUserStore } from "../../store/auth";
import { useJsApiLoader } from "@react-google-maps/api";
import CreateChat from "../../components/UI/CreateChat";
import Spinner from "../../components/UI/Spinner";
import Link from "next/link";
import { useNotificationStore } from "../../store/notifications";
import { uuid } from "uuidv4";

const ProductInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  const setNotification = useNotificationStore(
    (state) => state.setNotification
  );

  const user = useUserStore((state) => state.user);

  const [product, setProduct] = useState(null);

  const [images, setImages] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const [address, setAddress] = useState("");

  const [messageModal, setMessageModal] = useState(false);

  const [message, setMessage] = useState("");

  const [peerId, setPeerId] = useState(null);

  const [productId, setProductId] = useState(null);

  const [msgData, setMgsData] = useState();

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
      setCenter({
        lat: data.getProductDetails.product.location.coordinates[0],
        lng: data.getProductDetails.product.location.coordinates[1],
      });
      getAddress();
      setPeerId(data.getProductDetails.product.createdBy._id);
      setProductId(data.getProductDetails.product._id);
    }
  }, [data]);

  useEffect(() => {
    getAddress();
  }, [center]);

  const sendMessage = async (productId, peerId, message) => {
    try {
      setNotification(uuid(), "Sending", "Success", 3000);
      setMessageModal(false);
      console.log({ productId, peerId, message });
      const msgResponse = await client.mutate({
        mutation: SEND_MESSAGE,
        variables: {
          messageInput: {
            productId: productId,
            message: message,
            receiver: peerId,
          },
        },
      });
      setMgsData(msgResponse);
      setNotification(uuid(), "Message sent successfully", "Success", 3000);
    } catch (error) {}
  };

 

  Geocode.setApiKey(process.env.GOOGLE_MAP_API_KEY);
  const getAddress = async () => {
    try {
      const response = await Geocode.fromLatLng(center.lat, center.lng);
      setAddress(response.results[0].formatted_address);
    } catch (error) {}
  };

  const { isLoaded } = useJsApiLoader({
    id: process.env.GOOGLE_MAP_API_KEY,
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
  });
  return (
    <Fragment>
      {messageModal && (
        <CreateChat
          setMessageModal={setMessageModal}
          sendMessage={sendMessage}
          product={product}
          message={message}
          setMessage={setMessage}
          productId={productId}
          peerId={peerId}
        />
      )}
      <App>
        <TopBar />
        <div className="container">
          <div className="flex w-full flex-col md:flex-row  md:gap-8 justify-center">
            {!error && product && !loading ? (
              <Fragment>
                <div className="w-full md:w-2/5">
                  <div className="h-96 w-full lg:col-span-2 order-0 relative shadow rounded-lg border-2 border-gray-200 ">
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
                  <div className="py-4 w-full">
                    <h1 className="text-lg font-bold">{product.title}</h1>
                    {product.offerType === "re" ? (
                      <p className="py-2 font-semibold">
                        RS. {product.price}{" "}
                        <span className="font-normal">per day</span>
                      </p>
                    ) : (
                      <p className="py-2 font-semibold">RS. {product.price}</p>
                    )}
                  </div>
                  <div className="py-4 md:hidden block">
                    <h2 className="font-semibold text-xl">Description</h2>
                    <p>{product.description}</p>
                  </div>
                  <div className="flex flex-col gap-2 py-2">
                    <p className="text-lg font-semibold">Location</p>
                    <div className="flex flex-col py-4">
                      <MapContainer
                        isLoaded={isLoaded}
                        center={center}
                        drag={false}
                        className="rounded"
                      />
                      <p className="text-gray-700 text-sm py-4">{address}</p>
                    </div>
                  </div>
                  {console.log(product)}

                  {user.id !== product.createdBy._id ? (
                    <div className="flex flex-col gap-4 py-4 w-full">
                      <Link href={`/profile/${product.createdBy._id}`}>
                        <div className="flex gap-4">
                          <div className="bg-gray-400 rounded-full h-14 w-14"></div>
                          <div>
                            <p className="font-semibold">
                              {product.createdBy.fullName}
                            </p>
                            <p>5 Ads</p>
                          </div>
                        </div>
                      </Link>
                      <div className="flex w-full gap-6">
                        <button
                          onClick={() => setMessageModal(true)}
                          className="bg-primary text-white px-8 p-2 rounded-lg w-full"
                        >
                          Chat
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="w-full md:w-3/5">
                  <div className="py-4 hidden md:block">
                    <h2 className="font-semibold text-lg">Description</h2>
                    <p className="text-md py-2">{product.description}</p>
                  </div>
                  {product.offerType === "re" ? (
                    <div className="bg-customGray-light rounded-xl p-4">
                      <h2 className="text-lg font-semibold pb-2">
                        Specification
                      </h2>
                      <div className="flex flex-col gap-1">
                        <SpecificationItem
                          title="Brand"
                          value={
                            BikeBrand[product.brand] || CarBrand[product.brand]
                          }
                        />
                        <SpecificationItem
                          title="Color"
                          value={Colors[product.color]}
                        />
                        <SpecificationItem
                          title="Fuel Type"
                          value={FuelType[product.fuleType]}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-customGray-light rounded-xl p-4 ">
                      <h2 className="text-lg font-semibold pb-2">
                        Specification
                      </h2>
                      <div className="flex flex-col gap-1">
                        <SpecificationItem
                          title="Brand"
                          value={
                            BikeBrand[product.brand] || CarBrand[product.brand]
                          }
                        />
                        <SpecificationItem
                          title="Made Year"
                          value={product.madeYear}
                        />
                        <SpecificationItem
                          title="Fuel Type"
                          value={FuelType[product.fuleType]}
                        />
                        <SpecificationItem
                          title="Milage"
                          value={product.milege}
                        />
                        <SpecificationItem
                          title="Color"
                          value={Colors[product.color]}
                        />
                        <SpecificationItem
                          title="Engine Capacity"
                          value={product.engine + " CC"}
                        />
                        <SpecificationItem
                          title="Transmission"
                          value={Transmission[product.transmission]}
                        />
                        <SpecificationItem
                          title="Condition"
                          value={Condition[product.vehicleCondition]}
                        />
                        <SpecificationItem
                          title="KMs Run"
                          value={product.kmRun}
                        />

                        <SpecificationItem
                          title="Used For"
                          value={product.usedFor + " Years"}
                        />
                        <SpecificationItem
                          title="Color"
                          value={Colors[product.color]}
                        />
                        <SpecificationItem
                          title="Lot Number"
                          value={product.lotNo}
                        />
                      </div>
                    </div>
                  )}

                  <div className="lg:col-span-3">
                    <h2 className="text-xl font-semibold py-6">
                      Discover More Products For Rent
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {data &&
                        data.fetchProducts.products.map((item, i) => (
                          <ProductItem
                            data={item}
                            offer="rent"
                            key={item._id}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <Spinner />
            )}

            {/* {!error && product && product.offerType === "se" ? (
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
                    <h2 className="text-lg font-semibold py-2">
                      Specification
                    </h2>
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
                        center={center}
                        drag={false}
                      />
                      <p>{address}</p>
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
            )} */}
          </div>
        </div>
      </App>
    </Fragment>
  );
};

export default ProductInfo;

const SpecificationItem = ({ title, value }) => {
  return (
    <div className="flex">
      <p className="w-1/2 lg:w-1/3 text-gray-600 font-light">{title}</p>
      <p className="">{value}</p>
    </div>
  );
};
