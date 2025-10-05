"use client"
import { useGSAP } from "@gsap/react";
import FooterCards from "./FooterCards";
import FooterLinks from "./FooterLinks";
import FooterLinksMedium from "./FooterLinksMedium";
import FooterLinksMobile from "./FooterLinksMobile";
import FooterText from "./FooterText";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import ScrollTrigger from "gsap/src/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const pathname = usePathname();

    useGSAP(() => {
        if (pathname == "/") {
            let trigger = ScrollTrigger.create({
                trigger: '[data-gsap="landing-text-wrapper"]',
                start: "50% center",
                end: "bottom+=200 center",
                scrub: true,
                animation: gsap.to('[data-gsap="footer"]', {
                    background: "#050505"
                })
            })

            return () => {
                trigger.kill();
            };
        }
    },[pathname])


    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.set('[data-gsap="footer-bg"]', {
                opacity: 0.001,
            })
            gsap.to('[data-gsap="footer-bg"]', {
                opacity: 1,
                duration: 3,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: '[data-gsap="footer"]',
                    start: "bottom-=200 bottom",
                    end: "bottom bottom",
                }
            })
        })

        return () => ctx.revert()
    },[])

    return (
        <footer data-gsap="footer" style={{background: pathname === "/" ? "#282828" : "transparent"}} className="relative h-fit w-screen overflow-hidden">
            <FooterCards />
            <FooterText />

            <div data-gsap="footer-links">
                <FooterLinks />
                <FooterLinksMedium />
                <FooterLinksMobile />

                <div className="hidden absolute bottom-0 right-20 h-[190px] w-[170px] p-[16px] md:flex items-start justify-start bg-[#D9D9D9] z-10">
                    <img src="/footerbanner.svg" className="w-full h-fit" />
                </div>
            </div>

            <div data-gsap="footer-bg" className={`absolute inset-0 ${pathname === "/" ? "translate-y-[800px]" : "translate-y-[500px]"} left-1/2 -translate-x-1/2 w-[130vw] md:w-screen md:translate-x-0 md:left-0 pointer-events-none`}
                style={{background: "radial-gradient(71.81% 71.81% at 48.87% 91.42%, #F2F2F2 0%, rgba(40, 40, 40, 0.00) 100%)", filter: "blur(50px)"}}>
            </div>

        </footer>
    )
}