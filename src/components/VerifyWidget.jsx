import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faXmark,
  faCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

function VerifyWidget({
  verificationStatus,
  email,
  emailMessage,
  resendEmail,
  error,
  redirectToCIC,
}) {
  return (
    <>
      <div className="max-w-screen-md-lg mx-auto content-center text-center">
        {/* <img src={user.picture} alt={user.name} /> */}
        <div className="w-[400px] h-[350px] border-5 border-blue-500 border-blue-700 shadow-md shadow-blue-500/50 transition-shadow duration-300 p-6">
          {!error && (
            <>
              <div className="text-2xl">
                <strong>{verificationStatus}</strong>
              </div>
              <br />
              {verificationStatus != "VERIFIED" && (
                <FontAwesomeIcon icon={faXmark} color={"red"} size={"4x"} />
              )}
              {/* {verificationStatus == "VERIFIED" && (
                <p>You can close this window.</p>
              )} */}

              <p>
                <br />
                <strong>{email}</strong>
              </p>
              <br />
              <br />

              {verificationStatus == "NOT VERIFIED" && (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => resendEmail()}
                  >
                    Send Verification Email
                  </button>
                  <br />
                  <br />

                  <p>{emailMessage}</p>
                </>
              )}

              {verificationStatus == "VERIFIED" && (
                <>
                  <button
                    className="btn btn-secondary"
                    onClick={() => redirectToCIC()}
                  >
                    Continue
                  </button>
                  <br />
                  <br />
                </>
              )}
            </>
          )}

          {error && (
            <>
              <div className="text-2xl">
                <strong>ERROR</strong>
                <br />
                <br />
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  color={"red"}
                  size={"4x"}
                />
                <br />
                <br />
                <br />

                <p className="text-xl">{error}</p>
              </div>
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
