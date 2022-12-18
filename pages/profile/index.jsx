import React, { useEffect } from "react";
import App from "../../components/Layout/App";
import Setting from "../../assets/Profile/setting.svg";
import Product from "../../components/Product/Product";
import SampleProduct from "../../assets/fakeData/SampleProducts";
import { useUserStore } from "../../store/auth";
import Router, { withRouter, useRouter } from "next/router";

const Profile = ({ ...props }) => {
  const user = useUserStore((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!user.email) {
        router.push("/login", { pathname: "/profile" });
      }
    }
  }, [user]);

  return (
    <App>
      <div className="w-full h-full flex gap-4">
        <div className="ml-6 h-full flex flex-col gap-4 w-1/5 p-10 bg-customGray-navbar rounded-xl  relative">
          <Setting className="h-10 absolute right-2 top-2" />
          <div className="flex flex-col items-center">
            <div className="bg-gray-500 rounded-full w-48 h-48"></div>
            <h1 className="text-center font-bold text-2xl"> User Name</h1>
          </div>
          <div className="text-center">
            <p>This is my bio 8347853465 hello i am ths</p>
          </div>
          <div>
            <p className="font-semibold">Total Ads : 5</p>
          </div>
        </div>
        <div className="w-4/5 bg-customGray-navbar rounded-xl p-6 ">
          <div>
            <h2 className="text-xl font-semibold">Ads Posted</h2>
          </div>
          <div className="flex gap-10 text-xl py-2">
            <p className="text-primary underline font-bold">For Rent</p>
            <p>For Sell</p>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {SampleProduct.map((d, i) => (
              <Product key={d.id} title={d.title} price={d.price} />
            ))}
          </div>
        </div>
      </div>
    </App>
  );
};

export default withRouter(Profile);
