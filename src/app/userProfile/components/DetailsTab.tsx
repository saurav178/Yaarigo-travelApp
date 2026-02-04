// "use client";

// import React, { ChangeEvent } from "react";
// import Image from "next/image"; // <--- Added for image optimization
// import {
//   Profile,
//   SectionProps,
//   FileUploadFieldProps,
//   InlineIconRowProps,
//   ViewTagListProps,
//   InputFieldProps,
//   SelectFieldProps,
//   TextareaFieldProps,
// } from "../Types";

// import { ALL_TRAVEL_STYLES, ALL_LANGUAGES } from "../data";

// interface props {
//   isEditing: boolean;
//   profile: Profile;
//   editingProfile: Profile;
//   setEditingProfile: React.Dispatch<React.SetStateAction<Profile>>;
// }

// function DetailsTab({ isEditing, profile, editingProfile, setEditingProfile }: props) {
//   const toggleArrayItem = (path: "travelStyles" | "languages", item: string) => {
//     setEditingProfile((prev) => {
//       const copy: Profile = JSON.parse(JSON.stringify(prev));
//       const arr: string[] = path.split(".").reduce((acc: any, k: string) => acc[k], copy);
//       const exists = arr.includes(item);
//       const newArr = exists ? arr.filter((x) => x !== item) : [...arr, item];
//       let cur: any = copy;
//       const keys = path.split(".");
//       for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
//       cur[keys[keys.length - 1]] = newArr;
//       return copy as Profile;
//     });
//   };

//   const updateFormField = (path: string, value: unknown) => {
//     const keys = path.split(".");
//     setEditingProfile((prev) => {
//       const copy: Profile = structuredClone(prev);
//       let cur: any = copy;
//       for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
//       cur[keys[keys.length - 1]] = value;
//       return copy;
//     });
//   };

//   return (
//     <>
//       {!isEditing ? (
//         <div>
//           {/* Personal Information */}
//           <Section>
//             <h3 className="text-lg font-semibold text-black">Personal Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//               <div>
//                 <p className="text-sm text-gray-500">Date of Birth</p>
//                 <p className="mt-2 text-gray-800">{profile.dob}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Gender</p>
//                 <p className="mt-2 text-gray-800">{profile.gender}</p>
//               </div>
//             </div>
//             <div className="mt-6">
//               <p className="text-sm text-gray-500">Occupation</p>
//               <p className="mt-2 text-gray-800">{profile.occupation}</p>
//             </div>
//             <div className="mt-6">
//               <p className="text-sm text-gray-500">About Me</p>
//               <p className="mt-2 text-gray-800">{profile.about}</p>
//             </div>
//           </Section>

//           {/* Contact Information */}
//           <Section>
//             <h3 className="text-lg font-semibold text-black">Contact Information</h3>
//             <div className="mt-4 space-y-4">
//               <InlineIconRow icon="✉" text={profile.email} />
//               <InlineIconRow icon="📞" text={profile.phone} />
//               <InlineIconRow icon="📍" text={profile.location} />
//             </div>
//           </Section>

//           {/* Travel Preferences */}
//           <Section>
//             <h3 className="text-lg font-semibold text-black">Travel Preferences</h3>
//             <div className="mt-3">
//               <p className="text-sm text-gray-500">Travel Style & Interests</p>
//               <div className="mt-2">
//                 <ViewTagList all={ALL_TRAVEL_STYLES} selected={profile.travelStyles} />
//               </div>
//             </div>
//             <div className="mt-4">
//               <p className="text-sm text-gray-500">Languages</p>
//               <div className="mt-2">
//                 <ViewTagList all={ALL_LANGUAGES} selected={profile.languages} />
//               </div>
//             </div>
//           </Section>

//           {/* Social Media */}
//           <Section>
//             <h3 className="text-lg font-semibold text-black">Social Media & Website</h3>
//             <div className="mt-3 space-y-3 text-gray-800">
//               <div>
//                 <span className="text-sm text-gray-500">Instagram: </span>
//                 <span>{profile.social.instagram}</span>
//               </div>
//               <div>
//                 <span className="text-sm text-gray-500">Facebook: </span>
//                 <span>{profile.social.facebook}</span>
//               </div>
//             </div>
//           </Section>

