const config = {
  oidc: {
    clientId: process.env.CLIENT_ID,
    domain: process.env.DOMAIN,
    redirectUri: `${window.location.origin}`,
    audience: process.env.AUDIENCE,
  },
};

export default config;
