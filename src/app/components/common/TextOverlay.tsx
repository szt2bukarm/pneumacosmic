"use client"

import { useStore } from "@/app/useStore"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect } from "react";

export default function TextOverlay() {
    const {overlayText, setOverlayText} = useStore();

    useGSAP(() => {
        if (overlayText) {
            gsap.from("[data-gsap='overlay-text']", {
                opacity: 0,
                duration: 0.3,
            });
        }
    },[overlayText])

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

            <div className="flex flex-col pt-[200px] pl-[20px] lg:pl-[100px] w-[calc(100%-40px)] lg:w-[760px] overflow-y-auto max-h-[100vh]">
                <button onClick={closeOverlay} className="w-fit font-hal text-lg leading-[24px] text-midlight cursor-pointer hover:opacity-50 transition-opacity duration-150">
                ← Vissza
                </button>
                <p className="font-gara text-lg leading-[28px] text-middark mb-[70px] mt-[50px]" dangerouslySetInnerHTML={{__html: overlayText}}></p>

            </div>
            {/* <div className="absolute top-0 left-0 w-full h-full bg-[#050505] opacity-75"></div> */}
        </div>
    )
}