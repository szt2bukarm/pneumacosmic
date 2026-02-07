import { useGSAP } from "@gsap/react";
import { useStore } from "../../useStore";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);


export default function NavOpener() {
    const { setNavOpen, navOpen } = useStore();
    const triggerRef = useRef<any>(null);
    const pathname = usePathname();

    const mainRoutes = ["/hu", "/en", "/it","/"]
    
    useGSAP(() => {
        if (mainRoutes.includes(pathname)) {
            gsap.to("[data-gsap='nav-opener']", {
                opacity: 0,
                pointerEvents: "none"
            })
            setTimeout(() => {
                let trigger = ScrollTrigger.create({
                trigger: "[data-gsap='hero-dim']",
                start: "20% top",
                end: "40% top",
                scrub: true,
                animation: gsap.fromTo("[data-gsap='nav-opener']", {
                    opacity: 0,
                    pointerEvents: "none"
                }, {
                    opacity: 1,
                    pointerEvents: "auto"
                })
            })
            triggerRef.current = trigger;
            }, 200);
        } else {
            requestAnimationFrame(() => {
                if (triggerRef.current) {
                    triggerRef.current.kill();
                }
                gsap.to("[data-gsap='nav-opener']", {
                    opacity: 1,
                    pointerEvents: "auto"
                })
            })
        }
    },[pathname])
    
    const MouseOver = () => {
        gsap.to("[data-gsap='nav-opener']", {
            opacity: 1,
            duration: 0.3,
        })
    }   

    const MouseOut = () => {
        gsap.to("[data-gsap='nav-opener']", {
            opacity: 0,
            duration: 0.3,
        })
    }   

    return (
        <div data-gsap="nav-opener" className={`opacity-0   ml-auto flex items-center justify-center gap-[12px] hover:opacity-50 cursor-pointer hover:brightness-50 transition-[filter] duration-150`}  onClick={() => setNavOpen(!navOpen)}>
            <p className="hidden sm:block font-hal text-lg leading-[18px] translate-y-[0.5px] text-middark">MENÜ</p>
            <img alt="menu" src="/menu-lines.svg" />
        </div>
    )
}