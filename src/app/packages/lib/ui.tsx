import React from "react";

export function currency(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export const Star: React.FC<{ filled?: boolean; className?: string }> = ({
  filled = false,
  className,
}) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className ?? "h-4 w-4"}>
    <path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      className={filled ? "fill-yellow-400" : "fill-gray-300"}
    />
  </svg>
);

export const Dot: React.FC = () => (
  <span className="mx-1 inline-block h-1 w-1 rounded-full bg-neutral-300 align-middle" />
);

export const Chip: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <span
    className={`inline-flex items-center rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700 ${
      className ?? ""
    }`}
  >
    {children}
  </span>
);

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, children, ...props }) => (
  <button
    className={`px-4 py-2 text-sm font-semibold shadow-sm transition hover:shadow ${
      className ?? "bg-blue-600 text-white"
    }`}
    {...props}
  >
    {children}
  </button>
);

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={` border border-neutral-200 bg-white shadow-sm cursor-pointer ${
      className ?? ""
    }`}
  >
    {children}
  </div>
);

export const SectionTitle: React.FC<{
  title: string;
  action?: React.ReactNode;
}> = ({ title, action }) => (
  <div className="mb-3 flex items-center justify-between">
    <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>
    {action}
  </div>
);

export const Rating: React.FC<{ rating?: number; reviews?: number }> = ({
  rating = 0,
  reviews,
}) => (
  <div className="flex items-center gap-1 text-xs text-neutral-600">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} filled={i < Math.round(rating)} />
    ))}
    {rating ? <span className="ml-1">{rating.toFixed(1)}</span> : null}
    {typeof reviews === "number" ? (
      <span className="ml-1">({reviews.toLocaleString()})</span>
    ) : null}
  </div>
);
