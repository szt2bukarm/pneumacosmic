"use client"
import Hero from "../components/landing/hero/Hero";
import LandingText from "../components/landing/LandingText";
import Footer from "../components/Footer/Footer";
import Video from "../components/common/Video";
import HomeLogic from "../components/landing/HomeLogic";
import { useParams } from "next/navigation";

export default function Home() {
  const {locale} = useParams();

  return (
    <main className="w-screen h-screen bg-dark relative">
      <HomeLogic />
      <Hero />

      <LandingText />
      <Video thumbnail="/herovideo.webp" videoID="UqLk3ju5NfA" />

      <p
        className="relative mx-auto leading-[135%] font-gara text-middark text-lg md:text-h4 w-[calc(100%-40px)] text-center pt-[150px] pb-[50px]"><span className="opacity-50">{locale == "hu" && 'A konceptualista, efemer művekből felépülő kiállítás'}{locale == "en" && 'Composed of conceptual, ephemeral works, the exhibition can be'}</span> {locale == "hu" && 'öt elemre osztható:'}{locale == "en" && 'divided into five units:'}</p>

      <Footer />
    </main>
  );
}
