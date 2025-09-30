"use client"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Flip } from 'gsap/Flip';
import { useStore } from '../../../useStore';

gsap.registerPlugin(Flip);

const IMAGES_PER_COLUMN = 3;

export default function ImageGalleryMobile() {
  const { galleryImages: images, setGalleryOpen, galleryOpen } = useStore();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const allowMouseMove = useRef(false);
  const [clickedSrc, setClickedSrc] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animationTimeline = useRef<gsap.core.Timeline | null>(null);



  const animateImages = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const imgs = container.querySelectorAll<HTMLImageElement>('img');
    const parents = Array.from(imgs).map(img => img.parentElement!) as HTMLElement[];

    gsap.set(parents, {
      position: 'absolute',
      left: '100%',
      top: '0%',
      xPercent: -50,
      yPercent: window.innerHeight / 2,
      transformOrigin: '50% 50%',
    });

    const state = Flip.getState(parents);

    parents.forEach(el => {
      gsap.set(el, { clearProps: 'all', scale: 1, transformOrigin: '50% 50%' });
    });

    if (animationTimeline.current) animationTimeline.current.kill();

    animationTimeline.current = Flip.from(state, {
      duration: 1.5,
      ease: 'power4.out',
      stagger: 0.03,
    });
  }, []);


  useGSAP(() => {
    if (!containerRef.current || !galleryOpen) return;
    animateImages();
  }, [galleryOpen,animateImages]);

  const onClick = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (!containerRef.current) return;

    if (animationTimeline.current) animationTimeline.current.kill();

    gsap.to(containerRef.current, { opacity: 0, duration: 0.5 });
    gsap.to("[data-gsap='gallery-subtitle']", { opacity: 0, duration: 0.5 });

    if (imageRef.current) {
        const targetSrc = e.currentTarget.dataset.src;
        gsap.to(imageRef.current, {
            filter: "blur(0px)",
            opacity: 1,
            onStart: () => setClickedSrc(targetSrc),
            duration: 0.25,
            ease: 'power4.out',
            delay: 0.2,
        });
    }
  }, []);

  const closeImage = useCallback(() => {
    if (!clickedSrc || !containerRef.current || !imageRef.current) return;

    allowMouseMove.current = false;

    gsap.to(containerRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      onComplete: () => {
        gsap.to("[data-gsap='gallery-subtitle']", { opacity: 1, duration: 0.5 });
      },
    });

    gsap.to(imageRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'power4.out',
      onComplete: () => {
        setClickedSrc(null);
        gsap.set(imageRef.current, {
          opacity: 0,
          filter: "blur(10px)",
        });
      },
    });
  }, [clickedSrc]);

  useEffect(() => {
    return () => {
      if (animationTimeline.current) animationTimeline.current.kill();
    };
  }, []);



  return (
                <div
                className="block md:hidden relative w-full h-full overflow-scroll py-[100px]"
                style={{background: "linear-gradient(180deg, #050505 0%, #0A0A0A 14.9%, #191919 89.42%, #191919 100%)"}}
                >

                {/* Enlarged image overlay */}
                <div
                    className={`!z-50 fixed inset-0 flex items-center justify-center ${
                    clickedSrc ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    onClick={closeImage}
                >
                    <img
                    ref={imageRef}
                    src={clickedSrc ?? undefined}
                    className="opacity-0 z-50 max-w-[120%] max-h-[100%] object-cover object-center"
                    alt="Enlarged view"
                    />
                </div>

                {/* Image grid container */}
                <div
                    ref={containerRef}
                    className="z-0 flex flex-col gap-[24px]"
                >

                    {images.map((src, index) => (
                    <div
                        key={index}
                        className="hover:opacity-100 transition-opacity duration-350 min-w-full aspect-[16/9]  overflow-hidden px-[20px]"
                    >
                        <img className='w-full h-full object-cover object-center' src={src} onClick={onClick} data-src={src} alt={`Gallery image ${src}`} />
                    </div>
                    ))}

                </div>
            </div>
  );
}