//           {/* Emergency Contact */}
//           <Section>
//             <h3 className="text-lg font-semibold text-black">Emergency Contact</h3>
//             <div className="mt-3">
//               <p className="text-sm text-gray-500">Contact Name</p>
//               <p className="mt-2 text-gray-800">{profile.emergency.contactName}</p>
//               <p className="text-sm text-gray-500 mt-4">Contact Phone</p>
//               <p className="mt-2 text-gray-800">{profile.emergency.contactPhone}</p>
//             </div>
//           </Section>
//         </div>
//       ) : (
//         <div>
//           {/* Editing Mode */}
//           <Section>
//             <h3 className="text-lg font-semibold text-black">Personal Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//               <InputField
//                 label="First Name"
//                 value={editingProfile.firstName}
//                 onChange={(v) => updateFormField("firstName", v)}
//               />
//               <InputField
//                 label="Last Name"
//                 value={editingProfile.lastName}
//                 onChange={(v) => updateFormField("lastName", v)}
//               />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
//               <InputField
//                 label="Date of Birth"
//                 type="date"
//                 value={editingProfile.dob}
//                 onChange={(v) => updateFormField("dob", v)}
//               />
//               <SelectField
//                 label="Gender"
//                 value={editingProfile.gender}
//                 onChange={(v) => updateFormField("gender", v)}
//                 options={["female", "male", "other"]}
//               />
//             </div>
//             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FileUploadField
//                 label="Profile Photo"
//                 value={editingProfile.profilePhoto}
//                 onChange={(file) => updateFormField("profilePhoto", file)}
//               />
//               <FileUploadField
//                 label="Background Photo"
//                 value={editingProfile.coverPhoto}
//                 onChange={(file) => updateFormField("coverPhoto", file)}
//               />
//             </div>
//             <div className="mt-4">
//               <InputField
//                 label="Occupation"
//                 value={editingProfile.occupation}
//                 onChange={(v) => updateFormField("occupation", v)}
//               />
//             </div>
//             <div className="mt-4">
//               <TextareaField
//                 label="About Me"
//                 value={editingProfile.about}
//                 onChange={(v) => updateFormField("about", v)}
//               />
//             </div>
//           </Section>

//           <Section>
//             <h3 className="text-lg font-semibold text-black">Contact Information</h3>
//             <div className="mt-3 space-y-4">
//               <InputField
//                 label="Email"
//                 value={editingProfile.email}
//                 onChange={(v) => updateFormField("email", v)}
//               />
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <InputField
//                   label="Phone"
//                   value={editingProfile.phone}
//                   onChange={(v) => updateFormField("phone", v)}
//                 />
//                 <InputField
//                   label="Location"
//                   value={editingProfile.location}
//                   onChange={(v) => updateFormField("location", v)}
//                 />
//               </div>
//             </div>
//           </Section>

//           <Section>
//             <h3 className="text-lg font-semibold text-black">Travel Preferences</h3>
//             <div className="mt-3">
//               <p className="text-sm text-gray-500">Travel Style & Interests</p>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {ALL_TRAVEL_STYLES.map((style) => {
//                   const isSelected = editingProfile.travelStyles.includes(style);
//                   return (
//                     <span
//                       key={style}
//                       onClick={() => toggleArrayItem("travelStyles", style)}
//                       className={`px-3 py-1 rounded-full cursor-pointer text-sm ${
//                         isSelected ? "bg-[#1D4350] text-white" : "bg-white border text-gray-600"
//                       }`}
//                     >
//                       {style}
//                     </span>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="mt-4">
//               <p className="text-sm text-gray-500">Languages</p>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {ALL_LANGUAGES.map((lang) => {
//                   const isSelected = editingProfile.languages.includes(lang);
//                   return (
//                     <span
//                       key={lang}
//                       onClick={() => toggleArrayItem("languages", lang)}
//                       className={`px-3 py-1 rounded-full cursor-pointer text-sm ${
//                         isSelected ? "bg-[#1D4350] text-white" : "bg-white border text-gray-600"
//                       }`}
//                     >
//                       {lang}
//                     </span>
//                   );
//                 })}
//               </div>
//             </div>
//           </Section>

//           <Section>
//             <h3 className="text-lg font-semibold text-black">Social Media & Website</h3>
//             <InputField
//               label="Instagram"
//               value={editingProfile.social.instagram}
//               onChange={(v) => updateFormField("social.instagram", v)}
//             />
//             <InputField
//               label="Facebook"
//               value={editingProfile.social.facebook}
//               onChange={(v) => updateFormField("social.facebook", v)}
//             />
//           </Section>

