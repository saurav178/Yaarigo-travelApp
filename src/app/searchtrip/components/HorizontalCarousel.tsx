// VerticalCarousel

"use client";

import React, { useRef, RefObject } from "react";

type CarouselProps<T> = {
  items: T[];
  renderItem: (
    item: T,
    idx: number,
    firstRef: RefObject<HTMLDivElement | null> | null
  ) => React.ReactNode;

  itemKey?: (item: T, idx: number) => string;
  gapPx?: number;
  title?: string;
  className?: string;
};

export default function VerticalCarousel<T>({
  items,
  renderItem,
  itemKey,
  gapPx = 24,
  title,
  className = "",
}: CarouselProps<T>) {
  const firstCardRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={`w-full ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div
        role="list"
        className="flex flex-col"
        style={{ gap: `${gapPx}px`, padding: "0 0" }}
      >
        {items.map((it, idx) => {
          const key = itemKey ? itemKey(it, idx) : String(idx);
          return (
            <div
              key={key}
              ref={idx === 0 ? firstCardRef : null}
              className="shrink-0"
            >
              {renderItem(it, idx, firstCardRef)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
