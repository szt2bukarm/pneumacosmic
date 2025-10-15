import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useState } from "react";
gsap.registerPlugin(ScrollTrigger);

export default function PinnedImageReveal() {

  // reveal anim
  useGSAP(() => {
    const ctx = gsap.context(() => {
      let trigger: ScrollTrigger;
      setTimeout(() => {
        trigger = ScrollTrigger.create({
          trigger: '[data-gsap="exhibition-2-pinned-reveal"]',
          start: "top-=300 30%",
          onEnter: () => {
            gsap.to("[data-gsap='exhibition-2-pinned-reveal-left']", {
              rotate: 3,
              x: 0,
              opacity: 1,
              duration: 1.5,
              ease: "power4.out"
            });
            gsap.to("[data-gsap='exhibition-2-pinned-reveal-right']", {
              rotate: -4.5,
              x: 0,
              opacity: 1,
              duration: 1.5,
              delay: 0.25,
              ease: "power4.out"
            });
          }
        });
      }, 100);

      return () => {
        trigger.kill();
      }
    });

    return () => ctx.revert();
  }, []);

  // scroll anims
  useGSAP(() => {

    const ctx = gsap.context(() => {
      let trigger : ScrollTrigger
      setTimeout(() => {
        const items = '[data-gsap="exhibition-2-pinned-reveal-item"]';
        const container = '[data-gsap="exhibition-2-pinned-reveal"]';
  
        const scaleAnim = gsap.to(items, {
          scale: 1,
          stagger: 5,
          duration: 5,
          paused: true
        });
  
        trigger = ScrollTrigger.create({
          trigger: container,
          start: "top top+=15%",
          end: "bottom+=300 top",
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            scaleAnim.progress(self.progress);
          },  
        });
      }, 100);

      return () => {
        trigger.kill();
      }
    });

    return () => ctx.revert();
  }, []);
  
  return (
    <div
      data-gsap="exhibition-2-pinned-reveal"
      className="flex flex-col md:flex-row md:items-center justify-center"
    >
      {/* LEFT SIDE */}
      <div 
        data-gsap="exhibition-2-pinned-reveal-left"
        className="opacity-0 translate-x-[-1000px] rotate-[-23deg] relative min-h-[50vh] md:min-h-[75vh] w-[80%] md:w-[60%]"
      >
        {/* NEW WRAPPER only for the left side */}
        <div 
          className="absolute inset-0 w-full h-full translate-y-[80px] sm:translate-y-0"
          data-gsap="exhibition-2-pinned-reveal-left-inner"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <img
              data-gsap="exhibition-2-pinned-reveal-item"
              src={`images/exhibition-2/MTA/${i + 1}.webp`}
              className={`${i === 0 ? "scale-100" : "scale-0"} absolute inset-0 w-full h-full object-cover`}
              key={i}
            />
          ))}
        </div>
      </div>

      {/* RIGHT SIDE (unchanged, original) */}
      <div
        data-gsap="exhibition-2-pinned-reveal-right"
        className="ml-auto w-[65%] md:w-[40%] opacity-0 translate-x-[1000px] rotate-[22.5deg]"
      >
        <img
          src="images/exhibition-2/MTA/0.webp"
          className="w-full h-full object-cover translate-y-[-30px] sm:translate-y-[-130px] md:-translate-y-0"
        />
      </div>
    </div>
  );
}
