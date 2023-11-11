import styles from "./tailwind.css";
import globalStyles from "./styles/global.css";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";
import { useLoaderData } from "remix";

export const meta: MetaFunction = () => {
    return { title: "Play Rommé!" };
};

export function links() {
    return [{ rel: "stylesheet", href: styles }];
}

export async function loader() {
    return {
        ENV: {
            API_URL: process.env.API_URL
        }
    };
}

export default function App() {
    const data = useLoaderData();
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#fe4e4d"
                />
                <meta name="msapplication-TileColor" content="#f9feff" />
                <meta name="theme-color" content="#ffffff" />
                <style>
                    @import
                    url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,900;1,400;1,900&display=swap');
                </style>
                <Meta />
                <Links />
            </head>
            <body className="h-screen">
                <div className="min-h-full px-5 bg-black text-white flex flex-col">
                    <NavBar />
                    <Outlet />
                    <Footer />
                </div>
                <ScrollRestoration />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.ENV = ${JSON.stringify(data.ENV)}`
                    }}
                />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
