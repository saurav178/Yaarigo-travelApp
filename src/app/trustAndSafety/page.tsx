"use client";

import { useState } from "react";
import {
  MdVerified,
  MdLocationOn,
  MdMedicalServices,
  MdSmsFailed,
} from "react-icons/md";
import { FaRegIdBadge, FaRegClock, FaRegHospital } from "react-icons/fa6";
import { AiOutlineCheckCircle, AiOutlineAlert } from "react-icons/ai";

 

export default function TrustSafetySection() {
  const [idVerified, setIdVerified] = useState<boolean>(false);
  const [hasPublishedTrips, setHasPublishedTrips] = useState<boolean>(true);
  const [liveLocation, setLiveLocation] = useState<boolean>(false);
  const [sosActivated, setSosActivated] = useState<boolean>(false);
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [offlineSOS, setOfflineSOS] = useState<boolean>(false);
  const [panicMode, setPanicMode] = useState<boolean>(false);

  const handleSOS = () => {
    setSosActivated(true);
    alert("🚨 SOS Activated! Authorities + Emergency Contacts Notified.");
  };

  const runRiskCheck = () => {
    const score = Math.floor(Math.random() * 100);
    setRiskScore(score);
  };

  return (
    <div className="border   p-6 bg-gray-100 mt-16 shadow-sm text-black">
      <h2 className="text-2xl font-semibold mb-4">Trust, Safety & Emergency</h2>

      
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          Mandatory Checks
        </h3>

        <div className="flex flex-col gap-3">
          <ToggleRow
            title="ID Verification Required"
            desc="Users must verify identity before accessing full features."
            enabled={idVerified}
            onToggle={() => setIdVerified(!idVerified)}
            icon={<FaRegIdBadge className="text-gray-500 text-xl" />}
          />

          <ToggleRow
            title="No Matching Without Published Trips"
            desc="Users must publish at least one trip before matching."
            enabled={hasPublishedTrips}
            onToggle={() => setHasPublishedTrips(!hasPublishedTrips)}
            icon={<AiOutlineCheckCircle className="text-gray-500 text-xl" />}
          />
        </div>
      </section>

      {/* ================= Emergency Features ================= */}
      <section>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          Emergency Features
        </h3>

        <div className="flex flex-col gap-4">

          {/* SOS BUTTON */}
          <button
            onClick={handleSOS}
            className="px-4 py-4 bg-red-500 text-white font-bold text-lg  hover:bg-red-600 cursor-pointer"
          >
            🚨 SOS — Trigger Emergency Alert
          </button>

          <ToggleRow
            title="Live Location Sharing"
            desc="Share your real-time location with trusted contacts."
            enabled={liveLocation}
            onToggle={() => setLiveLocation(!liveLocation)}
            icon={<MdLocationOn className="text-gray-500 text-xl" />}
          />

          <ToggleRow
            title="Check-in Alerts"
            desc="Receive periodic safety check-ins while traveling."
            enabled={true}
            noToggle
            icon={<FaRegClock className="text-gray-500 text-xl" />}
          />

          <ToggleRow
            title="Medical Assistance Mode"
            desc="Automatically share health info & nearest hospitals."
            enabled={panicMode}
            onToggle={() => setPanicMode(!panicMode)}
            icon={<MdMedicalServices className="text-gray-500   text-xl" />}
          />

          <ToggleRow
            title="Insurance Suggestions"
            desc="AI recommends travel insurance based on risk."
            enabled={true}
            noToggle
            icon={<AiOutlineAlert className="text-gray-500 text-xl" />}
          />

          <ToggleRow
            title="Offline SOS (via SMS)"
            desc="Send emergency alerts even without internet."
            enabled={offlineSOS}
            onToggle={() => setOfflineSOS(!offlineSOS)}
            icon={<MdSmsFailed className="text-gray-500 text-xl" />}
          />

          <ToggleRow
            title="Panic Mode"
            desc="Locks profile, hides location, alerts contacts instantly."
            enabled={panicMode}
            onToggle={() => setPanicMode(!panicMode)}
            icon={<AiOutlineAlert className="text-red-400 text-xl" />}
          />
        </div>
      </section>

      {/* ================= AI Risk Detection ================= */}
      <section className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          AI Risk Detection
        </h3>

        <button
          onClick={runRiskCheck}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          Run AI Risk Scan
        </button>

        {riskScore !== null && (
          <p className="mt-3 text-sm text-gray-700">
            Risk Score:{" "}
            <span className="font-semibold">{riskScore}/100</span> —{" "}
            {riskScore > 70 ? "⚠ High Risk" : "✔ Safe"}
          </p>
        )}
      </section>
    </div>
  );
}

/* ======================================================
   Reusable Toggle Component
====================================================== */
function ToggleRow({
  title,
  desc,
  enabled,
  onToggle,
  noToggle = false,
  icon,
}: {
  title: string;
  desc: string;
  enabled: boolean;
  onToggle?: () => void;
  noToggle?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 shadow-md hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div>
          {icon}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-600">{desc}</p>
        </div>
      </div>

      {!noToggle && (
        <button
          onClick={onToggle}
          className={`w-12 h-6 rounded-full relative transition-all cursor-pointer ${
            enabled ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all ${
              enabled ? "translate-x-6" : ""
            }`}
          />
        </button>
      )}
    </div>
  );
}
