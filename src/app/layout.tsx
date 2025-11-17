// app/layout.tsx
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
