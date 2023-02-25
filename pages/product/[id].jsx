import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { uuid } from "uuidv4";
import { useSwipeable } from "react-swipeable";
import Geocode from "react-geocode";

import TopBar from "../../components/Topbar/TopBar";
import ProductItem from "../../components/Product/ProductItem";
import GET_PRODUCT_DETAILS from "../../graphql/Query/GetProductDetails";
import SEND_MESSAGE from "../../graphql/Mutation/SendMessage";
import BikeBrand from "../../assets/fakeData/BikeBrand";
import CarBrand from "../../assets/fakeData/CarBrand";
import FuelType from "../../assets/fakeData/FuelType";
import Colors from "../../assets/fakeData/colors";
import PriceType from "../../assets/fakeData/PriceType";
import Transmission from "../../assets/fakeData/Transmission";
import Condition from "../../assets/fakeData/Condition";
import MapContainer from "../../components/UI/Map";
import { client } from "../../graphql/client";
import { useUserStore } from "../../store/auth";
import { useJsApiLoader } from "@react-google-maps/api";
import CreateChat from "../../components/UI/CreateChat";
import Loading from "../../assets/createpost/loading.svg";
import { useNotificationStore } from "../../store/notifications";

import AppLayout from "../../components/Layout/AppLayout";

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

  const [messageModal, setMessageModal] = useState(false);

  const [message, setMessage] = useState("");

  const [peerId, setPeerId] = useState(null);

  const [productId, setProductId] = useState(null);

  const [msgData, setMgsData] = useState();

  const [offerType, setOfferType] = useState([]);

  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: {
      productId: id,
      fetchInput: { offerType: offerType, pageNo: 1, count: 10 },
    },
  });

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
      setPeerId(data.getProductDetails.product.createdBy._id);
      setProductId(data.getProductDetails.product._id);
      setOfferType(data.getProductDetails.product.offerType);
    }
  }, [data]);

  const sendMessage = async (productId, peerId, message) => {
    try {
      setNotification(uuid(), "Sending", "Success", 3000);
      setMessageModal(false);
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

  const handleSwiped = (eventData) => {
    if (eventData.dir === "Left" && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else if (eventData.dir === "Right" && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwiped: (eventData) => handleSwiped(eventData),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  Geocode.setApiKey(process.env.GOOGLE_MAP_API_KEY);

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
      <AppLayout>
        <TopBar />
        <div className="container">
          <div className="flex w-full flex-col md:flex-row  md:gap-8 justify-center">
            {!error && product && !loading ? (
              <Fragment>
                <div className="w-full md:w-2/5">
                  <div
                    {...swipeHandlers}
                    className="h-96 w-full lg:col-span-2 order-0 relative shadow rounded-lg border-2 border-gray-200 "
                  >
                    {images ? (
                      <img
                        src={product.images[currentImageIndex].url}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      ""
                    )}

                    <div className="absolute left-0 top-0 h-full flex items-center p-1">
                      <div
                        className={
                          currentImageIndex === 0
                            ? "text-2xl bg-gray-800 text-white opacity-80 w-8 h-8 justify-center items-center text-center rounded-full cursor-pointer  hidden"
                            : "text-2xl bg-gray-800 text-white opacity-80 w-8 h-8 flex justify-center items-center text-center rounded-full cursor-pointer "
                        }
                        onClick={(e) => previousImage(e)}
                      >
                        {"<"}
                      </div>
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
                    <div className="absolute right-0 top-0 h-full flex items-center p-1">
                      <p
                        className={
                          currentImageIndex === product.images.length - 1
                            ? "text-2xl bg-gray-800 text-white opacity-80 w-8 h-8 justify-center items-center text-center rounded-full cursor-pointer  hidden"
                            : "text-2xl bg-gray-800 text-white opacity-80 w-8 h-8 flex justify-center items-center text-center rounded-full cursor-pointer "
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
                        <span className="text-xs font-light text-gray-500 px-2">
                          {"(" + PriceType[product.priceType] + ")"}
                        </span>
                      </p>
                    ) : (
                      <p className="py-2 font-semibold">
                        RS. {product.price}
                        <span className="text-xs font-light text-gray-500 px-2">
                          {"(" + PriceType[product.priceType] + ")"}
                        </span>
                      </p>
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
                      <p className="text-gray-700 text-sm py-4">
                        {product.location.location}
                      </p>
                    </div>
                  </div>

                  {user.id !== product.createdBy._id ? (
                    <div className="flex flex-col gap-4 py-4 w-full">
                      <p className="text-lg font-semibold">Ad posted by</p>
                      <Link href={`/profile/${product.createdBy._id}`}>
                        <div className="flex gap-4">
                          <div className=" rounded-full h-14 w-14">
                            {/* <img
                              src={product.profile.profilePic[0].url}
                              className="h-14 w-14"
                            /> */}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">
                                {product.createdBy.fullName}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {"On " +
                                  new Date(product.createdAt).toLocaleString(
                                    "en-US",
                                    {
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                      day: "numeric",
                                      month: "short",
                                    }
                                  )}
                              </p>
                            </div>

                            <p>5 Ads</p>
                          </div>
                        </div>
                      </Link>
                      <div className="flex w-full gap-6">
                        <button
                          onClick={() =>
                            user.id
                              ? setMessageModal(true)
                              : router.push("/login")
                          }
                          className={
                            (user.id &&
                              "bg-primary text-white px-8 p-2 rounded-lg w-full") ||
                            "bg-gray-400 text-white px-8 p-2 rounded-lg w-full"
                          }
                        >
                          {user.id ? "Message" : "Login to chat"}
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
                      {data &&
                        ((data.getProductDetails.product.offerType === "re" &&
                          "Discover More Products For Rent") ||
                          (data.getProductDetails.product.offerType === "se" &&
                            "Discover More Products For Sell"))}
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
                <Loading className="h-12" />
            )}
          </div>
        </div>
      </AppLayout>
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
