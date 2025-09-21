import Image from "next/image";
import HeroBackground from "./components/landing/hero/HeroBackground";
import Hero from "./components/landing/hero/Hero";
import LandingText from "./components/landing/LandingText";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <main className=" w-screen h-screen bg-white">

      <Hero />
      <div className="relative">
      <LandingText />
      {/* <div className="absolute w-full h-[300px] bg-gradient-to-b from-transparent to-black bottom-0 left-0 z-1"></div> */}
      </div>


      <Footer />
    </main>
  );
}
