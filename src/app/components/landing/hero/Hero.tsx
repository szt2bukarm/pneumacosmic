"use client"
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {

    useGSAP(() => {
        gsap.set('[data-gsap="scroll"]', { opacity: 0 });
        gsap.set('[data-gsap="scroll-thumb"]', { y: 5 });

        gsap.to('[data-gsap="scroll"]', {
            opacity: 1,
            duration: 1,
            delay: 1,
            ease: "power4.out",
        });

        gsap.to('[data-gsap="scroll-thumb"]', {
            y: 0,
            yoyo: true,
            repeat: -1,
            duration: 1.5,
            delay: 1,
            ease: "power4.out",
        });
    });


    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-dark">
            <div data-gsap="hero" className="relative w-full h-full">

                <HeroBackground />
                <HeroContent />


                {/* <div className="!z-1 absolute bottom-0 left-0 w-screen h-[300px] bg-gradient-to-t from-dark to-transparent"></div> */}
            </div>
        </div>
    );
}
