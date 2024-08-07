import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";

function RequiredAuth({ component, ...propsForComponent }) {
  const Cp = withAuthenticationRequired(component);
  return <Cp {...propsForComponent} />;
}

export default RequiredAuth;