//           <Section>
//             <h3 className="text-lg font-semibold text-black">Emergency Contact</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <InputField
//                 label="Contact Name"
//                 value={editingProfile.emergency.contactName}
//                 onChange={(v) => updateFormField("emergency.contactName", v)}
//               />
//               <InputField
//                 label="Contact Phone"
//                 value={editingProfile.emergency.contactPhone}
//                 onChange={(v) => updateFormField("emergency.contactPhone", v)}
//               />
//             </div>
//           </Section>
//         </div>
//       )}
//     </>
//   );
// }

// export default DetailsTab;

// // --- Shared Subcomponents ---

// function Section({ children }: SectionProps) {
//   return <div className="p-4 sm:p-6 shadow-lg bg-white mt-6">{children}</div>;
// }

// function FileUploadField({ label, value, onChange }: FileUploadFieldProps) {
//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) onChange(file);
//   };

//   return (
//     <div>
//       <label className="block text-sm font-medium text-black mb-1">{label}</label>

//       <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer bg-white">
//         <span className="text-gray-500 text-xl">📎</span>
//         <span className="text-gray-600">
//           {value ? (value as File)?.name || "File selected" : "Select a file"}
//         </span>
//         <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
//       </label>

//       {value && typeof value === "string" && (
//         <Image
//           src={value}
//           alt="preview"
//           width={96}
//           height={96}
//           className="mt-2 w-24 h-24 rounded-md object-cover border"
//         />
//       )}
//     </div>
//   );
// }

// function InlineIconRow({ icon, text }: InlineIconRowProps) {
//   return (
//     <div className="flex items-center gap-3 text-gray-800">
//       <span className="text-lg">{icon}</span>
//       <span>{text}</span>
//     </div>
//   );
// }

// function ViewTagList({ all, selected }: ViewTagListProps) {
//   return (
//     <div className="flex flex-wrap gap-2">
//       {all.map((item) => {
//         const isSelected = selected.includes(item);
//         return (
//           <span
//             key={item}
//             className={`px-3 py-1 rounded-full text-sm ${
//               isSelected ? "bg-[#1D4350] text-white" : "bg-white border border-gray-300 text-gray-700"
//             }`}
//           >
//             {item}
//           </span>
//         );
//       })}
//     </div>
//   );
// }

// function InputField({ label, value, onChange, type = "text" }: InputFieldProps) {
//   return (
//     <div>
//       <label className="text-sm text-gray-600">{label}</label>
//       <input
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         type={type}
//         className="mt-2 w-full border rounded-md px-3 py-2"
//       />
//     </div>
//   );
// }

// function SelectField({ label, value, onChange, options = [] }: SelectFieldProps) {
//   return (
//     <div>
//       <label className="text-sm text-gray-600">{label}</label>
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="mt-2 w-full border rounded-md px-3 py-2"
//       >
//         {options.map((o) => (
//           <option key={o} value={o}>
//             {o}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// function TextareaField({ label, value, onChange }: TextareaFieldProps) {
//   return (
//     <div>
//       <label className="text-sm text-gray-600">{label}</label>
//       <textarea
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="mt-2 w-full border rounded-md px-3 py-2"
//         rows={3}
//       />
//     </div>
//   );
// }


"use client";

import React from "react";

import {
  Profile,
  SectionProps,
  InlineIconRowProps,
  ViewTagListProps,
  InputFieldProps,
  TextareaFieldProps,
} from "../Types";

import { ALL_TRAVEL_STYLES, ALL_LANGUAGES } from "../data";

