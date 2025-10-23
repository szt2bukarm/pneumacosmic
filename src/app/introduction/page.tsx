"use client"
import { useEffect, useLayoutEffect } from "react";
import PageNavHeader from "../components/common/PageNavHeader";
import Video from "../components/common/Video";
import Footer from "../components/Footer/Footer";
import IntroductionHeader from "../components/introduction/IntroductionHeader";
import IntroductionText from "../components/introduction/IntroductionText";
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
                lenis?.start();
            }, 10);
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
            <PageNavHeader />
            <IntroductionHeader />
            <IntroductionText />

            <div data-gsap="introduction-video" className="pb-[150px] py-[100px] md:py-[150px] lg:py-[200px] bg-dark">
            <Video thumbnail="images/saroslab.webp" videoID="000" />
            </div>

            <Footer />
        </div>
    )
}