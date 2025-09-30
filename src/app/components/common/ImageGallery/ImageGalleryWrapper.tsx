"use client"
import { useEffect, useRef } from "react";
import ImageGallery from "./ImageGallery";
import { useStore } from "@/app/useStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ImageGalleryMobile from "./ImageGalleryMobile";

export default function ImageGalleryWrapper() {
    const galleryWrapper = useRef<HTMLDivElement | null>(null);
    const galleryItem = useRef<HTMLDivElement | null>(null);
    const { galleryImages: images, setGalleryOpen, galleryOpen } = useStore();
    const subtitleRef = useRef<HTMLParagraphElement | null>(null);


    useGSAP(() => {
        if (galleryOpen) {
            gsap.set(galleryWrapper.current, {opacity: 0})
            gsap.set(galleryItem.current, { x: 1500, y:500, rotate: -20 })
            gsap.to(galleryWrapper.current, {opacity: 0.75, duration: 1, ease: "power4.out"})
            gsap.to(galleryItem.current, { x: 0,y:0,rotate:0, duration: 1, ease: "power4.out"})
        }
      }, [galleryOpen]);
    
    

    const closeGallery = () => {
        gsap.to(galleryItem.current, {opacity: 0,x: 500, duration: 0.5,ease: "power4.out"})
        gsap.to(galleryWrapper.current, {opacity: 0, duration: 0.5, onComplete: () => {
            setGalleryOpen(false)
        }})
      }

      useEffect(() => {
        const html = document.documentElement;
    
        if (galleryOpen) {
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
    }, [galleryOpen])

      if (!galleryOpen) return null;

    return (
        <div className='fixed top-0 left-0 w-screen h-screen z-[100]' onWheel={(e) => e.stopPropagation()}>
        <div ref={galleryWrapper} className='absolute top-0 left-0 w-screen h-screen bg-black opacity-75' onClick={closeGallery}></div>


            <div ref={galleryItem}  className='absolute top-[20px] right-5 w-[calc(100vw-40px)] md:w-[75vw] h-[95vh] border border-white/15 rounded-[16px] overflow-hidden'>
                <ImageGallery />
                <ImageGalleryMobile />

                {/* fades */}
                <div className='pointer-events-none absolute top-0 left-0 w-full h-[175px] opacity-85 bg-gradient-to-t from-transparent to-black z-[9]'></div>
                <div className='pointer-events-none absolute bottom-0 left-0 w-full h-[175px] opacity-85 bg-gradient-to-b from-transparent to-black z-[9]'></div>

                {/* UI */}
                <img src="menu-close.svg" className='w-[24px] h-[24px] absolute top-[47px] left-[40px] z-[10] hover:opacity-50 cursor-pointer transition-all duration-300' onClick={closeGallery} />
                <p data-gsap="gallery-subtitle" className='font-gara text-middark text-h5 md:text-h3 absolute bottom-[30px] left-[30px] md:left-[40px] z-[10]'>KÉPEK A KIÁLLITÁSRÓL</p>

            </div>
    </div>
    )
}