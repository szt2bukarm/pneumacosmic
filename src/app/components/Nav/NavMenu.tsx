"use client"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import { useStore } from "../../useStore";
import { useGSAP } from "@gsap/react";
import NavSound from "./NavSound";
import NavLanguage from "./NavLanguage";
import TransitionLink from "@/app/TransitionLink";
import AnimatedLink from "../common/AnimatedLink";


const navlinks = [
  { image: "images/bennszorult.webp", text: "BENNSZORULT LÉLEGZET", href: "/exhibition-2" },
  { image: "images/paroslab.webp", text: "PÁROS LÁBBAL A FÖLD FÖLÖTT", href: "/exhibition-3" },
  { image: "images/lelegzofal.webp", text: "VÉGTELEN TÜRELEM", href: "/exhibition-4" },
  { image: "images/fal.webp", text: "EGY FIKTÍV KUTATÁS LÁTKÉPE", href: "/exhibition-1" },
  { image: "images/akusztikus.webp", text: "AKUSZTIKUS ELEM", href: "/exhibition-5" },
]

const sublinks = [
  {
    text: "Pneuma Cosmic WIKI",
    external: true,
    href: "/"
  },
  {
    text: "Bemutatkozás",
    external: false,
    href: "/introduction"
  },
  {
    text: "Instagram",
    external: true,
    href: "/"
  },
  {
    text: "Blog",
    external: true,
    href: "/"
  },
  {
    text: "Impresszum",
    external: false,
    href: "/imprint"
  }
]

