import React from "react";
import { useState } from "react";
import Input from "../../components/UI/Input";
import { gql, useMutation } from "@apollo/client";
import REGISTER_USER from "../../graphql/Mutation/Registeruser";

export default function Register() {
  const [registerData, setregisterData] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  const handleRegister = (e) => {
    const val = e.target.value;
    const key = e.target.name;
    setregisterData((prevs) => ({ ...prevs, [key]: val }));
    console.log(registerData);
  };

  const [submitRegister, { data, loading, error }] = useMutation(
    REGISTER_USER,
  );

  const onSubmit = (e) => {
    e.preventDefault();
    submitRegister({ variables: { user: registerData } });
  };

  return (
    <div className="w-screen h-screen flex">
    {console.log(registerData)}
    {console.log(data)}
      <div className="left hidden md:block w-3/5 h-screen">
        <h2 className="text-2xl px-8 py-8 text-primary font-bold absolute">
          RentingApp
        </h2>
        <div className="flex items-center justify-center h-screen w-full">
          <div className="flex-col justify-center">
            <div className="flex justify-center py-8">
              {/* <Image src="/assets/signup.png" width={400} height={350} /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="right w-full md:w-2/5 h-screen bg-white flex justify-center px-8 md:px-20 pt-20">
        <div>
          <h2 className="text-customGray-dark text-4xl font-semibold px-6 py-8 text-center">
            Create Account
          </h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <Input
              value={registerData.name}
              type="text"
              placeholder="Test"
              onChange={handleRegister}
              name="fullName"
            >
              Name
            </Input>
            <Input
              value={registerData.email}
              type="email"
              placeholder="test@example.com"
              onChange={handleRegister}
              name="email"
            >
              Email
            </Input>
            <Input
              value={registerData.password}
              type="password"
              placeholder="******"
              onChange={handleRegister}
              name="password"
            >
              Password
            </Input>
            <button
              type="submit"
              className="bg-primary text-white w-full p-2 rounded-full my-6"
            >
              {loading ? "loading..." : "Register"}
            </button>
          </form>

          <button className="bg-customGray-navbar  w-full p-2 rounded-full mb-6">
            Register with Google
          </button>

          <p className="text-center text-customGray-normal font-medium">
            Already a <spam className="text-primary">RentingApp</spam> User ?
          </p>
          <p className="text-center text-customGray-dark font-medium">LOGIN</p>
        </div>
      </div>
    </div>
  );
}
