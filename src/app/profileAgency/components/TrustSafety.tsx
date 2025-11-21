import { Shield, BadgeCheck } from "lucide-react";

interface TrustSafetyProps {
  items: string[];
}

export default function TrustSafety({ items }: TrustSafetyProps) {
  return (
    <div className="bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 p-5 w-full max-w-md border border-gray-100">
      <h3 className="text-base font-bold mb-4 text-gray-900 flex items-center gap-2">
        <Shield className="w-5 h-5 text-white fill-emerald-500" />
        Trust and Safety
      </h3>
      <div className="space-y-2.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
              <BadgeCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}