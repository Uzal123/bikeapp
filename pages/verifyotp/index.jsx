import React, { useState, useRef, useEffect } from "react";
import { Fragment } from "react";
import Link from "next/link";
import Logo from "../../assets/TopBar/logo.svg";
import { useUserStore } from "../../store/auth";
import { useNotificationStore } from "../../store/notifications";
import { uuid } from "uuidv4";
import SENDOTP from "../../graphql/Mutation/SendMeOTP";
import VERIFYOTP from "../../graphql/Mutation/VerifyOTP";
import { client } from "../../graphql/client";
import { useRouter } from "next/router";
import Head from "next/head";

const Index = () => {
  const router = useRouter();
  const setNotification = useNotificationStore(
    (state) => state.setNotification
  );
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [code, setCode] = useState(["", "", "", ""]);
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    const value = e.target.value;
    // Only allow one digit in the input
    if (value.length > 1) {
      return;
    }
    // Update the code array
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    // Focus on the next input field
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    try {
      setSending(true);
      const response = await client.mutate({
        mutation: SENDOTP,
      });
      console.log(response);
      if (response.data?.sendUserVerificationOtp?.success) {
        setSending(false);
        setNotification(uuid(), "OTP sent successfully", "Success", 5000);
        setIsVerifying(true);
      } else {
        setNotification(uuid(), "OTP not sent", "Error", 5000);
        setSending(false);
      }
    } catch (error) {}
  };

  const verifyOTP = async () => {
    try {
      const response = await client.mutate({
        mutation: VERIFYOTP,
        variables: {
          otp: code.join(""),
          phone: user.phone,
        },
      });
      console.log(response);
      if (response.data?.verifyUserPhone?.success) {
        setNotification(uuid(), "OTP verified successfully", "Success", 5000);
        const user = response.data?.verifyUserPhone?.user;
        console.log({ o: response.data?.verifyUserPhone?.user });
        setUser(user.accessToken, user._id, user.phone, user.fullName, true);
        router.push("/");
      } else {
        setNotification(uuid(), "Incorrect Otp", "Error", 5000);
        setCode(["", "", "", ""]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackspace = (e, index) => {
    // Delete the current digit
    const newCode = [...code];
    newCode[index] = "";
    setCode(newCode);
    // Focus on the previous input field
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (isVerifying === true) {
      if (countdown > 0) {
        const intervalId = setInterval(() => {
          setCountdown(countdown - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      }
    }
  }, [countdown, isVerifying]);

  useEffect(() => {
    if (user.verifiedPhone === true) {
      router.push("/");
    }
  }, [user]);

  const handleResendClick = () => {
    setCountdown(120);
    handleVerify();
  };

  return (
    <Fragment>
      <Head>
        <title>Moto Ghar - Verify phone</title>
      </Head>
      <div className="p-2 fixed shadow-md bg-customGray-light flex text-center items-center justify-between h-16 w-screen">
        <Link href="/" className="font-bold text-2xl text-primary">
          <Logo className="h-20 md:h-24" />
        </Link>
      </div>
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-80 shadow-lg border-2 rounded-lg flex flex-col gap-3">
          <h1 className="text-2xl font-semibold px-6 pt-6 pb-0 text-center">
            Verify phone number
          </h1>

          {isVerifying === false && (
            <Fragment>
              <p className="px-4 text-center text-sm">
                We will send the verification code to
              </p>
              <h2 className="text-center text-2xl font-semibold">
                {user.phone}
              </h2>
              <p className="px-4 text-center text-sm">
                Please confirm the phone number and click send otp button
              </p>
              <button
                className="bg-primary text-white font-semibold rounded-lg p-2 mx-4 mb-4"
                onClick={() => handleVerify()}
              >
                {sending ? "Sending OTP..." : "Send OTP"}
              </button>
            </Fragment>
          )}
          {isVerifying === true && (
            <Fragment>
              <p className="text-sm px-6 pt-2 pb-0 text-center">
                We have sent you a 4-digit code to your phone number
              </p>
              <div className="flex justify-center items-center gap-2 pt-2">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg text-center text-2xl focus:outline-none focus:border-primary"
                    onChange={(e) => handleInput(e, index)}
                    onKeyDown={(e) =>
                      (e.key === "Backspace" && handleBackspace(e, index)) ||
                      (e.key === "Enter" && verifyOTP(user.phone))
                    }
                  />
                ))}
              </div>
              {countdown > 0 ? (
                <p className="text-sm px-6 pt-2 pb-0 text-center">
                  Resend code in {countdown} seconds
                </p>
              ) : (
                <p className="text-sm px-6 pt-2 pb-0 text-center">
                  Didn&apos;t receive the code ?
                  <span
                    className="text-primary cursor-pointer"
                    onClick={() => handleResendClick()}
                  >
                    {" Resend"}
                  </span>
                </p>
              )}
              <div className="flex justify-center items-center gap-2 pt-2 pb-2">
                <button
                  className="w-32 h-10 bg-primary text-white rounded-lg"
                  onClick={() => verifyOTP(user.phone)}
                >
                  Submit
                </button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
