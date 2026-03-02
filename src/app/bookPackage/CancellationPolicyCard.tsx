import { AlertCircle } from "lucide-react";
import { CancellationPolicyItem } from "./types";

interface CancellationPolicyCardProps {
  cancellationPolicy: CancellationPolicyItem[];
}

export default function CancellationPolicyCard({
  cancellationPolicy,
}: CancellationPolicyCardProps) {
  if (cancellationPolicy.length === 0) return null;

  const sorted = [...cancellationPolicy].sort(
    (a, b) => b.beforeDays - a.beforeDays
  );
  const first = sorted && sorted.length > 0 ? sorted[0] : null;
  const { beforeDays, refundPercentage } = first || { beforeDays: 0, refundPercentage: 0 };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-[#276074]" />
        Cancellation Policy
      </h2>
      <p className="text-green-600 mt-1 font-medium">
        Cancellation Possible till {beforeDays} days before*
      </p>
      <p className="text-gray-500 text-sm">
        After that Package is{" "}
        <span className="font-semibold">Non-Refundable.</span>
      </p>

      <div className="relative mt-8">
        <div className="h-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-300 to-orange-300" />
        <div className="absolute -top-3 left-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm">
          ✓
        </div>
        <div className="absolute -top-3 right-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-sm">
          ✕
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <div>
          <p className="text-teal-700 font-semibold">
            Till {beforeDays} days before
          </p>
          <p className="text-sm text-gray-500">
            {refundPercentage === 100
              ? "₹0 Cancellation Fee"
              : `${refundPercentage}% Refund`}
          </p>
        </div>
        <div className="text-right">
          <p className="text-orange-600 font-semibold">
            After {beforeDays} days
          </p>
          <p className="text-sm text-gray-500">Non Refundable</p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-5 mt-6">
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="text-green-600 mt-1">●</span>
            These are non-refundable amounts as per the current components
            attached. In the case of component change/modifications, the policy
            will change accordingly.
          </li>
          <li className="flex gap-2">
            <span className="text-green-600 mt-1">●</span>
            Please note, TCS once collected cannot be refunded in case of any
            cancellation / modification.
          </li>
          <li className="flex gap-2">
            <span className="text-green-600 mt-1">●</span>
            Cancellation charges shown is exclusive of all taxes and taxes will
            be added as per applicable.
          </li>
        </ul>
      </div>
    </div>
  );
}