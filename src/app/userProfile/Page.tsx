"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Trip,
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
} from "./Types";

import {initialProfile,ALL_TRAVEL_STYLES , ALL_LANGUAGES} from "./data"

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(initialProfile);

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const [searchFollowers, setSearchFollowers] = useState("");
  const [searchFollowing, setSearchFollowing] = useState("");

  const [editingProfile, setEditingProfile] = useState<Profile>(initialProfile);

  const [isEditing, setIsEditing] = useState(false);

  const [activeTab, setActiveTab] = useState<"details" | "trips" | "reviews" | "gallery">("details");

  const [tripsInnerTab, setTripsInnerTab] = useState<"upcoming" | "past">("upcoming");

  const updateFormField = (path: string, value: unknown) => {
    const keys = path.split(".");

    setEditingProfile((prev) => {
      const copy: any = structuredClone(prev);

      let cur = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        cur = cur[keys[i]];
      }

      cur[keys[keys.length - 1]] = value;

      return copy;
    });
  };

  const handleSave = () => {
    let updated: Profile = { ...editingProfile };

    if (editingProfile.profilePhoto instanceof File) {
      updated.profilePhoto = URL.createObjectURL(editingProfile.profilePhoto);
    }

    if (editingProfile.coverPhoto instanceof File) {
      updated.coverPhoto = URL.createObjectURL(editingProfile.coverPhoto);
    }

    setProfile(updated);
    setEditingProfile(updated);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingProfile(profile);
    setIsEditing(false);
  };

  const toggleArrayItem = (path: "travelStyles" | "languages", item: string) => {
    setEditingProfile((prev) => {
      const copy: any = structuredClone(prev);
      const arr: string[] = path.split(".").reduce((acc: any, k: string) => acc[k], copy);

      const exists = arr.includes(item);
      const newArr = exists ? arr.filter((x) => x !== item) : [...arr, item];

      let cur = copy;
      const keys = path.split(".");
      for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
      cur[keys[keys.length - 1]] = newArr;

      return copy as Profile;
    });
  };

  const upcomingTrips = profile.trips.filter(
    (t) => t.status === "confirmed" || t.status === "planning"
  );
  const pastTrips = profile.trips.filter((t) => t.status === "completed");

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="w-[95%]  mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="relative w-full overflow-hidden bg-white border rounded-sm">
          {/* COVER BANNER */}
          <div className="w-full h-40 sm:h-52 md:h-64 relative">
            <img
              src={typeof profile.coverPhoto === "string" ? profile.coverPhoto : ""}
              className="w-full h-full object-cover"
              alt="cover"
            />

            <button
              onClick={() => window.history.back()}
              className="absolute top-3 left-3 sm:top-4 sm:left-4 text-black flex items-center gap-2 text-base sm:text-lg font-medium bg-white/70 px-2 py-1 rounded-md"
            >
              ← Back
            </button>
          </div>

          {/* MAIN CONTENT WRAPPER */}
          <div className="px-4 sm:px-6 pb-8 relative">
            {/* PROFILE PHOTO */}
            <div className="absolute -top-16 sm:-top-24 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0">
              <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-[200px] md:h-[200px] overflow-hidden shadow-lg border-4 border-white rounded-full sm:rounded-none">
                <img
                  src={typeof profile.profilePhoto === "string" ? profile.profilePhoto : ""}
                  className="w-full h-full object-cover"
                  alt="profile"
                />
              </div>
            </div>

            {/* ROW: NAME + BADGES + BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-between items-start mt-20 sm:mt-6 sm:ml-[180px] md:ml-[230px] gap-4">
              {/* LEFT SIDE */}
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h1 className="text-xl sm:text-2xl font-semibold">
                    {profile.firstName} {profile.lastName}
                  </h1>

                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 font-semibold">
                    Verified Traveler
                  </span>
                </div>

                <p className="mt-1 text-gray-600 flex items-center gap-2 text-sm sm:text-base">
                  📍 {profile.location}
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-xs sm:text-sm">
                  <span className="flex items-center gap-1 text-gray-700">
                    ⭐ 4.1 <span className="text-gray-500">(410 reviews)</span>
                  </span>

                  <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-700 flex items-center gap-1">
                    88% Safe Traveler
                  </span>
                </div>
              </div>

              {/* RIGHT SIDE BUTTONS */}
              <div className="flex justify-end items-center gap-3 mt-2 sm:mt-4 w-full sm:w-auto">
                {!isEditing ? (
                  <button
                    className="px-4 py-2 bg-[#1D4350] text-white rounded-md w-full sm:w-auto text-sm sm:text-base"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      className="flex-1 sm:flex-none px-4 py-2 bg-gray-100 rounded-md text-sm sm:text-base"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex-1 sm:flex-none px-4 py-2 bg-[#1D4350] text-white rounded-md text-sm sm:text-base"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* STATS  WALA SECTION */}
            <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-around text-center gap-4 sm:gap-0">
              <div
                onClick={() => setShowFollowersModal(true)}
                className="cursor-pointer"
              >
                <p className="text-lg font-semibold">{profile.followers}</p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>

              <div
                onClick={() => setShowFollowingModal(true)}
                className="cursor-pointer"
              >
                <p className="text-lg font-semibold">{profile.following}</p>
                <p className="text-sm text-gray-600">Following</p>
              </div>

              <div>
                <p className="text-lg font-semibold">{profile.tripsCompleted}</p>
                <p className="text-sm text-gray-600">Trips Completed</p>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs  */}
        <nav className="mt-6 bg-gray-100 rounded-lg p-2 flex items-center gap-2">
          {["details", "trips", "reviews", "gallery"].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab as "details" | "trips" | "reviews" | "gallery")
              }
              className={`text-xs sm:text-sm flex-1 py-2 sm:py-3 rounded-lg cursor-pointer ${
                activeTab === tab
                  ? "bg-white shadow text-black font-medium"
                  : "text-gray-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

       
        <main className="mt-6">
          {/* DETAILS WALA TAB */}
          {activeTab === "details" && (
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
          )}

          {/* TRIPS WALA TAB */}
          {activeTab === "trips" && (
            <div>
              <Section>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <h3 className="text-lg font-semibold text-black">My Trips</h3>
                  <button className="px-3 py-2 bg-[#1D4350] text-white rounded-md w-full sm:w-auto text-sm">
                    Plan New Trip
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => setTripsInnerTab("upcoming")}
                    className={`px-3 py-2 rounded-md text-sm ${
                      tripsInnerTab === "upcoming"
                        ? "bg-white shadow text-black"
                        : "text-gray-500 bg-gray-100"
                    }`}
                  >
                    Upcoming ({upcomingTrips.length})
                  </button>
                  <button
                    onClick={() => setTripsInnerTab("past")}
                    className={`px-3 py-2 rounded-md text-sm ${
                      tripsInnerTab === "past"
                        ? "bg-white shadow text-black"
                        : "text-gray-500 bg-gray-100"
                    }`}
                  >
                    Past Trips ({pastTrips.length})
                  </button>
                </div>

                <div className="mt-6 space-y-6">
                  {tripsInnerTab === "upcoming" &&
                    upcomingTrips.map((t) => (
                      <TripCard key={t.id} trip={t} />
                    ))}

                  {tripsInnerTab === "past" &&
                    pastTrips.map((t) => <TripCard key={t.id} trip={t} />)}
                </div>
              </Section>
            </div>
          )}

          {/* REVIEWS WALA TAB */}
          {activeTab === "reviews" && (
            <div>
              <Section>
                <h3 className="text-lg font-semibold text-black">
                  Reviews from Trip Mates
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  4.9 Based on {profile.reviews.length} reviews
                </p>

                {(() => {
                  const showAll = profile.showAllReviews;
                  const reviews = showAll
                    ? profile.reviews
                    : profile.reviews.slice(0, 2);

                  return (
                    <>
                      <div className="mt-6 space-y-6">
                        {reviews.map((r) => (
                          <div
                            key={r.id}
                            className="border rounded-lg p-4"
                          >
                            <div className="flex items-start gap-4">
                              <img
                                src={r.image}
                                alt={r.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />

                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
                                  <div>
                                    <p className="font-semibold">{r.name}</p>
                                    <p className="text-sm text-gray-500">
                                      {r.title}
                                    </p>
                                  </div>

                                  <div className="text-sm font-semibold text-yellow-500 flex gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <span key={i}>★</span>
                                    ))}
                                  </div>
                                </div>

                                <p className="mt-3 text-gray-700">
                                  {r.text}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                  {r.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-xs"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                <p className="mt-3 text-sm text-gray-500">
                                  {r.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}

                        {!showAll && profile.reviews.length > 2 && (
                          <div className="text-center">
                            <button
                              onClick={() =>
                                setProfile((prev) => ({
                                  ...prev,
                                  showAllReviews: true,
                                }))
                              }
                              className="px-4 py-2 border rounded-md text-rose-500 hover:bg-rose-50 cursor-pointer"
                            >
                              Load More Reviews
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}
              </Section>
            </div>
          )}

          {/* GALLERY WALA TAB */}
          {activeTab === "gallery" && (
            <div>
              <Section>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <h3 className="text-lg font-semibold text-black">
                    Travel Gallery
                  </h3>

                  <label className="px-3 py-2 bg-[#1D4350] text-white rounded-md cursor-pointer text-sm">
                    Upload Photos
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const files = Array.from(e.target.files || []);
                        const urls = files.map((file) =>
                          URL.createObjectURL(file)
                        );

                        setProfile((prev) => ({
                          ...prev,
                          gallery: [...prev.gallery, ...urls],
                        }));
                      }}
                    />
                  </label>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {profile.gallery.length} photos from{" "}
                  {profile.trips.length} trips
                </p>

                {(() => {
                  const showAll = profile.showAllGallery;
                  const photos = showAll
                    ? profile.gallery
                    : profile.gallery.slice(0, 8);

                  return (
                    <>
                      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {photos.map((g, i) => (
                          <img
                            key={i}
                            src={g}
                            alt={`gallery-${i}`}
                            className="w-full h-32 sm:h-40 object-cover rounded-md"
                          />
                        ))}
                      </div>

                      {profile.gallery.length > 8 && !showAll && (
                        <div className="text-center mt-6">
                          <button
                            onClick={() =>
                              setProfile((prev) => ({
                                ...prev,
                                showAllGallery: true,
                              }))
                            }
                            className="px-4 py-2 border border-rose-300 rounded-md text-rose-500 hover:bg-rose-50 cursor-pointer"
                          >
                            Show More
                          </button>
                        </div>
                      )}
                    </>
                  );
                })()}
              </Section>
            </div>
          )}

          {/* FOLLOWERS MODAL */}
          {showFollowersModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-[420px] mx-4 rounded-2xl shadow-lg overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Followers</h2>
                  <button
                    onClick={() => setShowFollowersModal(false)}
                    className="text-2xl font-light"
                  >
                    ✕
                  </button>
                </div>

                <div className="px-4 py-2">
                  <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                    <span className="text-gray-500 mr-2">🔍</span>
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchFollowers}
                      onChange={(e) => setSearchFollowers(e.target.value)}
                      className="bg-transparent w-full outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="max-h-[320px] overflow-y-auto px-2 pb-4">
                  {profile.followersList
                    ?.filter(
                      (user) =>
                        user.name
                          .toLowerCase()
                          .includes(searchFollowers.toLowerCase()) ||
                        user.username
                          .toLowerCase()
                          .includes(searchFollowers.toLowerCase())
                    )
                    .map((f) => (
                      <div
                        key={f.username}
                        className="flex items-center justify-between px-3 py-3 hover:bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={f.image}
                            className="w-12 h-12 rounded-full object-cover"
                            alt={f.name}
                          />
                          <div>
                            <p className="font-semibold text-sm">{f.name}</p>
                            <p className="text-gray-500 text-xs">
                              {f.username}
                            </p>
                          </div>
                        </div>

                        <button
                          className="px-4 py-1 rounded-lg bg-gray-200 text-sm hover:bg-gray-300"
                          onClick={() => {
                            setProfile((prev) => ({
                              ...prev,
                              followersList: prev.followersList.filter(
                                (u) => u.username !== f.username
                              ),
                              followers: prev.followers - 1,
                            }));
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}

                  {profile.followersList?.filter(
                    (u) =>
                      u.name
                        .toLowerCase()
                        .includes(searchFollowers.toLowerCase()) ||
                      u.username
                        .toLowerCase()
                        .includes(searchFollowers.toLowerCase())
                  ).length === 0 && (
                    <p className="text-center text-gray-500 py-6">
                      No results found.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* FOLLOWING MODAL */}
          {showFollowingModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-[420px] mx-4 rounded-2xl shadow-lg overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Following</h2>
                  <button
                    onClick={() => setShowFollowingModal(false)}
                    className="text-2xl font-light"
                  >
                    ✕
                  </button>
                </div>

                <div className="px-4 py-2">
                  <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                    <span className="text-gray-500 mr-2">🔍</span>
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchFollowing}
                      onChange={(e) => setSearchFollowing(e.target.value)}
                      className="bg-transparent w-full outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="max-h-[320px] overflow-y-auto px-2 pb-4">
                  {profile.followingList
                    ?.filter(
                      (user) =>
                        user.name
                          .toLowerCase()
                          .includes(searchFollowing.toLowerCase()) ||
                        user.username
                          .toLowerCase()
                          .includes(searchFollowing.toLowerCase())
                    )
                    .map((f) => (
                      <div
                        key={f.username}
                        className="flex items-center justify-between px-3 py-3 hover:bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={f.image}
                            className="w-12 h-12 rounded-full object-cover"
                            alt={f.name}
                          />
                          <div>
                            <p className="font-semibold text-sm">{f.name}</p>
                            <p className="text-gray-500 text-xs">
                              {f.username}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setProfile((prev) => ({
                              ...prev,
                              followingList: prev.followingList.map((u) =>
                                u.username === f.username
                                  ? { ...u, isFollowing: !u.isFollowing }
                                  : u
                              ),
                            }));
                          }}
                          className={`px-4 py-1 rounded-lg text-sm ${
                            f.isFollowing
                              ? "bg-gray-200 hover:bg-gray-300"
                              : "bg-rose-100 text-rose-600 hover:bg-rose-200"
                          }`}
                        >
                          {f.isFollowing ? "Following" : "Follow"}
                        </button>
                      </div>
                    ))}

                  {profile.followingList?.filter(
                    (u) =>
                      u.name
                        .toLowerCase()
                        .includes(searchFollowing.toLowerCase()) ||
                      u.username
                        .toLowerCase()
                        .includes(searchFollowing.toLowerCase())
                  ).length === 0 && (
                    <p className="text-center text-gray-500 py-6">
                      No results found.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* -------------------------
   Reusable UI components
   ------------------------- */



function Section({ children }: SectionProps) {
  return (
    <div className="p-4 sm:p-6 shadow-lg bg-white mt-6 rounded-md">
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
