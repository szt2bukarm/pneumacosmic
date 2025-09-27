import SplitText from "gsap/SplitText"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/src/ScrollTrigger"
import { useRef } from "react"
gsap.registerPlugin(SplitText, ScrollTrigger)


export default function StaggeredSplitText({children}: {children: React.ReactNode}) {
    const textRef = useRef<HTMLParagraphElement>(null)

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const split = new SplitText(textRef.current, {type:"words"})
            gsap.set(split.words, {
                opacity: 0,
                y: 20,
                filter: "blur(10px)",
                willChange: "filter"
            })

            let trigger = ScrollTrigger.create({
                trigger: textRef.current,
                start: "top-=200 center",
                end: "bottom-=200 center",
                scrub: true,
                animation: gsap.to(split.words, {
                    opacity: 1,
                    y: 0,
                    duration: 20,
                    stagger: 1,
                    filter: "blur(0px)",
                })
            })

            const handleResize = () => {
                trigger.refresh()
            }

            window.addEventListener("resize", handleResize)

            return () => {
                trigger.kill()
                window.removeEventListener("resize", handleResize)
            }
        })

        return () => ctx.revert()
    })


    return (
        <p ref={textRef} className="leading-[135%] font-gara text-middark text-lg md:text-h4 w-[90vw] xl:w-[1050px]">{children}
        </p>
    )
}