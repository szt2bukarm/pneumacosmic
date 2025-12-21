import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import SplitText from "gsap/src/SplitText"
import { useRef } from "react";
gsap.registerPlugin(SplitText);

interface Props {
  subtext: string,
  text: string,
  delay: number,
  shadow?: boolean
}

export default function PageTitle({ subtext, text, delay = 0,shadow=false}: Props) {
  const titleRef = useRef<HTMLParagraphElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // First split into words
      const splitWords = new SplitText(titleRef.current, { type: "words" })

      // Then split each word into chars (nested)
      const splitChars = new SplitText(splitWords.words, { type: "chars" })

      gsap.set(subtitleRef.current, {
        opacity: 0
      })

      gsap.set(splitChars.chars, {
        opacity: 0,
        rotate: 1,
        x: 10,
        y: 20,
        filter: "blur(10px)"
      })

      gsap.to(splitChars.chars, {
        opacity: 1,
        y: 0,
        x: 0,
        rotate: 0,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.035,
        delay,
        ease: "power4.out",
        onComplete: () => {
          gsap.to(subtitleRef.current, {
            opacity: 1,
            duration: 1,
            ease: "power4.out"
          })
        }
      })
    })
  })

  return (
    <div className="relative flex sm:justify-center sm:items-center pt-[160px] md:pt-[200px] z-[20] ">
      <div className="flex flex-col px-[22px] md:px-[90px] ">
        {/* <p
          ref={subtitleRef}
          className="font-hal text-middark text-md leading-[18px] sm:text-lg sm:leading-[23px]"
        >
          {subtext}
        </p> */}
        <p
          ref={titleRef}
          style={{transform: "translate3D(0, 0, 0)",filter: shadow? "drop-shadow(0px 0px 20px rgb(0, 0, 0)" : ""}}
          className="font-gara text-middark text-[10vw] leading-[10vw] sm:text-h1 sm:leading-[70px]"
        >
          {text}
        </p>
      </div>
    </div>
  )
}
