import { FC, Fragment, useEffect, useState } from 'react'
import { useQuery } from "@apollo/client";
import Router, { withRouter, useRouter } from "next/router";
import ME from '../graphql/Query/Me'
import { useAuth } from '../hooks/useAuth'

const Auth = ({...props}) => {
    const {setUser, isLoading, isAuthenticated} = useAuth((state) => state);

     const router = useRouter();

    // const { loading, error, data } = useQuery(ME, {
    //     fetchPolicy: "no-cache",
    // });

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         console.log({data});

    //       if (!loading && data?.me?.["success"]) {
    //         const user = data.me["user"];
    //         setUser(
    //           user.accessToken,
    //           user._id,
    //           user.phone,
    //           user.fullName,
    //           user.verifiedPhone
    //         );
    //         setIsLoading(false);
    //         setAuthenticated(true);
    //         if (user.verifiedPhone === false) {
    //           router.push("/verifyotp");
    //         }
    //       }
    //       else if(!loading && error){
    //         setIsLoading(false);
    //         setAuthenticated(false);
    //       }
    //     }
    // }, [loading, error, data]);

 

  if (isLoading) {
    return (
      <div className="h-screen bg-bgColor w-full flex flex-col justify-center items-center">
        <div
          className={`flex flex-col justify-center  items-center space-y-4`}
        >
          {/* <Blocks
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
          /> */}
          Initializing please wait...
        </div>
      </div>
    )
  }
  if (!isLoading && isAuthenticated) {
    return (<Fragment>
    {props.children}
  </Fragment>)
  }
  // todo: change / to /login
  router.push("/login");
  return (<Fragment>
  </Fragment>)
}

export default Auth
