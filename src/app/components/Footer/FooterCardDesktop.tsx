import TransitionLink from "@/app/TransitionLink";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
gsap.registerPlugin(ScrollTrigger);

interface cardInterface {
  index: number;
  number: number;
  width: string;
  image: string;
  text: string;
  href: string;
}

export default function FooterCardDesktop({
  index,
  number,
  width,
  image,
  text,
  href,
}: cardInterface) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const pathname = usePathname();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 50); 
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useGSAP(() => {
      const ctx = gsap.context(() => {
        let trigger: ScrollTrigger

        const setup = () => {
          trigger = ScrollTrigger.create({
            trigger: '[data-gsap="footer-card-image"]',
            start: "top-=300 center",
            end: "bottom+=300 center",
            scrub: true,
            animation: gsap.fromTo('[data-gsap="footer-card-image"]', 
              {y: 0},
              {y: 100,}),
          });
        }
        setTimeout(() => {
          setup();
        }, 300);
        
        return () => {
          trigger?.kill();
        };
      });
  
      return () => ctx.revert();  
  },[windowWidth]);

  return (
    <TransitionLink
      href={href}
      className={`cursor-pointer ${
        width === "full" ? "!flex-1" : "!flex-[0.5]"
      } relative flex-[0.5] transition-all duration-500 ease-in-out min-h-full
                 hover:!flex-[0_0_800px] brightness-100 group-hover:brightness-[0.2] 
                 hover:!brightness-100 group/card !overflow-hidden`}
    >
        {/*  image  */}
        <img
          data-gsap="footer-card-image"
          src={image}
          className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] scale-[1.4] w-full h-full object-cover"
        />

        {/* gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-bl 
                     from-[#0000004b] to-black z-2 opacity-0
                     group-hover/card:opacity-85 transition-opacity duration-300 ease-in-out"
        ></div>

      {/* text content */}
      <div
        className="opacity-0 -translate-x-[400px] group-hover/card:translate-x-0 pointer-events-none
                   group-hover/card:opacity-100 transition-all duration-500 ease-in-out 
                   px-[40px] pt-[30px] pb-[50px] absolute top-0 left-0 min-w-[801px] min-h-[540px] 
                   text-middark flex flex-col"
      >
        <p className="font-gara text-h1 leading-[70px] mb-auto">{number}</p>
        <p className="font-gara text-h1 leading-[90%] mb-[10px]">{text}</p>
        <p className="font-hal text-h5">{pathname == href ? "Jelenleg itt" : "Megtekintes →"}</p>
      </div>
    </TransitionLink>
  );
}
    