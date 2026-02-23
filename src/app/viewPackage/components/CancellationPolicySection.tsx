import { motion } from "framer-motion";
import { Plan } from "../types";

interface CancellationPolicySectionProps {
  selectedPlan: Plan;
}

export default function CancellationPolicySection({ selectedPlan }: CancellationPolicySectionProps) {
  return (
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-gray-800">
        Package Cancellation Policy
      </h2>

      {/* Find best policy (highest refund window) */}
      {(() => {
        const sorted = [...selectedPlan.cancellationPolicy].sort(
          (a, b) => b.beforeDays - a.beforeDays,
        );
        const first = sorted[0];

        return (
          <>
            <p className="text-green-600 mt-1 font-medium">
              Cancellation Possible till {first.beforeDays} days
              before*
            </p>
            <p className="text-gray-500 text-sm">
              After that Package is{" "}
              <span className="font-semibold">Non-Refundable.</span>
            </p>

            {/* Timeline */}
            <div className="relative mt-8">
              <div className="h-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-300 to-orange-300" />

              {/* Left check */}
              <div className="absolute -top-3 left-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm">
                ✓
              </div>

              {/* Right cross */}
              <div className="absolute -top-3 right-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-sm">
                ✕
              </div>
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
                    : `${first.refundPercentage}% Refund`}
                </p>
              </div>

              <div className="text-right">
                <p className="text-orange-600 font-semibold">
                  After {first.beforeDays} days
                </p>
                <p className="text-sm text-gray-500">
                  Non Refundable
                </p>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-gray-100 rounded-lg p-5 mt-6">
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-green-600 mt-1">●</span>
                  These are non-refundable amounts as per the
                  current components attached. In the case of
                  component change/modifications, the policy will
                  change accordingly.
                </li>

                <li className="flex gap-2">
                  <span className="text-green-600 mt-1">●</span>
                  Please note, TCS once collected cannot be refunded
                  in case of any cancellation / modification.
                </li>

                <li className="flex gap-2">
                  <span className="text-green-600 mt-1">●</span>
                  Cancellation charges shown is exclusive of all
                  taxes and taxes will be added as per applicable.
                </li>
              </ul>
            </div>
          </>
        );
      })()}
    </motion.div>
  );
}