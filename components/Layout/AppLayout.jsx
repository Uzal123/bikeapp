import Head from "next/head";
import React, { Fragment } from "react";
import Navbar from "../Navigation/Navbar";

const AppLayout = ({ title, ...props }) => {
  const defaultTitle = "MotoGhar - Buy and Rent Bikes and Cars";
  const defaultDescription =
    "Find the perfect bike or car for your needs at MotoGhar, the premier online marketplace for buying and renting vehicles.";
  const defaultKeywords = "MotoGhar, bikes, cars, rental, marketplace";
  const defaultUrl = "https://www.motoghar.com";
  const defaultImage = "https://www.motoghar.com/assets/RentCar.png";
  return (
    <Fragment>
      <div className="main">
        <Head>
          <title>{title ? title + " - " + defaultTitle : defaultTitle}</title>
          <meta
            name="description"
            content={description || defaultDescription}
          />
          <meta name="keywords" content={keywords || defaultKeywords} />
          <link rel="canonical" href={url || defaultUrl} />
          <meta property="og:title" content={title || defaultTitle} />
          <meta
            property="og:description"
            content={description || defaultDescription}
          />
          <meta property="og:url" content={url || defaultUrl} />
          <meta property="og:image" content={image || defaultImage} />
          <meta property="og:type" content="website" />
          <meta name="twitter:title" content={title || defaultTitle} />
          <meta
            name="twitter:description"
            content={description || defaultDescription}
          />
          <meta name="twitter:url" content={url || defaultUrl} />
          <meta name="twitter:image" content={image || defaultImage} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <Navbar />
        {props.children}
      </div>
    </Fragment>
  );
};

export default AppLayout;
