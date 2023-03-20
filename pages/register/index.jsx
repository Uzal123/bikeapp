import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../store/auth";
import Logo from "../../assets/TopBar/logo.svg";
import Input from "../../components/UI/Input";
import { useMutation } from "@apollo/client";
import REGISTER_USER from "../../graphql/Mutation/Registeruser";
import { withRouter, useRouter } from "next/router";
import { useNotification } from "../../store/notifications";
import { uuid } from "uuidv4";
import Head from "next/head";

const Register = () => {
  const [registerData, setregisterData] = useState({
    phone: "",
    fullName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const user = useAuth((state) => state.user);
  const setUser = useAuth((state) => state.setUser);
  const setNotification = useNotification(
    (state) => state.setNotification
  );

  const [submitRegister, { data, loading, error }] = useMutation(REGISTER_USER);
  const router = useRouter();

  useEffect(() => {
    if (data?.register["success"]) {
      const user = data.register["user"];
      setUser(user.accessToken, user._id, user.phone, user.fullName);
      setNotification(uuid(), "Registered and Logged in", "Success", 3000);
      router.push("/verfiyotp");
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
  };

  const handleFloat = (e) => {  
    const val = parseFloat(e.target.value);
    const key = e.target.name;
    setregisterData((prevs) => ({ ...prevs, [key]: val }));
    };

  const onSubmit = (e) => {
    e.preventDefault();
    submitRegister({ variables: { user: registerData } });
  };

  return (
    <div className="w-screen h-screen flex">
      <Head>
        <title>Moto Ghar - Register</title>
      </Head>
      <div className="p-2 fixed shadow-md bg-customGray-light flex text-center items-center justify-between h-16 w-screen">
        <Link href="/" className="font-bold text-2xl text-primary">
          <Logo className="h-20 md:h-24" />
        </Link>
      </div>
      <div className="left hidden md:block w-3/5 h-screen">
        <div className="flex items-center justify-center h-full">
          <img src="/signup.png" alt="Image" height={700} width={700} />
        </div>
      </div>
      {console.log(registerData)}
      <div className="right w-full md:w-2/5 h-screen bg-white flex justify-center px-8 md:px-20 pt-20">
        <div>
          <h2 className="text-customGray-dark text-4xl font-semibold px-6 py-8 text-center">
            Create Account
          </h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <Input
              value={registerData.name}
              type="text"
              placeholder="Enter your full name"
              onChange={handleRegister}
              name="fullName"
            >
              Name
            </Input>
            <Input
              value={registerData.phone}
              type="number"
              placeholder="Enter your phone number"
              onChange={handleFloat}
              name="phone"
            >
              Phone
            </Input>
            <Input
              value={registerData.password}
              type={showPassword ? "text" : "password"}
              setShowPassword={setShowPassword}
              placeholder="******"
              onChange={handleRegister}
              name="password"
              password={true}
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
          <p className="text-center text-customGray-normal font-medium">
            Already a <spam className="text-primary">Moto Ghar</spam> User ?
          </p>
          <div className="flex justify-center">
            <Link
              className="text-center cursor-pointer font-medium text-primary"
              href="/login"
            >
              LOGIN
            </Link>
          </div>
          <div className="text-center py-4 text-sm md:px-6 lg:px-8">
            <p>
              If you register, you are accepting MotoGhar
              <Link
                href="/termsandconditions"
                className="text-primary cursor-pointer"
              >
                {" "}
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                className="text-primary cursor-pointer"
                href="privacypolicies"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
