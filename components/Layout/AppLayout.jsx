import Head from "next/head";
import React, { Fragment } from "react";
import Navbar from "../Navigation/Navbar";

const AppLayout = ({ title, description, keywords, url, image, ...props }) => {
  const defaultTitle = "Buy and Rent Bikes and Cars";
  const defaultDescription =
    "Find the perfect bike or car for your needs at MotoGhar, the premier online marketplace for buying, selling and renting vehicles.";
    const defaultKeywords = "Nepal, MotoGhar, Moto Ghar, sell bike, sell car, buy bike, buy car, rent bike, rent car, bike rental, car rental, bike sharing, car sharing, peer-to-peer bike rental, peer-to-peer car rental, online bike rental, online car rental, car rental marketplace, bike rental marketplace, vehicle rental, vehicle selling, car hire, bike hire, car leasing, bike leasing, car subscription, rent a bike, rent a car, bikepooling, carpooling, online bike dealership, online car dealership, car booking, bike booking, vehicle rental management, fleet management, car rental aggregator, bike rental aggregator, car rental booking platform, bike rental booking platform, vehicle listing, car valuation, bike valuation, car comparison"
  const defaultUrl = "https://www.motoghar.com";
  const defaultImage = "https://www.motoghar.com/RentCar.png";
  return (
    <Fragment>
      <div className="main">
        <Head>
          <title>{`MotoGhar -  ${title ? title : defaultTitle}`}</title>
          <meta
            name="description"
            content={`${defaultDescription}`}
          />
          <meta
            name="keywords"
            content={`${keywords ? keywords : defaultKeywords}`}
          />
          <link
            rel="icon"
            href="/RentCar.png"
            type="image/png"
          />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="canonical" href={`${url ? url : defaultUrl}`} />
          <meta
            property="og:title"
            content={`MotoGhar -  ${title ? title : defaultTitle}`}
          />
          <meta
            property="og:description"
            content={`${description ? description : defaultDescription}`}
          />
          <meta property="og:url" content={`${url ? url : defaultUrl}`} />
          <meta
            property="og:image"
            content={`${image ? image : defaultImage}`}
          />
          <meta property="og:type" content="website" />
          <meta
            name="twitter:title"
            content={`MotoGhar -  ${title ? title : defaultTitle}`}
          />
          <meta
            name="twitter:description"
            content={`${description ? description : defaultDescription}`}
          />

          <meta name="twitter:url" content={`${url ? url : defaultUrl}`} />
          <meta
            name="twitter:image"
            content={`${image ? image : defaultImage}`}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:street-address" content="Kathmandu" />
          <meta property="og:locality" content="Kathmandu" />
          <meta property="og:region" content="Bagmati" />
          <meta property="og:postal-code" content="44600" />
          <meta property="og:country-name" content="Nepal" />
          <meta property="og:latitude" content="27.700001" />
          <meta property="og:longitude" content="85.333336" />
        </Head>
        <Navbar />
        {props.children}
      </div>
    </Fragment>
  );
};

export default AppLayout;
