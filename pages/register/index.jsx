import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { useUserStore } from "../../store/auth";
import Input from "../../components/UI/Input";
import { gql, useMutation } from "@apollo/client";
import REGISTER_USER from "../../graphql/Mutation/Registeruser";
import Router, { withRouter, useRouter } from "next/router";
import { useNotificationStore } from "../../store/notifications";
import { uuid } from "uuidv4";

const Register = () => {
  const [registerData, setregisterData] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setNotification = useNotificationStore(
    (state) => state.setNotification
  );

  const [submitRegister, { data, loading, error }] = useMutation(REGISTER_USER);
  const router = useRouter();

  useEffect(() => {
    if (data?.register["success"]) {
      const user = data.register["user"];
      setUser(user.accessToken, user._id, user.email, user.fullName);
      setNotification(uuid(), "Registered and Logged in", "Success", 3000);
      router.push("/");
    }

    if (data?.register?.success == false) {
      setNotification(uuid(), data.register.message, "Error", 3000);
    }
  }, [data]);

  useEffect(() => {
    if (user.accessToken) {
      if (router.asPath !== "/register") {
        router.push(router.asPath);
      } else {
        router.push("/");
      }
    }
  }, [user]);

  const handleRegister = (e) => {
    const val = e.target.value;
    const key = e.target.name;
    setregisterData((prevs) => ({ ...prevs, [key]: val }));
    console.log(registerData);
  };

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
          WheelzHub
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
              {loading ? "Submitting..." : "Register"}
            </button>
          </form>

          {/* <button className="bg-customGray-navbar  w-full p-2 rounded-full mb-6">
            Register with Google
          </button> */}

          <p className="text-center text-customGray-normal font-medium">
            Already a <spam className="text-primary">WheelzHub</spam> User ?
          </p>
          <div className="flex justify-center">
            <Link
              className="text-center cursor-pointer font-medium text-primary"
              href="/login"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
