"use client"
import { useParams, usePathname } from "next/navigation";
import NavLanguage from "./NavLanguage";
import NavOpener from "./NavOpener";
import NavSound from "./NavSound";
import TransitionLink from "@/app/TransitionLink";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useStore } from "@/app/useStore";
import { useRef } from "react";

export default function Nav() {
    const pathname = usePathname();
    const {locale} = useParams();
    const {navOpen} = useStore();

    const pathRef = useRef(pathname);

    useGSAP(() => {
        console.log(pathname,locale)
        if (pathname === "/" + locale ) {
            gsap.set('[data-gsap="nav-logo"]', {
                display: "none"
            })
        } else {
            gsap.set('[data-gsap="nav-logo"]', {
                display: "block"
            })
        }


        const previousPath = pathRef.current;
        const currentPath = pathname;
        const isTransitionToHome = currentPath === "/" + locale && previousPath !== "/" + locale;

        const isTransitionFromHome = currentPath !== "/" + locale && previousPath === "/" + locale;
        if (isTransitionToHome) {
            gsap.to('[data-gsap="nav-logo"]', {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    gsap.set('[data-gsap="nav-logo"]', {
                        display: "none"
                    })
                }
            });
        }
        else if (isTransitionFromHome) {
            gsap.set('[data-gsap="nav-logo"]', {
                display: "block",
                opacity: 0,
                pointerEvents: "none" 
            });

            gsap.to('[data-gsap="nav-logo"]', {
                opacity: 1,
                duration: 0.3,
                delay: 2,
                onComplete: () => {
                    gsap.set('[data-gsap="nav-logo"]', {
                        pointerEvents: "auto"
                    })
                }
            });
        }
        else if (currentPath !== "/" + locale && previousPath !== "/" + locale) {
            setTimeout(() => {
                gsap.set('[data-gsap="nav-logo"]', {
                    opacity: 1,
                    duration: 0.3,
                    pointerEvents: "auto"
                });
            }, 2000);
        }


        pathRef.current = currentPath;

    },[pathname]);

    useGSAP(() => {
        if (navOpen) {
            gsap.to('[data-gsap="nav"]', {
                opacity: 0,
                duration: 0.3,
                onStart: () => {
                    gsap.set('[data-gsap="nav-sound"],[data-gsap="nav-opener"]', {
                        pointerEvents: "none"
                    })
                }
            })
        } else if (!navOpen) {
            gsap.to('[data-gsap="nav"]', {
                opacity: 1,
                duration: 0.3,
                delay: 0.5,
                onComplete: () => {
                    gsap.set('[data-gsap="nav-sound"],[data-gsap="nav-opener"]', {
                        pointerEvents: "auto"
                    })
                }
            })
        }
    },[navOpen])

    return (
        <div data-gsap="nav" style={{viewTransitionName: "nav"}} className={`fixed w-screen top-0 left-0 z-[50] h-[200px] pt-[50px] xl:pt-[65px] px-[20px] sm:px-[40px] xl:px-[110px] flex justify-between items-start pointer-events-none`}>

            <div data-gsap="nav-sound" className="hidden lg:flex items-end gap-[40px] mr-auto">
                {/* <NavSound /> */}
                <NavLanguage />
            </div>

            <div data-gsap="nav-logo" className="absolute left-[80px] sm:left-[100px] lg:left-[50%] top-[65px]  xl:top-[80px] translate-x-[-50%] translate-y-[-50%] flex w-fit z-[100] pointer-events-none opacity-0">
                <TransitionLink href="/" className="z-[100] pointer-events-auto">
                <img src="/logo.webp" className="w-[130px] lg:w-[175px]  z-[100] mix-blend-multiply" style={{mixBlendMode: "multiply"}} />
                </TransitionLink>
            </div>


            <NavOpener />

        </div>
    )
}