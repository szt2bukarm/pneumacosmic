"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { usePathname } from "next/navigation"
import AnimatedLink from "../common/AnimatedLink";

export default function FooterText() {
    const pathname = usePathname();


    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.set('[data-gsap="footer-text"]', {
                opacity: 0,
                y: 50,
                filter: "blur(10px)"
            })

            gsap.to('[data-gsap="footer-text"]', {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                ease: "power4.out",
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '[data-gsap="footer-text-wrapper"]',
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                }
            })
        })
    })

    if (pathname !== "/") {
        return (
            <div className="h-[70px] sm:h-[100px] md:h-[200px] w-full"></div>
        )
    }

    return (
        <div data-gsap="footer-text-wrapper" className="pt-[80px] pb-[80px] sm:pt-[120px] sm:pb-[120px] md:pt-[180px] md:pb-[240px] mx-auto gap-[120px] md:gap-[145px] flex flex-col items-start justify-center w-[90vw] xl:w-[1000px]">
            <p data-gsap="footer-text" className="font-gara text-middark text-lg md:text-h4 ">A kiállítás a légmozgás és a transzcendens vagy gondolati világ között állít párhuzamot, felhívva a figyelmet a környezetünk intuitív megéléséből fakadó tapasztalatok komplexitására.</p>

            <div data-gsap="footer-text">
            <AnimatedLink external={true} href={"https://hu.wikipedia.org/wiki/Pneuma_Cosmic"} size="large" text="Pneuma Cosmic WIKI" />
            </div>
        </div>
    )
}