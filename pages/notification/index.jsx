import React from "react";
import AppLayout from "../../components/Layout/AppLayout";
const Index = () => {
  return (
    <AppLayout title="Notifications">
      <h2 className="p-4 text-white bg-primary mb-4  text-lg font-semibold">
        Notifications
      </h2>
      <div className="flex w-full justify-center items-center p-6">
        <p className=" text-lg">No new Notifications ☹️</p>
      </div>
    </AppLayout>
  );
};

export default Index;
