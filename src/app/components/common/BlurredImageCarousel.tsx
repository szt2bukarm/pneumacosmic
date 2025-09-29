"use client"
import { useStore } from "@/app/useStore"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

interface Props {
images: string[],
}
  
  export default function BlurredImageCarousel({ images, }: Props) {
    const {setGalleryOpen, setGalleryImages} = useStore()

    const openGallery = () => {
        console.log("asd")
        setGalleryOpen(true)
        setGalleryImages(images)
    }

    const blurRef = useRef<HTMLDivElement>(null)
    const sharpRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!blurRef.current || !sharpRef.current) return
    
        const blurEl = blurRef.current
        const sharpEl = sharpRef.current
    
        // calculate total width of all images + 10px gap between each
        let totalWidth = 0
        sharpEl.childNodes.forEach((child) => {
          if (child instanceof HTMLElement) {
            totalWidth += child.offsetWidth + 10
            console.log(child.offsetWidth)
          }
        })
    
        console.log(totalWidth/2);

        const ctx = gsap.context(() => {
          gsap.to([blurEl, sharpEl], {
            x: -totalWidth/2,
            duration: images.length * 10,
            repeat: -1,
            ease: "none",
          })
        })
    
        return () => ctx.revert()
      }, [])

    return (
      <div className="relative w-full h-[320px] md:h-[350px] lg:h-[600px] overflow-visible cursor-pointer" onClick={openGallery}>
        {/* Blurred layer */}
        <div ref={blurRef} className="absolute top-0 left-0 flex gap-[10px] h-full overflow-visible opacity-75">
          {images.map((image) => (
            <img
              key={image}
              src={image}
              className="h-full blur-[150px] object-cover"
            />
          ))}
          {images.map((image) => (
            <img
              key={image}
              src={image}
              className="h-full blur-[150px] object-cover"
            />
          ))}
        </div>
  
        {/* Sharp layer */}
        <div ref={sharpRef} className="absolute top-0 left-0 flex gap-[10px] h-full overflow-visible">
          {images.map((image) => (
            <img
              key={image}
              src={image}
              className="h-full object-cover"
            />
          ))}
          {images.map((image) => (
            <img
              key={image}
              src={image}
              className="h-full object-cover"
            />
          ))}
        </div>
      </div>
    )
  }
  