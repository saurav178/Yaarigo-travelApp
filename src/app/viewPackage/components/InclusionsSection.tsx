import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Package, Plan, StaticAddOn } from "../types";

interface InclusionsSectionProps {
  pkg: Package;
  selectedPlan: Plan | null;
  setSelectedPlan: (plan: Plan) => void;
  selectedAddOns: string[];
  toggleAddOn: (id: string) => void;
  addOnsData: StaticAddOn[];
}

export default function InclusionsSection({
  pkg,
  selectedPlan,
  setSelectedPlan,
  selectedAddOns,
  toggleAddOn,
  addOnsData,
}: InclusionsSectionProps) {
  return (
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">What&apos;s Included</h2>

      {/* ---------------- PLAN SELECTION ---------------- */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Choose Package Plan
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          {pkg.plans.map((plan) => {
            const isSelected = selectedPlan?._id === plan._id;
            const planCurrency = plan.currency === "INR" ? "₹" : plan.currency;

            return (
              <div
                key={plan._id}
                onClick={() => setSelectedPlan(plan)}
                className={`p-5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#276074] ring-2 ring-[#276074]/20 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-800">{plan.name}</h4>

                  {isSelected && (
                    <span className="text-xs bg-[#276074] text-white px-2 py-0.5 rounded">
                      Selected
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500 mb-3">{plan.category}</p>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {plan.description}
                </p>

                <div className="text-xl font-bold text-[#1d4350]">
                  {planCurrency}
                  {plan.discountedPrice.toLocaleString()}
                  <span className="text-xs text-gray-500 font-normal">
                    {" "}
                    / person
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------- INCLUSION EXCLUSION ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Inclusions */}
        <div className="bg-green-50/60 p-6 rounded-2xl border border-green-100">
          <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
            <div className="p-1.5 bg-green-100 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            What&apos;s Included
          </h3>
          <ul className="space-y-3">
            {selectedPlan?.inclusions?.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exclusions */}
        <div className="bg-red-50/60 p-6 rounded-2xl border border-red-100">
          <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
            <div className="p-1.5 bg-red-100 rounded-full">
              <XCircle className="w-4 h-4 text-red-600" />
            </div>
            What&apos;s Excluded
          </h3>
          <ul className="space-y-3">
            {selectedPlan?.exclusions?.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700 text-sm">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
          {addOnsData.map((addon) => {
            const isSelected = selectedAddOns.includes(addon.id);

            return (
              <div
                key={addon.id}
                onClick={() => toggleAddOn(addon.id)}
                className={`p-5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-gray-500">{addon.tag}</span>
                  {isSelected && (
                    <span className="text-blue-600 font-bold text-lg">✓</span>
                  )}
                </div>

                <h4 className="font-semibold text-gray-800">{addon.title}</h4>
                <p className="text-sm text-gray-500 mb-3">{addon.desc}</p>

                <div className="font-bold text-[#1d4350]">+₹{addon.price}</div>
              </div>
            );
          })}
      </div>
    </motion.div>
  );
}