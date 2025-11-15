"use client"
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {

    useGSAP(() => {
        gsap.set('[data-gsap="scroll"]', { opacity: 0 });
        gsap.set('[data-gsap="scroll-thumb"]', { y: 5 });

        gsap.to('[data-gsap="scroll"]', {
            opacity: 1,
            duration: 1,
            delay: 1,
            ease: "power4.out",
        });

        gsap.to('[data-gsap="scroll-thumb"]', {
            y: 0,
            yoyo: true,
            repeat: -1,
            duration: 1.5,
            delay: 1,
            ease: "power4.out",
        });
    });


    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-dark">
            <div data-gsap="hero" className="relative w-full h-full">

                <HeroBackground />
                <HeroContent />

                <div
                    data-gsap="scroll"
                    className="z-10 absolute bottom-[40px] left-1/2 translate-x-[-50%]"
                >
                    <svg width="43" height="55" viewBox="0 0 43 55" fill="none">
                        <path
                            d="M21.43 0C9.61337 0 0 9.61337 0 21.43V33.3427C0 45.1593 9.61337 54.7727 21.43 54.7727C33.2466 54.7727 42.86 45.1593 42.86 33.3427V21.43C42.86 9.61337 33.2466 0 21.43 0ZM37.2077 33.3427C37.2077 42.0427 30.13 49.1204 21.43 49.1204C12.73 49.1204 5.65226 42.0427 5.65226 33.3427V21.43C5.65226 12.73 12.73 5.65226 21.43 5.65226C30.13 5.65226 37.2077 12.73 37.2077 21.43V33.3427Z"
                            fill="#8C8C8C"
                            fillOpacity="0.3"
                        />
                        <path
                            data-gsap="scroll-thumb"
                            d="M21.5019 15C18.4689 15 16 17.4678 16 20.5019C16 23.536 18.4678 26.0038 21.5019 26.0038C24.536 26.0038 27.0038 23.536 27.0038 20.5019C27.0038 17.4678 24.536 15 21.5019 15Z"
                            fill="#8C8C8C"
                            fillOpacity="0.3"
                        />
                    </svg>
                </div>

                <div className="!z-1 absolute bottom-0 left-0 w-screen h-[300px] bg-gradient-to-t from-dark to-transparent"></div>
            </div>
        </div>
    );
}
