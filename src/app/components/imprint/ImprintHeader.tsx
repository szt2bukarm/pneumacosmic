"use client"
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ImrpintCarousel from "./ImprintCarousel";
import ImprintBackground from "./ImprintBackground";
gsap.registerPlugin(ScrollTrigger);


export default function ImprintHeader() {
    const [carouselIndex, setCarouselIndex] = useState(0)
    const imagesRef = useRef<HTMLImageElement[]>([])
    const tweenRef = useRef<gsap.core.Tween | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const [allowTimeout, setAllowTimeout] = useState<boolean>(true)


    // scroll wheel anim
    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.set('[data-gsap="scroll"]', {
                opacity:0,
            })
            gsap.set('[data-gsap="scroll-thumb"]', {
                y: 5
            })
            gsap.to('[data-gsap="scroll"]', {
                opacity:1,
                duration: 1,
                delay: 1,
                ease: "power4.out"
            })
            gsap.to('[data-gsap="scroll-thumb"]', {
                y: 0,
                yoyo: true,
                repeat: -1,
                duration: 1.5,
                delay: 1,
                ease: "power4.out"
            })
        })
    })

        // dim overlay
        useGSAP(() => {
            let trigger = ScrollTrigger.create({
                trigger: '[data-gsap="hero-dim"]',
                start: "10% top",
                end: "60% top",
                scrub: true,
                id: "hero-dim",
                onLeave: () => {
                    gsap.set('[data-gsap="hero-bg"]', {
                        display: "none"
                    })
                    setAllowTimeout(false);
                },
                onEnterBack: () => {
                    gsap.set('[data-gsap="hero-bg"]', {
                        display: "block"
                    })
                    setAllowTimeout(true);
                },
                animation: gsap.to('[data-gsap="hero-dim"]', {
                    opacity: 1,
                    paused: true
                })
            })
    
            let colorTrigger = ScrollTrigger.create({
                trigger: '[data-gsap="footer-cards"]',
                start: "-200% top",
                end: "-50% top",
                scrub: true,
                id: "hero-dim",
                animation: gsap.to('[data-gsap="hero-dim"]', {
                    backgroundColor: "#050505",
                    paused: true
                })
            })
    
    
            return () => {
                trigger.kill() 
                colorTrigger.kill()}
        }, [])


        // intro anims
        useGSAP(() => {
            const ctx = gsap.context(() => {
                gsap.set('[data-gsap="hero-el"]', {
                    y: 50,
                    filter: "blur(15px)",
                    opacity: 0,
                })
                gsap.set('[data-gsap="hero-bgimage"]', {
                    opacity: 0,
                    filter: "blur(15px)",
                    scale: 1.15
                })
                gsap.to('[data-gsap="hero-el"]', {
                    y: 0,
                    filter: "blur(0px)",
                    opacity: 1,
                    duration: 2,
                    delay: 1,
                    stagger: 0.2,
                    ease: "power4.out",
                })
                gsap.to('[data-gsap="hero-bgimage"]', {
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                    duration: 2,
                    delay: 1,
                    ease: "power4.out",
                })
            })
        })

        useGSAP(() => {

            if (!imagesRef.current) return
            if (tweenRef.current) tweenRef.current.kill()
                
                // Fade out all images & numbers
                imagesRef.current.forEach((img, i) => {
                    if (i !== carouselIndex) gsap.to(img, { opacity: 0, duration: 0.3,scale: 1.05, filter: "blur(15px)", ease: "power1.out" })
                    })

                
                // Fade in hovered image & number
                gsap.set(imagesRef.current[carouselIndex],{ opacity: 0, y: -50 })
                tweenRef.current = gsap.to(imagesRef.current[carouselIndex],  {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1,
                    ease: "power2.out",
                })
        },[carouselIndex,imagesRef.current])

        useEffect(() => {
            if (!allowTimeout) {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                    timeoutRef.current = null
                }
                return
            }

            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => {
                setCarouselIndex((prev) => {
                    if (prev === 5) return 0
                    return prev + 1
                })
            }, 5000)
        },[carouselIndex,allowTimeout])
            

    return (
        <div className="fixed top-0 left-0 w-screen h-screen">
            <div className="relative w-screen h-screen bg-black">
            <div data-gsap="hero-dim" className="absolute top-0 left-0 w-screen h-screen bg-dark z-20    opacity-0 pointer-events-none"></div>

                <ImprintBackground />
                <img data-gsap="hero-el" src="logo.svg" className="w-[50vw] md:w-[400px] absolute top-[50%] translate-y-[-50%] left-[20px] md:left-[60px] xl:left-[110px] z-[10]" />
                <div className="absolute bottom-[50px] left-[20px] md:left-[60px] xl:left-[110px] flex flex-col 2xl:flex-row md:w-[calc(100%-220px)] gap-[25px] md:gap-[40px] 2xl:gap-[100px] z-[10]">
                    <p data-gsap="hero-el" className="leading-none font-hal text-md md:text-lg text-midlight text-left">KORONCZI Endre : <span className="font-gara text-lg md:text-h5">pneuma cosmic</span><br/>Kurátor : CSERHALMI Luca</p>
                    <p data-gsap="hero-el" className="leading-none font-hal text-md md:text-lg text-midlight text-left">61. Velencei Képzőművészeti Biennálé, 2026<br/><span className="block mt-[25px] md:mt-0">Magyar Pavilon</span></p>

                        <div data-gsap="hero-el" className="hidden 2xl:block ml-auto">
                        <svg width="43" height="55" viewBox="0 0 43 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.43 0C9.61337 0 0 9.61337 0 21.43V33.3427C0 45.1593 9.61337 54.7727 21.43 54.7727C33.2466 54.7727 42.86 45.1593 42.86 33.3427V21.43C42.86 9.61337 33.2466 0 21.43 0ZM37.2077 33.3427C37.2077 42.0427 30.13 49.1204 21.43 49.1204C12.73 49.1204 5.65226 42.0427 5.65226 33.3427V21.43C5.65226 12.73 12.73 5.65226 21.43 5.65226C30.13 5.65226 37.2077 12.73 37.2077 21.43V33.3427Z" fill="#8C8C8C" fill-opacity="0.3"/>
                            <path data-gsap="scroll-thumb" d="M21.5019 15C18.4689 15 16 17.4678 16 20.5019C16 23.536 18.4678 26.0038 21.5019 26.0038C24.536 26.0038 27.0038 23.536 27.0038 20.5019C27.0038 17.4678 24.536 15 21.5019 15Z" fill="#8C8C8C" fill-opacity="0.3"/>
                        </svg>
                        </div>
                    </div>

                <div data-gsap="hero-bgimage" className="w-screen h-screen relative !z-[5] opacity-75">
                    <img ref={el => {imagesRef.current[0] = el}} src="images/saroslab.webp" className="absolute top-0 left-0 w-full h-[110vh] object-cover" />
                    <img ref={el => {imagesRef.current[1] = el}} src="images/fal.webp" className="absolute top-0 left-0 w-full h-[110vh] object-cover" />
                    <img ref={el => {imagesRef.current[2] = el}} src="images/bennszorult.webp" className="absolute top-0 left-0 w-full h-[110vh] object-cover" />
                    <img ref={el => {imagesRef.current[3] = el}} src="images/paroslab.webp" className="absolute top-0 left-0 w-full h-[110vh] object-cover" />
                    <img ref={el => {imagesRef.current[4] = el}} src="images/lelegzofal.webp" className="absolute top-0 left-0 w-full h-[110vh] object-cover" />
                    <img ref={el => {imagesRef.current[5] = el}} src="images/akusztikus.webp" className="absolute top-0 left-0 w-full h-[110vh] object-cover" />
                </div>
                <ImrpintCarousel index={carouselIndex} setIndex={setCarouselIndex}/>
            </div>
        </div>
    )    
    
}