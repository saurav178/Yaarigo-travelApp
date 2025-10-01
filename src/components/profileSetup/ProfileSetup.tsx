"use client";
import { useState, ChangeEvent } from "react";
import { Upload, X } from "lucide-react";

type Props = {
  onProfileSave: (profile: any) => void;
  onCancel?: () => void; // ✅ Add this line
  error: string;
};

export default function ProfileSetup({ onProfileSave, onCancel, error }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    travelStyle: "",
    bio: "",
    interests: [] as string[],
    languages: [] as string[],
    photo: "",
  });
  const [fieldErrors, setFieldErrors] = useState({ name: "", dob: "", gender: "" });
  const [loading, setLoading] = useState(false);
  const [interestInput, setInterestInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const handleAddInterest = () => {
    if (interestInput && !formData.interests.includes(interestInput)) {
      setFormData({ ...formData, interests: [...formData.interests, interestInput] });
      setInterestInput("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((i) => i !== interest),
    });
  };

  const handleAddLanguage = () => {
    if (languageInput && !formData.languages.includes(languageInput)) {
      setFormData({ ...formData, languages: [...formData.languages, languageInput] });
      setLanguageInput("");
    }
  };

  const handleRemoveLanguage = (lang: string) => {
    setFormData({ ...formData, languages: formData.languages.filter((l) => l !== lang) });
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, photo: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => setFormData({ ...formData, photo: "" });
  
  // ✅ Use the prop if provided, otherwise fallback to redirect
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      window.location.href = "/";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const errors = { name: "", dob: "", gender: "" };

    if (!formData.name) { errors.name = "Name is required"; hasError = true; }
    if (!formData.dob) { errors.dob = "Date of Birth is required"; hasError = true; }
    if (!formData.gender) { errors.gender = "Gender is required"; hasError = true; }

    setFieldErrors(errors);

    if (!hasError) {
      setLoading(true);
      onProfileSave(formData);
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-start py-10 bg-cover bg-center"
    >
      <div className="w-full max-w-4xl bg-white/85 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-300">
        <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide drop-shadow-lg text-[#3B82F6]">
          Complete Your Profile
        </h1>
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-xl border border-[#3B82F6] text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] italic"
            />
            {fieldErrors.name && <p className="text-red-500 text-sm mt-1 italic">{fieldErrors.name}</p>}
          </div>

          {/* DOB & Gender */}
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-gray-800">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-[#3B82F6] text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] italic"
              />
              {fieldErrors.dob && <p className="text-red-500 text-sm mt-1">{fieldErrors.dob}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-gray-800">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-[#3B82F6] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] italic"
              >
                <option value="" disabled hidden>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {fieldErrors.gender && <p className="text-red-500 text-sm mt-1">{fieldErrors.gender}</p>}
            </div>
          </div>

          {/* Travel Style */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">Travel Style</label>
            <input
              type="text"
              name="travelStyle"
              value={formData.travelStyle}
              onChange={handleChange}
              placeholder="Adventurer, Luxury, Backpacker..."
              className="w-full px-4 py-2 rounded-xl border border-[#3B82F6] text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] italic"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Write a short bio about yourself..."
              className="w-full px-4 py-2 rounded-xl border border-[#3B82F6] text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] italic"
              rows={3}
            ></textarea>
          </div>

          {/* Interests */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">Interests</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {formData.interests.map((i) => (
                <span
                  key={i}
                  className="bg-[#3B82F6] text-white px-3 py-1 rounded-full cursor-pointer hover:opacity-90"
                  onClick={() => handleRemoveInterest(i)}
                >
                  {i} &times;
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                placeholder="Add interest"
                className="flex-1 px-4 py-2 rounded-full border border-[#3B82F6] text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] italic"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="bg-[#3B82F6] text-white px-4 py-2 rounded-full font-semibold hover:opacity-90 italic text-sm"
              >
                Add
              </button>
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">Languages</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {formData.languages.map((l) => (
                <span
                  key={l}
                  className="bg-indigo-500 text-white px-3 py-1 rounded-full cursor-pointer hover:opacity-90"
                  onClick={() => handleRemoveLanguage(l)}
                >
                  {l} &times;
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                placeholder="Add language"
                className="flex-1 px-4 py-2 rounded-full border border-[#3B82F6] text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              />
              <button
                type="button"
                onClick={handleAddLanguage}
                className="bg-indigo-500 text-white px-4 py-2 rounded-full font-semibold hover:opacity-90 text-sm"
              >
                Add
              </button>
            </div>
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">Profile Photo</label>
            <div className="flex items-center gap-4 relative">
              <label className="cursor-pointer bg-[#3B82F6] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:opacity-90 text-sm">
                <Upload size={16} /> {formData.photo ? "Change Photo" : "Upload Photo"}
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
              {formData.photo && (
                <div className="relative">
                  <img
                    src={formData.photo}
                    alt="Profile Preview"
                    className="w-16 h-16 rounded-full object-cover border border-[#3B82F6]"
                  />
                  <X
                    size={10}
                    className="absolute -top-2 -right-2 bg-black rounded-full cursor-pointer"
                    onClick={handleDeletePhoto}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={handleCancel} // ✅ Fixed
              className="flex-1 py-2 bg-blue-100 text-[#3B82F6] rounded-full font-semibold hover:bg-blue-200 transition text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-[#3B82F6] via-indigo-500 to-purple-500 text-white py-2 rounded-full font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
