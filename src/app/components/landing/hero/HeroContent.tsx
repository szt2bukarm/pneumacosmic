"use client"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/src/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export default function HeroContent() {

    // hero animations
    useGSAP(() => {
        const ctx = gsap.context(() => {
            
            // initial state
            gsap.set('[data-gsap="hero-logo"]', {
                filter: "blur(100px)",
                y: 500,
                opacity: 0,
            })

            gsap.set('[data-gsap="text"]', {
                opacity: 0,
                y: 50,
                filter: "blur(10px)"
            })

            // // animate in
            gsap.to('[data-gsap="hero-logo"]', {
                filter: "blur(0px)",
                y: 0,
                opacity: 1,
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
    },[])

    // dim overlay
    useGSAP(() => {
            const ctx = gsap.context(() => {
                let trigger: ScrollTrigger;
                setTimeout(() => {
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
                animation: gsap.to('[data-gsap="hero-dim"]', {
                    opacity: 1,
                    paused: true
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
        <div data-gsap="hero-dim" className="absolute top-0 left-0 w-screen h-screen bg-dark z-20    opacity-0 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">
            <p data-gsap="text" className="px-[20px] leading-none font-hal text-md md:text-lg text-midlight text-center">KORONCZI Endre : <span className="font-gara text-lg md:text-h5">pneuma cosmic</span><br/>Kurátor : CSERHALMI Luca</p>

            <div>
            <img data-gsap="hero-logo" src="logo.svg" alt="Pneuma Cosmic logo" className="my-[20px] md:my-[70px] w-[80vw] h-[40vh] max-w-[1100px] !mix-blend-difference"/>
            </div>

            <p data-gsap="text" className="px-[80px] leading-none font-hal text-md md:text-lg text-midlight text-center">61. Velencei Képzőművészeti Biennálé, 2026<br/><span className="block mt-[30px] md:mt-0">Magyar Pavilon</span></p>
        </div>
        </>
    )
}
