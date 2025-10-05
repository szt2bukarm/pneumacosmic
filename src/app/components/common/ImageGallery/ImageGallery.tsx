"use client"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Flip } from 'gsap/Flip';
import { useStore } from '../../../useStore';

gsap.registerPlugin(Flip);

const IMAGES_PER_COLUMN = 3;

export default function ImageGallery() {
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
      onStart: () => {
        setTimeout(() => {
          parents.forEach(el => el.classList.add('opacity-50'));
        }, 1500);
      },
    });
  }, []);

  const mouseMoveHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!allowMouseMove.current || !containerRef.current) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const offsetX = centerX - e.clientX;
    const offsetY = centerY - e.clientY;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const normX = offsetX / (window.innerWidth / 2);
    const normY = offsetY / (window.innerHeight / 2);

    const maxTranslateX = containerWidth / 2;
    const maxTranslateY = containerHeight / 2;

    gsap.to(container, {
      x: normX * maxTranslateX,
      y: normY * maxTranslateY,
      duration: 0.75,
      ease: 'power4.out',
    });
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !galleryOpen) return;
    animateImages();

    const timer = setTimeout(() => {
      allowMouseMove.current = true;
    }, 2000);

    return () => {
      clearTimeout(timer);
      allowMouseMove.current = false;
    };
  }, [galleryOpen,animateImages]);

  const onClick = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (!containerRef.current) return;

    if (animationTimeline.current) animationTimeline.current.kill();

    gsap.to(containerRef.current, { opacity: 0, scale: 1.05, duration: 0.5 });
    gsap.to("[data-gsap='gallery-subtitle']", { opacity: 0, duration: 0.5 });

    if (imageRef.current) {
        const targetSrc = e.currentTarget.dataset.src;
        gsap.to(imageRef.current, {
            filter: "blur(0px)",
            opacity: 1,
            // css: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
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
        setTimeout(() => (allowMouseMove.current = true), 300);
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
          scale: 1,
          opacity: 0,
          filter: "blur(10px)",
        //   clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        });
      },
    });
  }, [clickedSrc]);

  useEffect(() => {
    return () => {
      if (animationTimeline.current) animationTimeline.current.kill();
    };
  }, []);

  // Split images into columns of 5
  const columns: string[][] = [];
  for (let i = 0; i < images.length; i += IMAGES_PER_COLUMN) {
    columns.push(images.slice(i, i + IMAGES_PER_COLUMN));
  }


  return (
    <div
      className="hidden md:block relative w-full h-full overflow-hidden pt-[500px]"
      style={{background: "linear-gradient(180deg, #050505 0%, #0A0A0A 14.9%, #191919 89.42%, #191919 100%)"}}
      onMouseMove={mouseMoveHandler}
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
                    className="opacity-0 z-50 max-w-[90%] max-h-[90%] object-cover object-center"
                    alt="Enlarged view"
                    />
                </div>

                {/* Image grid container */}
                <div
                    ref={containerRef}
                    className="z-0 pl-[600px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-flow-row auto-rows-[400px] gap-[24px] min-w-full will-change-auto"
                >
                    {columns.map((col, colIndex) => (
                    <div
                        key={colIndex}
                        className={`flex flex-row min-h-[600px] gap-[24px] mt-${colIndex * 5}`}
                    >
                        {col.map((src, index) => (
                        <div
                            key={index}
                            className="hover:opacity-100 transition-opacity duration-350 min-w-[600px] h-[400px]  overflow-hidden"
                        >
                            <img className='w-full h-full object-cover object-center' src={src} onClick={onClick} data-src={src} alt={`Gallery image ${src}`} />
                        </div>
                        ))}
                    </div>
                    ))}
                </div>
            </div>
  );
}
