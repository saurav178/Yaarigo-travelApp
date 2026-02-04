// "use client";
// import Image from "next/image";

// import React, { useCallback  , useState} from "react";
// import {Profile} from "./Types";

// import TripsTab from "./components/TripsTab";
// import ReviewsTab from "./components/ReviewTab";


// import {initialProfile } from "./data"
// import DetailsTab from "./components/DetailsTab";
// import GalleryTab from "./components/GalleryTab";
// import FollowersModal from "./components/FollowersModal";
// import FollowingModal from "./components/FollowingModal";

// export default function ProfilePage() {
//   const [profile, setProfile] = useState<Profile>(initialProfile);

//   const [showFollowersModal, setShowFollowersModal] = useState(false);
//   const [showFollowingModal, setShowFollowingModal] = useState(false);

//   const [editingProfile, setEditingProfile] = useState<Profile>(initialProfile);

//   const [isEditing, setIsEditing] = useState(false);

//   const [activeTab, setActiveTab] = useState<"details" | "trips" | "reviews" | "gallery">("details");

//   const updateFormField = (path: string, value: unknown) => {
//     const keys = path.split(".");

//     setEditingProfile((prev) => {
//       const copy: Profile = structuredClone(prev);

//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       let cur: any = copy;
//       for (let i = 0; i < keys.length - 1; i++) {
//         cur = cur[keys[i]];
//       }

//       cur[keys[keys.length - 1]] = value;

//       return copy;
//     });
//   };


//   const handleSave = useCallback(() => {
//   const updated: Profile = { ...editingProfile };

//   if (editingProfile.profilePhoto instanceof File) {
//     updated.profilePhoto = URL.createObjectURL(editingProfile.profilePhoto);
//   }

//   if (editingProfile.coverPhoto instanceof File) {
//     updated.coverPhoto = URL.createObjectURL(editingProfile.coverPhoto);
//   }

//   setProfile(updated);
//   setEditingProfile(updated);
//   setIsEditing(false);
// }, [editingProfile]);


//   const handleCancel = useCallback(() => {
//   setEditingProfile(profile);
//   setIsEditing(false);
// }, [profile]);

//   const toggleArrayItem = (path: "travelStyles" | "languages", item: string) => {
//     setEditingProfile((prev) => {
//       const copy: Profile = structuredClone(prev);
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const arr: string[] = path.split(".").reduce((acc: any, k: string) => acc[k], copy);

//       const exists = arr.includes(item);
//       const newArr = exists ? arr.filter((x) => x !== item) : [...arr, item];

//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       let cur: any = copy;
//       const keys = path.split(".");
//       for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
//       cur[keys[keys.length - 1]] = newArr;

//       return copy as Profile;
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 text-black mt-16">
//       <div className="w-full  mx-auto  ">
//         {/* Header */}
//         <header className="relative w-full overflow-hidden bg-white  ">
//           {/* COVER BANNER */}
//           <div className="w-full h-40 sm:h-52 md:h-64 relative">
//             <Image
//               src={typeof profile.coverPhoto === "string" ? profile.coverPhoto : ""}
//               alt="cover"
//               fill
//                className="object-cover"
//             />

//             <button
//               onClick={() => window.history.back()}
//               className="absolute top-3 left-3 sm:top-4 sm:left-4 text-black flex items-center gap-2 text-base sm:text-lg font-medium bg-white/70 px-2 py-1 rounded-md"
//             >
//               ← Back
//             </button>
//           </div>

//           {/* MAIN CONTENT WRAPPER */}
//           <div className="px-4 sm:px-6 pb-8 relative">
//             {/* PROFILE PHOTO */}
//             <div className="absolute -top-16 sm:-top-24 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0">
//               <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-[200px] md:h-[200px] overflow-hidden shadow-lg border-4 border-white rounded-full sm:rounded-none">
//                 <Image
//                   src={typeof profile.profilePhoto === "string" ? profile.profilePhoto : ""}
//                   alt="profile"
//                   fill
                   
//                   className="object-cover"
//                 />

//               </div>
//             </div>

//             {/* ROW: NAME + BADGES + BUTTONS */}
//             <div className="flex flex-col sm:flex-row justify-between items-start mt-20 sm:mt-6 sm:ml-[180px] md:ml-[230px] gap-4">
//               {/* LEFT SIDE */}
//               <div>
//                 <div className="flex flex-wrap items-center gap-2 sm:gap-3">
//                   <h1 className="text-xl sm:text-2xl font-semibold">
//                     {profile.firstName} {profile.lastName}
//                   </h1>

