export default function returnEnvVars() {
  return {
    ENV: {
      client_id: process.env.client_id,
      redirect_uri: process.env.redirect_uri,
    },
  };
}
