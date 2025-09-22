"use client"
import { useGSAP } from "@gsap/react";
import FooterCards from "./FooterCards";
import FooterLinks from "./FooterLinks";
import FooterLinksMedium from "./FooterLinksMedium";
import FooterLinksMobile from "./FooterLinksMobile";
import FooterText from "./FooterText";
import gsap from "gsap";

export default function Footer() {

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.set('[data-gsap="footer-links"]', {
                y: 50,
                opacity: 0
            })

            gsap.set('[data-gsap="footer-bg"]', {
                y: 900
            })

            gsap.to('[data-gsap="footer-links"]', {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: '[data-gsap="footer-links"]',
                    start: "20% bottom",
                    end: "bottom bottom",
                    scrub: true,
                }
            })

            gsap.to('[data-gsap="footer-bg"]', {
                y: 800,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: '[data-gsap="footer-links"]',
                    start: "10% bottom",
                    end: "bottom bottom",
                    scrub: true,
                }
            })
        })
    })


    return (
        <footer className="relative h-fit w-full overflow-hidden">
            <FooterCards />
            <FooterText />

            <div data-gsap="footer-links">
                <FooterLinks />
                <FooterLinksMedium />
                <FooterLinksMobile />

                <div className="hidden absolute bottom-0 right-20 h-[190px] w-[170px] p-[16px] md:flex items-start justify-start bg-white">
                    <img src="/footerbanner.svg" className="w-full h-fit" />
                </div>
            </div>

            <div data-gsap="footer-bg" className="absolute inset-0 translate-y-[800px] w-full pointer-events-none"
                    style={{background: "radial-gradient(71.81% 71.81% at 48.87% 91.42%, #F2F2F2 0%, rgba(40, 40, 40, 0.00) 100%)", filter: "blur(50px)"}}>
                </div>

        </footer>
    )
}