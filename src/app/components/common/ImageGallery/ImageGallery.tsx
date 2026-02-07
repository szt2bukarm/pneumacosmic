"use client"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useEffect, useRef, useState, useCallback } from "react"
import { Flip } from "gsap/Flip"
import { useStore } from "../../../useStore"
import { number } from "mathjs"

gsap.registerPlugin(Flip)

const IMAGES_PER_COLUMN = 3

export default function ImageGallery({closeGallery}: {closeGallery: () => void}) {
  const { galleryImages: images, galleryOpen, isMobile } = useStore()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const allowMouseMove = useRef(false)
  const [clickedSrc, setClickedSrc] = useState<string | null>(null)
  const [clickedText, setClickedText] = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState<number | null>(1)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const animationTimeline = useRef<gsap.core.Timeline | null>(null)

  const animateImages = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const imgs = container.querySelectorAll<HTMLImageElement>("img")
    const parents = Array.from(imgs).map((img) => img.parentElement!) as HTMLElement[]

    gsap.set(parents, {
      position: "absolute",
      left: "100%",
      top: "100%",
      xPercent: -100,
      yPercent: window.innerHeight / 2,
      transformOrigin: "50% 50%",
    })

    const state = Flip.getState(parents)

    parents.forEach((el) => {
      gsap.set(el, { clearProps: "all", scale: 1, transformOrigin: "50% 50%" })
    })

    if (animationTimeline.current) animationTimeline.current.kill()

    animationTimeline.current = Flip.from(state, {
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.03,
      onStart: () => {
        setTimeout(() => {
          parents.forEach((el) => el.classList.add("opacity-50"))
        }, 1500)
      },
    })
  }, [])

  const mouseMoveHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!allowMouseMove.current || !containerRef.current || !wrapperRef.current) return;
  
      const container = containerRef.current;
      const wrapper = wrapperRef.current;
  
      const wrapperRect = wrapper.getBoundingClientRect();
  
      // Mouse position relative to wrapper center
      const normX = (e.clientX - wrapperRect.left - wrapperRect.width / 2) / (wrapperRect.width / 2);
      const normY = (e.clientY - wrapperRect.top - wrapperRect.height / 2) / (wrapperRect.height / 2);
  
      const totalContentWidth = 3 * 630; // 3 images x 600px + 30px gap each
      const extraWidth = Math.max(totalContentWidth - wrapperRect.width, 0);
  
      // Translate X based on extra width
      const maxTranslateX = extraWidth / 2; // center the movement
  
      const extraHeight = Math.max(container.scrollHeight - wrapperRect.height, 0);
      const maxTranslateY = extraHeight / 1.7;
  
      gsap.to(container, {
        x: -normX * maxTranslateX,
        y: -normY * maxTranslateY,
        duration: 1,
        ease: "power3.out",
      });
    },
    []
  );


  useGSAP(() => {
    if (!containerRef.current || !galleryOpen) return
    animateImages()

    const timer = setTimeout(() => {
      allowMouseMove.current = true
    }, 2000)

    return () => {
      clearTimeout(timer)
      allowMouseMove.current = false
    }
  }, [galleryOpen, animateImages])

  const onClick = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (!containerRef.current) return

    if (animationTimeline.current) animationTimeline.current.kill()

    gsap.to(containerRef.current, { opacity: 0, scale: 1.05, duration: 0.5 })
    gsap.to("[data-gsap='gallery-subtitle']", { opacity: 0, duration: 0.5 })
    gsap.to("[data-gsap='gallery-pagination']", { opacity: 1, duration: 0.5 })
    gsap.to("[data-gsap='clicked-text']", { opacity: 1, duration: 0.5,delay: 0.2 })

    if (imageRef.current) {
      const targetSrc = e.currentTarget.dataset.src
      const targetText = e.currentTarget.dataset.text
      const targetIndex = number(e.currentTarget.dataset.index)
      gsap.to(imageRef.current, {
        filter: "blur(0px)",
        opacity: 1,
        onStart: () => {
          setCurrentImage(targetIndex || 0);
          setClickedSrc(targetSrc || null)
          setClickedText(targetText || null)
        },
        duration: 0.25,
        ease: "power4.out",
        delay: 0.2,
      })
    }
  }, [])

  const closeImage = useCallback(() => {
    if (!clickedSrc || !containerRef.current || !imageRef.current) return

    allowMouseMove.current = false
    gsap.to("[data-gsap='clicked-text']", { opacity: 0, duration: 0.5 })
    gsap.to("[data-gsap='gallery-pagination']", { opacity: 0, duration: 0.5 })
    gsap.to(containerRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      onComplete: () => {
        setTimeout(() => (allowMouseMove.current = true), 300)
        gsap.to("[data-gsap='gallery-subtitle']", { opacity: 1, duration: 0.5 })
      },
    })

    gsap.to(imageRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "power4.out",
      onComplete: () => {
        setClickedSrc(null)
        setClickedText(null)
        gsap.set(imageRef.current, {
          scale: 1,
          opacity: 0,
          filter: "blur(10px)",
        })
      },
    })
  }, [clickedSrc])

  useEffect(() => {
    return () => {
      if (animationTimeline.current) animationTimeline.current.kill()
    }
  }, [])

  // Split images into columns of 3 (using the new structure)
  const columns: { src: string; text: string }[][] = []
  for (let i = 0; i < images.length; i += IMAGES_PER_COLUMN) {
    columns.push(images.slice(i, i + IMAGES_PER_COLUMN))
  }

  // Key navigation for left/right arrows