interface Props {
  isEditing: boolean;
  profile: Profile;
  editingProfile: Profile;
  setEditingProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

export default function DetailsTab({
  isEditing,
  profile,
  editingProfile,
  setEditingProfile,
}: Props) {
  const updateProfile = <K extends keyof Profile>(
    key: K,
    value: Profile[K],
  ) => {
    setEditingProfile((prev) => ({ ...prev, [key]: value }));
  };

  const toggleItem = (
    key: "travelStyles" | "languages",
    value: string,
  ) => {
    setEditingProfile((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  return (
    <>
      {!isEditing ? (
        <>
          {/* PERSONAL INFO */}
          <Section>
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <p className="mt-2 text-gray-700">{profile.about}</p>
          </Section>

          {/* CONTACT */}
          <Section>
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="mt-3 space-y-3">
              <InlineIconRow icon="✉" text={profile.email} />
              <InlineIconRow icon="📞" text={profile.phone} />
              <InlineIconRow icon="📍" text={profile.location} />
            </div>
          </Section>

          {/* TRAVEL PREFS */}
          <Section>
            <h3 className="text-lg font-semibold">Travel Preferences</h3>
            <ViewTagList
              all={ALL_TRAVEL_STYLES}
              selected={profile.travelStyles}
            />
            <div className="mt-3">
              <ViewTagList
                all={ALL_LANGUAGES}
                selected={profile.languages}
              />
            </div>
          </Section>

          {/* SOCIAL */}
          <Section>
            <h3 className="text-lg font-semibold">Social Media</h3>
            <p>Instagram: {profile.social.instagram}</p>
            <p>Facebook: {profile.social.facebook}</p>
          </Section>

          {/* EMERGENCY */}
          <Section>
            <h3 className="text-lg font-semibold">Emergency Contact</h3>
            <p>{profile.emergency.contactName}</p>
            <p>{profile.emergency.contactPhone}</p>
          </Section>
        </>
      ) : (
        <>
          {/* EDIT MODE */}
          <Section>
            <InputField
              label="First Name"
              value={editingProfile.firstName}
              onChange={(v) => updateProfile("firstName", v)}
            />
            <InputField
              label="Last Name"
              value={editingProfile.lastName}
              onChange={(v) => updateProfile("lastName", v)}
            />
            <TextareaField
              label="About"
              value={editingProfile.about}
              onChange={(v) => updateProfile("about", v)}
            />
          </Section>

          <Section>
            <h3 className="text-lg font-semibold">Travel Preferences</h3>

            <div className="flex flex-wrap gap-2">
              {ALL_TRAVEL_STYLES.map((style) => (
                <span
                  key={style}
                  onClick={() => toggleItem("travelStyles", style)}
                  className={`px-3 py-1 rounded-full cursor-pointer ${
                    editingProfile.travelStyles.includes(style)
                      ? "bg-[#1D4350] text-white"
                      : "border"
                  }`}
                >
                  {style}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {ALL_LANGUAGES.map((lang) => (
                <span
                  key={lang}
                  onClick={() => toggleItem("languages", lang)}
                  className={`px-3 py-1 rounded-full cursor-pointer ${
                    editingProfile.languages.includes(lang)
                      ? "bg-[#1D4350] text-white"
                      : "border"
                  }`}
                >
                  {lang}
                </span>
              ))}
            </div>
          </Section>

          <Section>
            <InputField
              label="Instagram"
              value={editingProfile.social.instagram}
              onChange={(v) =>
                updateProfile("social", {
                  ...editingProfile.social,
                  instagram: v,
                })
              }
            />
            <InputField
              label="Facebook"
              value={editingProfile.social.facebook}
              onChange={(v) =>
                updateProfile("social", {
                  ...editingProfile.social,
                  facebook: v,
                })
              }
            />
          </Section>

          <Section>
            <InputField
              label="Emergency Name"
              value={editingProfile.emergency.contactName}
              onChange={(v) =>
                updateProfile("emergency", {
                  ...editingProfile.emergency,
                  contactName: v,
                })
              }
            />
            <InputField
              label="Emergency Phone"
              value={editingProfile.emergency.contactPhone}
              onChange={(v) =>
                updateProfile("emergency", {
                  ...editingProfile.emergency,
                  contactPhone: v,
                })
              }
            />
          </Section>
        </>
      )}
    </>
  );
}

/* ---------------- SHARED COMPONENTS ---------------- */

function Section({ children }: SectionProps) {
  return (
    <div className="p-4 sm:p-6 shadow-lg bg-white mt-6">
      {children}
    </div>
  );
}

function InlineIconRow({ icon, text }: InlineIconRowProps) {
  return (
    <div className="flex gap-2">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function ViewTagList({ all, selected }: ViewTagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {all.map((item) => (
        <span
          key={item}
          className={`px-3 py-1 rounded-full ${
            selected.includes(item)
              ? "bg-[#1D4350] text-white"
              : "border"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
}: InputFieldProps) {
  return (
    <div className="mt-3">
      <label className="text-sm">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
}: TextareaFieldProps) {
  return (
    <div className="mt-3">
      <label className="text-sm">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
    </div>
  );
}
