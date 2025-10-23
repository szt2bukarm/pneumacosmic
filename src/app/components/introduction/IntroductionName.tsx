"use client"
import gsap from "gsap"
import { useLayoutEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function IntroductionName({name}: {name: string}) {
    const nameRef = useRef<HTMLParagraphElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(nameRef.current, { 
                opacity: 0,
                y: 20,
                filter: "blur(10px)"
            });
            let trigger = ScrollTrigger.create({
                trigger: nameRef.current,
                start: "top-=200 center",
                end: "bottom+=200 center",
                scrub: true,
                animation: gsap.to(nameRef.current, {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    delay: 0.2,
                    duration: 2,
                    ease: "power4.out"
                }),
            });
            return () => {
                trigger.kill();
            };
        });
        return () => ctx.revert();
    },[])

    return (
        <p ref={nameRef} className="font-gara text-middark text-h4 sm:text-h3 md:text-h2 lg:text-h1 w-[90vw] xl:w-[1050px]">{name}</p>
    )
}