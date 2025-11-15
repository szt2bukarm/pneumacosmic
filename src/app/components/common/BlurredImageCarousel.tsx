"use client"
import { useStore } from "@/app/useStore"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useEffect, useState, useLayoutEffect } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger);

interface Props {
  images: { src: string; text?: string }[]
  title: string
  trigger?: boolean
}

export default function BlurredImageCarousel({ images,title,trigger=true }: Props) {
  const { setGalleryOpen, setGalleryImages,setGalleryTitle, isMobile } = useStore()
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [imageWidth,setImageWidth] = useState(950);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width,setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);
  const textRef = useRef<HTMLParagraphElement>(null);
  
    const openGallery = () => {
      setGalleryOpen(true)
      setGalleryImages(images)
      setGalleryTitle(title)
    }

    useGSAP(() => {
      if (!trigger) return;
      const ctx = gsap.context(() => {
        setTimeout(() => {
          gsap.set(carouselRef.current, {
            opacity: 0.001,
          })
          let trigger = ScrollTrigger.create({
            trigger: carouselRef.current,
            start: "top-=200 center",
            end: "top+=100 center",
            scrub: true,
            animation: gsap.to(carouselRef.current, {
              opacity: 1,
            }),
          })
          let textTrigger = ScrollTrigger.create({
            trigger: carouselRef.current,
            start: "top-=200 center",
            end: "top+=100 center",
            scrub: true,
            animation: gsap.fromTo(textRef.current, {
              opacity: 0,
            },{
              opacity: 1,
            }),
          })
          return () => {
            trigger.kill();
            textTrigger.kill();
          }
        }, 100);
      })
      return () => ctx.revert();
    },[])

    useGSAP(() => {
      if (!imagesRef.current?.length) return;
            
      const ctx = gsap.context(() => {
        const triggers: ScrollTrigger[] = [];
        setTimeout(() => {
    
        imagesRef.current.forEach((image) => {
          const trigger = ScrollTrigger.create({
            trigger: image,
            start: "top-=200 center",
            end: "bottom+=200 center",
            scrub: true,
            animation: gsap.fromTo(image, { y: "-5%" }, { y: "5%" }),
          });
          triggers.push(trigger);
        });
    
      }, 100);

        return () => {
          triggers.forEach((t) => t.kill());
        };
      });
    
      return () => ctx.revert();
    
    }, []);
    

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      handleResize(); 
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    useEffect(() => {
      if (width < 768) setImageWidth(323);
      else if (width < 1024) setImageWidth(555);
      else setImageWidth(960);
    }, [width]);
    
    const blurRef = useRef<HTMLDivElement>(null);
    const sharpRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);
    
    useGSAP(() => {
      if (!blurRef.current || !sharpRef.current) return;
    
      const blurEl = blurRef.current;
      const sharpEl = sharpRef.current;
    
      if (tweenRef.current) tweenRef.current.kill();
      gsap.set([blurEl, sharpEl], { x: 0 });
      tweenRef.current = gsap.to([blurEl, sharpEl], {
        x: -(imageWidth * images.length),
        duration: images.length * 10,
        repeat: -1,
        ease: "none",
      });
    
      return () => tweenRef.current?.kill();
    }, [images, imageWidth]);

  return (
    <>
    <div
    ref={carouselRef}
      className="relative w-full h-[200px] md:h-[350px] lg:h-[600px] overflow-visible cursor-pointer z-10"
      onClick={openGallery}
    >
        <div
          ref={blurRef}
          className={`${isMobile && "hidden"} flex absolute top-0 left-0  gap-[3px] md:gap-[5px] lg:gap-[10px] h-full overflow-visible opacity-75`}
        >
          {images.concat(images).map((image, i) => (
            <div className="w-[320px] md:w-[550px] lg:w-[950px] h-full">
            <img key={i} src={image.src} className="h-full w-full blur-[100px] object-cover" />
            </div>
          ))}
        </div>

      <div ref={sharpRef} className="absolute top-0 left-0 flex gap-[3px] md:gap-[5px] lg:gap-[10px] h-full overflow-visible">
        {images.concat(images).map((image, i) => (
          <div className="relative h-full w-[320px] md:w-[550px] lg:w-[950px] overflow-hidden">
          <img key={i} src={image.src} ref={el => imagesRef.current[i] = el} className="scale-110 h-full w-full object-cover" />

          {/* {image.text && (
            <>
              <div className="!pointer-events-none z-10 absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-black to-transparent"></div>
              <p className="!pointer-events-none z-20 absolute bottom-5 left-5 font-hal text-lg text-middark">{image.text}</p>            
            </>
          )} */}

          </div>
        ))}
    </div>

    </div>
    <p ref={textRef} className="relative font-hal text-midlight text-sm leading-[15px] text-center my-[20px] mx-auto w-[calc(100%-40px)] md:w-[600px] xl:w-[800px] z-10">{title}</p>
    </>

  )
}
