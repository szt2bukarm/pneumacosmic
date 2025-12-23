"use client"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/src/ScrollTrigger"
import { useStore } from "@/app/useStore"
gsap.registerPlugin(ScrollTrigger)

export default function HeroContent() {
    const { isMobile } = useStore();

    // hero animations
    useGSAP(() => {
        const ctx = gsap.context(() => {

            // initial state
            gsap.set('[data-gsap="hero-logo"]', {
                filter: isMobile ? "blur(20px)" : "blur(100px)",
                y: 500,
                opacity: 0,
            })

            gsap.set('[data-gsap="text"]', {
                opacity: 0,
                y: 50,
                filter: isMobile ? "blur(10px)" : "blur(10px)"
            })

            // // animate in
            gsap.to('[data-gsap="hero-logo"]', {
                filter: "blur(0px)",
                y: 0,
                opacity: 0.75,
                delay: 1,
                duration: 3,
                ease: "power4.out"
            })

            gsap.to('[data-gsap="text"]', {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.5,
                delay: 2,
                stagger: 0.2,
                ease: "power4.out"
            })

        })

        return () => ctx.revert()
    }, [])

    // dim overlay
    useGSAP(() => {
        const ctx = gsap.context(() => {
            let trigger: ScrollTrigger;
            setTimeout(() => {
                let colorTrigger: ScrollTrigger;
                trigger = ScrollTrigger.create({
                    trigger: '[data-gsap="hero-dim"]',
                    start: "10% top",
                    end: "50% top",
                    scrub: true,
                    id: "hero-dim",
                    onLeave: () => {
                        gsap.set('[data-gsap="hero-bg"]', {
                            display: "none"
                        })
                    },
                    onEnterBack: () => {
                        gsap.set('[data-gsap="hero-bg"]', {
                            display: "block"
                        })
                    },
                    animation: gsap.fromTo('[data-gsap="hero-dim"]', {
                        opacity: 0,
                    }, {
                        opacity: 1,
                    })
                })

                colorTrigger = ScrollTrigger.create({
                    trigger: '[data-gsap="landing-text"]',
                    start: "20% top",
                    end: "90% top",
                    scrub: true,
                    animation: gsap.fromTo('[data-gsap="hero-dim"]', {
                        background: "#282828"
                    }, {
                        background: "#050505"
                    })
                })
            }, 100);


            return () => {
                trigger?.kill()
            }
        })
        return () => ctx.revert()
    }, [])



    return (
        <>
            <div data-gsap="hero-dim" className="absolute top-0 left-0 w-screen h-screen bg-dark z-20 opacity-0 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">

                {/* <img src="bien-logo.png" className="absolute top-[120px] md:top-[110px] xl:top-[130px] right-2 md:right-5 w-[120px] sm:w-[150px] lg:w-[12vw] xl:w-[10vw] max-w-[200px]"/> */}

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !mix-blend-difference">
                    <p data-gsap="text" className="leading-none font-hal text-md md:text-lg text-midlight text-left lg:text-center">KORONCZI Endre</p>

                    <div className="my-[20px] xl:my-[30px] w-[95vw] max-w-[1400px] lg:h-[45vh]">
                        <img
                            data-gsap="hero-logo"
                            src="/logo.webp"
                            alt="Pneuma Cosmic logo"
                            className="w-full h-full aspect-[1137/423] object-contain opacity-75"
                        />
                    </div>
                </div>

                <div className="z-10 flex flex-col lg:flex-row lg:items-end gap-[20px] lg:gap-[65px] w-[95vw] lg:w-[90vw] mb-[70px] mt-auto">
                    <p data-gsap="text" className="leading-none font-hal text-md md:text-lg text-midlight text-left">kurátor: Cserhalmi Luca<br></br>szervező: Ludwig Múzeum<br></br>nemzeti biztos: Fabényi Julia</p>
                    <p data-gsap="text" className="leading-none font-hal text-md md:text-lg text-midlight text-left">61. Velencei Képzőművészeti Biennále, 2026<br /><span className="block mt-[30px] md:mt-0">Magyar Pavilon</span></p>

                    <div
                        data-gsap="scroll"
                        className="ml-auto hidden lg:block"
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

                </div>

            </div>
        </>
    )
}
