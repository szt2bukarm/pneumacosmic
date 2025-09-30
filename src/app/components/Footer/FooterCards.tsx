"use client";
import { useState, useRef } from "react";
import FooterCardDesktop from "./FooterCardDesktop";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import FooterCardMobile from "./FooterCardMobile";
import TransitionLink from "@/app/TransitionLink";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    width: "half",
    image: "images/fal.webp",
    text: "EGY FIKTÍV KUTATÁS LÁTKÉPE",
    href: "/exhibition-1",
  },
  {
    width: "full",
    image: "images/bennszorult.webp",
    text: "BENNSZORULT LÉLEGZET",
    href: "/exhibition-2",
  },
  {
    width: "full",
    image: "images/paroslab.webp",
    text: "PÁROS LÁBBAL A FÖLD FÖLÖTT",
    href: "/exhibition-3",
  },
  {
    width: "full",
    image: "images/lelegzofal.webp",
    text: "VÉGTELEN TÜRELEM",
    href: "/exhibition-4",
  },
  {
    width: "half",
    image: "images/akusztikus.webp",
    text: "AKUSZTIKUS ELEM",
    href: "/exhibition-5",
  },
];

export default function FooterCards() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(1);

  useGSAP(() => {
    if (!cardsRef.current.length) return;

    gsap.set(cardsRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-gsap="footer-cards"]',
        start: "top center",
        end: "bottom center",
        markers: true,
      },
    });

    tl.to(cardsRef.current, {
      opacity: 1,
      stagger: 0.02,
    });
  }, []);

  return (
    <>
      {/* Desktop Layout */}
      <div
        data-gsap="footer-cards"
        className="hidden lg:flex relative h-[540px] w-full gap-[12px] group overflow-hidden"
      >
        {cards.map((card, index) => (
          <FooterCardDesktop
            key={index}
            index={index + 1}
            width={card.width}
            image={card.image}
            text={card.text}
            href={card.href}
          />
        ))}
      </div>

      {/* Mobile Layout with Swiper */}
      <div
        data-gsap="footer-cards"
        className="lg:hidden relative h-full w-full group"
      >
        <Swiper
          spaceBetween={12}
          slidesPerView="auto"
          slidesOffsetBefore={20}
          slidesOffsetAfter={20}
          centeredSlides={false}
          className="w-full h-full"
          onBeforeInit={(swiper) => {
            const updateOffsets = () => {
              const slide = swiper.slides[0] as HTMLElement;
              if (!slide) return;
              const cardWidth = slide.offsetWidth;
              const leftPadding = 20;
              swiper.params.slidesOffsetAfter =
                window.innerWidth - cardWidth - leftPadding;
              swiper.update();
            };
          
            updateOffsets();
          
            swiper.on("resize", updateOffsets);
          }}
            onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex+1)
          }}
        >
          {cards.map((card, index) => (
            <SwiperSlide 
              key={index} 
              className="!w-[90vw] sm:!w-[60vw] md:!w-[400px] lg:!w-[450px]"
            >
              <FooterCardMobile
                index={index + 1}
                width={card.width}
                image={card.image}
                activeIndex={activeIndex}
                text={card.text}
                href={card.href}
              />
            </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}
