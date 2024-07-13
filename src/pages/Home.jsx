import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect, useRef } from "react";
import { jsontohtml } from "jsontohtml-render";
import { json } from "react-router-dom";
import config from "../../config";
import axios from "axios";
import VerifyWidget from "../components/VerifyWidget";

function Home() {
  const [verifyStatus, setVerifyStatus] = useState("NOT VERIFIED");
  const [emailMessage, setEmailMessage] = useState("");
  const [accessToken, setAccessToken] = useState("");

  // Do not Run on First Load

  const isStatusFirstRender = useRef(true);

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const resend = async () => {
    console.log(`Resend action taken`);
    // let accessToken = sessionStorage["accessToken"];
    try {
      const url =
        "https://email-notification-backend.vercel.app/sendverificationemail";
      console.log(`Trying to send verification email.`);

      // Create the headers
      let headers = {};
      headers["Content-Type"] = "application/json";
      headers["Authorization"] = `Bearer ${accessToken}`;

      const response = axios.post(
        url,
        {},
        {
          headers,
        }
      );
      setEmailMessage("Verification Email has been sent again.");
      console.log(`Email Verification Response: ${response.data}`);
    } catch (e) {
      console.log(`Unable to send API call, ${JSON.stringify(e, null, 4)}`);
    }
  };

  // Use Effect - Get Access Token
  useEffect(() => {
    // Get Access Token
    const getAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log(`Obtained Access Token: ${token}`);
        sessionStorage.setItem("accessToken", token);

        // Set it in the State
        setAccessToken(token);
      } catch (e) {
        console.log(`Unable to get Access Token: ${JSON.stringify(e)}`);
      }
    };

    // Fetch Access Token on initial Load
    console.log(`Fetch Access Token on initial Load`);
    getAccessToken();
  }, []);

  useEffect(() => {
    // Suppress the Automatic Render during the Initial Load
    if (isStatusFirstRender.current) {
      isStatusFirstRender.current = false;
      return;
    }
    // Email Verification Function
    const getEmailVerificationStatus = async () => {
      //Get Access Token from storage
      // let accessToken = sessionStorage["accessToken"];
      // console.log(`Token from Storage: ${accessToken}`);
      // Get Email Verification Status
      // console.log(accessToken);
      let url =
        "https://email-notification-backend.vercel.app/getemailverificationstatus";

      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(`Email Verification Status: ${response.data.status}`);
        if (response.data.status == "true") {
          setVerifyStatus("VERIFIED");
          clearInterval(intervalId.id);
        }
      } catch (e) {
        console.log(
          `Unable to get Email Verification Status: ${JSON.stringify(e)}`
        );
      }
    };
    // Get Application Login URI
    const getAppLoginUri = async () => {
      let url =
        "https://email-notification-backend.vercel.app/applicationloginuri";

      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(`Response: ${JSON.stringify(response.data)}`);
        // console.log(`Application Login Uri: ${response.data.app_login_uri}`);
        if (response.data.app_login_uri) {
          setLoginUri(response.data.app_login_uri);
        }
      } catch (e) {
        console.log(
          `Unable to get Application Login Uri: ${JSON.stringify(e)}`
        );
      }
    };

    // Use Effect Main Thread
    console.log(`AT has been retrieved`);
    // console.log(`AT from the state: ${accessToken}`);

    // Fetching Application Login Uri
    // console.log(`Fetching Application Login Uri`);
    // getAppLoginUri();

    console.log(`Fetching the Email Verification Status`);

    // Start the Intervale
    let intervalId = {};
    intervalId.id = setInterval(() => {
      getEmailVerificationStatus();
    }, 2000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId.id);
  }, [accessToken]);

  if (isLoading) {
    return (
      <div className="max-w-screen-md-lg mx-auto text-2xl content-center">
        Loading ...
      </div>
    );
  }
  return (
    isAuthenticated && (
      <VerifyWidget
        verificationStatus={verifyStatus}
        email={user.email}
        emailMessage={emailMessage}
        resendEmail={resend}
      />
    )
  );
}

export default Home;