export default function NavMenu() {
    const { navOpen, setNavOpen } = useStore()
  const imageRefs = useRef<HTMLImageElement[]>([])
  const numberRefs = useRef<HTMLParagraphElement[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  const handleHover = (index: number) => {
    if (currentIndex === index) return
    setCurrentIndex(index)

    if (tweenRef.current) tweenRef.current.kill()

    // Fade out all images & numbers
    imageRefs.current.forEach((img, i) => {
      if (i !== index) gsap.to(img, { opacity: 0, duration: 0.3, ease: "power1.out" })
    })
    numberRefs.current.forEach((num, i) => {
      if (i !== index) gsap.to(num, { opacity: 0, duration: 0.3, ease: "power1.out" })
    })

    // Fade in hovered image & number
    gsap.set([imageRefs.current[index], numberRefs.current[index]], { opacity: 0, y: -50 })
    tweenRef.current = gsap.to([imageRefs.current[index], numberRefs.current[index]], {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.5,
      ease: "power2.out",
    })
  }

  useGSAP(() => {
    if (navOpen) {
        gsap.set("[data-gsap='nav-menu']", {
            opacity: 0,
            filter: "blur(50px)",
            scale: 1.2,
            pointerEvents: "none"
        })
        gsap.set("[data-gsap='nav-links']", {
            y: 20,
            opacity: 0,
        })
        gsap.set("[data-gsap='nav-navigation']", {
            opacity: 0,
            pointerEvents: "none"
        })
        gsap.to("[data-gsap='nav-navigation']", {
            opacity: 1,
            pointerEvents: "all",
            duration: 0.5
        })
        gsap.to("[data-gsap='nav-menu']", {
            opacity: 1,
            scale: 1,
            pointerEvents: "all",
            filter: "blur(0px)",
            duration: 0.5
        })
        gsap.to("[data-gsap='nav-links']", {
            y: 0,
            opacity: 1,
            delay: 0.25,
            stagger: 0.05,
            duration: 0.5
        })
    } else {
        gsap.to("[data-gsap='nav-menu']", {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.25,
        })
        gsap.to("[data-gsap='nav-navigation']", {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.25,
        })
    }
  },[navOpen])


  useEffect(() => {
    const html = document.documentElement;

    if (navOpen) {
        html.style.overflow = "hidden";
        html.style.touchAction = "none";
    } else {
        html.style.overflow = "";
        html.style.touchAction = "";
    }

    return () => {
        html.style.overflow = "";
        html.style.touchAction = "";
    }
}, [navOpen])


  return (
    <>
    {/* navigation */}
    <div data-gsap="nav-navigation" className="opacity-0 pointer-events-none fixed w-screen h-fit top-0 left-0 pt-[50px] xl:pt-[65px] px-[20px] sm:px-[40px] xl:px-[110px] flex justify-between z-[101]">
        <TransitionLink href="/">
        <img src="logo.svg" className="hidden lg:block w-[175px] cursor-pointer" />
        </TransitionLink>
        <div className="flex lg:hidden items-end gap-[40px]">
                <NavSound />
                <NavLanguage />
            </div>
        <img src="menu-close.svg" className="ml-auto w-[30px] h-[30px] hover:opacity-50 transition-opacity duration-150 cursor-pointer" onClick={() => setNavOpen(false)} />
    </div>

    <div data-gsap="nav-menu" className="fixed top-0 left-0 z-[100] opacity-0 pointer-events-none">
    <div className="relative w-screen min-h-screen bg-black" onWheel={(e) => e.stopPropagation()}>


      {/* stacked images */}
      {navlinks.map((link, index) => (
        <img
          key={index}
          ref={el => (imageRefs.current[index] = el!)}
          src={link.image}
          className="absolute inset-0 w-full h-[400px] md:h-[70vh] object-cover object-center"
          style={{ opacity: index === 0 ? 1 : 0 }}
        />
      ))}

      {/* stacked numbers */}
      {navlinks.map((_, index) => (
        <p
          key={index}
          ref={el => (numberRefs.current[index] = el!)}
          className="absolute mix-blend-overlay right-1 top-[-50px] md:top-[-250px] xl:top-0 md:right-5 text-midlight font-gara text-[400px] leading-[400px] md:text-[1000px] md:leading-[1000px] xl:text-[800px] xl:leading-[800px]"
          style={{ opacity: index === 0 ? 1 : 0 }}
        >
          {index + 1}
        </p>
      ))}

      {/* top fade */}
      <div className="absolute top-0 left-0 h-[400px] opacity-60 xl:opacity-85 w-full bg-gradient-to-t from-transparent to-black"></div>

      {/* gradient background (only visual) */}
      <div
        className="absolute hidden md:block bottom-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: `
            linear-gradient(
              to top,
              rgb(40,40,40) 0%,
              rgba(40,40,40,1) 40%,
              rgba(40,40,40,0.9) 50%,
              rgba(40,40,40,0.7) 60%,
              rgba(40,40,40,0) 100%
            )
          `,
        }}
      ></div>

      <div
        className="absolute block md:hidden bottom-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: `
            linear-gradient(
              to top,
              rgb(40,40,40) 0%,
              rgba(40,40,40,1) 60%,
              rgba(40,40,40,0.9) 70%,
              rgba(40,40,40,0.7) 75%,
              rgba(40,40,40,0) 100%
            )
          `,
        }}
      ></div>


      {/* links container (separate, scrollable) */}
      <div
  className="absolute bottom-0 left-0 w-full 
             px-[40px] md:px-[100px] pb-[80px] pt-[120px] md:pt-[120px] xl:py-[80px] 
             flex flex-col xl:flex-row xl:items-end xl:justify-between gap-[50px] 
             overflow-y-auto max-h-[90vh] md:max-h-[75vh] xl:max-h-full 
             [mask-image:linear-gradient(to_bottom,transparent,black_120px,black)] 
             [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_120px,black)] 
             [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] 
             [mask-size:100%_100%] [-webkit-mask-size:100%_100%]"
>        
        {/* navlinks list */}
        <div className="flex flex-col gap-[45px] flex-shrink-0">
          {navlinks.map((link, index) => (
            <div data-gsap="nav-links" key={index} className="relative" onMouseOver={() => handleHover(index)}>
              <p className="absolute text-midlight -top-[50px] -left-5 opacity-20 font-gara text-h1">{index + 1}</p>
              <TransitionLink href={link.href} className="font-gara text-midlight text-lg md:text-h4 cursor-pointer hover:opacity-50 transition-opacity duration-150">
                {link.text}
              </TransitionLink>
            </div>
          ))}
        </div>

        {/* extra links */}
        <div className="flex flex-col gap-[12px] flex-shrink-0">

          {sublinks.map((link, index) => (
              <div data-gsap="nav-links">
                <AnimatedLink external={false} size="small" text={link.text} href={link.href} />
              </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    </>
  )
}
