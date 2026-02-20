import { useState, useEffect } from "react";
import { Users, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Traveller } from "../types";

interface TravellersSectionProps {
  isTravellerModalOpen: boolean;
  setIsTravellerModalOpen: (isOpen: boolean) => void;
  travellers: Traveller[];
  setTravellers: (travellers: Traveller[]) => void;
  currentTraveller: Traveller;
  setCurrentTraveller: (traveller: Traveller) => void;
  handleAddTraveller: () => void;
}

export default function TravellersSection({
  isTravellerModalOpen,
  setIsTravellerModalOpen,
  travellers,
  setTravellers,
  currentTraveller,
  setCurrentTraveller,
  handleAddTraveller,
}: TravellersSectionProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isTravellerModalOpen) {
      setErrors({});
    }
  }, [isTravellerModalOpen]);

  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    if (!currentTraveller.name?.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!currentTraveller.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(currentTraveller.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^\d{10}$/;
    if (!currentTraveller.contact?.trim()) {
      newErrors.contact = "Contact is required";
    } else if (!phoneRegex.test(currentTraveller.contact)) {
      newErrors.contact = "Enter valid 10-digit number";
    }

    if (!currentTraveller.gender) newErrors.gender = "Gender is required";

    if (!currentTraveller.age) {
      newErrors.age = "Age is required";
    } else if (Number(currentTraveller.age) <= 0 || Number(currentTraveller.age) > 120) {
      newErrors.age = "Invalid age";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleAddTraveller();
    }
  };

  return (
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Travellers</h2>
        <button
          onClick={() => setIsTravellerModalOpen(!isTravellerModalOpen)}
          className="px-4 py-2 bg-[#276074] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all flex items-center gap-2 shadow-sm"
        >
          <Users className="w-4 h-4" />
          {isTravellerModalOpen ? "Close" : "Add Traveller +"}
        </button>
      </div>

      {/* Inline Form */}
      {isTravellerModalOpen && (
        <div className="mb-6 p-6 bg-gray-50 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-bold text-gray-800 mb-4">New Traveller Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={currentTraveller.name}
                onChange={e => setCurrentTraveller({...currentTraveller, name: e.target.value})}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276074] outline-none"
                placeholder="Name"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={currentTraveller.email}
                onChange={e => setCurrentTraveller({...currentTraveller, email: e.target.value})}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276074] outline-none"
                placeholder="Email"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
              <input
                type="tel"
                value={currentTraveller.contact}
                onChange={e => setCurrentTraveller({...currentTraveller, contact: e.target.value})}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276074] outline-none"
                placeholder="Phone"
              />
              {errors.contact && <p className="text-xs text-red-500 mt-1">{errors.contact}</p>}
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={currentTraveller.gender}
                  onChange={e => setCurrentTraveller({...currentTraveller, gender: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276074] outline-none bg-white"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={currentTraveller.age}
                  onChange={e => setCurrentTraveller({...currentTraveller, age: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276074] outline-none"
                  placeholder="Age"
                />
                {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setIsTravellerModalOpen(false)}
              className="px-4 py-2 text-gray-600 font-semibold hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[#276074] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md"
            >
              Save Traveller
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {travellers.length > 0 ? (
        <div className="space-y-3">
          {travellers.map((t) => (
            <div key={t.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#276074]/10 flex items-center justify-center text-[#276074] font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.gender} • {t.age} yrs</p>
                </div>
              </div>
              <button onClick={() => setTravellers(travellers.filter((tr) => tr.id !== t.id))} className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        !isTravellerModalOpen && (
          <p className="text-gray-500 text-sm italic">No travellers added yet.</p>
        )
      )}
    </motion.div>
  );
}