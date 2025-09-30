"use client"

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";

import styles from "./landingpage.module.css";

interface PexelsPhoto {
  id: number;
  src: { landscape: string };
}

export default function LandingPage() {
  const router = useRouter();
  const categories = useMemo(() => ["Mountain"], []);
  const [images, setImages] = useState<PexelsPhoto[]>([]);
  // index refers to position in `slides` (which includes cloned first/last)
  const [index, setIndex] = useState(1);
  const [transitionOn, setTransitionOn] = useState(true);
  const intervalRef = useRef<number | undefined>(undefined);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // fetch images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const allImages: PexelsPhoto[] = [];
        for (const category of categories) {
          const res = await fetch(`/api/pexels-wallpapers?category=${category}`);
          const data = await res.json();
          if (data.photos && data.photos.length > 0) {
            allImages.push(...data.photos.slice(0, 4));
          }
        }
        setImages(allImages.slice(0, 4));
        // if none, keep an empty placeholder array
        // setImages(allImages.length ? allImages : [{ id: 0, src: { landscape: "" } }]);
        // reset index to 1 (first real slide) when images change
        // setIndex(1);
        // setTransitionOn(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchImages();
  }, [categories]);

  // create slides with clones (last, ...images, first)
  const slides = useMemo(() => {
    if (!images || images.length === 0) return images;
    // if only one image, no clones needed but we still return single-item slides to avoid weird behaviour
    if (images.length === 1) return images;
    const first = images[0];
    const last = images[images.length - 1];
    return [last, ...images, first];
  }, [images]);

  // autoplay
  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    // clear existing
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => i + 1);
      setTransitionOn(true);
    }, 4000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [slides]);

  // handle transition end -> if we're on cloned slides, jump to real slide (no transition)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const handleTransitionEnd = () => {
      // slides length must be at least 3 for clones
      if (!slides || slides.length < 3) return;
      // if we've moved to the clone at the end (last element), jump to index 1 (first real)
      if (index === slides.length - 1) {
        setTransitionOn(false);
        setIndex(1);
      }
      // if we've moved to the clone at the start (index 0), jump to last real (slides.length - 2)
      if (index === 0) {
        setTransitionOn(false);
        setIndex(slides.length - 2);
      }
    };
    el.addEventListener("transitionend", handleTransitionEnd);
    return () => el.removeEventListener("transitionend", handleTransitionEnd);
  }, [index, slides]);

  // whenever we programmatically disable transition to "jump", re-enable it shortly after
  useEffect(() => {
    if (!transitionOn) {
      const t = window.setTimeout(() => setTransitionOn(true), 50);
      return () => clearTimeout(t);
    }
  }, [transitionOn]);

  // Dot click: map dot i (0..n-1) to slides index (i + 1)
  const handleDotClick = (dotIdx: number) => {
    // reset interval so user sees the selected slide for full interval
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    setIndex(dotIdx + 1);
    setTransitionOn(true);
  };

  // compute translateX — each slide is 100vw
  const translateX = `-${index * 100}vw`;
  const containerTransition = transitionOn ? "transform 1s ease-in-out" : "none";

  return (
    <main className={styles.hero}>
      <div
        ref={trackRef}
        className={styles.carouselTrack}
        style={{
          width: `${slides.length * 100}vw`,
          transform: `translateX(${translateX})`,
          transition: containerTransition,
        }}
      >
        {slides.map((img) => (
          <div
            key={img.id + Math.random()} // keep key stable enough; if you have unique ids plus position you can combine them
            className={styles.carouselSlide}
            style={{ backgroundImage: `url(${img.src.landscape})` }}
          />
        ))}
      </div>

      <div className={styles.carouselOverlay} />

      <div className={styles.heroContent}>
        <h1 className={styles.tagh1}>
          Community of <span className={styles.tagspan}>Travellers</span>
        </h1>
        <p>
          Create Stories | Connect Peoples <br />
          Travel Safer | Fulfill Dreams
        </p>
        <button
          className={styles.btnExplore}
          onClick={() => router.push("/Expolore")}
        >
          Explore With Travio
        </button>
      </div>

      <div className={styles.dotsWrapper}>
        {/* show one dot per real image (not clones) */}
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`${styles.dot} ${
              index === i + 1 ? styles.activeDot : ""
            }`}
          />
        ))}
      </div>
    </main>
  );
}
