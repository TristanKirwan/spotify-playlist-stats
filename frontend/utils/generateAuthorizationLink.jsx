import { useLoaderData } from "@remix-run/react";

export default function generateAuthorizationLink() {
  const loaderData = useLoaderData();
  const envVariables = loaderData?.ENV;
  if (!envVariables) return "";

  const { client_id, redirect_uri } = envVariables;

  return `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`;
}
