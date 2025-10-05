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
        <Nav />
        <SmoothScroll>
        {children}
        <GradualBlurMemo
          target="page"
          position="top"
          height="150px"
          strength={1}
          divCount={5}
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
