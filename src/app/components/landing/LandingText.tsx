"use client"
import SplitText from "gsap/SplitText"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/src/ScrollTrigger"
import StaggeredSplitText from "../common/StaggeredSplitText"
gsap.registerPlugin(SplitText, ScrollTrigger)

export default function LandingText() {

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const text = document.querySelectorAll('[data-gsap="landing-text"]')
            const split = new SplitText(text, {type:"words"})
            gsap.set(split.words, {
                opacity: 0,
                y: 20,
                filter: "blur(10px)",
                willChange: "filter"
            })

            let trigger = ScrollTrigger.create({
                trigger: '[data-gsap="landing-text"]',
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
    })

    return (
        <div className="mt-[100vh] relative w-screen h-fit py-[70px] md:py-[100px] xl:py-[120px] flex items-center justify-center flex-col gap-[85px] z-10">
            <StaggeredSplitText>
            Koronczi Endre <span className="font-garabold">pneuma cosmic</span> című kiállítástervében meghatározó a lassúság, a megfigyelés és az elvont asszociációs gondolatok ötvözéséből születő légkör. A koncepció alapja egy fiktív kutatás, mely a világ egészét kitöltő, légmozgásként megmutatkozó <span className="font-garaitalic">kozmikus lehelet</span> megjelenési formáit tárja fel.<br></br><br></br>Ennek folyamán a tudományos kutatások logikája és a mélyen metaforikus, asszociatív gondolatpárhuzamok egyaránt megjelennek, mely a kiállítás bejárásának folyamán feloldódik, bizonyítás helyett egy homályosan körvonalazható sejtést mutatva be. 
            </StaggeredSplitText>

            <StaggeredSplitText><span className="opacity-50">A konceptualista, efemer művekből<br></br>felépülő kiállítás</span> öt elemre osztható: </StaggeredSplitText>
            

        </div>
    )
}