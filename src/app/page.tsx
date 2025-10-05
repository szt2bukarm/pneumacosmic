"use client"
import Hero from "./components/landing/hero/Hero";
import LandingText from "./components/landing/LandingText";
import Footer from "./components/Footer/Footer";
import { useLenis } from "@studio-freight/react-lenis";
import { useEffect } from "react";

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
    <main className="w-screen h-screen bg-white">

      <Hero />
      <LandingText />


      <Footer/>
    </main>
  );
}
