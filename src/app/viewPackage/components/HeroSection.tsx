import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { APP_ROUTES } from "@/utils/constants";
import { Package, Plan } from "../types";

interface HeroSectionProps {
  pkg: Package;
  selectedPlan: Plan | null;
}

export default function HeroSection({ pkg, selectedPlan }: HeroSectionProps) {
  return (
    <div className="relative h-[60vh] min-h-[500px]">
      <Image
        src={pkg.coverImage || "/placeholder.jpg"}
        alt={pkg.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Back Button */}
      <div className="absolute top-8 left-4 md:left-8 z-10">
        <Link
          href={APP_ROUTES.SEARCH_TRIP}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-md text-white rounded-full hover:bg-black/40 transition-all duration-300 border border-white/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      {/* Title and Location */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-white/90 text-base font-medium mb-3">
              <MapPin className="w-5 h-5 text-[#276074]" />
              {pkg.fromLocation?.city} → {pkg.toLocation?.city}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight flex flex-wrap items-center gap-4">
              {pkg.title}
              {selectedPlan && (
                <span className="text-2xl md:text-3xl bg-white/20 backdrop-blur-md px-4 py-1 rounded-full border border-white/30 font-medium uppercase tracking-wide">
                  {selectedPlan.name}
                </span>
              )}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">4.5</span>
                <span className="text-sm opacity-80">(128 reviews)</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                <Clock className="w-5 h-5" />
                <span className="font-medium">
                  {pkg.totalDays} Days / {pkg.totalNights} Nights
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}