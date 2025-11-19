"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function MusicSheet() {
  const images = [
    "/images/exhibition-5/sheet/sheet1.webp",
    "/images/exhibition-5/sheet/sheet1.webp",
    "/images/exhibition-5/sheet/sheet1.webp",
  ];

  return (
    <div className="w-full">
      <div className="hidden lg:flex justify-center gap-[8px]">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="kotta"
            className="w-[33%] h-auto object-cover"
          />
        ))}
      </div>

      {/* Mobile / Tablet / smaller screens (<1400px) */}
      <div
        data-gsap="footer-cards"
        className="lg:hidden relative h-full w-full group cursor-grab active:cursor-grabbing"
      >
        <Swiper
          spaceBetween={8}
          slidesPerView="auto"
          slidesOffsetBefore={20}
          slidesOffsetAfter={20}
          centeredSlides={false}
          className="w-full h-full"
          onBeforeInit={(swiper) => {
            const updateOffsets = () => {
              const slide = swiper.slides[0];
              if (!slide) return;
              const cardWidth = slide.offsetWidth;
              const leftPadding = 20;
              swiper.params.slidesOffsetAfter =
                window.innerWidth - cardWidth - leftPadding;
              swiper.update();
            };

            updateOffsets();
            swiper.on("resize", updateOffsets);
          }}
        >
          {images.map((src, i) => (
            <SwiperSlide
              key={i}
              className="!w-[calc(100%-40px)] sm:!w-[60vw] md:!w-[400px]"
            >
              <img
                src={src}
                alt="kotta"
                className="w-full h-auto object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
