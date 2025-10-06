

"use client";
import { useState, useRef, useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function NewTripForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    city: "",
    country: "",
    region: "",
    startDate: "",
    endDate: "",
    budget: "",
    interests: "",
    travelMode: "",
    openToPartner: "No",
    privacy: "friend-only",
  });

  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const submitRef = useRef<HTMLButtonElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Cascading data
  const regionOptions = ["Europe", "Asia"];
  const countryOptions: Record<string, string[]> = {
    Europe: ["France", "Germany", "Italy"],
    Asia: ["Japan", "India", "China"],
  };
  const cityOptions: Record<string, string[]> = {
    France: ["Paris", "Lyon", "Nice"],
    Germany: ["Berlin", "Munich", "Hamburg"],
    Italy: ["Rome", "Milan", "Venice"],
    Japan: ["Tokyo", "Kyoto", "Osaka"],
    India: ["Goa", "Delhi", "Mumbai"],
    China: ["Beijing", "Shanghai", "Shenzhen"],
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      let updated = { ...prev, [name]: value };
      // Reset dependent fields
      if (name === "region") {
        updated.country = "";
        updated.city = "";
      } else if (name === "country") {
        updated.city = "";
      }
      return updated;
    });

    // Scroll to submit button when travelMode changes
    if (name === "travelMode" && submitRef.current) {
      submitRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.city) newErrors.city = "City is required";
    if (!form.country) newErrors.country = "Country is required";
    if (!form.region) newErrors.region = "Region is required";
    if (!form.startDate) newErrors.startDate = "Start date is required";
    if (!form.endDate) newErrors.endDate = "End date is required";
    if (!form.budget) newErrors.budget = "Budget is required";
    if (!form.travelMode) newErrors.travelMode = "Travel mode is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setShowToast(true);

      setTimeout(() => setShowToast(false), 2000);
    }
  };

  // Scroll to summary after submit
  useEffect(() => {
    if (submitted && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [submitted]);

  const selectClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none";
  const inputClass =
    "border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-2xl h-[85vh] relative shadow-lg flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold"
        >
          ✕
        </button>

        {/* Header */}
        <div className="p-6 shrink-0">
          <h2 className="text-xl font-semibold text-center text-blue-500">Create a New Trip</h2>
          <p className="text-gray-500 text-center text-sm">
            Experience something new every moment
          </p>
        </div>

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-blue-500 mb-1">
                Destination <span className="text-red-700">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {/* Region */}
                <div>
                  <select
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    className={`${selectClass} ${!form.region && "bg-white"}`}
                  >
                    <option value="">Region</option>
                    {regionOptions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.region && (
                    <p className="text-red-500 text-xs mt-1">{errors.region}</p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className={`${selectClass} ${!form.region ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                      }`}
                    disabled={!form.region}
                  >
                    <option value="">Country</option>
                    {form.region &&
                      countryOptions[form.region].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <select
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className={`${selectClass} ${!form.country ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                      }`}
                    disabled={!form.country}
                  >
                    <option value="">City</option>
                    {form.country &&
                      cityOptions[form.country].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Date */}

            <div>
              <label className="block text-sm font-medium text-blue-500 mb-1">
                Date <span className="text-red-700">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Start Date </label>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  {errors.endDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
                  )}
                </div>
              </div>
            </div>


            {/* Budget + Interests */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-blue-500 mb-1">
                  Estimated Budget <span className="text-red-700">*</span>
                </label>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className={`${selectClass} ${!form.budget ? "bg-gray-100" : "bg-white"}`}
                >
                  <option value="">Select Budget</option>
                  <option value="below-7000">Below 7,000</option>
                  <option value="7000-9000">7,000 - 9,000</option>
                  <option value="9000-15000">9,000 - 15,000</option>
                  <option value="15000-30000">15,000 - 30,000</option>
                </select>
                {errors.budget && (
                  <p className="text-red-500 text-xs mt-1">{errors.budget}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-500 mb-1">
                  Interests & Activities <span className="text-red-700">*</span>
                </label>
                <textarea
                  name="interests"
                  value={form.interests}
                  onChange={handleChange}
                  placeholder="Your interests..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  rows={2}
                />
              </div>
            </div>

            {/* Travel Mode + Open to Partner */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-blue-500 mb-1">
                  Travel Mode <span className="text-red-700">*</span>
                </label>
                <select
                  name="travelMode"
                  value={form.travelMode}
                  onChange={handleChange}
                  className={`${selectClass} ${!form.travelMode ? "bg-gray-100" : "bg-white"
                    }`}
                >
                  <option value="">Select Travel Mode</option>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="Flight">Flight</option>
                  <option value="Train">Train</option>
                  <option value="Bus">Bus</option>
                </select>
                {errors.travelMode && (
                  <p className="text-red-500 text-xs mt-1">{errors.travelMode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-500 mb-1">
                  Open to Partner? <span className="text-red-700">*</span>
                </label>
                <div className="flex gap-4 text-sm mt-1">
                  <label className="flex items-center gap-1.5">
                    <input
                      type="radio"
                      name="openToPartner"
                      value="Yes"
                      checked={form.openToPartner === "Yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-1.5">
                    <input
                      type="radio"
                      name="openToPartner"
                      value="No"
                      checked={form.openToPartner === "No"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div className="w-1/2">
              <label className="block text-sm font-medium text-blue-500 mb-1">
                Privacy Setting <span className="text-red-700">*</span>
              </label>
              <select
                name="privacy"
                value={form.privacy}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="friend-only">Friend Only</option>
                <option value="public">Public</option>
                <option value="invite">Invite Friend</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              ref={submitRef}
              className="w-full bg-blue-600 text-white px-3 py-2 rounded-md transition font-medium text-sm"
            >
              Submit
            </button>
          </form>

          {/* Summary Section */}
          {submitted && (
            <div ref={summaryRef} className="mt-8">
              <h3 className="text-xl font-semibold text-center text-blue-500 border-b pb-2">
                Summary of Your Trip Details
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-white border rounded-lg shadow-sm p-2">
                  <p className="text-xs text-gray-500">Destination</p>
                  <p className="font-medium text-sm">
                    {form.city}, {form.country}, {form.region}
                  </p>
                </div>
                <div className="bg-white border rounded-lg shadow-sm p-2">
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-medium text-sm">
                    {form.startDate} → {form.endDate}
                  </p>
                </div>
                <div className="bg-white border rounded-lg shadow-sm p-2">
                  <p className="text-xs text-gray-500">Budget</p>
                  <p className="font-medium text-sm">{form.budget}</p>
                </div>
                <div className="bg-white border rounded-lg shadow-sm p-2">
                  <p className="text-xs text-gray-500">Travel Mode</p>
                  <p className="font-medium text-sm">{form.travelMode}</p>
                </div>
                <div className="bg-white border rounded-lg shadow-sm p-2 col-span-2">
                  <p className="text-xs text-gray-500">Interests</p>
                  <p className="font-medium text-sm">{form.interests || "Not specified"}</p>
                </div>
                <div className="bg-white border rounded-lg shadow-sm p-2">
                  <p className="text-xs text-gray-500">Open to Partner</p>
                  <p className="font-medium text-sm">{form.openToPartner}</p>
                </div>
                <div className="bg-white border rounded-lg shadow-sm p-2">
                  <p className="text-xs text-gray-500">Privacy</p>
                  <p className="font-medium text-sm">{form.privacy}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-5 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm">
            <CheckCircle size={18} /> Form submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
}
