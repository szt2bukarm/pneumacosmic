"use client"
import { useStore } from "@/app/useStore"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useEffect } from "react"

interface Props {
  images: string[]
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

  useGSAP(() => {
    setTimeout(() => {
      if (!blurRef.current || !sharpRef.current) return

      const ctx = gsap.context(() => {
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
        ease: "none"
      })

      return () => {
        tweenRef.current?.kill()
      }
    })

    return () => {
      ctx.revert()
    }
    }, 5);
  }, [images, isMobile])

  return (
    <div
      className="relative w-full h-[320px] md:h-[350px] lg:h-[600px] overflow-visible cursor-pointer"
      onClick={openGallery}
    >
      {!isMobile && (
        <div
          ref={blurRef}
          className="absolute top-0 left-0 flex gap-[10px] h-full overflow-visible opacity-75"
        >
          {images.concat(images).map((image, i) => (
            <img key={i} src={image} className="h-full blur-[150px] object-cover" />
          ))}
        </div>
      )}

      <div ref={sharpRef} className="absolute top-0 left-0 flex gap-[10px] h-full overflow-visible">
        {images.concat(images).map((image, i) => (
          <img key={i} src={image} className="h-full object-cover" />
        ))}
      </div>
    </div>
  )
}
