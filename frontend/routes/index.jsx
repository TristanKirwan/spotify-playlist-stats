
import generateAuthorizationLink from "../utils/generateAuthorizationLink";
import returnEnvVars from "../utils/returnEnvVars";
import HomeHero from '../components/HomeHero';

export async function loader() {
  return returnEnvVars();
}

export default function Index() {
  const authorizationLink = generateAuthorizationLink();


  return <HomeHero authLink={authorizationLink} />
}
