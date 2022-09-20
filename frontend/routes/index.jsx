import Container from "../components/Container";
import Cta from "../components/Cta";
import generateAuthorizationLink from "../utils/generateAuthorizationLink";
import returnEnvVars from "../utils/returnEnvVars";

export async function loader() {
  return returnEnvVars();
}

export default function Index() {
  const authorizationLink = generateAuthorizationLink();
  console.log("authorizationLink", authorizationLink);
  return (
    <main className="flex justify-center items-centerh-full min-h-screen py-10">
      <Container containerClass="flex flex-col gap-10 justify-center">
        <h1 className="text-heading-1 text-center font-barlow-bold">
          Get all the playlist stats you need to clown your buddies.
        </h1>
        <div className="flex flex-col gap-4 items-center">
          <p className="text-center text-body-4 w-1/2">
            To get started, you have to authorize this app to access some of
            your public spotify data.
          </p>
          <div className="flex justify-center">
            <Cta isLink href={authorizationLink} smallerText={false}>
              Get started
            </Cta>
          </div>
        </div>
      </Container>
    </main>
  );
}
