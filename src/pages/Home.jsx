import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect, useRef } from "react";
import { jsontohtml } from "jsontohtml-render";
import { json } from "react-router-dom";
import config from "../../config";
import axios from "axios";
import VerifyWidget from "../components/VerifyWidget";
import { resendEmail, isEmailVerified } from "../../services/apiService";

function Home() {
  const [verifyStatus, setVerifyStatus] = useState("NOT VERIFIED");
  const [emailMessage, setEmailMessage] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [intervalId, setIntervalId] = useState({});
  const [continueUrl, setContinueUrl] = useState("");
  const [continueState, setContinueState] = useState("");

  // Do not Run on First Load
  const isStatusFirstRender = useRef(true);

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  function clearFetchEmailStatus() {
    clearInterval(intervalId.id);
  }

  const continueFunction = async () => {
    const url = `${continueUrl}?state=${continueState}`;
    console.log(`Continue Button has been Clicked. Redirecting to ${url}`);
    window.location.href = url;
  };

  // Resend Email
  const resendVerificationEmail = async () => {
    try {
      const response = await resendEmail(accessToken);
      console.log(`Resend Email response: ${JSON.stringify(response.data.id)}`);
      setEmailMessage("Email sent. Please check your mailbox");
    } catch (e) {
      console.log(`Unable to Send Verification Email: ${e}`);
      setErrorMessage(`Unable to send Verification Email`);
      clearFetchEmailStatus();
    }
  };

  // Email Verification Function
  const getEmailVerificationStatus = async () => {
    const response = await isEmailVerified(accessToken);
    // console.log(
    //   `Status Response in Main: ${JSON.stringify(response, null, 3)}`
    // );
    console.log(`Email Verification Response: ${response.status}`);
    if (response.status) {
      setVerifyStatus("VERIFIED");
      clearInterval(intervalId.id);
    }
  };

  // Use Effect - Get Access Token
  useEffect(() => {
    //Get Access Token
    const getAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        // console.log(`Obtained Access Token: ${token}`);
        // sessionStorage.setItem("accessToken", token);
        // Set it in the State
        console.log(`Obtained Access Token`);
        setAccessToken(token);
      } catch (e) {
        console.log(`Unable to get Access Token: ${JSON.stringify(e)}`);
        setErrorMessage(`Unable to initialize.`);
      }
    };

    // Use Effect Main Thread
    // Parse the Query Parameters
    const queryString = window.location.search;
    console.log(`Query String: ${queryString}`);
    const urlParams = new URLSearchParams(queryString);
    setContinueState(urlParams.get("state"));
    // const sessionToken = urlParams.get("session_token");
    setContinueUrl(urlParams.get("redirect_uri"));
    // console.log(`State Object: ${state}`);
    // console.log(`sessionToken: ${sessionToken}`);
    // console.log(`continueUri: ${continueUri}`);
    // Fetch Access Token on initial Load
    // console.log(`Fetch Access Token on initial Load`);

    // Get an Access Token everytime.
    getAccessToken();
  }, []);

  useEffect(() => {
    // Suppress the Automatic Render during the Initial Load
    if (isStatusFirstRender.current) {
      isStatusFirstRender.current = false;
      return;
    }

    if (!errorMessage) {
      // Use Effect Main Thread
      console.log(`Fetching the Email Verification Status`);

      // Start the Interval
      intervalId.id = setInterval(() => {
        getEmailVerificationStatus();
      }, 2000);

      //Clear interval on component unmount
      return () => clearInterval(intervalId.id);
    }
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
        resendEmail={resendVerificationEmail}
        error={errorMessage}
        redirectToCIC={continueFunction}
      />
    )
  );
}

export default Home;
