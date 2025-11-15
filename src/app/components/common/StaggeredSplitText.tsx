import SplitText from "gsap/SplitText"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/src/ScrollTrigger"
import { useRef } from "react"
import { useStore } from "@/app/useStore"
gsap.registerPlugin(SplitText, ScrollTrigger)


export default function StaggeredSplitText({children}: {children: React.ReactNode}) {
    const textRef = useRef<HTMLParagraphElement>(null)
    const {isMobile} = useStore()

  // ----- separate function for desktop -----
  const animateDesktop = () => {
    const split = new SplitText(textRef.current, { type: "words" })
    gsap.set(split.words, { opacity: 0, y: 20,filter: "blur(4px)", willChange: "filter" })

    const trigger = ScrollTrigger.create({
      trigger: textRef.current,
      start: "top-=200 60%",
      end: "bottom-=200 60%",
      scrub: true,
      animation: gsap.to(split.words, {
        opacity: 1,
        y: 0,
        duration: 30,
        stagger: 1,
        filter: "blur(0px)",
      }),
    })

    return { split, trigger }
  }

  // ----- separate function for mobile -----
  const animateMobile = () => {
    const split = new SplitText(textRef.current, { type: "words" })
    gsap.set(split.words, { opacity: 0, y: 15, })

    const trigger = ScrollTrigger.create({
      trigger: textRef.current,
      start: "top 60%",
      end: "bottom 60%",
      scrub: true,
      animation: gsap.to(split.words, {
        opacity: 1,
        y: 0,
        duration: 20,
        stagger: 2,
      }),
    })

    return { split, trigger }
  }

  // ----- useGSAP hook -----
  useGSAP(() => {
    if (isMobile === null) return
    const ctx = gsap.context(() => {
      let split: SplitText | null = null
      let trigger: ScrollTrigger | null = null

      setTimeout(() => {
        if (isMobile) {
          ({ split, trigger } = animateMobile())
        } else {
          ({ split, trigger } = animateDesktop())
        }
      }, 100);

      const handleResize = () => trigger?.refresh()
      window.addEventListener("resize", handleResize)

      return () => {
        trigger?.kill()
        window.removeEventListener("resize", handleResize)
        split?.revert()
      }
    })

    return () => ctx.revert()
  }, [isMobile])

    return (
        <p ref={textRef}
        className="leading-[135%] font-gara text-middark text-lg md:text-h4 w-[90vw] xl:w-[1050px]">{children}
        </p>
    )
}