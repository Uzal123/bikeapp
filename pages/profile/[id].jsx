import React, { Fragment, useEffect, useState } from "react";
import AppLayout from "../../components/Layout/AppLayout";
import Setting from "../../assets/Profile/setting.svg";
import Cross from "../../assets/createpost/cross.svg";
import Tick from "../../assets/Profile/tick.svg";
import Edit from "../../assets/Profile/edit.svg";
import ButtonTab from "../../components/UI/Tab";
import ProductItem from "../../components/Product/ProductItem";
import { useUserStore } from "../../store/auth";
import Router, { withRouter, useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import UPLOAD_PROFILE_PIC from "../../graphql/Mutation/UploadProfilePic";
import USER_PRODUCTS from "../../graphql/Query/UserProducts";
import USER_PROFILE from "../../graphql/Query/UserProfile";
import { client } from "../../graphql/client";
import Loading from "../../assets/createpost/loading.svg";
import { useNotificationStore } from "../../store/notifications";
import { uuid } from "uuidv4";
import DELETEPRODUCT from "../../graphql/Mutation/DeleteProduct";
import UPDATEBIO from "../../graphql/Mutation/UpdateBio";
import { useSwipeable } from "react-swipeable";
import ProfilePicContainer from "../../components/UI/ProfilePicContainer";

const Profile = ({ ...props }) => {
  let bioinputref;
  let inputref;
  const user = useUserStore((state) => state.user);
  const removeUser = useUserStore((state) => state.removeUser);
  const router = useRouter();
  const { id } = router.query;

  const setNotification = useNotificationStore(
    (state) => state.setNotification
  );
  const [settingTab, setSettingTab] = useState(null);

  const [productsloading, setProductsLoading] = useState(true);

  const [tab, setTab] = useState("se");

  const [products, setProducts] = useState([]);

  const [userbio, setUserBio] = useState("");

  const [bioEditor, setBioEditor] = useState(false);

  const [fetchInput, setFetchInput] = useState({
    offerType: [tab],
    pageNo: 1,
    count: 10000,
  });

  const { loading, error, data } = useQuery(USER_PROFILE, {
    variables: { userId: id },
  });

  const getUserProducts = async () => {
    try {
      const { data, loading } = await client.query({
        query: USER_PRODUCTS,
        variables: { fetchInput, userId: id },
      });

      if (!loading) {
        setProducts(data?.getUserProducts.products);
        setProductsLoading(false);
      }
    } catch (error) {}
  };

  const handleSwiped = (eventData) => {
    if (eventData.dir === "Left" && tab === "se") {
      setTab("re");
    } else if (eventData.dir === "Right" && tab === "re") {
      setTab("se");
    }
  };

  const swipeHandlers = useSwipeable({
    onSwiped: (eventData) => handleSwiped(eventData),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    if (id) {
      getUserProducts();
    }
  }, [fetchInput, id]);

  useEffect(() => {
    setProductsLoading(true);
    setFetchInput((prev) => {
      return {
        ...prev,
        offerType: [tab],
      };
    });
    setProducts([]);
  }, [tab]);

  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    if (data) {
      setProfileData(data.getUserProfile.profile);
      setUserBio(data.getUserProfile.profile.bio);
    }
  }, [data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!user.phone | error) {
        router.push("/login");
      }
    }
  }, [user, error]);

  const editProfile = () => {
    setSettingTab(!settingTab);
  };

  const handleDelete = async (e, _id) => {
    const response = await client.mutate({
      mutation: DELETEPRODUCT,
      variables: { productId: _id },
    });
    if (response?.data?.deleteProductById.success) {
      const updated = products.filter((product) => product._id !== _id);
      setProducts(updated);
      setNotification(uuid(), "Product deleted successfully", "Error", 3000);
    }
  };

  const onChange = async (e) => {
    try {
      setNotification(uuid(), "Uploading", "Loading", 3000);
      setSettingTab(false);
      const image = e.target.files[0];
      const response = await client.mutate({
        mutation: UPLOAD_PROFILE_PIC,
        variables: { image: image },
      });

      setProfileData(response.data.uploadProfilePic.profile);
      setNotification(uuid(), "Image uploaded successfully", "Success", 3000);
    } catch (error) {
      setNotification(uuid(), "Error while uploading image", "Error", 3000);
    }
  };

  const handleUpdateBio = async () => {
    try {
      setNotification(uuid(), "Updating", "Loading", 3000);
      const response = await client.mutate({
        mutation: UPDATEBIO,
        variables: { bio: userbio },
      });
      setUserBio(response.data.updateBio.profile.bio);
      setBioEditor(false);
      setNotification(uuid(), "Bio updated successfully", "Success", 3000);
    } catch (error) {}
  };

  useEffect(() => {
    if (bioEditor) {
      bioinputref.focus();
    }
  }, [bioEditor]);


  return (
    <AppLayout title={`Profile`}>
      <div className="w-full h-full flex-col lg:flex-row flex gap-4 p-2 lg:p-4">
        <div className="lg:h-full flex flex-col gap-4 w-full lg:w-1/5 p-6 bg-customGray-navbar rounded-xl  relative">
          {!loading && profileData ? (
            <Fragment>
              {id === user.id && (
                <Setting
                  className="h-8 absolute right-2 top-2 cursor-pointer"
                  onClick={(e) => editProfile(e)}
                />
              )}
              {settingTab && (
                <div className="absolute right-2 top-2 p-2 flex flex-col gap-1 bg-white rounded-lg z-20 text-sm">
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
                    className=" hover:bg-primary hover:text-white p-2 rounded-md  cursor-pointer"
                    onClick={(e) => {
                      setBioEditor(true);
                      setSettingTab(false);
                    }}
                  >
                    Update Bio
                  </p>

                  <p
                    className="hover:bg-red-500 hover:text-white p-2 rounded-md cursor-pointer"
                    onClick={(e) => {
                      removeUser();
                      setNotification(uuid(), "Logged Out", "Error", 3000);
                    }}
                  >
                    Log Out
                  </p>
                </div>
              )}
              <div className="flex flex-col items-center">
                <div className=" rounded-full h-36 w-36 object-cover">
                  <ProfilePicContainer
                    url={
                      profileData.profilePic.length === 0
                        ? ""
                        : profileData.profilePic[
                            profileData.profilePic.length - 1
                          ].url
                    }
                    fullName={profileData.user.fullName}
                    className="bg-white text-primary h-full w-full"
                  >
                    {id === user.id && (
                      <Fragment>
                        <input
                          type="file"
                          hidden={true}
                          accept="image/png, image/jpg, image/jpeg"
                          ref={(refParam) => (inputref = refParam)}
                          onChange={(e) => onChange(e)}
                        />
                        <div
                          className="absolute bottom-0 w-full flex justify-center bg-white p-1"
                          onClick={() => inputref.click()}
                        >
                          <Edit className="h-6" />
                        </div>
                      </Fragment>
                    )}
                  </ProfilePicContainer>
                </div>
                <h1 className="text-center font-semibold text-2xl pt-4">
                  {profileData.user.fullName}
                </h1>
              </div>
              {bioEditor === true && (
                <div className="text-center flex items-center justify-center flex-col">
                  <textarea
                    className="text-sm p-2 bg-inherit text-center rounded-lg border-2 border-gray-300 h-max"
                    type="text"
                    value={userbio}
                    onChange={(e) => setUserBio(e.target.value)}
                    ref={(refParam) => (bioinputref = refParam)}
                  />
                  {id === user.id && (
                    <div className="flex gap-2 pt-2">
                      <Tick
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => handleUpdateBio()}
                      />
                      <Cross
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => setBioEditor(false)}
                      />
                    </div>
                  )}
                </div>
              )}
              {bioEditor === false && (
                <div className="flex text-center justify-center items-center text-sm">
                  <p onClick={() => (id === user.id ? setBioEditor(true) : "")}>
                    {userbio}
                  </p>
                </div>
              )}
              <div className="text-center">
                <p className="font-semibold">Total Ads : {products.length}</p>
              </div>
            </Fragment>
          ) : (
            <div className="h-36 flex justify-center items-center">
              <Loading className="h-12" />
            </div>
          )}
        </div>

        <div
          {...swipeHandlers}
          className="lg:w-4/5 w-full bg-customGray-navbar rounded-xl md:p-6 p-2 lg:overflow-y-scroll overflow-none"
        >
          <div>
            <h2 className="text-xl font-semibold">Ads Posted</h2>
          </div>
          <div className="flex gap-10 text-xl py-2">
            <ButtonTab
              val="se"
              onClick={() => setTab("se")}
              label="For Sell"
              tab={tab}
            />
            <ButtonTab
              val="re"
              onClick={() => setTab("re")}
              label="For Rent"
              tab={tab}
            />
          </div>
          {products &&
            !productsloading &&
            (products.length > 0 ? (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products &&
                  products.map((item, i) => (
                    <ProductItem
                      key={item._id}
                      data={item}
                      handleDelete={handleDelete}
                    />
                  ))}
              </div>
            ) : (
              <div className="flex justify-center  p-10">
                <h4 className="font-semibold text-xl">No Ads Posted 😕</h4>
              </div>
            ))}
          {productsloading && (
            <div className="p-6 w-full flex justify-center">
              <Loading className="h-12" />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default withRouter(Profile);
