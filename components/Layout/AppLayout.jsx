import Head from "next/head";
import React, { Fragment } from "react";
import Navbar from "../Navigation/Navbar";

const AppLayout = ({ title, description, keywords, url, image, ...props }) => {
  const defaultTitle = "MotoGhar - Buy and Rent Bikes and Cars";
  const defaultDescription =
    "Find the perfect bike or car for your needs at MotoGhar, the premier online marketplace for buying and renting vehicles.";
  const defaultKeywords = "MotoGhar, bikes, cars, rental, marketplace";
  const defaultUrl = "https://www.motoghar.com";
  const defaultImage = "https://www.motoghar.com/RentCar.png";
  return (
    <Fragment>
      <div className="main">
        <Head>
          <title>{title ? "MotoGhar - " + title : defaultTitle}</title>
          <meta
            name="description"
            content={description ? description : defaultDescription}
          />
          <meta
            name="keywords"
            content={keywords ? keywords : defaultKeywords}
          />
          {/* <link
            rel="icon"
            href="www.motoghar.com/RentCar.png"
            type="image/png"
          />
          <link
            rel="shortcut icon"
            href="www.motoghar.com/favicon.ico"
            type="image/x-icon"
          /> */}
          <link rel="canonical" href={url ? url : defaultUrl} />
          <meta
            property="og:title"
            content={title ? +"MotoGhar - " + title : defaultTitle}
          />
          <meta
            property="og:description"
            content={description ? description : defaultDescription}
          />
          <meta property="og:url" content={url ? url : defaultUrl} />
          <meta property="og:image" content={image ? image : defaultImage} />
          <meta property="og:type" content="website" />
          <meta
            name="twitter:title"
            content={title ? +"MotoGhar - " + title : defaultTitle}
          />
          <meta
            name="twitter:description"
            content={description ? description : defaultDescription}
          />
          <meta name="twitter:url" content={url ? url : defaultUrl} />
          <meta name="twitter:image" content={image ? image : defaultImage} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <Navbar />
        {props.children}
      </div>
    </Fragment>
  );
};

export default AppLayout;
