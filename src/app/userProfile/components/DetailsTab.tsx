"use client";
 

import React, {   ChangeEvent } from "react";
import {
  TripStatus,
  Profile,
  SectionProps,
  FileUploadFieldProps,
  InlineIconRowProps,
  ViewTagListProps,
  InputFieldProps,
  SelectFieldProps,
  TextareaFieldProps,
  TripCardProps,
} from "../Types";

import { ALL_TRAVEL_STYLES , ALL_LANGUAGES} from "../data"

interface props{
    isEditing : boolean,
    //setIsEditing : boolean
    //setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
    profile:Profile,
     
    editingProfile:Profile,
    setEditingProfile: React.Dispatch<React.SetStateAction<Profile>>
}

function DetailsTab({isEditing,profile,editingProfile,setEditingProfile}:props) {
     
      const toggleArrayItem = (path: "travelStyles" | "languages", item: string) => {
        setEditingProfile((prev) => {
    
          const copy: Profile = JSON.parse(JSON.stringify(prev));
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const arr: string[] = path.split(".").reduce((acc: any, k: string) => acc[k], copy);
    
          const exists = arr.includes(item);
          const newArr = exists ? arr.filter((x) => x !== item) : [...arr, item];
    
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let cur: any = copy;
          const keys = path.split(".");
          for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
          cur[keys[keys.length - 1]] = newArr;
    
          return copy as Profile;
        });
      };

        const updateFormField = (path: string, value: unknown) => {
          const keys = path.split(".");
      
          setEditingProfile((prev) => {
            const copy: Profile = structuredClone(prev);
      
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let cur: any = copy;
            for (let i = 0; i < keys.length - 1; i++) {
              cur = cur[keys[i]];
            }
      
            cur[keys[keys.length - 1]] = value;
      
            return copy;
          });
        };
  return (
    
                  <>
                    {!isEditing ? (
                      <div>
                        <Section>
                          <h3 className="text-lg font-semibold text-black">
                            Personal Information
                          </h3>
      
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                              <p className="text-sm text-gray-500">Date of Birth</p>
                              <p className="mt-2 text-gray-800">{profile.dob}</p>
                            </div>
      
                            <div>
                              <p className="text-sm text-gray-500">Gender</p>
                              <p className="mt-2 text-gray-800">{profile.gender}</p>
                            </div>
                          </div>
      
                          <div className="mt-6">
                            <p className="text-sm text-gray-500">Occupation</p>
                            <p className="mt-2 text-gray-800">{profile.occupation}</p>
                          </div>
      
                          <div className="mt-6">
                            <p className="text-sm text-gray-500">About Me</p>
                            <p className="mt-2 text-gray-800">{profile.about}</p>
                          </div>
                        </Section>
      
                        <Section>
                          <h3 className="text-lg font-semibold text-black">
                            Contact Information
                          </h3>
      
                          <div className="mt-4 space-y-4">
                            <InlineIconRow icon="✉" text={profile.email} />
                            <InlineIconRow icon="📞" text={profile.phone} />
                            <InlineIconRow icon="📍" text={profile.location} />
                          </div>
                        </Section>
      
                        <Section>
                          <h3 className="text-lg font-semibold text-black">
                            Travel Preferences
                          </h3>
      
                          <div className="mt-3">
                            <p className="text-sm text-gray-500">
                              Travel Style & Interests
                            </p>
                            <div className="mt-2">
                              <ViewTagList
                                all={ALL_TRAVEL_STYLES}
                                selected={profile.travelStyles}
                              />
                            </div>
                          </div>
      
                          <div className="mt-4">
                            <p className="text-sm text-gray-500">Languages</p>
                            <div className="mt-2">
                              <ViewTagList
                                all={ALL_LANGUAGES}
                                selected={profile.languages}
                              />
                            </div>
                          </div>
                        </Section>
      
                        <Section>
                          <h3 className="text-lg font-semibold text-black">
                            Social Media & Website
                          </h3>
      
                          <div className="mt-3 space-y-3 text-gray-800">
                            <div>
                              <span className="text-sm text-gray-500">
                                Instagram:{" "}
                              </span>
                              <span>{profile.social.instagram}</span>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Facebook: </span>
                              <span>{profile.social.facebook}</span>
                            </div>
                          </div>
                        </Section>
      
                        <Section>
                          <h3 className="text-lg font-semibold text-black">
                            Emergency Contact
                          </h3>
      
                          <div className="mt-3">
                            <p className="text-sm text-gray-500">Contact Name</p>
                            <p className="mt-2 text-gray-800">
                              {profile.emergency.contactName}
                            </p>
      
                            <p className="text-sm text-gray-500 mt-4">Contact Phone</p>
                            <p className="mt-2 text-gray-800">
                              {profile.emergency.contactPhone}
                            </p>
                          </div>
                        </Section>
                      </div>
                    ) : (
                      <div>
                        <Section>
                          <h3 className="text-lg font-semibold text-black">
                            Personal Information
                          </h3>
      
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <InputField
                              label="First Name"
                              value={editingProfile.firstName}
                              onChange={(v) => updateFormField("firstName", v)}
                            />
                            <InputField
                              label="Last Name"
                              value={editingProfile.lastName}
                              onChange={(v) => updateFormField("lastName", v)}
                            />
                          </div>
      
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                            <InputField
                              label="Date of Birth"
                              type="date"
                              value={editingProfile.dob}
                              onChange={(v) => updateFormField("dob", v)}
                            />
                            <SelectField
                              label="Gender"
                              value={editingProfile.gender}
                              onChange={(v) => updateFormField("gender", v)}
                              options={["female", "male", "other"]}
                            />
                          </div>
      
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FileUploadField
                              label="Profile Photo"
                              value={editingProfile.profilePhoto}
                              onChange={(file) => updateFormField("profilePhoto", file)}
                            />
      
                            <FileUploadField
                              label="Background Photo"
                              value={editingProfile.coverPhoto}
                              onChange={(file) => updateFormField("coverPhoto", file)}
                            />
                          </div>
      
                          <div className="mt-4">
                            <InputField
                              label="Occupation"
                              value={editingProfile.occupation}
                              onChange={(v) => updateFormField("occupation", v)}
                            />
                          </div>
      
                          <div className="mt-4">
                            <TextareaField
                              label="About Me"
                              value={editingProfile.about}
                              onChange={(v) => updateFormField("about", v)}
                            />
                          </div>
                        </Section>
      
                        <Section>
                          <h3 className="text-lg font-semibold text-black">
                            Contact Information
                          </h3>
      
                          <div className="mt-3 space-y-4">
                            <InputField
                              label="Email"
                              value={editingProfile.email}
                              onChange={(v) => updateFormField("email", v)}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <InputField
                                label="Phone"
                                value={editingProfile.phone}
                                onChange={(v) => updateFormField("phone", v)}
                              />
                              <InputField
                                label="Location"
                                value={editingProfile.location}
                                onChange={(v) => updateFormField("location", v)}
                              />
                            </div>
                          </div>
                        </Section>
      
                        <Section>
                          <h3 className="text-lg font-semibold text-black">
                            Travel Preferences
                          </h3>
      
                          <div className="mt-3">
                            <p className="text-sm text-gray-500">
                              Travel Style & Interests
                            </p>
      
                            <div className="flex flex-wrap gap-2 mt-2">
                              {ALL_TRAVEL_STYLES.map((style) => {
                                const isSelected = editingProfile.travelStyles.includes(
                                  style
                                );
                                return (
                                  <span
                                    key={style}
                                    onClick={() =>
                                      toggleArrayItem("travelStyles", style)
                                    }
                                    className={`px-3 py-1 rounded-full cursor-pointer text-sm
                                      ${
                                        isSelected
                                          ? "bg-[#1D4350] text-white"
                                          : "bg-white border text-gray-600"
                                      }`}
                                  >
                                    {style}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
      
                          <div className="mt-4">
                            <p className="text-sm text-gray-500">Languages</p>
      
                            <div className="flex flex-wrap gap-2 mt-2">
                              {ALL_LANGUAGES.map((lang) => {
                                const isSelected = editingProfile.languages.includes(
                                  lang
                                );
                                return (
                                  <span
                                    key={lang}
                                    onClick={() =>
                                      toggleArrayItem("languages", lang)
                                    }
                                    className={`px-3 py-1 rounded-full cursor-pointer text-sm
                                      ${
                                        isSelected
                                          ? "bg-[#1D4350] text-white"
                                          : "bg-white border text-gray-600"
                                      }`}
                                  >
                                    {lang}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </Section>
      
                        <Section>
                          <h3 className="text-lg font-semibold text-black">
                            Social Media & Website
                          </h3>
                          <InputField
                            label="Instagram"
                            value={editingProfile.social.instagram}
                            onChange={(v) =>
                              updateFormField("social.instagram", v)
                            }
                          />
                          <InputField
                            label="Facebook"
                            value={editingProfile.social.facebook}
                            onChange={(v) =>
                              updateFormField("social.facebook", v)
                            }
                          />
                        </Section>
      
                        <Section>
                          <h3 className="text-lg font-semibold text-black">
                            Emergency Contact
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                              label="Contact Name"
                              value={editingProfile.emergency.contactName}
                              onChange={(v) =>
                                updateFormField("emergency.contactName", v)
                              }
                            />
                            <InputField
                              label="Contact Phone"
                              value={editingProfile.emergency.contactPhone}
                              onChange={(v) =>
                                updateFormField("emergency.contactPhone", v)
                              }
                            />
                          </div>
                        </Section>
                      </div>
                    )}
                  </>
               
  
  );
}

export default DetailsTab;


function Section({ children }: SectionProps) {
  return (
    <div className="p-4 sm:p-6 shadow-lg bg-white mt-6  ">
      {children}
    </div>
  );
}


function FileUploadField({ label, value, onChange }: FileUploadFieldProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-black mb-1">
        {label}
      </label>

      <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer bg-white">
        <span className="text-gray-500 text-xl">📎</span>

        <span className="text-gray-600">
          {value
            ? (value as File)?.name || "File selected"
            : "Select a file"}
        </span>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {value && typeof value !== "string" && (
        <p className="mt-1 text-xs text-gray-500">
          Selected: {(value as File).name}
        </p>
      )}

      {value && typeof value === "string" && (
        <img
          src={value}
          alt="preview"
          className="mt-2 w-24 h-24 rounded-md object-cover border"
        />
      )}
    </div>
  );
}



function InlineIconRow({ icon, text }: InlineIconRowProps) {
  return (
    <div className="flex items-center gap-3 text-gray-800">
      <span className="text-lg">{icon}</span>
      <span>{text}</span>
    </div>
  );
}



function ViewTagList({ all, selected }: ViewTagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {all.map((item) => {
        const isSelected = selected.includes(item);
        return (
          <span
            key={item}
            className={`px-3 py-1 rounded-full text-sm
              ${
                isSelected
                  ? "bg-[#1D4350] text-white"
                  : "bg-white border border-gray-300 text-gray-700"
              }`}
          >
            {item}
          </span>
        );
      })}
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
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        className="mt-2 w-full border rounded-md px-3 py-2"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options = [],
}: SelectFieldProps) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border rounded-md px-3 py-2"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}



function TextareaField({ label, value, onChange }: TextareaFieldProps) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border rounded-md px-3 py-2"
        rows={3}
      />
    </div>
  );
}



function TripCard({ trip }: TripCardProps) {
  const statusColors: Record<
    TripStatus,
    { bg: string; text: string; label: string }
  > = {
    confirmed: {
      bg: "bg-green-100",
      text: "text-green-700",
      label: "Confirmed",
    },
    planning: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      label: "Planning",
    },
    completed: {
      bg: "bg-gray-100",
      text: "text-gray-700",
      label: "Completed",
    },
  };

  const badge = statusColors[trip.status] || statusColors.planning;

  return (
    <div className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
      <img
        src={trip.image}
        className="w-full h-40 sm:w-36 sm:h-32 object-cover rounded-md"
        alt={trip.title}
      />

      <div className="flex-1 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-3">
          <div>
            <h4 className="text-lg font-semibold">{trip.title}</h4>
            <p className="text-sm text-gray-500 mt-1">{trip.location}</p>

            <div className="mt-3 text-sm text-gray-600 flex flex-wrap gap-4 items-center">
              <div>
                📅 {trip.start} - {trip.end}
              </div>
              <div>👥 {trip.participants.length} people</div>
            </div>
          </div>

          <div className="text-right w-full sm:w-auto">
            <div
              className={`inline-block px-3 py-1 rounded-full ${badge.bg} ${badge.text} text-sm`}
            >
              {badge.label}
            </div>

            {trip.status === "completed" && (
              <div className="mt-3">
                <button className="px-3 py-2 bg-rose-400 text-white rounded-md text-sm w-full sm:w-auto">
                  Leave Reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


