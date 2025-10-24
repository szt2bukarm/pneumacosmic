"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/app/useStore";

gsap.registerPlugin(ScrollTrigger);

export default function WalkSequence() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const blurCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const walkFrames = useStore((s) => s.walkBitmaps); // use preloaded frames

  useEffect(() => {
    if (!walkFrames || walkFrames.length === 0) return; // wait for preloaded frames

    const frameCount = walkFrames.length;
    let currentFrame = 0;

    const canvas = canvasRef.current;
    const blurCanvas = blurCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    const blurCtx = blurCanvas?.getContext("2d");

    const aspectRatio = 1080 / 810;

    const resizeCanvases = () => {
      if (!canvas || !blurCanvas || !containerRef.current) return;

      const renderHeight = window.innerHeight * 0.85;
      const renderWidth = renderHeight * aspectRatio;

      const blurHeight = window.innerHeight * 0.95;
      const blurWidth = blurHeight * aspectRatio;

      canvas.width = renderWidth;
      canvas.height = renderHeight;

      blurCanvas.width = blurWidth;
      blurCanvas.height = blurHeight;

      renderFrame();
    };

    const renderFrame = () => {
      if (!ctx || !blurCtx || !canvas || !blurCanvas) return;
      const img = walkFrames[currentFrame];

      blurCtx.clearRect(0, 0, blurCanvas.width, blurCanvas.height);
      blurCtx.filter = "blur(50px) brightness(0.6)";
      blurCtx.drawImage(img, 0, 0, blurCanvas.width, blurCanvas.height);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=4000",
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        const frame = Math.floor(self.progress * (frameCount - 1));
        if (frame !== currentFrame) {
          currentFrame = frame;
          renderFrame();
        }
      },
      anticipatePin: 1,
      pinSpacing: true,
    });

    const handleResize = () => requestAnimationFrame(resizeCanvases);
    window.addEventListener("resize", handleResize);
    resizeCanvases();

    return () => {
      window.removeEventListener("resize", handleResize);
      scrollTriggerRef.current?.kill();
    };
  }, [walkFrames]);

  return (
    <section
      data-gsap="walk-sequence"
      ref={containerRef}
      className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden"
    >
      <canvas
        ref={blurCanvasRef}
        className="opacity-0 absolute w-full h-[95vh] object-contain blur-3xl brightness-90"
        style={{ zIndex: 0 }}
      />
      <canvas
        ref={canvasRef}
        className="relative w-full h-[85vh] object-contain z-10"
      />
    </section>
  );
}