//                   <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 font-semibold">
//                     Verified Traveler
//                   </span>
//                 </div>

//                 <p className="mt-1 text-gray-600 flex items-center gap-2 text-sm sm:text-base">
//                   📍 {profile.location}
//                 </p>

//                 <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-xs sm:text-sm">
//                   <span className="flex items-center gap-1 text-gray-700">
//                     ⭐ 4.1 <span className="text-gray-500">(410 reviews)</span>
//                   </span>

//                   <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-700 flex items-center gap-1">
//                     88% Safe Traveler
//                   </span>
//                 </div>
//               </div>

//               {/* RIGHT SIDE BUTTONS */}
//               <div className="flex justify-end items-center gap-3 mt-2 sm:mt-4 w-full sm:w-auto">
//                 {!isEditing ? (
//                   <button
//                     className="px-4 py-2 bg-[#1D4350] text-white rounded-md w-full sm:w-auto text-sm sm:text-base"
//                     onClick={() => setIsEditing(true)}
//                   >
//                     Edit Profile
//                   </button>
//                 ) : (
//                   <div className="flex gap-3 w-full sm:w-auto">
//                     <button
//                       className="flex-1 sm:flex-none px-4 py-2 bg-gray-100 rounded-md text-sm sm:text-base"
//                       onClick={handleCancel}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       className="flex-1 sm:flex-none px-4 py-2 bg-[#1D4350] text-white rounded-md text-sm sm:text-base"
//                       onClick={handleSave}
//                     >
//                       Save
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* STATS  WALA SECTION */}
//             <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-around text-center gap-4 sm:gap-0">
//               <div
//                 onClick={() => setShowFollowersModal(true)}
//                 className="cursor-pointer"
//               >
//                 <p className="text-lg font-semibold">{profile.followers}</p>
//                 <p className="text-sm text-gray-600">Followers</p>
//               </div>

//               <div
//                 onClick={() => setShowFollowingModal(true)}
//                 className="cursor-pointer"
//               >
//                 <p className="text-lg font-semibold">{profile.following}</p>
//                 <p className="text-sm text-gray-600">Following</p>
//               </div>

//               <div>
//                 <p className="text-lg font-semibold">{profile.tripsCompleted}</p>
//                 <p className="text-sm text-gray-600">Trips Completed</p>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Tabs  */}
//         <nav className="mt-6 bg-gray-100 rounded-lg p-2 flex items-center gap-2 mx-4">
//           {["details", "trips", "reviews", "gallery"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() =>
//                 setActiveTab(tab as "details" | "trips" | "reviews" | "gallery")
//               }
//               className={`text-xs sm:text-sm flex-1 py-2 sm:py-3 rounded-lg cursor-pointer ${
//                 activeTab === tab
//                   ? "bg-white shadow text-black font-medium"
//                   : "text-gray-500"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </nav>

       
//         <main className="mt-6 px-6 sm:px-6">

//           {/* DETAILS WALA TAB */}
//           {activeTab === "details" &&  <DetailsTab isEditing={isEditing}  
//           profile={profile}   editingProfile={editingProfile} setEditingProfile={setEditingProfile}/>}

//           {/* TRIPS WALA TAB */}
//           {activeTab === "trips" &&  <TripsTab profile={profile} />}

//           {/* REVIEWS WALA TAB */}
//           {activeTab === "reviews" && <ReviewsTab profile={profile} setProfile={setProfile} />}

//           {/* GALLERY WALA TAB */}
//           {activeTab === "gallery" && <GalleryTab profile={profile} setProfile={setProfile}/>}

//           {/* FOLLOWERS MODAL */}
//           {showFollowersModal && <FollowersModal profile={profile} setProfile={setProfile} setShowFollowersModal={setShowFollowersModal}/>}

//           {/* FOLLOWING MODAL */}
//           {showFollowingModal && <FollowingModal profile={profile} setProfile={setProfile} setShowFollowingModal={setShowFollowingModal}
// />}
//         </main>
//       </div>
//     </div>
//   );
// }    


"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";

import { Profile } from "./Types";
import { initialProfile } from "./data";

