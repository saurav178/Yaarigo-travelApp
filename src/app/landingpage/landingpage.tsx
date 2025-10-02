"use client";
import { useEffect, useState, useRef } from "react";

const heroImages = [
  "/images/slider-img/pexels-photo-01.jpeg",
  "/images/slider-img/pexels-photo-02.jpeg",
  "/images/slider-img/pexels-photo-03.jpeg",
  "/images/slider-img/pexels-photo-01.jpeg",
];



const taglines = [
  { title: "Community Traveler", subtitle: "Create Stories | Connect Peoples" },
  { title: "Welcome to Travio", subtitle: "Create Stories | Connect Peoples" },
  { title: "Expolore with Adventure", subtitle: "Create Stories | Connect Peoples" },
  { title: "Adventure Awaits", subtitle: "Create Stories | Connect Peoples" },
];

export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(true);
        setFade(true);
      }, 500);
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (currentIndex === heroImages.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // const handleDotClick = (index: number) => {
  //   setFade(false);
  //   setTimeout(() => {
  //     setCurrentIndex(index);
  //     setIsTransitioning(true);
  //     setFade(true);
  //   }, 300);
  // };

  const slides = [...heroImages, heroImages[0]];
  const displayIndex = currentIndex % heroImages.length;

  return (
    <div className="w-screen h-screen overflow-x-hidden m-0 p-0">
      <section className="relative w-screen h-screen overflow-hidden">
        <div
          className="flex h-full"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? "transform 1s ease-in-out" : "none",
          }}
        >
          {slides.map((img, index) => (
            <div
              key={index}
              className="w-screen h-full bg-cover bg-center flex-shrink-0"
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-black/35 z-10" />

        <div
        // ${fade ? "opacity-100" : "opacity-0
          className={`absolute z-20 text-white transition-opacity duration-500 "
            } top-1/2 left-[8%] max-w-[45%] -translate-y-1/2 text-shadow`}
        >

           {/* sm:text-4xl md:text-4xl  animate-fadeInUp leading-tight*/}
           
          <h1 className="text-7xl font-extrabold italic mb-6">
            {taglines[displayIndex].title}
          </h1>
          <p className="text-xl  opacity-95  delay-100 sm:text-lg md:text-xl mb-6">

            {/* {taglines[displayIndex].subtitle} animate-fadeInUp */}

            Create Stories | Connect Peoples <br />
              Travel Safer | Fulfill Dreams
          </p>
          <button className="px-5 py-2 rounded-full bg-blue-500 text-white font-bold text-lg
           hover:bg-blue-600 hover:scale-105 transition-all animate-fadeInUp delay-200">
            Explore With Travio
          </button>
        </div>

        <div className="absolute bottom-5 w-full flex justify-center gap-2 z-20">
          {heroImages.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${displayIndex === index
                ? "bg-blue-100"
                : "bg-white/50 hover:scale-110"
                }`}

              // onClick={() => handleDotClick(index)}

            />
          ))}
        </div>
      </section>
    </div>
  );
}
