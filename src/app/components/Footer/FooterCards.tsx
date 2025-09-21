"use client"
import FooterCardDesktop from "./FooterCardDesktop";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import TransitionLink from "@/app/TransitionLink";
gsap.registerPlugin(ScrollTrigger);


const cards = [
    {
        width: "half",
        image: "images/fal.webp",
        text: "EGY FIKTÍV KUTATÁS LÁTKÉPE",
        href: "/exhibition-1"
    },
    {
        width: "full",
        image: "images/bennszorult.webp",
        text: "BENNSZORULT LÉLEGZET",
        href: "/exhibition-2"
    },
    {
        width: "full",
        image: "images/paroslab.webp",
        text: "PÁROS LÁBBAL A FÖLD FÖLÖTT",
        href: "/exhibition-3"
    },
    {
        width: "full",
        image: "images/lelegzofal.webp",
        text: "VÉGTELEN TÜRELEM",
        href: "/exhibition-4"
    },
    {
        width: "half",
        image: "images/akusztikus.webp",
        text: "AKUSZTIKUS ELEM",
        href: "/exhibition-5"
    },

]


export default function FooterCards() {
    const cardsRef = useRef<HTMLDivElement[]>([]);


    useGSAP(() => {
        if (!cardsRef.current.length) return;
      
        // Set initial positions
        gsap.set(cardsRef.current, { opacity: 0 });
      
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '[data-gsap="footer-cards"]',
            start: "top center",
            end: "bottom center",
            markers: true,
          }
        });
      
        // Animate each card into place
        tl.to(cardsRef.current, {
          opacity: 1,
          stagger: 0.02
        });
      }, []);
      
    return (
      <div data-gsap="footer-cards" className="relative h-[540px] w-full flex gap-[12px] group">

        {cards.map((card, index) => (

            <FooterCardDesktop
            index={index + 1}
            width={card.width}
            image={card.image}
            text={card.text}
            href={card.href}/>

        ))}

      </div>
    );
  }
  