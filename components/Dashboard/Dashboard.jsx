import { React, useState } from "react";
import Product from "../Product/Product";
import Category from "./Category/Category";

const Dashboard = ({ rent, sell, ...props }) => {
  const [homeItems, sethomeItems] = useState(0);
  return (
    <div className="ml-24 mr-4 p-4 bg-customGray-light h-full rounded-lg">
      <div className="flex gap-6 font-semibold text-lg">
        <button
          className={
            !homeItems ? "text-primary underline" : "hover:text-primary"
          }
          onClick={(e) => sethomeItems(0)}
        >
          For Rent
        </button>
        <button
          className={
            homeItems ? "text-primary underline" : "hover:text-primary"
          }
          onClick={(e) => sethomeItems(1)}
        >
          For Sell
        </button>
      </div>
      <Category />

      {console.log(rent)}

      <h2 className="font-bold text-xl">Discover</h2>
      {!homeItems ? (
        <div className="grid grid-cols-5 gap-4">
          {rent && rent.getAllRentedProducts.map((d, i) => (
            <Product price={d.price} title={d.title} key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {sell &&
            sell.getAllSellingProducts.map((s, i) => (
              <Product price={s.price} title={s.title} key={i} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
