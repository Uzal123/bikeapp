import { React, useState, useEffect } from "react";
import Input from "../../components/UI/Input";
import { useMutation, useQuery } from "@apollo/client";
import LOGIN_USER from "../../graphql/Mutation/Loginuser";
import { useUserStore } from "../../store/auth";
import Router, { withRouter, useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const [loginData, setloginData] = useState({ email: "", password: "" });
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [login, { loading, error, data }] = useMutation(LOGIN_USER);
  const router = useRouter();

  useEffect(() => {
    /// for notiti 
    // setNotifdation
    //settime
    //  removeNotification
    if (data?.login?.["success"] && !loading) {
      const user = data.login["user"];
      setUser(user.accessToken, user);
      router.push("/");
    }
  }, [data]);

  useEffect(() => {
    console.log(router);
    if (user.accessToken) {
      if (router.asPath !== "/register") {
        router.push(router.asPath);
      } else {
        router.push("/");
      }
    }
  }, [user]);

  const handleLogin = (e) => {
    const val = e.target.value;
    const key = e.target.name;
    setloginData((prevs) => ({ ...prevs, [key]: val }));
    // console.log(loginData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({
      variables: loginData,
    });
  };

  return (
    <div className="w-screen h-screen flex">
      {console.log(data)}
      <div className="hidden md:block left w-3/5 h-screen">
        <h2 className="text-2xl px-8 py-8 text-primary font-bold absolute">
          RentingApp
        </h2>
        <div className="flex justify-center items-center h-full ">
          <div className="flex justify-center">
            {/* <Image src="/assets/login.png" width={500} height={500} /> */}
          </div>
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

            {data?.login?.success == false && (
              <p className="text-red-600 text-center">{data?.login.message}</p>
            )}
            <button className="bg-primary text-white w-full p-2 rounded-full my-6">
              Login
            </button>
          </form>

          {/* <button className="bg-customGray-navbar w-full p-2 rounded-full mb-6">
            Login with Google
          </button> */}
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
