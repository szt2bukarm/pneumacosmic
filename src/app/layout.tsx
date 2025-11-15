import "./globals.css";
import SmoothScroll from "./components/utils/SmoothScroll";
import Nav from "./components/Nav/Nav";
import NavMenu from "./components/Nav/NavMenu";
import { ViewTransitions } from "next-view-transitions";
import Vignette from "./components/Vignette";
import GradualBlurMemo from "./components/GradualBlur";
import ImageGallery from "./components/common/ImageGallery/ImageGallery";
import ImageGalleryWrapper from "./components/common/ImageGallery/ImageGalleryWrapper";
import MobileTest from "./MobileTest";
import Loader from "./components/Loader";
import TextOverlay from "./components/common/TextOverlay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pneuma Cosmic",
  icons: {
    icon: "/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
    <MobileTest />
    <html lang="en">
      <head>
      <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration = "manual"` }} />
      </head>
      <body
      >
        <Loader />
        <Nav />
        <TextOverlay />
        <SmoothScroll>
        {children}
        <GradualBlurMemo
          target="page"
          position="top"
          height="150px"
          strength={1}
          divCount={3}
          curve="bezier"
          opacity={1}
          exponential={true}
          zIndex={48}
          />
        {/* <Vignette /> */}
        <NavMenu />
        <ImageGalleryWrapper />
        </SmoothScroll>
      </body>
    </html>
    </ViewTransitions>
  );
}
