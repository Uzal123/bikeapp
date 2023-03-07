import { React, useState, useEffect } from "react";
import Logo from "../../assets/TopBar/logo.svg";
import Input from "../../components/UI/Input";
import { useMutation } from "@apollo/client";
import LOGIN_USER from "../../graphql/Mutation/Loginuser";
import { useUserStore } from "../../store/auth";
import { useNotificationStore } from "../../store/notifications";
import { withRouter, useRouter } from "next/router";
import Link from "next/link";
import { uuid } from "uuidv4";
import Head from "next/head";

const Login = () => {
  const [loginData, setloginData] = useState({ email: "", password: "" });
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setNotification = useNotificationStore(
    (state) => state.setNotification
  );

  const [login, { loading, error, data }] = useMutation(LOGIN_USER);
  const router = useRouter();

  useEffect(() => {
    if (data?.login?.["success"] && !loading) {
      const user = data.login["user"];
      setUser(user.accessToken, user._id, user.email, user.fullName);
      setNotification(uuid(), "Login Successfull", "Success", 3000);
    }
    if (data?.login?.success == false) {
      setNotification(uuid(), data.login.message, "Error", 3000);
    }
  }, [data]);

  useEffect(() => {
    if (user.email) {
      if (router.asPath === "/register" || router.asPath === "/login") {
        router.push("/");
      } else {
        router.push(router.asPath);
      }
    }
  }, [user]);

  const handleLogin = (e) => {
    const val = e.target.value;
    const key = e.target.name;
    setloginData((prevs) => ({ ...prevs, [key]: val }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      login({
        variables: loginData,
      });
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <Head>
        <title>Moto Ghar - Login</title>
      </Head>
      <div className="hidden md:block left w-3/5 h-screen">
        <Logo className="absolute h-24 mx-4" />
        <div className="flex justify-center items-center h-full ">
          <img src="/signup.png" alt="Login" height={800} width={800} />
        </div>
      </div>
      <div className="right w-full  md:w-2/5 h-screen bg-white flex justify-center px-8 md:px-20 pt-20">
        <div>
          <h2 className="text-customGray-dark text-4xl font-semibold px-6 py-8 text-center">
            Welcome Back
          </h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <Input
              type="email"
              placeholder="test@example.com"
              value={loginData.email}
              name="email"
              onChange={handleLogin}
            >
              Email
            </Input>

            <Input
              type="password"
              placeholder="******"
              value={loginData.password}
              name="password"
              onChange={handleLogin}
            >
              Password
            </Input>

            <button className="bg-primary text-white w-full p-2 rounded-full my-6">
              {loading ? "Submitting..." : "Login"}
            </button>
          </form>
          <p className="text-center text-customGray-dark font-medium">
            Not yet Registerd ?
          </p>
          <div className="text-center text-primary font-medium">
            <Link href="/register">REGISTER</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
