"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { User, Heart, Users, Plus, X, ArrowRight, ArrowLeft, Info, MapPin, Calendar, Signal } from "lucide-react";
import { 
  joinSoloTrip, 
  initTripJoin, 
  getTravelerProfiles,
  createTravelerProfile,
  addTravellersToTrip,
  submitJoinRequest,
  InitJoinPayload,
  TravellerProfile,
  SelectedTraveller,
  NewTravellerPayload
  } from '../lib/api/joinTripApi';
import { useAuth } from "../../../context/AuthContext";
const JoinTripModal = ({ trip, user, onClose }: any) => {
 const [step, setStep] = useState(1);
  const [reservationType, setReservationType] = useState('SOLO');
  const [guests, setGuests] = useState<any[]>([]);
  const [showTravellerForm, setShowTravellerForm] = useState(false);
  const [customMessage, setCustomMessage] = useState("Hi, I'm really excited to join!");
  const [numberOfTravelers, setNumberOfTravelers] = useState<number | ''>('');
  const [joinId, setJoinId] = useState<string | null>(null);
  const [selectedTravellers, setSelectedTravellers] = useState<any[]>([]);
  
  // ✅ Removed duplicate declarations
  const [isTravellersAdded, setIsTravellersAdded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [existingProfiles, setExistingProfiles] = useState<TravellerProfile[]>([]);
  const [showExistingList, setShowExistingList] = useState(false);
  const [profiles, setProfiles] = useState<TravellerProfile[]>([]);
  const [lockedTravellers, setLockedTravellers] = useState<any[]>([]);
  const [travelerProfiles, setTravelerProfiles] = useState<TravellerProfile[]>([]);
  const [isCreatingTraveller, setIsCreatingTraveller] = useState(false);
  const predefinedMessages = [
    "Super excited for this! 🔥", 
    "Count me in! Ready to explore.", 
    "Can't wait to meet the group!",
    "Is there a WhatsApp group yet?"
  ];
const [newTraveller, setNewTraveller] = useState({
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  phone: "",
  email: "",
  nationality: ""
});
const { user: authUser, isAuthenticated } = useAuth(); 
  const hasAlreadyJoined = () => {
  const userId = user?.id || authUser?.id;
  const joinedTrips = JSON.parse(localStorage.getItem("joinedTrips") || "{}");
  return userId && joinedTrips[userId]?.includes(trip?._id);
};
  //* ================= FETCH TRIP MODE & CHECK JOIN ================= */
const hasFetchedTrip = useRef(false);
useEffect(() => {
  const fetchTripMode = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/trips/search`);
      const data = await res.json();

      const selectedTrip = data?.results?.find(
        (t: any) => t._id === trip?._id
      );

      // Determine reservation type
      const mode = (
        selectedTrip?.partnerPreferences?.travelMode ||
        selectedTrip?.category ||
        "SOLO"
      ).toUpperCase();
      setReservationType(mode);

      // Set default guests array based on trip type
      if (mode === "COUPLE") {
        setGuests([{ name: "", age: "", gender: "FEMALE" }]);
      } else if (mode === "GROUP") {
        setGuests([{ name: "", age: "", gender: "MALE" }]);
      } else {
        setGuests([]);
      }

      // ================= CHECK IF USER ALREADY JOINED =================
      const userId = user?.id || authUser?.id;
      const joinedTrips = JSON.parse(localStorage.getItem("joinedTrips") || "{}");

      if (userId && joinedTrips[userId]?.includes(trip?._id)) {
        // Already joined → go directly to Step 3
        setStep(3);
        alert("You have already sent a join request for this trip.");
      }

    } catch (error) {
      console.error("Error fetching trip:", error);
    }
  };

  // prevent double API call
  if (trip?._id && !hasFetchedTrip.current) {
    hasFetchedTrip.current = true;
    fetchTripMode();
  }

}, [trip, user]);
  const addGuest = () => setGuests([...guests, { name: '', age: '', gender: 'MALE' }]);

const handleSoloSubmit = async () => {
  if (!isAuthenticated) {
    alert("Please log in to join this trip.");
    return;
  }

  if (!customMessage.trim()) return alert("Please enter a message.");

  try {
    const response = await joinSoloTrip({
      tripId: trip._id || trip.id,
      ownerId: trip.organizationId,
      tripName: trip.title || "Trip",
      requesterName: user?.firstName || user?.name || "Traveler",
      message: customMessage
    });

    // Check if API says join request already exists
    if (response?.message?.includes("already have a pending")) {
      alert(response.message); // show API message
      setStep(3); // go to final screen
      return;
    }

    // Save to localStorage after successful join
    const userId = user?.id || authUser?.id;
    const joinedTrips = JSON.parse(localStorage.getItem("joinedTrips") || "{}");
    if (!joinedTrips[userId]) joinedTrips[userId] = [];
    joinedTrips[userId].push(trip._id);
    localStorage.setItem("joinedTrips", JSON.stringify(joinedTrips));

    setStep(3);
    alert("Join request sent successfully!");
  } catch (error: any) {
    console.error("Join Trip Error:", error.response?.data);
    const serverMessage = error.response?.data?.message;
    alert(serverMessage || "Server error occurred while joining. Please try again.");
  }
};
  
/* ================= INIT JOIN FOR GROUP/COUPLE ================= */
/* ================= INIT JOIN FOR GROUP/COUPLE ================= */
const handleInitJoin = async () => {

  if (!numberOfTravelers || Number(numberOfTravelers) <= 0) {
    return alert("Please enter the number of travelers to proceed.");
  }

  try {

    // Prepare data
    const currentTripId = trip?._id || trip?.id;

    const payload: InitJoinPayload = {
      tripId: currentTripId,
      requesterName: user?.name || "Traveler",
      ownerId: trip.organizationId || trip.ownerId || "default-owner-id",
      tripName: trip.title || "Untitled Trip",
      travellerCount: Number(numberOfTravelers) || 1
    };

    console.log("Attempting Init with Payload:", payload);

    // Call INIT API only
    const res = await initTripJoin(payload);

    if (res?.id) {
      setJoinId(res.id);

      // Move to Step 2 only
      setStep(2);
    }

  } catch (error: any) {
    console.error("Initialization Failed:", error?.response?.data);
    alert(error?.response?.data?.message || "Server Error (500)");
  }
};

/* ================= BUTTON DISABLE LOGIC ================= */
const isNextDisabled = 
  (reservationType !== "SOLO" && (!numberOfTravelers || Number(numberOfTravelers) <= 0)) ||
  isAdding; // also disable while adding


 
/* ================= ADD EXISTING TRAVELLER ================= */


const handleFetchProfiles = async () => {
  try {
    // Ensure the token is present in localStorage before fetching
    const data = await getTravelerProfiles();
    setProfiles(data);
    setShowExistingList(true);
  } catch (err: any) {
    if (err.response?.status === 401) {
      alert("Session expired. Please log in again.");
    }
    console.error("Failed to load profiles", err);
  }
};



useEffect(() => {
  if (trip?.joinedTravelers?.length) {
    setLockedTravellers(trip.joinedTravelers);
  }
}, [trip]);  

const handleAddExistingTraveller = (traveller: any) => {
  // Prevent adding more than the number entered
  if (numberOfTravelers && selectedTravellers.length >= Number(numberOfTravelers)) {
    alert(`You can only add ${numberOfTravelers} traveler(s)`);
    return;
  }
const sameNameSelected = selectedTravellers.some(
  (t) =>
    t.name.toLowerCase() ===
    `${traveller.firstName} ${traveller.lastName}`.toLowerCase()
);

if (sameNameSelected) {
  alert("This traveler is already selected.");
  return;
}
  const alreadySelected = selectedTravellers.some(
    (t) => t.travellerProfileId === traveller.id
  );

  const alreadyLocked = lockedTravellers.some(
    (t) => t.travellerProfileId === traveller.id
  );

  if (alreadySelected || alreadyLocked) {
    alert("This traveler is already part of this trip.");
    return;
  }

  const obj: SelectedTraveller = {
    travellerProfileId: traveller.id,
    name: `${traveller.firstName} ${traveller.lastName}`,
    dob: traveller.dob,
    gender: traveller.gender,
    nationality: "Indian",
    travellerType: "ADULT"
  };

  setSelectedTravellers((prev) => [...prev, obj]);
};

const handleRemoveSelected = (profileId: string) => {
  setSelectedTravellers(prev => prev.filter(t => t.travellerProfileId !== profileId));
};

const handleFinalAddToTrip = async () => {

  // Type Guard
  if (!joinId) {
    alert("Session not initialized. Please start over.");
    return false;
  }

  if (selectedTravellers.length === 0) {
    alert("Please select at least one traveler.");
    return false;
  }

  try {

    await addTravellersToTrip(joinId, selectedTravellers);

    console.log("Travellers successfully added");

    return true;

  } catch (err: any) {

    console.error(
      "Final add to trip failed:",
      err?.response?.data || err
    );

    throw err; // important so parent function catches it

  }

};
 



/* ================= LOAD EXISTING TRAVELLERS ================= */

const loadTravellerProfiles = async () => {
  try {
    const profiles = await getTravelerProfiles();
    setTravelerProfiles(profiles);
  } catch (error) {
    console.error("Failed to fetch travellers", error);
  }
};


/* ================= CREATE NEW TRAVELLER ================= */

const handleCreateTraveller = async (payload: NewTravellerPayload) => {

  // Prevent duplicate travellers
  const isDuplicateTraveller = travelerProfiles.some((profile) => {
  return (
    profile.firstName?.toLowerCase() === newTraveller.firstName?.toLowerCase() &&
    profile.lastName?.toLowerCase() === newTraveller.lastName?.toLowerCase() &&
    profile.dob === newTraveller.dob &&
    profile.gender === newTraveller.gender
  );
});

  if (isDuplicateTraveller) {
    alert("This traveller profile already exists.");
    return;
  }

  // Prevent multiple clicks
  if (isCreatingTraveller) return;

  setIsCreatingTraveller(true);

  try {

    await createTravelerProfile(payload);

    alert("Traveller created successfully");

    // reload travellers
    await loadTravellerProfiles();

    setShowTravellerForm(false);

  } catch (error) {

    console.error("Traveller creation failed", error);
    alert("Failed to create traveller");

  } finally {

    setIsCreatingTraveller(false);

  }
};
  /* ================= ADD TRAVELLERS TO TRIP ================= */
  /* ================= ADD TRAVELLERS TO TRIP ================= */

const handleAddToTrip = async () => {

  if (!joinId) {
    alert("Join ID missing");
    return false;
  }

  if (selectedTravellers.length === 0) {
    alert("Please select travelers first");
    return false;
  }

  if (isTravellersAdded) return true;

  const isFinal = window.confirm(
    "Is this list final? You cannot add/remove members after syncing."
  );

  if (!isFinal) return false;

  setIsAdding(true);

  try {

    await handleFinalAddToTrip();

    setIsTravellersAdded(true);
    setShowExistingList(false);

    alert("Travelers synced and locked!");

    return true;

  } catch (error: any) {

    console.error("API Sync Error:", error?.response?.data || error);

    alert("Sync failed. Check traveler details and try again.");

    return false;

  } finally {
    setIsAdding(false);
  }

};
  /* ================= FINAL SUBMIT ================= */
const handleSubmitJoinRequest = async () => {
  if (!joinId) return alert("Join ID missing. Please restart the process.");
  if (!customMessage.trim()) return alert("Please enter a message.");

  setIsAdding(true); // disable buttons

  try {
    const response = await submitJoinRequest(joinId, customMessage);

    // Only move to Step 3 if API call succeeds
    if (response) {
      console.log("Join request successfully submitted", response);

      // ✅ Move to Screen 3 only after success
      setStep(3);
    } else {
      alert("Server error: Failed to submit join request.");
    }
  } catch (error: any) {
    console.error("Submit request failed:", error?.response?.data || error);
    alert(error?.response?.data?.message || "Failed to submit join request. Try again.");
  } finally {
    setIsAdding(false); // re-enable buttons
  }
};
  /* ================= FOOTER BUTTON LOGIC ================= */
  /* ================= BUTTON CLICK HANDLER ================= */
const handleNextOrSubmit = async () => {
  if (reservationType === 'SOLO') {
    await handleSoloSubmit();
  } else {
    if (step === 1) {
      await handleInitJoin(); // Initialize join, sets joinId and moves to step 2
    } else if (step === 2) {
      const added = await handleAddToTrip(); // Add travelers to trip
      if (!added) return; // Stop if API failed or user canceled

      // Submit join request only after travelers added
      try {
        await handleSubmitJoinRequest();
      } catch (err) {
        console.error("Final submit failed:", err);
        return;
      }
    }
  }
};
<button
  onClick={handleNextOrSubmit}
  disabled={isNextDisabled}
  className={`btn-primary ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  {step === 2 ? "Add & Continue" : "Next"}
</button>

  const availableProfiles = profiles.filter((profile) => {
  const alreadySelected = selectedTravellers.some(
    (t) => t.travellerProfileId === profile.id
  );

  const alreadyLocked = lockedTravellers.some(
    (t) => t.travellerProfileId === profile.id
  );

  return !alreadySelected && !alreadyLocked;
});





  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-end z-[100] bg-black/60 backdrop-blur-sm">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
          
          .modal-container { 
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: #ffffff; width: 100%; max-width: 400px; height: 100vh;
            display: flex; flex-direction: column; 
          }
          .serif-title { font-family: 'Playfair Display', serif; color: #064e3b; line-height: 1.1; }
          .btn-primary { background: #064e3b; color: white; border-radius: 10px; transition: all 0.3s ease; }
          
          /* Reduced Card size */
          .card-gray { background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 12px; padding: 10px; }
          
          /* Reduced Option size */
          .res-option { flex: 1; border: 1.5px solid #f3f4f6; border-radius: 12px; padding: 10px 0; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s; }
          .res-option.active { border-color: #064e3b; background: #f0fdf4; color: #064e3b; }
          .res-option.disabled { opacity: 0.3; filter: grayscale(1); cursor: not-allowed; }
          
          /* Reduced Input size */
          .input-field { width: 100%; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; font-size: 0.75rem; outline: none; }
          
          .msg-pill { font-size: 0.65rem; padding: 4px 10px; border-radius: 8px; border: 1px solid #e5e7eb; color: #374151; cursor: pointer; background: white; }
          
          .no-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>

        <motion.div 
          initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
          className="modal-container shadow-2xl relative"
        >
          {/* Header Navigation - Reduced Padding */}
          <div className="flex justify-between items-center px-4 py-2 ">
            <div>
               {step > 1 ? (
                 <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-400">
                    <ArrowLeft size={16} />
                    <span className="text-[0.55rem] font-bold uppercase tracking-widest">Back</span>
                 </button>
               ) : (
                 <span className="text-[0.55rem] font-bold text-gray-400 uppercase tracking-widest">Trip Selection</span>
               )}
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 no-scrollbar">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div>
                    <h1 className="serif-title text-2xl mb-1">{trip?.title || "Trip Overview"}</h1>
                    <div className="flex gap-3 text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><MapPin size={12} className="text-emerald-800"/> {trip?.toLocation?.city || "Delhi"}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} className="text-emerald-800"/> 5 Days</span>
                      <span className="flex items-center gap-1"><Signal size={12} className="text-emerald-800"/> {reservationType}</span>
                    </div>
                  </div>

                  {/* Organizer Card - Compact */}
                 <div className="card-gray flex items-center justify-between p-3">
  <div className="flex items-center gap-3">
    {/* Organizer Avatar */}
    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-900 text-xs font-bold">
      VM
    </div>

    {/* Organizer Info */}
    <div className="flex flex-col p-2">
      <p className="text-[0.5rem] text-gray-400 uppercase font-bold">Organizer</p>
      <p className="text-xs font-bold text-gray-800">Vikram Malhotra</p>
      <div className="flex items-center gap-2 text-[0.6rem] text-gray-600 mt-1">
        <span>32y • Male</span>
    
        
      </div>
    </div>
  </div>

  {/* Rating Badge + Verified Owner */}
<div className="flex flex-col items-end gap-1">
  {/* Verified Owner Badge */}
  <span className="bg-emerald-50 text-emerald-900 text-[0.55rem] font-bold px-3.5 py-[1px] rounded-full">
    ✅ Verified Host
  </span>

  {/* Rating Badge */}
  <span className="bg-emerald-100 text-emerald-800 text-[0.55rem] font-bold px-3 py-[1px] rounded-full">
    ⭐ 4.8
  </span>
</div>
</div>

                  {/* Joined Travelers - Compact */}
                {/* Joined Section */}
<div className="bg-gray-100 p-3 rounded-lg">
  <h3 className="text-[0.55rem] font-bold text-gray-400 uppercase tracking-widest mb-2">
    Joined
  </h3>

  <div className="space-y-2">
    {[
      { name: 'Anjali Sharma', age: 24, gender: 'Female' },
      { name: 'Rahul Varma', age: 27, gender: 'Male' }
    ].map((traveler, i) => (
      <div key={i} className="flex items-center gap-3">
        
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-100 border border-white shadow-sm overflow-hidden flex-shrink-0">
          <img
            src={`https://i.pravatar.cc/100?u=${traveler.name}`}
            alt={traveler.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-semibold text-gray-700">{traveler.name}</p>
          <p className="text-[10px] text-gray-500">
            {traveler.age} • {traveler.gender}
          </p>
        </div>

      </div>
    ))}
  </div>
</div>

                {/* Availability Widget - Dynamic */}
{(() => {
  const totalSeats = trip?.totalCapacity || 10;
  const filledSeats = trip?.joinedTravelers?.length || 4;
  const availableSeats = totalSeats - filledSeats;
  
  // Calculate dash offset: (percentage of filled seats) * circumference
  // circumference = 2 * Math.PI * 18 ≈ 113
  const circumference = 113;
  const progress = filledSeats / totalSeats;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="card-gray flex items-center gap-4 bg-emerald-50/40 border-emerald-100/50">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90">
          {/* Background Circle */}
          <circle 
            cx="20" cy="20" r="18" 
            stroke="#d1fae5" strokeWidth="3.5" 
            fill="transparent" 
          />
          {/* Progress Circle */}
          <motion.circle 
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            cx="20" cy="20" r="18" 
            stroke="#064e3b" strokeWidth="3.5" 
            fill="transparent" 
            strokeDasharray={circumference}
            strokeLinecap="round" 
          />
        </svg>
        <span className="absolute text-[0.7rem] font-bold text-emerald-900">
          {availableSeats}
        </span>
      </div>
      <div>
        <h4 className="text-[0.65rem] font-bold text-emerald-950 leading-tight">Availability</h4>
        <p className="text-[0.6rem] text-emerald-700/80 font-medium">
          {availableSeats} out of {totalSeats} seats available
        </p>
      </div>
    </div>
  );
})()}

                 
                 {/* Reservation Type */}
<div>
  <h3 className="text-[0.55rem] font-bold text-gray-400 uppercase tracking-widest mb-2">Reservation</h3>
  <div className="flex gap-2">
    {['SOLO', 'COUPLE', 'GROUP'].map((type) => (
      <div
        key={type}
        className={`res-option ${reservationType === type ? 'active' : 'disabled'}`}
        onClick={() => setReservationType(type)}
      >
        {type === 'SOLO' && <User size={16} />}
        {type === 'COUPLE' && <Heart size={16} />}
        {type === 'GROUP' && <Users size={16} />}
        <span className="text-[0.5rem] font-bold uppercase">{type}</span>
      </div>
    ))}
  </div>

  {/* ADD THIS NUMBER OF TRAVELERS INPUT */}
  {(reservationType === 'COUPLE' || reservationType === 'GROUP') && (
    <div className="flex flex-col gap-1 mt-2">
      <label className="text-[0.55rem] font-bold text-gray-500 uppercase tracking-widest">
        Number of Travelers
      </label>
      <input
        type="number"
        min={reservationType === 'COUPLE' ? 2 : 1}
        max={reservationType === 'COUPLE' ? 2 : 20}
        value={numberOfTravelers || ''}
        onChange={(e) => setNumberOfTravelers(Number(e.target.value))}
        placeholder={reservationType === 'COUPLE' ? '2 people' : 'Enter number of travelers'}
        className="input-field text-black"
      />
      <p className="text-[0.5rem] text-gray-400">
        {reservationType === 'COUPLE'
          ? 'Couple trips require exactly 2 people.'
          : 'Max 20 travelers allowed for a group trip.'}
      </p>
    </div>
  )}
</div>

                 {reservationType === 'SOLO' && (
  <div className="space-y-3 pt-2">
  <h3 className="text-[0.55rem] font-bold text-black uppercase tracking-widest">
    Message to Organizer
  </h3>

  <textarea
    className="input-field min-h-[80px] text-black text-[12px] resize-none"
    placeholder="Add a custom note..."
    value={customMessage}
    onChange={(e) => setCustomMessage(e.target.value)}
  />

  {/* Quick Replies */}
  <div className="space-y-2 mt-2">
  

  <div className="flex flex-wrap gap-2">
    {predefinedMessages.map((m, i) => (
      <span
        key={i}
        onClick={() => setCustomMessage(m)}
        className="bg-gray-100 text-gray-800 text-[0.65rem] border border-black-300 px-3 py-1 rounded-md cursor-pointer hover:bg-gray-200 transition" >
        {m}
      </span>
    ))}
  </div>
</div>
</div>
  
  
)}
                </motion.div>
              ) :   (
                <motion.div
  key="step2"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="space-y-4"
>

  <div className="flex items-center justify-between">
    <h2 className="serif-title text-xl font-bold text-black">
      Traveler Details
    </h2>

    <span className="text-[0.55rem] font-bold text-black bg-gray-200 px-2 py-[3px] rounded-full uppercase">
      {reservationType} Trip
    </span>
  </div>

  {/* ADD BUTTONS */}
<div className="flex justify-between w-full mt-6 px-4 gap-2">
  <button
    onClick={() => setShowTravellerForm(prev => !prev)} // toggle form open/close
    className="bg-gray-100 flex items-center gap-1.5 px-2 py-1 text-[0.65rem] font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition shadow-sm"
  >
    <Plus size={16} />
    Add New
  </button>

 {/* Button Container */}
 
<button onClick={handleFetchProfiles} className="bg-gray-100 flex items-center gap-1.5 px-2 py-1 text-[0.65rem] font-medium border border-gray-300 rounded-lg hover:bg-gray-200 transition shadow-sm" > <User size={16} /> Add Existing </button>

  </div>
 {showExistingList && (
  <div className="w-full mt-4 animate-in fade-in  duration-300">
    <div className="flex justify-end">
  <button
    onClick={() => setShowExistingList(false)}
    className="text-gray-400 hover:text-red-500 px-1 py-1 text-[1.3rem] font-bold"
  >
    X
  </button>
</div>
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
       
      <table className="w-full text-left border-collapse">
         
        <thead>
          <tr className="bg-white border-b border-gray-200">
            <th className="px-4 py-2 text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider border-r border-gray-100">Name</th>
            <th className="px-4 py-2 text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider border-r border-gray-100">Gender</th>
            <th className="px-4 py-2 text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider border-r border-gray-100">DOB</th>
            <th className="px-4 py-2 text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider">Action</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {/* Change profiles.length to availableProfiles.length */}
          {availableProfiles.length > 0 ? (
            availableProfiles.map((profile, index) => (
              <tr 
                key={profile.id} 
                className={`${index % 2 === 1 ? 'bg-[#F3F4F6]' : 'bg-white'} border-b border-gray-200 last:border-0`}
              >
                <td className="px-4 py-3 text-[0.7rem] font-medium border-r border-gray-100">
                  {profile.firstName} {profile.lastName}
                </td>
                <td className="px-4 py-3 text-[0.65rem] uppercase border-r border-gray-100">
                  {profile.gender}
                </td>
                <td className="px-4 py-3 text-[0.65rem] border-r border-gray-100 italic">
                  {profile.dob}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddExistingTraveller(profile)}
                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-[0.6rem] font-bold transition active:scale-95"
                    >
                      ADD
                    </button>
                   
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-[0.7rem] text-gray-400 italic">
                {profiles.length > 0 ? "All travelers selected." : "No profiles found."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}{/* SELECTED SECTION */}
{selectedTravellers.length > 0 && (
  <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-in fade-in slide-in-from-top-2">
    <div className={`px-4 py-2 border-b border-gray-200 flex justify-between items-center transition-colors ${isTravellersAdded ? 'bg-emerald-50' : 'bg-gray-50'}`}>
      <span className={`text-[0.65rem] font-bold uppercase tracking-widest ${isTravellersAdded ? 'text-emerald-700' : 'text-emerald-600'}`}>
        {isTravellersAdded ? '✓ Travelers Finalized' : 'Confirming Travelers'}
      </span>
      {isTravellersAdded && (
        <span className="text-[0.5rem] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">LOCKED</span>
      )}
    </div>
    
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-white border-b border-gray-200 text-[0.6rem] text-gray-400 uppercase font-bold">
          <th className="px-4 py-2 border-r border-gray-100">Name</th>
          <th className="px-4 py-2 border-r border-gray-100">Gender</th>
          {!isTravellersAdded && <th className="px-4 py-2">Action</th>}
        </tr>
      </thead>
      <tbody className={isTravellersAdded ? "opacity-70 pointer-events-none" : ""}>
        {selectedTravellers.map((t, index) => (
          <tr 
            key={t.travellerProfileId} 
            className={`${index % 2 === 1 ? 'bg-[#F3F4F6]' : 'bg-white'} border-b border-gray-200 last:border-0`}
          >
            <td className="px-4 py-3 text-[0.7rem] font-bold border-r border-gray-100">{t.name}</td>
            <td className="px-4 py-3 text-[0.65rem] uppercase border-r border-gray-100">{t.gender}</td>
            {!isTravellersAdded && (
              <td className="px-4 py-3">
                <button 
                  onClick={() => handleRemoveSelected(t.travellerProfileId)}
                  className="text-red-500 hover:text-red-700 text-[0.6rem] font-bold"
                >
                  REMOVE
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>

    {/* UI changes based on Sync Status */}
    <div className="p-3 bg-white border-t border-gray-100">
      {!isTravellersAdded ? (
        <div className="space-y-3">
          <p className="text-[0.6rem] text-gray-500 text-center italic">
            Make sure all members are added. You cannot change this list after syncing.
          </p>
          <button
            onClick={handleAddToTrip}
            disabled={isAdding}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-[0.75rem] shadow-md transition-all active:scale-95 disabled:bg-blue-300"
          >
            {isAdding ? "SYNCING..." : "ADD TO TRIP & LOCK LIST"}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center py-2 gap-2 text-emerald-700">
          <Info size={14} />
          <span className="text-[0.65rem] font-bold uppercase tracking-tight">
            List synced. Continue to final confirmation below.
          </span>
        </div>
      )}
    </div>
  </div>
)}
 {/* ================= TRAVELLER FORM ================= */}
{showTravellerForm && !showExistingList && (
  <div className="w-full mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
    <div className="border border-gray-200 rounded-lg shadow-sm relative p-4">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setShowTravellerForm(false)}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 text-gray-500"
      >
        <X size={16} />
      </button>

      {/* FORM GRID */}
      <div className="grid grid-cols-2 gap-3 text-[0.7rem]">

        {/* First Name */}
        <div>
          <label className="text-gray-400 font-bold uppercase">First Name</label>
          <input
            className="w-full border rounded px-2 py-1 mt-1"
            placeholder="First Name"
            onChange={(e) =>
              setNewTraveller({ ...newTraveller, firstName: e.target.value })
            }
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="text-gray-400 font-bold uppercase">Last Name</label>
          <input
            className="w-full border rounded px-2 py-1 mt-1"
            placeholder="Last Name"
            onChange={(e) =>
              setNewTraveller({ ...newTraveller, lastName: e.target.value })
            }
          />
        </div>

        {/* Gender */}
        <div>
          <label className="text-gray-400 font-bold uppercase">Gender</label>
          <select
            className="w-full border rounded px-2 py-1 mt-1"
            onChange={(e) =>
              setNewTraveller({ ...newTraveller, gender: e.target.value })
            }
          >
            <option value="">Select</option>
            <option>MALE</option>
            <option>FEMALE</option>
            <option>OTHER</option>
          </select>
        </div>

        {/* DOB */}
        <div>
          <label className="text-gray-400 font-bold uppercase">DOB</label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1 mt-1"
            onChange={(e) =>
              setNewTraveller({ ...newTraveller, dob: e.target.value })
            }
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-gray-400 font-bold uppercase">Phone</label>
          <input
            className="w-full border rounded px-2 py-1 mt-1"
            placeholder="Phone"
            onChange={(e) =>
              setNewTraveller({ ...newTraveller, phone: e.target.value })
            }
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-gray-400 font-bold uppercase">Email</label>
          <input
            className="w-full border rounded px-2 py-1 mt-1"
            placeholder="Email"
            onChange={(e) =>
              setNewTraveller({ ...newTraveller, email: e.target.value })
            }
          />
        </div>

        {/* Nationality */}
        <div>
          <label className="text-gray-400 font-bold uppercase">Nationality</label>
          <input
            className="w-full border rounded px-2 py-1 mt-1"
            placeholder="Nationality"
            onChange={(e) =>
              setNewTraveller({ ...newTraveller, nationality: e.target.value })
            }
          />
        </div>

      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end mt-4">
        <button
  disabled={isCreatingTraveller}
  onClick={() =>
    handleCreateTraveller({
      ...newTraveller,
      travellerType: "ADULT",
      isDefault: false,
    })
  }
  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-[0.7rem] font-bold disabled:bg-gray-400"
>
  {isCreatingTraveller ? "Saving..." : "SAVE"}
</button>      </div>

    </div>
  

      {(reservationType === "GROUP" || reservationType === "COUPLE") && (
        <button
          onClick={addGuest}
          className="w-full py-2 border-2 border-dashed border-gray-100 rounded-lg text-[0.6rem] font-bold text-black-400 uppercase hover:text-emerald-800 hover:border-emerald-200 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={12} /> Add Traveler
        </button>
      )}

    </div>
  )}

    
    {/* Message box moved here for Step 2 flow */}
   {/* Message box moved here for Step 2 flow */}
<div className="space-y-3 p-3 pt-2">
  <h3 className="text-[0.75rem]  font-bold text-black  tracking-widest">
    Message to Organizer
  </h3>

  <textarea
    className="input-field min-h-[80px] text-black text-[12px] resize-none"
    placeholder="Add a custom note..."
    value={customMessage}
    onChange={(e) => setCustomMessage(e.target.value)}
  />

  {/* Quick Replies */}
  <div className="space-y-2">
    

    <div className="grid grid-cols-2 gap-1 pb-1">
      {predefinedMessages.map((m, i) => (
        <span
          key={i}
          onClick={() => setCustomMessage(m)}
          className="bg-gray-100 text-gray-800 text-[0.65rem] border border-black-300 px-3 py-1 rounded-md cursor-pointer hover:bg-gray-200 transition">        
          {m}
        </span>
      ))}
    </div>
  </div>
</div>
  

  
{/* Review Policy */}
<div className="px-2 mt-3 p-6">
  <div className="flex gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3">
    
    <div className="flex items-start justify-center w-6 pt-[2px]">
      <Info size={16} className="text-emerald-800" />
    </div>

    <div className="space-y-1">
      <p className="text-[12px] font-semibold text-black">
        Review Policy
      </p>

      <p className="text-[11px] text-gray-500 leading-relaxed">
        By clicking confirm, you agree to the group organizer's terms and the
        TripReserv cancellation policy. Your invite request will be sent
        immediately.
      </p>
    </div>

  </div>
</div>
</motion.div> 
 )}

             
         </AnimatePresence>
         </div>
{step === 3 && (
  <motion.div
    key="step3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 z-[110] bg-white flex flex-col items-center justify-center p-8 space-y-6"
  >
    {/* ✅ Updated Checkmark Background to match #276074 (at low opacity) */}
    <motion.div 
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring" }}
      className="bg-[#276074]/10 rounded-full p-6"
    >
      <svg
        className="w-14 h-14 text-[#276074]"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </motion.div>

    {/* Confirmation Title with matching underline */}
    <div className="text-center">
      <h2 className="serif-title text-2xl font-bold text-gray-800">
        Join Request Sent!
      </h2>
      <div className="h-1 w-12 bg-[#276074] mx-auto mt-2 rounded-full opacity-60" />
    </div>

    {/* Message with matching text highlight */}
    <p className="text-center text-gray-600 text-[0.85rem] leading-relaxed max-w-[280px]">
      Your request to join <span className="font-semibold text-[#276074]">{trip?.title || "this trip"}</span> has been successfully sent.
      <br />
      <span className="text-[0.7rem] text-gray-400 mt-2 block uppercase tracking-[0.15em] font-bold">
        Verification Pending
      </span>
    </p>

    {/* Close Button - Using your specific color & darker hover */}
    <button
      onClick={onClose}
      className="w-full mt-4 px-6 py-3 bg-[#276074] text-white font-bold rounded-xl hover:bg-[#1e4a5a] transition-all shadow-lg shadow-[#276074]/20 active:scale-95 text-[0.7rem] uppercase tracking-widest"
    >
      Back to trips
    </button>
  </motion.div>
)}     {/* Persistent Footer - Tightened */}
         <div className="p-6 py-2 border-t border-black-100 bg-white">
  <button
  disabled={(step === 2 && !isTravellersAdded) || isAdding}
  onClick={async () => {
    if (reservationType === 'SOLO') {
      await handleSoloSubmit(); 
    } else if (step === 1) {
      await handleInitJoin(); 
    } else if (step === 2) {
      await handleSubmitJoinRequest(); // ✅ Wait for success before updating step
    }
  }}
  className={`w-full py-2 font-bold flex items-center justify-center gap-2 text-[0.65rem] uppercase tracking-widest rounded-lg transition-all
  ${(step === 2 && !isTravellersAdded) 
    ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
    : 'bg-[#276074] text-white hover:bg-[#1e4a5a] active:scale-95 shadow-lg shadow-[#276074]/20'
  }`}
>
  {isAdding ? 'Syncing...' : (
    <>
      {reservationType === 'SOLO' ? 'Submit Join Request' : (step === 2 ? 'Submit Join Request' : 'Next Step')}
      <ArrowRight size={14} />
    </>
  )}
</button>  
  <p className="text-center text-[0.55rem] font-bold text-black-300 uppercase mt-4 tracking-widest">
    Secure Booking • 24h Response
  </p>
</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default JoinTripModal;                                         