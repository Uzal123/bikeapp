import React, { useState, useRef, useEffect } from "react";
import { Fragment } from "react";
import Link from "next/link";
import Logo from "../../assets/TopBar/logo.svg";
import { useUserStore } from "../../store/auth";
import { useNotificationStore } from "../../store/notifications";
import { uuid } from "uuidv4";
import FORGETPASSWORD from "../../graphql/Mutation/ForgetPassword";
import VERFYRESETOTP from "../../graphql/Mutation/VerifyResetOtp";
import RESETPASSWORD from "../../graphql/Mutation/ResetPassword";
import { client } from "../../graphql/client";
import { useRouter } from "next/router";
import Head from "next/head";
import Input from "../../components/UI/Input";

const Index = () => {
  const router = useRouter();
  const setNotification = useNotificationStore(
    (state) => state.setNotification
  );
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resetingPassword, setResetingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      try {
        setSending(true);
        const response = await client.mutate({
          mutation: FORGETPASSWORD,
          variables: { phone: phone },
        });
        console.log(response);
        if (response.data?.sendForgotPasswordOtp?.success) {
          setSending(false);
          setNotification(uuid(), "OTP sent successfully", "Success", 5000);
          setIsVerifying(true);
        } else {
          setNotification(uuid(), "OTP not sent", "Error", 5000);
          setSending(false);
        }
      } catch (error) {}
    } else {
      setNotification(uuid(), "Invalid Phone Number", "Error", 5000);
    }
  };

  const verifyOTP = async () => {
    setSending(true);
    try {
      const response = await client.mutate({
        mutation: VERFYRESETOTP,
        variables: {
          otp: code.join(""),
          phone: phone,
        },
      });
      console.log(response);
      if (response.data?.verifyResetOTP?.success) {
        setNotification(uuid(), "OTP verified successfully", "Success", 5000);
        setResetingPassword(true);
        setSending(false);
      } else {
        setNotification(uuid(), "Incorrect Otp", "Error", 5000);
        setCode(["", "", "", ""]);
        setSending(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== firstPassword) {
      setNotification(uuid(), "Passwords do not match", "Error", 5000);
      return null;
    }
    setSending(true);
    try {
      const response = await client.mutate({
        mutation: RESETPASSWORD,
        variables: {
          phone: phone,
          newPassword: newPassword,
          otp: code.join(""),
        },
      });

      if (response.data?.resetPassword?.success) {
        setNotification(uuid(), "Password reset successfully", "Success", 5000);
        setSending(false);
        router.push("/login");
      } else {
        setNotification(uuid(), "Password reset failed", "Error", 5000);
        setSending(false);
      }
    } catch (error) {}
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
    handleSendOtp();
  };

  return (
    <Fragment>
      <Head>
        <title>Moto Ghar - Forgot password</title>
      </Head>
      <div className="p-2 fixed shadow-md bg-customGray-light flex text-center items-center justify-between h-16 w-screen">
        <Link href="/" className="font-bold text-2xl text-primary">
          <Logo className="h-20 md:h-24" />
        </Link>
      </div>
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-80 md:w-96 shadow-lg border-2 rounded-lg flex flex-col gap-3 p-4">
          {!resetingPassword && (
            <h1 className="text-2xl font-semibold px-6 pt-6 pb-0 text-center">
              Forgot your password?
            </h1>
          )}
          {resetingPassword && (
            <h1 className="text-2xl font-semibold px-6 pt-6 pb-0 text-center">
              Reset your password
            </h1>
          )}

          {isVerifying === false && !resetingPassword && (
            <Fragment>
              <p className="px-4 text-center text-sm">
                We will send a 4-digit verification code to your phone number
              </p>

              <div className="flex justify-center">
                <input
                  type="number"
                  placeholder="Enter the phone number"
                  onWheel={(e) => e.target.blur()}
                  className="bg-gray-200 p-2 rounded-lg text-center focus:outline-none"
                  value={phone}
                  onChange={(e) => setPhone(parseFloat(e.target.value))}
                />
              </div>
              <p className="px-4 text-center text-sm">
                to verify your identity and reset your password
              </p>
              <button
                className="bg-primary text-white font-semibold rounded-lg p-2 mx-4 mb-4"
                onClick={() => handleSendOtp()}
              >
                {sending ? "Sending OTP..." : "Send OTP"}
              </button>
            </Fragment>
          )}
          {isVerifying === true && !resetingPassword && (
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
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg text-center text-2xl  focus:outline-none focus:border-primary"
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
                  {sending ? "Submitting.." : "Submit"}
                </button>
              </div>
            </Fragment>
          )}

          {resetingPassword && (
            <Fragment>
              <form
                className="flex flex-col items-center"
                onSubmit={(e) => {
                  resetPassword(e);
                }}
              >
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={firstPassword}
                  name="password"
                  password={true}
                  onChange={(e) => setFirstPassword(e.target.value)}
                  setShowPassword={setShowPassword}
                >
                  Password
                </Input>

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={newPassword}
                  name="password"
                  password={true}
                  onChange={(e) => setNewPassword(e.target.value)}
                  setShowPassword={setShowPassword}
                >
                  Confirm password
                </Input>
                <div className="pt-4">
                  <button
                    className="bg-primary text-white font-semibold rounded-lg p-2 mx-4 mb-4"
                    type="submit"
                  >
                    {sending ? "Resetting..." : "Reset Password"}
                  </button>
                </div>
              </form>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
