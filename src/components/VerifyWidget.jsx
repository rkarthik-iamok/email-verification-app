import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

function VerifyWidget({
  verificationStatus,
  email,
  emailMessage,
  resendEmail,
}) {
  return (
    <>
      <div className="max-w-screen-md-lg mx-auto content-center text-center">
        {/* <img src={user.picture} alt={user.name} /> */}
        <div className="w-[400px] h-[350px] border-5 border-blue-500 border-blue-700 shadow-md shadow-blue-500/50 transition-shadow duration-300 p-6">
          <div className="text-2xl">
            <strong>{verificationStatus}</strong>
          </div>
          <br />
          {verificationStatus != "VERIFIED" && (
            <FontAwesomeIcon icon={faXmark} color={"red"} size={"4x"} />
          )}
          {verificationStatus == "VERIFIED" && (
            <p>You can close this window.</p>
          )}

          <p>
            <br />
            <strong>{email}</strong>
          </p>
          <br />
          <br />

          {verificationStatus == "NOT VERIFIED" && (
            <>
              <button className="btn btn-primary" onClick={() => resendEmail()}>
                Resend Verification Email
              </button>
              <br />
              <br />

              <p>{emailMessage}</p>
            </>
          )}

          {verificationStatus == "VERIFIED" && (
            <>
              <button className="btn btn-secondary">Continue</button>
              <br />
              <br />
            </>
          )}
        </div>

        {/* <div className="text-center font-bold">User Profile</div>
        <div dangerouslySetInnerHTML={{ __html: profileData }}></div> */}
      </div>
    </>
  );
}

export default VerifyWidget;
