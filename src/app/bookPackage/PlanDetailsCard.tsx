import { Info, CheckCircle, XCircle } from "lucide-react";
import { PlanData } from "./types";

interface PlanDetailsCardProps {
  planData: PlanData | null;
}

export default function PlanDetailsCard({ planData }: PlanDetailsCardProps) {
  if (!planData) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Info className="w-5 h-5 text-[#276074]" />
        Plan Details
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-800">
            {planData.name}{" "}
            <span className="text-sm font-normal text-gray-500">
              ({planData.category})
            </span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">{planData.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {planData.inclusions && planData.inclusions.length > 0 && (
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <h4 className="font-semibold text-green-800 mb-2 text-sm">
                Inclusions
              </h4>
              <ul className="space-y-2">
                {planData.inclusions.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-gray-700"
                  >
                    <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {planData.exclusions && planData.exclusions.length > 0 && (
            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
              <h4 className="font-semibold text-red-800 mb-2 text-sm">
                Exclusions
              </h4>
              <ul className="space-y-2">
                {planData.exclusions.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-gray-700"
                  >
                    <XCircle className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}