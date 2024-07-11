import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import config from "../config";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain={config.oidc.domain}
    clientId={config.oidc.clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: config.oidc.audience,
    }}
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>
);
