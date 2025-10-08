"use client";

interface BudgetBadgeProps {
  price?: string;
}

export default function BudgetBadge({ price }: BudgetBadgeProps) {
  const displayPrice = price || "N/A";

  return (
    <span className="text-black"> {/* Add text-black to override global styles */}
      <span className="text-xs font-normal">₹ </span>
      <span className="text-lg font-bold">{displayPrice}</span>
    </span>
  );
}
