import generateAuthorizationLink from "../utils/generateAuthorizationLink";
import returnEnvVars from "../utils/returnEnvVars";

export async function loader() {
  return returnEnvVars();
}

export default function Index() {
  const authorizationLink = generateAuthorizationLink();
  console.log("authorizationLink", authorizationLink);
  return (
    <main className="flex justify-center py-10">
      <div className="max-w-[400px]flex justify-center">
        <a
          href={authorizationLink}
          className="inline-block border border-orange px-2 py-4"
        >
          Give authorization!
        </a>
      </div>
    </main>
  );
}
