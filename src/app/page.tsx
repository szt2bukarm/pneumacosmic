"use client"
import Hero from "./components/landing/hero/Hero";
import LandingText from "./components/landing/LandingText";
import Footer from "./components/Footer/Footer";
import { useLenis } from "@studio-freight/react-lenis";
import { useEffect } from "react";
import Video from "./components/common/Video";

export default function Home() {
  const lenis = useLenis();

  useEffect(() => {
      if (!lenis) return
      lenis?.scrollTo(0,{immediate: true})
      setTimeout(() => {
          lenis?.stop();
          setTimeout(() => {
              window.scrollTo(0,0)
              lenis?.start();
          }, 10);
      }, 5);
  },[lenis])

  return (
    <main className="w-screen h-screen bg-dark relative">

      <Hero />

      <LandingText />
      <Video thumbnail="herovideo.webp" videoID="wdN32OWRcrI" />

      <p
        className="relative mx-auto leading-[135%] font-gara text-middark text-lg md:text-h4 w-[calc(100%-40px)] text-center pt-[150px] pb-[50px]"><span className="opacity-50">A konceptualista, efemer művekből felépülő kiállítás</span> öt elemre osztható:</p>

      <Footer/>
    </main>
  );
}
