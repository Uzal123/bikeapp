import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import App from "../../components/Layout/App";
import TopBar from "../../components/Topbar/TopBar";
import ProductItem from "../../components/Product/ProductItem";
import GET_RENT_DETAILS from "../../graphql/Query/GetRentProductInfo";

const ProductInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);

  const [images, setImages] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { loading, error, data } = useQuery(GET_RENT_DETAILS, {
    variables: { productId: id },
  });

  const nextImage = (e) => {
    setCurrentImageIndex(
      currentImageIndex <
        data.getRentProductDetails.rentProduct.images.length - 1
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
    if (!loading && data?.getRentProductDetails.success) {
      setProduct(data.getRentProductDetails.rentProduct);
      setImages(data.getRentProductDetails.rentProduct.images);
    }
  }, [data]);

  return (
    <App>
      <TopBar />
      <div className="container">
        <div className="grid w-full lg:grid-cols-5 gap-4">
          {!error && product ? (
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
                      <p className="w-36">Color</p>
                      <p>{product.color}</p>
                    </div>
                    <div className="flex">
                      <p className="w-36">Fuel Type</p>
                      <p>{product.fuleType}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <p className="text-lg font-semibold">Location</p>
                  <div className="flex flex-col gap-1">
                    <div className="h-48 w-full rounded-xl">
                      <script
                        type="text/javascript"
                        src="https://maps.googleapis.com/maps/api/js?key=[YOUR_API_KEY]&libraries=places"
                      ></script>
                    </div>
                    <p>Koteswor-5,Ktm</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <h2 className="text-lg font-semibold">
                  Discover More Products For Rent
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {data.getAllRentedProducts.map((item, i) => (
                    <ProductItem data={item} key={item._id} />
                  ))}
                </div>
              </div>
            </Fragment>
          ) : (
            "loading"
          )}
        </div>
      </div>
    </App>
  );
};

export default ProductInfo;
