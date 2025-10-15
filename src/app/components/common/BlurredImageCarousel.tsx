"use client"
import { useStore } from "@/app/useStore"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useEffect } from "react"

interface Props {
  images: { src: string; text?: string }[]
}

export default function BlurredImageCarousel({ images }: Props) {
  const { setGalleryOpen, setGalleryImages, isMobile } = useStore()

  const openGallery = () => {
    setGalleryOpen(true)
    setGalleryImages(images)
  }

  const blurRef = useRef<HTMLDivElement>(null)
  const sharpRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  const createTween = () => {
    if (!blurRef.current || !sharpRef.current) return

    const blurEl = blurRef.current
    const sharpEl = sharpRef.current

    let totalWidth = 0
    sharpEl.childNodes.forEach((child) => {
      if (child instanceof HTMLElement) totalWidth += child.offsetWidth + 10
    })

    if (tweenRef.current) tweenRef.current.kill()

    tweenRef.current = gsap.to([blurEl, sharpEl], {
      x: -totalWidth / 2,
      duration: images.length * 10,
      repeat: -1,
      ease: "none",
    })
  }

  useGSAP(() => {
    const timeout = setTimeout(createTween, 100)

    const handleResize = () => {
      tweenRef.current?.kill()
      requestAnimationFrame(createTween);      
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearTimeout(timeout)
      tweenRef.current?.kill()
      window.removeEventListener("resize", handleResize)
    }
  }, [images, isMobile])

  return (
    <div
      className="relative w-full h-[200px] md:h-[350px] lg:h-[600px] overflow-visible cursor-pointer"
      onClick={openGallery}
    >
      {!isMobile && (
        <div
          ref={blurRef}
          className="absolute top-0 left-0 flex gap-[3px] md:gap-[5px] lg:gap-[10px] h-full overflow-visible opacity-50"
        >
          {images.concat(images).map((image, i) => (
            <div className="w-[320px] md:w-[550px] lg:w-[950px] h-full">
            <img key={i} src={image.src} className="h-full w-full blur-[150px] object-cover" />
            </div>
          ))}
        </div>
      )}

      <div ref={sharpRef} className="absolute top-0 left-0 flex gap-[3px] md:gap-[5px] lg:gap-[10px] h-full overflow-visible">
        {images.concat(images).map((image, i) => (
          <div className="relative h-full w-[320px] md:w-[550px] lg:w-[950px]">
          <img key={i} src={image.src} className="h-full w-full object-cover" />

          {image.text && (
            <>
              <div className="!pointer-events-none z-10 absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-black to-transparent"></div>
              <p className="!pointer-events-none z-20 absolute bottom-5 left-5 font-hal text-lg text-middark">{image.text}</p>            
            </>
          )}

          </div>
        ))}
    </div>
    </div>
  )
}
