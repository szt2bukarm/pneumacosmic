// app/[locale]/layout.tsx
import "../globals.css";
import SmoothScroll from "../components/utils/SmoothScroll";
import Nav from "../components/Nav/Nav";
import NavMenu from "../components/Nav/NavMenu";
import { ViewTransitions } from "next-view-transitions";
import GradualBlurMemo from "../components/GradualBlur";
import MobileTest from "../MobileTest";
import Loader from "../components/Loader";
import TextOverlay from "../components/common/TextOverlay";
import TransitionManager from "../components/TransitionManager";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ImageGalleryWrapper from "../components/common/ImageGallery/ImageGalleryWrapper";
import { Analytics } from "@vercel/analytics/next";
import BienLogo from "../components/landing/hero/BienLogo";

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export const metadata = {
  title: "Pneuma Cosmic",
  description: "Pneuma Cosmic, Koronczi Endre képzőművész projektje, mely 61. Velencei Képzőművészeti Biennálé Magyar Pavilonjában kerül bemutatásra, kurátor: Cserhalmi Luca.",
  keywords: [
    "Pneuma Cosmic",
    "Koronczi Endre",
    "Képzőművész",
    "61. Velencei Képzőművészeti Biennálé",
    "labiennale",
    "La Biennale di Venezia",
    "La Biennale",
    "Venezia",
    "Velencei Biennálé",
  ],
  openGraph: {
    title: "Pneuma Cosmic",
    description: "Pneuma Cosmic, Koronczi Endre képzőművész projektje, mely 61. Velencei Képzőművészeti Biennálé Magyar Pavilonjában kerül bemutatásra, kurátor: Cserhalmi Luca.",
    url: "https://www.pneumacosmic.hu",
    siteName: "Pneuma Cosmic",
    type: "website",
    locale: "hu_HU",
    alternateLocale: ["en_US", "it_IT"],
    images: [
      {
        url: "https://www.pneumacosmic.hu/og.jpg",
        width: 1280,
        height: 720,
        alt: "Pneuma Cosmic",
      },
    ]
  },
  icons: {
    icon: "/favicon.png",
  }
};

// Allowed locales
const VALID_LOCALES = ["hu"];
const RESET_LOCALE = "hu";

export default function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  // Redirect if invalid locale
  if (!VALID_LOCALES.includes(locale)) {
    redirect(`/${RESET_LOCALE}`);
  }

  return (
    <ViewTransitions>
      <MobileTest />
      <html lang={locale}>
        <head>
          <script
            dangerouslySetInnerHTML={{ __html: `history.scrollRestoration = "manual"` }}
          />
        </head>
        <body>
          <Loader />
          <TransitionManager />
          <TextOverlay />
          <ImageGalleryWrapper />
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
              zIndex={50}
              />
            <NavMenu />
          </SmoothScroll>
          <Nav />
          <BienLogo />
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
