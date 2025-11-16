"use client"

import { useStore } from "@/app/useStore"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import AnimatedLink from "./AnimatedLink";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText)

export default function TextOverlay() {
    const {overlayText,overlayWiki, setOverlayText} = useStore();
    const textRef = useRef<HTMLParagraphElement>(null);
    const pathname = usePathname();
    const splitRef = useRef<SplitText | null>(null);

    useEffect(() => {
        closeOverlay();
    },[pathname])

    useGSAP(() => {
        if (overlayText) {
            gsap.from("[data-gsap='overlay-text']", {
                opacity: 0,
                duration: 0.3,
            });
        }
    },[overlayText])

    const splitLines = () => {
        if (!textRef.current) return;

        // revert previous split first
        splitRef.current?.revert();

        const split = new SplitText(textRef.current, { type: "lines" });
        splitRef.current = split;

        split.lines.forEach((line) => {
            const wrap = document.createElement("div");
            wrap.style.display = "block";
            wrap.style.overflow = "hidden";
            wrap.style.width = "100%";
            line.parentNode?.insertBefore(wrap, line);
            wrap.appendChild(line);
        });

        gsap.from(split.lines, {
            y: -30,
            duration: 1.5,
            stagger: 0.03,
            ease: "power4.out"
        });
    }

    useEffect(() => {
        if (!overlayText) return;

        splitLines(); // initial split

        const handleResize = () => {
            splitLines();
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            splitRef.current?.revert();
        }
    }, [overlayText]);

    useEffect(() => {
        const html = document.documentElement;
    
        if (overlayText) {
            html.style.overflow = "hidden";
            html.style.touchAction = "none";
        } else {
            html.style.overflow = "";
            html.style.touchAction = "";
        }
    
        return () => {
            html.style.overflow = "";
            html.style.touchAction = "";
        }
    }, [overlayText])
    
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && overlayText) {
                closeOverlay();
            }
        };
    
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [overlayText]);

    const closeOverlay = () => {
        gsap.to("[data-gsap='overlay-text']", {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                setOverlayText("");
            }
        });
    }

    if (!overlayText) {
        return null;
    }

    return (
        <div data-gsap="overlay-text" className="fixed top-0 left-0 w-screen h-screen z-[30] bg-[#050505d5]" onWheel={(e) => e.stopPropagation()}>

            <div className="flex flex-col pt-[150px] md:pt-[200px] pl-[20px] lg:pl-[100px] w-[calc(100%-40px)] lg:w-[760px] overflow-y-auto max-h-[100vh] pb-[100px]">
                <button onClick={closeOverlay} className="w-fit font-hal text-lg leading-[24px] text-midlight cursor-pointer hover:opacity-50 transition-opacity duration-150">
                ← Vissza
                </button>
                <p ref={textRef} className="font-gara text-md leading-[20px] sm:text-lg sm:leading-[28px] text-middark mb-[70px] mt-[50px]" dangerouslySetInnerHTML={{__html: overlayText}}></p>
                {overlayWiki && (
                <AnimatedLink external={true} size="large" text="Pneuma Cosmic WIKI" href="https://hu.wikipedia.org/wiki/Pneuma_Cosmic" />
                )}
            </div>
        </div>
    )
}