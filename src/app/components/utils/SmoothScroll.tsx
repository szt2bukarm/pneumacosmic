"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

function SmoothScroll({ children }: { children: React.ReactNode }) {
    gsap.registerEase("customEase", CustomEase.create("out", ".9,.6,.2,1"));

    gsap.config({
      nullTargetWarn: false,
    });


  return (
    <ReactLenis className="current-page" root options={{ lerp: 0.1, duration: 1 }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;