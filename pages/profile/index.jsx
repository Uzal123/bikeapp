import React, { useEffect, useState } from "react";
import App from "../../components/Layout/App";
import Setting from "../../assets/Profile/setting.svg";
import Cross from "../../assets/createpost/cross.svg";
import Edit from "../../assets/Profile/edit.svg";
import ButtonTab from "../../components/UI/Tab";
import ProductItem from "../../components/Product/ProductItem";
import { useUserStore } from "../../store/auth";
import Router, { withRouter, useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import UPLOAD_PROFILE_PIC from "../../graphql/Mutation/UploadProfilePic";

import MY_PROFILE_AND_PRODUCT from "../../graphql/Query/MyProfileAndProduct";
import { client } from "../../graphql/client";

const Profile = ({ ...props }) => {
  let inputref;
  const user = useUserStore((state) => state.user);
  const removeUser = useUserStore((state) => state.removeUser);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!user.email) {
        router.push("/login", { pathname: "/profile" });
      }
    }
  }, [user]);

  const [settingTab, setSettingTab] = useState(null);

  const [tab, setTab] = useState("re");

  const [fetchInput, setFetchInput] = useState({
    offerType: ["re"],
    pageNo: 1,
    count: 10,
  });

  useEffect(() => {
    setFetchInput((prev) => {
      return {
        ...prev,
        offerType: [tab],
      };
    });
  }, [tab]);

  const { loading, error, data } = useQuery(MY_PROFILE_AND_PRODUCT, {
    variables: {
      fetchInput,
    },
  });

  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    if (data) {
      setProfileData(data.myProfile.profile);
    }
  }, [data]);

  const editProfile = () => {
    setSettingTab(!settingTab);
  };

  const onChange = async (e) => {
    try {
      const image = e.target.files[0];
      const response = await client.mutate({
        mutation: UPLOAD_PROFILE_PIC,
        variables: { image: image },
      });

      setProfileData(response.data.uploadProfilePic.profile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <App>
      <div className="w-full h-full flex-col lg:flex-row flex gap-4 p-2 lg:p-4">
        {!loading && profileData ? (
          <div className="lg:h-full flex flex-col gap-4 w-full lg:w-1/5 p-10 bg-customGray-navbar rounded-xl  relative">
            <Setting
              className="h-10 absolute right-2 top-2 cursor-pointer"
              onClick={(e) => editProfile(e)}
            />
            {settingTab && (
              <div className="absolute right-2 top-2 p-2 flex flex-col gap-2 bg-white rounded-lg z-20">
                <div className="flex justify-end cursor-pointer">
                  <Cross className="h-6" onClick={(e) => editProfile(e)} />
                </div>
                <div className="flex justify-center cursor-pointer">
                  <input
                    type="file"
                    hidden={true}
                    ref={(refParam) => (inputref = refParam)}
                    onChange={(e) => onChange(e)}
                  />
                  <p
                    className="hover:bg-primary hover:text-white p-2 rounded-md "
                    onClick={(e) => inputref.click()}
                  >
                    Update profile picture
                  </p>
                </div>

                <p
                  className="hover:bg-red-500 hover:text-white p-2 rounded-md cursor-pointer"
                  onClick={(e) => {
                    removeUser();
                  }}
                >
                  Log Out
                </p>
              </div>
            )}
            <div className="flex flex-col items-center">
              <div className=" rounded-full h-36 w-36 object-cover">
                <div className="w-full h-full bg-primary rounded-full text-center flex items-center justify-center text-white text-4xl font-semibold relative overflow-hidden">
                  {profileData.profilePic.length === 0 ? (
                    <p>{profileData.user.fullName[0]}</p>
                  ) : (
                    <img
                      src={
                        profileData.profilePic[
                          profileData.profilePic.length - 1
                        ].url
                      }
                      className="h-full w-full object-cover rounded-full"
                    />
                  )}

                  <input
                    type="file"
                    hidden={true}
                    ref={(refParam) => (inputref = refParam)}
                    onChange={(e) => onChange(e)}
                  />
                  <div
                    className="absolute bottom-0 w-full flex justify-center bg-white p-1"
                    onClick={() => inputref.click()}
                  >
                    <Edit className="h-6" />
                  </div>
                </div>
              </div>
              <h1 className="text-center font-semibold text-2xl">
                {data.myProfile.profile.user.fullName}
              </h1>
            </div>
            <div className="text-center">
              <p>This is my bio 8347853465 hello i am ths</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">Total Ads : 5</p>
            </div>
          </div>
        ) : (
          <p>loading</p>
        )}
        <div className="lg:w-4/5 w-full bg-customGray-navbar rounded-xl p-6 ">
          <div>
            <h2 className="text-xl font-semibold">Ads Posted</h2>
          </div>
          <div className="flex gap-10 text-xl py-2">
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
          <div className="grid grid-cols-4 gap-6">
            {data &&
              data.myProducts.products.map((item, i) => (
                <ProductItem key={data._id} data={item} />
              ))}
          </div>
        </div>
      </div>
    </App>
  );
};

export default withRouter(Profile);
