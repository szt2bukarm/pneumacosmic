"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function WalkSequence() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const blurCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null) // Add ref for the specific trigger

  useEffect(() => {
    const frameCount = 64
    const images: ImageBitmap[] = []
    let currentFrame = 0
    let loaded = false

    const canvas = canvasRef.current
    const blurCanvas = blurCanvasRef.current
    const ctx = canvas?.getContext("2d")
    const blurCtx = blurCanvas?.getContext("2d")

    const aspectRatio = 1080 / 810

    const resizeCanvases = () => {
      if (!canvas || !blurCanvas || !containerRef.current) return
      const { width } = containerRef.current.getBoundingClientRect()

      const renderHeight = window.innerHeight * 0.85
      const renderWidth = renderHeight * aspectRatio

      const blurHeight = window.innerHeight * 0.95
      const blurWidth = blurHeight * aspectRatio

      canvas.width = renderWidth
      canvas.height = renderHeight

      blurCanvas.width = blurWidth
      blurCanvas.height = blurHeight

      render()
    }

    const loadFrames = async () => {
      for (let i = 1; i <= frameCount; i++) {
        const url = `images/exhibition-3/walk/${i}walk.webp`
        const res = await fetch(url)
        const blob = await res.blob()
        const bmp = await createImageBitmap(blob)
        images.push(bmp)
      }
      loaded = true
      render()
    }

    const render = () => {
      if (!ctx || !blurCtx || !loaded || !canvas || !blurCanvas) return
      const img = images[currentFrame]

      blurCtx.clearRect(0, 0, blurCanvas.width, blurCanvas.height)
      blurCtx.filter = "blur(50px) brightness(0.6)"
      blurCtx.drawImage(img, 0, 0, blurCanvas.width, blurCanvas.height)

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }

    // Store the ScrollTrigger instance in a ref
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=4000",
      scrub: true,
      pin: true,
      markers: false, // Set to true temporarily for debugging
      onEnter: () => {
        gsap.to(blurCanvasRef.current, {
          opacity: 1,
          duration: 0.3
        })
      },
      onLeave: () => {
        gsap.to(blurCanvasRef.current, {
          opacity: 0,
          duration: 0.3
        })
      },
      onEnterBack: () => {
        gsap.to(blurCanvasRef.current, {
          opacity: 1,
          duration: 0.3
        })
      },
      onLeaveBack: () => {
        gsap.to(blurCanvasRef.current, {
          opacity: 0,
          duration: 0.3
        })
      },
      onUpdate: (self) => {
        if (!loaded) return
        const frame = Math.floor(self.progress * (frameCount - 1))
        if (frame !== currentFrame) {
          currentFrame = frame
          render()
        }
      },
      animation: gsap.to("[data-gsap='exhibition-3']", {
        background: "#050505",
      }),
      // Add these to prevent scroll jumping
      anticipatePin: 1,
      pinSpacing: true
    })

    const handleResize = () => requestAnimationFrame(resizeCanvases)

    window.addEventListener("resize", handleResize)
    loadFrames().then(resizeCanvases)

    return () => {
      window.removeEventListener("resize", handleResize)
      
      // Only kill the specific ScrollTrigger created by this component
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
      }
      
      images.forEach(img => img.close?.())
    }
  }, [])

  return (
    <section
      data-gsap="walk-sequence"
      ref={containerRef}
      className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden"
    >
      <canvas
        ref={blurCanvasRef}
        width={1080}
        height={810}
        className="opacity-0 absolute w-full h-[95vh] object-contain blur-3xl brightness-90"
        style={{ zIndex: 0 }}
      />
      <canvas
        ref={canvasRef}
        width={1080}
        height={810}
        className="relative w-full h-[85vh] object-contain z-10"
      />
    </section>
  )
}