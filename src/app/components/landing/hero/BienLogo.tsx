"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function BienLogo() {
    const pathname = usePathname();

    const mainRoutes = ["/", "/hu", "/en", "/it"];
    const isMainRoute = mainRoutes.includes(pathname);

    useGSAP(() => {
        if (!isMainRoute) return;

        setTimeout(() => {
            const initLogo = () => {
            const triggerEl = document.querySelector("[data-gsap='hero-dim']");
            if (!triggerEl) {
                setTimeout(initLogo, 50);
                return;
            }

            gsap.set("[data-gsap='bien-logo']", {
                opacity: 1,
                pointerEvents: "auto"
            });

            gsap.to("[data-gsap='bien-logo']", {
                opacity: 0,
                pointerEvents: "none",
                scrollTrigger: {
                    trigger: triggerEl,
                    start: "10% top",
                    end: "30% top",
                    scrub: true,
                    invalidateOnRefresh: true,
                }
            });
        };
        initLogo();
        }, 200);

    }, [pathname]);

    if (pathname !== "/" && pathname !== "/hu" && pathname !== "/en" && pathname !== "/it") {
        return null;
    }

    return (
        <img data-gsap="bien-logo" src="/bien-logo.png" className="fixed top-[30px] right-[20px] sm:top-[35px] sm:right-[25px] 2xl:top-[60px] 2xl:right-[40px] h-[15vh] sm:h-[18.5vh] 2xl:h-[25vh] max-h-[240px] z-[50]" />
    )
}