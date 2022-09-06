import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import globalStyles from "./global.css";
import tailwindStyles from "./tailwind.css";

export const meta = () => ({
  charset: "utf-8",
  title: "Spotify playlist stats",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => {
  return [
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: tailwindStyles },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
