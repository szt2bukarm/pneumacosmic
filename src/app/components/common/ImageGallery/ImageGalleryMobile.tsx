"use client"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useEffect, useRef, useState, useCallback } from "react"
import { Flip } from "gsap/Flip"
import { useStore } from "../../../useStore"
import { useLenis } from "@studio-freight/react-lenis"

gsap.registerPlugin(Flip)

export default function ImageGalleryMobile() {
  const { galleryImages: images, setGalleryOpen, galleryOpen, isMobile } = useStore()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [allowScroll, setAllowScroll] = useState(false)
  const [clickedSrc, setClickedSrc] = useState<string | null>(null)
  const [clickedText, setClickedText] = useState<string | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const lenis = useLenis()
  const animationTimeline = useRef<gsap.core.Timeline | null>(null)

  // Zoom + Pan State
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const lastTouch = useRef<{ x?: number; y?: number; dist?: number }>({})
  const lastTap = useRef<number>(0)

  const resetZoom = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  // 🔹 Touch Zoom + Pan Handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    // double-tap zoom
    const now = Date.now()
    if (now - lastTap.current < 300) {
      setScale(prev => (prev > 1 ? 1 : 2))
      setPosition({ x: 0, y: 0 })
    }
    lastTap.current = now

    if (e.touches.length === 1) {
      lastTouch.current.x = e.touches[0].clientX
      lastTouch.current.y = e.touches[0].clientY
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      lastTouch.current.dist = Math.sqrt(dx * dx + dy * dy)
    }
  }, [])

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!imageRef.current) return
      e.preventDefault()

      // drag / pan
      if (e.touches.length === 1 && scale > 1) {
        const touch = e.touches[0]
        const dx = touch.clientX - (lastTouch.current.x ?? touch.clientX)
        const dy = touch.clientY - (lastTouch.current.y ?? touch.clientY)

        lastTouch.current.x = touch.clientX
        lastTouch.current.y = touch.clientY

        setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }))
      }

      // pinch zoom
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        const newDist = Math.sqrt(dx * dx + dy * dy)
        const dist = lastTouch.current.dist ?? newDist
        const zoomFactor = newDist / dist
        lastTouch.current.dist = newDist

        setScale(prev => Math.min(Math.max(prev * zoomFactor, 1), 4))
      }
    },
    [scale]
  )

  const onTouchEnd = useCallback(() => {
    lastTouch.current = {}
  }, [])

  // 🔹 Opening animation
  const animateImages = useCallback(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const imgs = container.querySelectorAll<HTMLImageElement>("img")
    const parents = Array.from(imgs).map((img) => img.parentElement!) as HTMLElement[]

    gsap.set(parents, { y: 100, opacity: 0 })
    gsap.to(parents, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.05,
      delay: 0.3,
      ease: "power4.out",
    })
  }, [])

  useGSAP(() => {
    if (!containerRef.current || !galleryOpen) return
    lenis?.stop()
    animateImages()
    setTimeout(() => {
      setAllowScroll(true)
      lenis?.start()
    }, 1000)
  }, [galleryOpen, animateImages])

  const onClick = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    if (!containerRef.current) return

    resetZoom()

    gsap.to(containerRef.current, { opacity: 0, duration: 0.5 })
    gsap.to("[data-gsap='gallery-subtitle']", { opacity: 0, duration: 0.5 })
    gsap.to("[data-gsap='clicked-text']", { opacity: 1, duration: 0.5, delay: 0.2 })

    if (imageRef.current) {
      const targetSrc = e.currentTarget.dataset.src
      const targetText = e.currentTarget.dataset.text

      gsap.to(imageRef.current, {
        filter: "blur(0px)",
        opacity: 1,
        onStart: () => {
          setClickedSrc(targetSrc || null)
          setClickedText(targetText || null)
          lenis?.stop()
        },
        duration: 0.25,
        ease: "power4.out",
        delay: 0.2,
      })
    }
  }, [resetZoom])

  const closeImage = useCallback(() => {
    if (!clickedSrc || !containerRef.current || !imageRef.current) return

    resetZoom()

    gsap.to("[data-gsap='clicked-text']", { opacity: 0, duration: 0.5 })
    gsap.to(containerRef.current, {
      opacity: 1,
      duration: 0.5,
      onComplete: () => {
        gsap.to("[data-gsap='gallery-subtitle']", { opacity: 1, duration: 0.5 })
        lenis?.start()
      },
    })

    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power4.out",
      onComplete: () => {
        setClickedSrc(null)
        setClickedText(null)
        gsap.set(imageRef.current, { opacity: 0, filter: "blur(10px)" })
      },
    })
  }, [clickedSrc, resetZoom])

  useEffect(() => {
    setAllowScroll(false)
    return () => {
      animationTimeline.current?.kill()
    }
  }, [])

  return (
    <div
      className={`${isMobile ? "block" : "block md:hidden"} relative w-full h-full overflow-scroll py-[100px] overflow-x-hidden`}
      style={{
        background: "linear-gradient(180deg, #050505 0%, #0A0A0A 14.9%, #191919 89.42%, #191919 100%)",
        pointerEvents: allowScroll ? "auto" : "none",
      }}
    >
      {/* Zoomable Lightbox */}
      <div
        className={`!z-50 fixed inset-0 flex items-center justify-center flex-col ${
          clickedSrc ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={closeImage}
      >
        <img
          ref={imageRef}
          src={clickedSrc ?? undefined}
          className="opacity-0 z-50 max-w-[90%] max-h-[80%] object-cover object-center touch-none"
          alt="Enlarged view"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: scale === 1 ? "transform 0.25s ease" : "none",
          }}
        />
        <p data-gsap="clicked-text" className="opacity-0 mt-4 text-center font-hal text-base text-middark px-4">
          {clickedText || ""}
        </p>
      </div>

      {/* Image Grid */}
      <div
        ref={containerRef}
        className="z-0 grid grid-cols-1 md:grid-cols-2 gap-[4px] absolute top-0 py-[100px] max-w-fit overflow-x-hidden px-[10px]"
        style={{ pointerEvents: "auto" }}
      >
        {images.map(({ src, text }, index) => (
          <div key={index} className="relative aspect-[16/9] overflow-hidden w-[100%] mx-auto">
            <img
              className="w-full h-full object-cover object-center cursor-pointer"
              src={src}
              onClick={onClick}
              data-src={src}
              data-text={text || null}
              alt={text || `Gallery image ${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
