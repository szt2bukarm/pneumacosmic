"use client"
import { useGSAP } from "@gsap/react"
import { useRef, useState } from "react"
import gsap from "gsap"

export default function NavSound() {
    const [soundOn, setSoundOn] = useState(true)
    const soundBars = useRef<HTMLDivElement[]>([])

    useGSAP(() => {
        if (soundOn) {
            soundBars.current.forEach((bar) => {
                const animateBar = () => {
                    gsap.to(bar, {
                        opacity: 1,
                        height: gsap.utils.random(5, 26),
                        duration: gsap.utils.random(0.4, 0.8),
                        ease: "power2.inOut",
                        onComplete: animateBar
                    })
                }
                animateBar()
            })
        } else {
            gsap.killTweensOf(soundBars.current) 
            gsap.to(soundBars.current, { height: 10,opacity:0.5, duration: 0.3 }) // reset to flat state
        }
    }, [soundOn])

    return (
        <div className="cursor-pointer flex items-end justify-end gap-[3px] min-h-[26px]" onClick={() => setSoundOn(!soundOn)}>
            {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} ref={(el) => soundBars.current[i] = el} className="w-[3px] h-[27px] bg-midlight rounded-[2px]"></div>
            ))}
        </div>
    )
}