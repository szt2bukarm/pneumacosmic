import Hero from "../components/landing/hero/Hero";
import LandingText from "../components/landing/LandingText";
import Footer from "../components/Footer/Footer";
import Video from "../components/common/Video";
import HomeLogic from "../components/landing/HomeLogic";

export default function Home() {


  return (
    <main className="w-screen h-screen bg-dark relative">
      <HomeLogic />
      <Hero />

      <LandingText />
      <Video thumbnail="/herovideo.webp" videoID="wdN32OWRcrI" />

      <p
        className="relative mx-auto leading-[135%] font-gara text-middark text-lg md:text-h4 w-[calc(100%-40px)] text-center pt-[150px] pb-[50px]"><span className="opacity-50">A konceptualista, efemer művekből felépülő kiállítás</span> öt elemre osztható:</p>

      <Footer />
    </main>
  );
}
