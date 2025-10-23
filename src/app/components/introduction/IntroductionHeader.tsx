"use client"
import { useGSAP } from "@gsap/react";
import PageNavHeader from "../common/PageNavHeader";
import PageTitle from "../common/PageTitle";
import IntroductionBackground from "./IntroductionBackground";
import gsap from "gsap";
import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroductionHeader() {

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set('[data-gsap="introduction-bg"]', { 
                opacity: 0,
                y: 100,
                scale: 1.4,
                filter: "blur(20px)"
            });
            gsap.to('[data-gsap="introduction-bg"]', {
                opacity: 1,
                scale: 1,
                y: 100,
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
                    y: 50,
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
        <div className="relative w-full h-[calc(100vh+100px)] md:h-[calc(120vh+100px)] overflow-hidden">
            <IntroductionBackground />
            <PageTitle text="BEMUTATKOZÁS" subtext="" delay={1.5} />
            <div className="absolute top-0 left-0 h-[200px] w-screen bg-black"></div>

            <div data-gsap="introduction-bg-scrollwrap" className="absolute top-0 left-0 w-full h-full">
            <img data-gsap="introduction-bg" src="images/introduction/introduction.webp" className="opacity-0 w-full h-[100vh] md:h-[120vh] object-cover" />
            </div>

            <div className="absolute bottom-0 left-0 h-[50px] bg-gradient-to-t from-dark to-transparent w-full"></div>
        </div>
    )
}