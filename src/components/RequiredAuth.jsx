import { withAuthenticationRequired } from "@auth0/auth0-react";

function RequiredAuth({ component, ...propsForComponent }) {
  const Cp = withAuthenticationRequired(component);
  return <Cp {...propsForComponent} />;
}

export default RequiredAuth;
