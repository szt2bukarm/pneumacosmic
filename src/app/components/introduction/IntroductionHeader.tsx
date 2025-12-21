"use client"
import { useGSAP } from "@gsap/react";
import PageNavHeader from "../common/PageNavHeader";
import PageTitle from "../common/PageTitle";
import IntroductionBackground from "./IntroductionBackground";
import gsap from "gsap";
import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/app/useStore";

gsap.registerPlugin(ScrollTrigger);

export default function IntroductionHeader() {
    const {isMobile} = useStore();

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.set('[data-gsap="introduction-bg"]', { 
                opacity: 0,
                scale: 1.4,
                filter: isMobile ? "" : "blur(20px)"
            });
            gsap.to('[data-gsap="introduction-bg"]', {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                delay: 1.2,
                duration: 2,
                ease: "power4.out"
            });

            let trigger = ScrollTrigger.create({
                trigger: '[data-gsap="introduction-bg"]',
                start: "top+=60% center",
                end: "bottom+=1000 center",
                scrub: true,
                animation: gsap.to('[data-gsap="introduction-bg-scrollwrap"]', {
                    opacity: 0.5,
                    scale: 1.1,
                    y: 0,
                    filter: "blur(2px)",
                    delay: 0.2,
                    duration: 2,
                    ease: "power4.out"
                }),
            });
            return () => {
                trigger.kill();
            };

        });
        return () => ctx.revert();
    }),[];

    return (
        <div className="relative w-full h-[120vh] md:h-[1500px] overflow-hidden">
            {isMobile && (
                <div className="absolute z-[20] top-0 left-0 w-screen h-[350px] bg-gradient-to-b from-dark to-transparent">
                </div>
            )}
            {!isMobile && (
            <IntroductionBackground />
            )}

            <PageTitle text="BEMUTATKOZÁS" subtext="" delay={1.5} shadow />

            <div data-gsap="introduction-bg-scrollwrap" className="absolute top-[0px] left-0 w-full h-[120vh] md:h-[1500px]">
            <img alt="introduction background" data-gsap="introduction-bg" src="/images/introduction/intro.webp" className="opacity-0 w-full h-[120vh] md:h-[1550px] object-cover object-center md:object-[50%_-75px]" />
            </div>

            <div className="absolute bottom-0 left-0 h-[50px] bg-gradient-to-t from-dark to-transparent w-full"></div>
        </div>
    )
}