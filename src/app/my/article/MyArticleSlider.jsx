"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { hostNoPrefix } from "@/app/utils/urlApi";

export default function MyArticleSlider({
  slides,
  autoSlide = true,
  autoSlideInterval = 3000,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(slideInterval);
  });

  return (
    <div className="max-w-[1400px] xl:h-[500px] lg:h-[450px] md:h-[380px] sm:h-[300px] h-[250px] w-full m-auto lg:py-6 md:py-5 py-3 px-4 relative group">
      <div
        style={{
          backgroundImage: `url(${hostNoPrefix}uploads/${slides[currentIndex].image})`,
        }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500 relative overflow-hidden"
      >
        <div className="absolute bottom-0 left-0 right-0 bg-gcPrimary-1000 bg-opacity-30 text-gcNeutrals-baseWhite px-6 lg:py-8 md:py-6 sm:py-4 py-3">
          <Link
            href={`/my/article/${slides[currentIndex].slug}`}
            className="hover:underline text-gcNeutrals-baseWhite"
          >
            <h1 className="gcHeading2p">{slides[currentIndex].title}</h1>
          </Link>
        </div>
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <button onClick={nextSlide}>&lt;</button>
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <button onClick={nextSlide}>&gt;</button>
      </div>
      <div className="flex top-4 justify-center py-4 gap-3">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <div
              className={`lg:w-16 lg:h-2.5 md:w-10 md:h-2 w-8 h-1.5 rounded-full ${
                currentIndex === slideIndex
                  ? "bg-gcPrimary-1000"
                  : "bg-gcSecondary-200"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
