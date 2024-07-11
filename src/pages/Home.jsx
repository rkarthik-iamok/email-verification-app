import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { jsontohtml } from "jsontohtml-render";
import { json } from "react-router-dom";
import config from "../../config";
import axios from "axios";

function Home() {
  const [verifyStatus, setVerifyStatus] = useState("VERIFY");
  const [accessToken, setAccessToken] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      } catch (e) {
        console.log(`Unable to fetch token, ${JSON.stringify(e, null, 4)}`);
      }
    };

    getToken();
  }, []);

  const resend = async () => {
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
      setEmailMessage("Verification Email has been sent");
    } catch (e) {
      console.log(`Unable to send API call, ${JSON.stringify(e, null, 4)}`);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-screen-md-lg mx-auto text-2xl content-center">
        Loading ...
      </div>
    );
  }

  return (
    isAuthenticated && (
      <div className="max-w-screen-md-lg mx-auto content-center text-center">
        {/* <img src={user.picture} alt={user.name} /> */}
        <div className="w-[400px] h-[300px] border-5 border-blue-500 border-blue-700 shadow-md shadow-blue-500/50 transition-shadow duration-300 p-6">
          <div className="text-2xl">
            <strong>{verifyStatus}</strong>
          </div>
          <p>
            <br />
            <strong>{user.email}</strong>
          </p>
          <br />

          <button className="btn btn-primary" onClick={resend}>
            Resend Verification Email
          </button>

          <p>{emailMessage}</p>
        </div>

        {/* <div className="text-center font-bold">User Profile</div>
        <div dangerouslySetInnerHTML={{ __html: profileData }}></div> */}
      </div>
    )
  );
}

export default Home;
