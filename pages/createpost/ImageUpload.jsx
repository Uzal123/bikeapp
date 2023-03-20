import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Upload from "../../assets/createpost/upload.svg";
import Loading from "../../assets/createpost/loading.svg";
import Cross from "../../assets/createpost/cross.svg";
import IMAGE_UPLOAD from "../../graphql/Mutation/ImageUpload";
import { useNotification } from "../../hooks/useNotification";
import { uuid } from "uuidv4";

const ImageUpload = ({ setImageLinks, imageLinks, errors, setErrors }) => {
  const setNotification = useNotification(
    (state) => state.setNotification
  );

  let inputref;

  const [uploadImage, { data, loading, error }] = useMutation(IMAGE_UPLOAD);
  const onChange = async (e) => {
    try {
      setNotification(uuid(), "Uploading..", "Loading", 3000);
      const image = e.target.files[0];
      if (image) {
        uploadImage({
          variables: { data: { image: image } },
        });
      }
      setErrors({});
    } catch (error) {
      setNotification(uuid(), "Error uploading image", "Error", 3000);
      console.log(error);
    }
  };

  const removeImg = (key) => {
    const updatedImages = imageLinks.filter((item) => item.key != key);
    setImageLinks(updatedImages);
    setNotification(uuid(), "Image removed", "Error", 3000);
  };

  useEffect(() => {
    if (data && !loading) {
      let key = data.uploadImage.data.key;
      let url = data.uploadImage.data.url;
      setImageLinks((prevs) => [...prevs, { key: key, url: url }]);
      setNotification(uuid(), "Image uploaded", "Success", 3000);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
      <div className={"flex justify-center cursor-pointer"}>
        <input
          type="file"
          hidden={true}
          accept="image/png, image/jpeg, image/jpg"
          ref={(refParam) => (inputref = refParam)}
          onChange={(e) => onChange(e)}
        />
        <div
          className={
            !errors?.imageLinks
              ? "bg-gray-50 text-center flex flex-col justify-center aspect-square h-full w-full rounded-lg items-center border-2 border-transparent"
              : "bg-gray-50 text-center flex flex-col justify-center aspect-square h-full w-full rounded-lg items-center border-2 border-red-500"
          }
          onClick={(e) => inputref.click()}
        >
          <Upload />
          <h2>{loading ? "Uploading..." : "Upload"}</h2>
        </div>
      </div>
      {imageLinks?.map((d) => (
        <div className="h-full w-full relative" key={d.key}>
          <img
            src={d.url}
            key={d.key}
            className="rounded-lg object-cover aspect-square "
            alt="Product Image"
          />
          <div
            className="absolute -top-1 -right-1 p-1 hover:scale-110 bg-white rounded-full"
            onClick={(e) => {
              removeImg(d.key);
            }}
          >
            <Cross className="h-4" fill="red" />
          </div>
        </div>
      ))}
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loading className="h-12 w-12" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ImageUpload;
