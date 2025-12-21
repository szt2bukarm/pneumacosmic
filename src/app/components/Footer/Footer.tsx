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
import { useLayoutEffect } from "react";
import { useStore } from "@/app/useStore";
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const pathname = usePathname();
    const {setOverlayText,setOverlayWiki} = useStore();

    const openNationalCommissioner = () => {
        setOverlayWiki(false);
        setOverlayText("A Velencei Biennálé nemzeti biztosa dr. Fabényi Julia, a Ludwig Múzeum igazgatója. Szervező intézmény: Ludwig Múzeum")
    }

    const OpenBienalle = () => {
        setOverlayWiki(false);
        setOverlayText("Ludwig Múzeum, Velencei Biennálé Iroda: Boros Géza a VBI vezetője, Bálványos Anna főmuzeológus coordinátor, Lakó Zsigmond olasz referens")
    }

    const openContact = () => {
        console.log("OpenContact")
        setOverlayWiki(false);
        setOverlayText("e-mail: <a href='mailto:biennale@ludwigmuseum.hu'>biennale@ludwigmuseum.hu</a><br>e-mail: <a href='mailto:pneumacosmic@gmail.com'>pneumacosmic@gmail.com</a><br>tel: (+36 1) 555 3484")
    }

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


    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            let trigger: ScrollTrigger;
            setTimeout(() => {
                gsap.set('[data-gsap="footer-bg"]', {
                    opacity: 0.001,
                })
                trigger = ScrollTrigger.create({
                    trigger: '[data-gsap="footer"]',
                    start: "top top",
                    end: "bottom+=200 top",
                    animation: gsap.to('[data-gsap="footer-bg"]', {
                        opacity: 1,
                        duration: 3,
                        ease: "power4.out",
                    })
                })
            }, 100);

            return () => {
                trigger?.kill();
            }
        })

        return () => ctx.revert()
    },[])

    return (
        <footer data-gsap="footer" style={{background: pathname === "/" ? "#282828" : "transparent"}} className="relative h-fit w-screen overflow-hidden">
            <FooterCards />
            <div className="h-[70px] sm:h-[100px] md:h-[200px] w-full"></div>

            {/* <FooterText /> */}

            <div data-gsap="footer-links">
                <FooterLinks openContact={openContact}/>
                <FooterLinksMedium openContact={openContact}/>
                <FooterLinksMobile openContact={openContact}/>

                {/* <a href="https://www.labiennale.org/en" target="_blank" className="hidden absolute bottom-0 right-20 h-[190px] w-[170px] p-[16px] md:flex items-start justify-start bg-[#D9D9D9] z-10">
                    <img alt="footer banner" src="/footerbanner.svg" className="w-full h-fit" />
                </a> */}
            </div>

            <div data-gsap="footer-bg" className={`absolute inset-0 translate-y-[500px] left-1/2 -translate-x-1/2 w-[130vw] md:w-screen md:translate-x-0 md:left-0 pointer-events-none`}
                style={{background: "radial-gradient(71.81% 71.81% at 48.87% 91.42%, #F2F2F2 0%, rgba(40, 40, 40, 0.00) 100%)", filter: "blur(50px)"}}>
            </div>

        </footer>
    )
}