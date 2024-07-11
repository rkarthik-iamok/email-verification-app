import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { jsontohtml } from "jsontohtml-render";
import { json } from "react-router-dom";

function Home() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const profileData = jsontohtml(user);

  if (isLoading) {
    return (
      <div className="max-w-screen-md-lg mx-auto text-2xl content-center">
        Loading ...
      </div>
    );
  }

  return (
    isAuthenticated && (
      <div className="max-w-screen-md-lg mx-auto text-2xl content-center">
        {/* <img src={user.picture} alt={user.name} /> */}
        <p>
          Welcome <strong> {user.email}</strong> to Home!
        </p>
        <br />

        {/* <div className="text-center font-bold">User Profile</div>
        <div dangerouslySetInnerHTML={{ __html: profileData }}></div> */}
      </div>
    )
  );
}

export default Home;
