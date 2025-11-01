// HorizontalCarousel- for trip cards.

// "use client";

import { useRef, useState, useEffect, RefObject } from "react";

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T, idx: number, firstRef: RefObject<HTMLDivElement | null>) => React.ReactNode;
  visible?: number; // items visible per view
  gapPx?: number;
  title?: string;
};

export default function HorizontalCarousel<T>({ items, renderItem, visible = 3, gapPx = 24 }: CarouselProps<T>) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const maxIndex = Math.max(0, items.length - visible);

  useEffect(() => {
    const measure = () => {
      const w = firstCardRef.current?.getBoundingClientRect().width ?? 0;
      setCardWidth(w);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [visible, items.length]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));
  const goTo = (i: number) => setIndex(Math.max(0, Math.min(maxIndex, i)));

  const offsetPx = index * (cardWidth + gapPx);

  return (
    <div className="relative">
      <div className="overflow-hidden -mt-10">
        <div ref={trackRef} className="flex gap-6 transition-transform duration-500" style={{ transform: `translateX(-${offsetPx}px)`, padding: "8px 8px" }}>
          {items.map((it, idx) => (
            <div key={idx} ref={idx === 0 ? firstCardRef : null} className="shrink-0" style={{ width: `calc((100% - ${(visible - 1) * gapPx}px) / ${visible})` }}>
              {renderItem(it, idx, firstCardRef)}
            </div> 
          ))}
        </div>
      </div>
     


      {/* Controls */}
      <button onClick={prev} disabled={index === 0} className="absolute -left-5  top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-40 ">
        <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button onClick={next} disabled={index >= maxIndex} className="absolute -right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-40">
        <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-3 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`w-2 h-2 rounded-full ${i === index ? "bg-[#F76c6c]" : "bg-gray-300"}`} />
        ))}
      </div>
    </div>
  );
}
