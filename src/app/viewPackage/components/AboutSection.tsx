import { Clock, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Package, Plan } from "../types";

interface AboutSectionProps {
  pkg: Package;
  selectedPlan: Plan | null;
}

export default function AboutSection({ pkg, selectedPlan }: AboutSectionProps) {
  return (
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        About this package
      </h2>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-[#276074] mb-1">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Duration</span>
          </div>
          <p className="text-gray-800 font-medium text-lg">
            {pkg.totalDays} Days
          </p>
          <p className="text-gray-500 text-sm">
            {pkg.totalNights} Nights
          </p>
        </div>
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-[#276074] mb-1">
            <MapPin className="w-5 h-5" />
            <span className="font-semibold">From</span>
          </div>
          <p className="text-gray-800 font-medium text-lg">
            {pkg.fromLocation?.city}
          </p>
          <p className="text-gray-500 text-sm">
            {pkg.fromLocation?.country}
          </p>
        </div>
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-[#276074] mb-1">
            <MapPin className="w-5 h-5" />
            <span className="font-semibold">To</span>
          </div>
          <p className="text-gray-800 font-medium text-lg">
            {pkg.toLocation?.city}
          </p>
          <p className="text-gray-500 text-sm">
            {pkg.toLocation?.country}
          </p>
        </div>
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-[#276074] mb-1">
            <Users className="w-5 h-5" />
            <span className="font-semibold">Group Size</span>
          </div>
          <p className="text-gray-800 font-medium text-lg">
            {selectedPlan?.minPeople}-{selectedPlan?.maxPeople} People
          </p>
          <p className="text-gray-500 text-sm">
            {selectedPlan?.totalSlots} slots
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed text-lg">
        {pkg.description ||
          pkg.shortSummary ||
          "No description available"}
      </p>
    </motion.div>
  );
}