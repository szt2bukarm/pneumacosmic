"use client"
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ImrpintCarousel from "./ImprintCarousel";
import ImprintBackground from "./ImprintBackground";
import ImprintText from "./ImprintText";
import { useStore } from "@/app/useStore";
gsap.registerPlugin(ScrollTrigger);


export default function ImprintHeader() {
    const {isMobile} = useStore();

        // intro anims
        useGSAP(() => {
            const ctx = gsap.context(() => {
                gsap.from('[data-gsap="imprint-bg"]', {
                    opacity: 0.01,
                    duration: 1,
                    delay: 1,
                    ease: "linear",
                })
                gsap.from('[data-gsap="imprint-bgimage"]', {
                    opacity: 0,
                    filter: "blur(15px)",
                    scale: 1.15,
                    duration: 2,
                    delay: 1.5,
                    ease: "power4.out",
                })
                gsap.from('[data-gsap="imprint-text"]', {
                    opacity: 0,
                    duration: 2,
                    delay: 1,
                    ease: "power4.out",
                })
            })
        },[])

        useGSAP(() => {
            const ctx = gsap.context(() => {
                setTimeout(() => {
                    let trigger = ScrollTrigger.create({
                        trigger: '[data-gsap="imprint-content"]',
                        start: "bottom-=1000 center",
                        end: "bottom-=300 center",
                        scrub: true,
                        animation: gsap.fromTo('[data-gsap="imprint-bg-wrapper"]', {
                            opacity: isMobile ? 0.30 : 0.50,
                        }, {
                            opacity: 0.0001,
                        })
                    })
                    return () => {
                        trigger?.kill();
                    };
                }, 100);
            })
            return () => ctx.revert();
        })

            

    return (
        <div className="w-full h-full">
            {/* <div data-gsap="hero-dim" className="absolute top-0 left-0 w-screen h-screen bg-dark z-20    opacity-0 pointer-events-none"></div> */}

            <div data-gsap="imprint-content" className="relative h-full w-full mb-[100px]">
            <ImprintBackground />
            <ImprintText />
            </div>
        </div>
    )    
    
}