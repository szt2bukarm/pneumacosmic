"use client"
import { useEffect, useLayoutEffect } from "react";
import PageNavHeader from "../../components/common/PageNavHeader";
import Video from "../../components/common/Video";
import Footer from "../../components/Footer/Footer";
import IntroductionHeader from "../../components/introduction/IntroductionHeader";
import IntroductionText from "../../components/introduction/IntroductionText";
import { useLenis } from "@studio-freight/react-lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

export default function Page() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return
        lenis?.scrollTo(0,{immediate: true})
        setTimeout(() => {
            lenis?.stop();
            setTimeout(() => {
                window.scrollTo(0,0)
            }, 25);
            setTimeout(() => {
                lenis?.start();
            }, 35);
        }, 5);
    },[lenis])



    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            let trigger = ScrollTrigger.create({
                trigger: '[data-gsap="introduction-video"]',
                start: "top-=200 center",
                end: "bottom+=200 center",
                scrub: true,
                animation: gsap.to('[data-gsap="introduction-video"],[data-gsap="introduction-text"]', {
                    background: "#050505"
                })
            })

            return () => {
                trigger.kill();
            };
        })
        return () => ctx.revert();
    },[])

    return (
        <div className="w-full h-full">
            <div className="z-[30] fixed top-0 left-0 w-screen h-[200px] bg-gradient-to-b from-black to-transparent"></div>
            <IntroductionHeader />
            <IntroductionText />






            <Footer />
        </div>
    )
}