useEffect(() => {

  const handleKeyDown = (e: KeyboardEvent) => {
    if (currentImage === null) return;
    if (e.key === "Escape") {
      // Close image
      if (!clickedSrc) {
        closeGallery();
        return;
      } else { 
        closeImage();
      }
    }
    if (e.key === "ArrowLeft") {
      // Previous image
      if (!clickedSrc) return;
      const prevIndex = currentImage === 0 ? images.length - 1 : currentImage - 1;
      const prevImage = images[prevIndex];
      setCurrentImage(prevIndex);
      setClickedSrc(prevImage.src);
      // setClickedText(prevImage.text || null);
    } else if (e.key === "ArrowRight") {
      if (!clickedSrc) return;
      // Next image
      const nextIndex = currentImage === images.length - 1 ? 0 : currentImage + 1;
      const nextImage = images[nextIndex];
      setCurrentImage(nextIndex);
      setClickedSrc(nextImage.src);
      // setClickedText(nextImage.text || null);
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown); // cleanup
}, [clickedSrc, currentImage, images]);

  return (
    <div
      className={`${isMobile ? "hidden" : "hidden md:block"} relative w-full h-full overflow-hidden pt-[500px]`}
      style={{
        background:
          "linear-gradient(180deg, #050505 0%, #0A0A0A 14.9%, #191919 89.42%, #191919 100%)",
      }}
      ref={wrapperRef}
      onMouseMove={mouseMoveHandler}
    >
      {/* Enlarged image overlay */}
      <div
        className={`!z-50 fixed inset-0 flex items-center justify-center flex-col gap-[12px] ${
          clickedSrc ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={closeImage}
      >
        <img
          ref={imageRef}
          src={clickedSrc ?? undefined}
          className="opacity-0 z-50 max-w-[85%] max-h-[85%] object-cover object-center"
          alt="Enlarged view"
        />
        {/* <p data-gsap="clicked-text" className="opacity-0 font-hal text-lg text-middark">{clickedText || ""}</p> */}
      </div>

      <div data-gsap="gallery-pagination" className="opacity-0 z-[100] absolute left-[50%] bottom-2 translate-x-[-50%] items-center justify-center flex gap-[5px]">
          <p
            onClick={() => {
              console.log("prev")
              if (currentImage === null) return;
              const prevIndex = currentImage === 0 ? images.length - 1 : currentImage - 1; // wrap around
              const prevImage = images[prevIndex];
              setCurrentImage(prevIndex);
              setClickedSrc(prevImage.src);
              setClickedText(prevImage.text || null);
            }}
            className="select-none hover:opacity-50 transition-all duration-150 cursor-pointer font-hal text-h5 text-middark"
          >
            {"←"}
          </p>

          <p className="font-hal text-lg text-middark w-[80px] text-center">{(currentImage ?? 0) + 1}/{images.length}</p>

          <p
            onClick={() => {
              if (currentImage === null) return;
              const nextIndex = currentImage === images.length - 1 ? 0 : currentImage + 1; // wrap around
              const nextImage = images[nextIndex];
              setCurrentImage(nextIndex);
              setClickedSrc(nextImage.src);
              setClickedText(nextImage.text || null);
            }}
            className="select-none hover:opacity-50 transition-all duration-150 cursor-pointer font-hal text-h5 text-middark"
          >
            {"→"}
          </p>
        </div>


      {/* Image grid container */}
      <div
        ref={containerRef}
        className="z-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-flow-row auto-rows-[400px] gap-[12px] min-w-full will-change-auto"
      >
        {columns.map((col, colIndex) => (
          <div key={colIndex} className={`flex flex-row min-h-[600px] gap-[12px] `}>
            {col.map(({ src, text }, index) => {
              const globalIndex = colIndex * IMAGES_PER_COLUMN + index;
              return (
                <div
                  key={globalIndex} // use global index as key
                  className="relative hover:opacity-100 transition-opacity duration-350 min-w-[600px] max-w-[600px] h-[400px] overflow-hidden cursor-pointer"
                >
                  <img
                    className="w-full h-full object-cover object-center"
                    src={src}
                    onClick={onClick}
                    data-index={globalIndex} // <-- assign global index here
                    data-src={src}
                    data-text={text || null}
                    alt={text || `Gallery image ${globalIndex}`}
                  />
                  {/* {text && (
                    <>
                      <div className="pointer-events-none z-10 absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-black to-transparent"></div>
                      <p className="pointer-events-none z-20 absolute bottom-5 left-5 font-hal text-lg text-middark">{text}</p>
                    </>
                  )} */}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
