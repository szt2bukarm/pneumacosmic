import "./globals.css";
import SmoothScroll from "./components/utils/SmoothScroll";
import Nav from "./components/Nav/Nav";
import NavMenu from "./components/Nav/NavMenu";
import { ViewTransitions } from "next-view-transitions";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
    <html lang="en">
      <head>
      </head>
      <body
      >
        <Nav />
        <SmoothScroll>
        {children}
        <NavMenu />
        </SmoothScroll>
      </body>
    </html>
    </ViewTransitions>
  );
}
