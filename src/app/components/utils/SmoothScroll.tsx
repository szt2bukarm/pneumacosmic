"use client";
import { useStore } from "@/app/useStore";
import { ReactLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

function SmoothScroll({ children }: { children: React.ReactNode }) {
    gsap.registerEase("customEase", CustomEase.create("out", ".9,.6,.2,1"));
    const {loaded} = useStore();
    gsap.config({
      nullTargetWarn: false,
    });
    // if (!loaded) return null;

  return (
    <ReactLenis className="current-page" root options={{ lerp: 0.1, duration: 1 }}>
      {loaded && children}
    </ReactLenis>
  );
}

export default SmoothScroll;