import TripsTab from "./components/TripsTab";
import ReviewsTab from "./components/ReviewTab";
import DetailsTab from "./components/DetailsTab";
import GalleryTab from "./components/GalleryTab";
import FollowersModal from "./components/FollowersModal";
import FollowingModal from "./components/FollowingModal";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [editingProfile, setEditingProfile] =
    useState<Profile>(initialProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "details" | "trips" | "reviews" | "gallery"
  >("details");

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const handleSave = useCallback(() => {
    const updated: Profile = { ...editingProfile };

    if (editingProfile.profilePhoto instanceof File) {
      updated.profilePhoto = URL.createObjectURL(
        editingProfile.profilePhoto
      );
    }

    if (editingProfile.coverPhoto instanceof File) {
      updated.coverPhoto = URL.createObjectURL(
        editingProfile.coverPhoto
      );
    }

    setProfile(updated);
    setEditingProfile(updated);
    setIsEditing(false);
  }, [editingProfile]);

  const handleCancel = useCallback(() => {
    setEditingProfile(profile);
    setIsEditing(false);
  }, [profile]);

  return (
    <div className="min-h-screen bg-gray-100 text-black mt-16">
      <div className="w-full mx-auto">
        {/* Header */}
        <header className="relative w-full overflow-hidden bg-white">
          {/* Cover */}
          <div className="relative w-full h-40 sm:h-52 md:h-64">
            <Image
              src={
                typeof profile.coverPhoto === "string"
                  ? profile.coverPhoto
                  : ""
              }
              alt="cover"
              fill
              className="object-cover"
              priority
            />

            <button
              onClick={() => window.history.back()}
              className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/70 px-2 py-1 rounded-md text-black text-sm sm:text-base"
            >
              ← Back
            </button>
          </div>

          {/* Profile Info */}
          <div className="px-4 sm:px-6 pb-8 relative">
            {/* Profile Image */}
            <div className="absolute -top-16 sm:-top-24 left-1/2 sm:left-8 -translate-x-1/2 sm:translate-x-0">
              <div className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-[200px] md:h-[200px] border-4 border-white rounded-full sm:rounded-none overflow-hidden shadow-lg">
                <Image
                  src={
                    typeof profile.profilePhoto === "string"
                      ? profile.profilePhoto
                      : ""
                  }
                  alt="profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Name + Buttons */}
            <div className="mt-20 sm:mt-6 sm:ml-[180px] md:ml-[230px] flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold">
                  {profile.firstName} {profile.lastName}
                </h1>

                <p className="mt-1 text-gray-600 text-sm">
                  📍 {profile.location}
                </p>

                <div className="mt-2 text-sm text-gray-700 flex gap-4">
                  <span>⭐ 4.1 (410 reviews)</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    88% Safe Traveler
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-[#1D4350] text-white rounded-md"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-100 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-[#1D4350] text-white rounded-md"
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 border-t pt-6 flex justify-around text-center">
              <div
                className="cursor-pointer"
                onClick={() => setShowFollowersModal(true)}
              >
                <p className="font-semibold">{profile.followers}</p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>

              <div
                className="cursor-pointer"
                onClick={() => setShowFollowingModal(true)}
              >
                <p className="font-semibold">{profile.following}</p>
                <p className="text-sm text-gray-600">Following</p>
              </div>

              <div>
                <p className="font-semibold">
                  {profile.tripsCompleted}
                </p>
                <p className="text-sm text-gray-600">
                  Trips Completed
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <nav className="mt-6 bg-gray-100 p-2 flex gap-2 mx-4 rounded-lg">
          {["details", "trips", "reviews", "gallery"].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab as typeof activeTab)
              }
              className={`flex-1 py-2 rounded-lg text-sm ${
                activeTab === tab
                  ? "bg-white shadow font-medium"
                  : "text-gray-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main className="mt-6 px-6">
          {activeTab === "details" && (
            <DetailsTab
              isEditing={isEditing}
              profile={profile}
              editingProfile={editingProfile}
              setEditingProfile={setEditingProfile}
            />
          )}

          {activeTab === "trips" && (
            <TripsTab profile={profile} />
          )}

          {activeTab === "reviews" && (
            <ReviewsTab
              profile={profile}
              setProfile={setProfile}
            />
          )}

          {activeTab === "gallery" && (
            <GalleryTab
              profile={profile}
              setProfile={setProfile}
            />
          )}

          {showFollowersModal && (
            <FollowersModal
              profile={profile}
              setProfile={setProfile}
              setShowFollowersModal={setShowFollowersModal}
            />
          )}

          {showFollowingModal && (
            <FollowingModal
              profile={profile}
              setProfile={setProfile}
              setShowFollowingModal={setShowFollowingModal}
            />
          )}
        </main>
      </div>
    </div>
  );
}
