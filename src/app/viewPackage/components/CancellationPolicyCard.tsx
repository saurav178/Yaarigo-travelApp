import { CancellationPolicy } from "../types";

interface CancellationPolicyCardProps {
  cancellationPolicy: CancellationPolicy[];
}

export default function CancellationPolicyCard({ cancellationPolicy }: CancellationPolicyCardProps) {
  if (!cancellationPolicy || cancellationPolicy.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Cancellation Policy
        </h2>
        <p className="text-gray-500">Cancellation policy not available for this plan.</p>
      </div>
    );
  }

  // Find best policy (highest refund window)
  const sorted = [...cancellationPolicy].sort(
    (a, b) => b.beforeDays - a.beforeDays,
  );
  const first = sorted[0];

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800">
        Package Cancellation Policy
      </h2>

      {first && (
        <>
          <p className="text-green-600 mt-1 font-medium">
            Cancellation Possible till {first.beforeDays} days
            before travel*
          </p>
          <p className="text-gray-500 text-sm">
            After that, the package is{" "}
            <span className="font-semibold">Non-Refundable.</span>
          </p>

          {/* Timeline */}
          <div className="relative mt-8">
            <div className="h-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-300 to-orange-300" />
            <div className="absolute -top-3 left-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm">✓</div>
            <div className="absolute -top-3 right-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-sm">✕</div>
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-6">
            <div>
              <p className="text-teal-700 font-semibold">
                Till {first.beforeDays} days before
              </p>
              <p className="text-sm text-gray-500">
                {first.refundPercentage === 100
                  ? "₹0 Cancellation Fee"
                  : `${100 - first.refundPercentage}% Cancellation Fee`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-orange-600 font-semibold">
                Within {first.beforeDays} days of travel
              </p>
              <p className="text-sm text-gray-500">
                Non-Refundable
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-gray-100 rounded-lg p-5 mt-6">
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-green-600 mt-1">●</span>
                Please note, TCS once collected cannot be refunded in case of any cancellation / modification.
              </li>
              <li className="flex gap-2">
                <span className="text-green-600 mt-1">●</span>
                Cancellation charges shown are exclusive of all taxes and taxes will be added as per applicable.
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}