"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import InlineLoader from "@/components/Loader/InlineLoader";
import { ArrowLeft, Plus, UserPlus, Check, Trash2, User, Pencil } from "lucide-react";
import axiosClient from "@/lib/axios-client";
import { APP_ROUTES } from "@/utils/constants";
import { AddOnDetail, Traveller, ItineraryItem, CancellationPolicyItem, PlanData } from "./types";
import PackageDetailsCard from "./PackageDetailsCard";
import SelectedAddOnsCard from "./SelectedAddOnsCard";
import PlanDetailsCard from "./PlanDetailsCard";
import ItineraryCard from "./ItineraryCard";
import CancellationPolicyCard from "./CancellationPolicyCard";
import PaymentSummaryCard from "./PaymentSummaryCard";
import SuccessView from "./SuccessView";
import { API_ENDPOINTS_CONFIG } from "@/utils/apiConfig";
import { APP_CONSTANTS } from "@/utils/appConstants";
import TravellersListCard from "./TravellersListCard";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  travelerType?: string;
  nationality?: string;
  phone?: string;
  email?: string;
}

const calculateAge = (dob: string) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

function BookPackageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [cartId, setCartId] = useState<string>("");
  const [packageTitle, setPackageTitle] = useState<string>("");
  const [planName, setPlanName] = useState<string>("");
  const [planPrice, setPlanPrice] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("INR");
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnDetail[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [upiId, setUpiId] = useState("");

  // Payment form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [paymentError, setPaymentError] = useState("");

  // Traveller state
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [cancellationPolicy, setCancellationPolicy] = useState<CancellationPolicyItem[]>([]);
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [inviteLink, setInviteLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // New Traveller State
  const [newTraveller, setNewTraveller] = useState({
    firstName: "",
    lastName: "",
    gender: "MALE",
    dob: "",
    email: "",
    phone: "",
    nationality: "Indian",
  });

  const [newTravellerErrors, setNewTravellerErrors] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
  });

  // Modal States
  const [showNewTravellerModal, setShowNewTravellerModal] = useState(false);
  const [showExistingTravellerModal, setShowExistingTravellerModal] = useState(false);
  const [existingProfiles, setExistingProfiles] = useState<UserProfile[]>([]);
  const [selectedProfileIds, setSelectedProfileIds] = useState<string[]>([]);
  const [isFetchingProfiles, setIsFetchingProfiles] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isAddingExisting, setIsAddingExisting] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null);
  const [editingTravellerId, setEditingTravellerId] = useState<string | null>(null);

  const fetchExistingTravellers = async () => {
    setIsFetchingProfiles(true);
    try {
      const response = await axiosClient.get(API_ENDPOINTS_CONFIG.BOOKING.TRAVELER_PROFILES);
      const profiles = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      setExistingProfiles(profiles);
      setShowExistingTravellerModal(true);
    } catch (error) {
      console.error("Failed to fetch profiles", error);
    } finally {
      setIsFetchingProfiles(false);
    }
  };

  const handleEditProfile = (profile: UserProfile) => {
    setNewTraveller({
      firstName: profile.firstName,
      lastName: profile.lastName,
      gender: profile.gender,
      dob: profile.dob ? profile.dob.split("T")[0] : "",
      email: profile.email || "",
      phone: profile.phone || "",
      nationality: profile.nationality || "Indian",
    });
    setEditingTravellerId(profile.id);
    setShowNewTravellerModal(true);
    setShowExistingTravellerModal(false);
  };

  const handleDeleteProfile = (id: string) => {
    setProfileToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const executeDeleteProfile = async () => {
    if (!profileToDelete) return;
    try {
      await axiosClient.delete(`${API_ENDPOINTS_CONFIG.BOOKING.TRAVELER_PROFILES}/${profileToDelete}`);
      setExistingProfiles((prev) => prev.filter((p) => p.id !== profileToDelete));
      setSelectedProfileIds((prev) => prev.filter((pId) => pId !== profileToDelete));
      setShowDeleteConfirmation(false);
      setProfileToDelete(null);
    } catch (error) {
      console.error("Failed to delete profile", error);
    }
  };

  const handleSaveNewTraveller = async () => {
    const errors = {
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      phone: "",
    };
    let hasError = false;

    if (!newTraveller.firstName.trim()) {
      errors.firstName = "First name is required";
      hasError = true;
    }
    if (!newTraveller.lastName.trim()) {
      errors.lastName = "Last name is required";
      hasError = true;
    }
    if (!newTraveller.dob) {
      errors.dob = "Date of birth is required";
      hasError = true;
    }

    setNewTravellerErrors(errors);
    if (hasError) return;
    

    setIsSavingProfile(true);
    try {
      const payload = {
        firstName: newTraveller.firstName,
        lastName: newTraveller.lastName,
        gender: newTraveller.gender,
        dob: new Date(newTraveller.dob).toISOString(),
        travelerType: "ADULT",
        nationality: newTraveller.nationality,
        phone: newTraveller.phone,
        email: newTraveller.email,
        isDefault: true
      };
      
      if (editingTravellerId) {
        await axiosClient.patch(`${API_ENDPOINTS_CONFIG.BOOKING.TRAVELER_PROFILES}/${editingTravellerId}`, payload);
        
        setExistingProfiles(prev => prev.map(p => p.id === editingTravellerId ? {
            ...p,
            firstName: newTraveller.firstName,
            lastName: newTraveller.lastName,
            gender: newTraveller.gender,
            dob: payload.dob,
            nationality: newTraveller.nationality,
            phone: newTraveller.phone,
            email: newTraveller.email,
        } : p));
      } else {
        // Save new traveler profile
        const profileRes = await axiosClient.post(API_ENDPOINTS_CONFIG.BOOKING.TRAVELER_PROFILES, payload);
        const profileData = profileRes.data?.data || profileRes.data;
        const createdProfile = Array.isArray(profileData) ? profileData[0] : profileData;
        const createdProfileId = createdProfile?.id;

        const response = await axiosClient.post(API_ENDPOINTS_CONFIG.BOOKING.ADD_TRAVELERS(cartId), {
          travelers: [payload]
        });
        const created = (response.data?.data || response.data)?.[0] || {};
        
        const newTravellerId = created.id || Date.now().toString();
        const travellerToAdd = {
          id: newTravellerId,
          profileId: createdProfileId,
          name: `${newTraveller.firstName} ${newTraveller.lastName}`,
          gender: newTraveller.gender,
          firstName: newTraveller.firstName,
          lastName: newTraveller.lastName,
          dob: newTraveller.dob,
          travelerType: created.travelerType || "ADULT",
          isAddedToCart: true,
          email: newTraveller.email,
          contact: newTraveller.phone,
          age: calculateAge(newTraveller.dob)
        };

        setTravellers([...travellers, travellerToAdd]);

        setExistingProfiles((prev) => [
          ...prev,
          {
            id: createdProfileId || newTravellerId,
            firstName: newTraveller.firstName,
            lastName: newTraveller.lastName,
            gender: newTraveller.gender,
            dob: newTraveller.dob,
            travelerType: "ADULT",
            nationality: newTraveller.nationality,
            phone: newTraveller.phone,
            email: newTraveller.email,
          },
        ]);
      }
      
      setNewTraveller({ firstName: "", lastName: "", gender: "MALE", dob: "", email: "", phone: "", nationality: "Indian" });
      setNewTravellerErrors({ firstName: "", lastName: "", dob: "", email: "", phone: "" });
      setEditingTravellerId(null);
      setShowNewTravellerModal(false);
    } catch (error) {
      console.error("Failed to save traveler", error);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const toggleProfileSelection = (id: string) => {
    setSelectedProfileIds(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const addSelectedProfiles = async () => {
    if (!cartId) {
      console.error("Cart ID is missing.");
      return;
    }

    const selected = existingProfiles.filter(p => selectedProfileIds.includes(p.id));
    if (selected.length === 0) return;

    setIsAddingExisting(true);
    try {
      const travelersPayload = selected.map(p => ({
        firstName: p.firstName,
        lastName: p.lastName,
        gender: p.gender,
        dob: p.dob,
        travelerType: p.travelerType || "ADULT",
        nationality: p.nationality || "Indian",
        phone: p.phone || "",
        email: p.email || "",
        isDefault: false
      }));

      const response = await axiosClient.post(API_ENDPOINTS_CONFIG.BOOKING.ADD_TRAVELERS(cartId), {
        travelers: travelersPayload
      });

      const addedTravelers = response.data?.data || response.data || [];
      const travelersList = Array.isArray(addedTravelers) ? addedTravelers : [];

      const newTravellers = (travelersList.length > 0 ? travelersList : selected).map((p: UserProfile, index: number) => ({
        id: p.id || selected[index]?.id || Date.now().toString(),
        profileId: selected[index]?.id,
        name: `${p.firstName} ${p.lastName}`,
        gender: p.gender,
        firstName: p.firstName,
        lastName: p.lastName,
        dob: p.dob,
        travelerType: p.travelerType || "ADULT",
        isAddedToCart: true,
        email: p.email || "",
        contact: p.phone || "",
        age: calculateAge(p.dob)
      }));
      
      setTravellers([...travellers, ...newTravellers]);
      setSelectedProfileIds([]);
      setShowExistingTravellerModal(false);
    } catch (error) {
      console.error("Failed to add existing travelers", error);
    } finally {
      setIsAddingExisting(false);
    }
  };

  const handleRemoveTraveller = async (id: string) => {
    if (cartId) {
      try {
        await axiosClient.delete(API_ENDPOINTS_CONFIG.BOOKING.REMOVE_TRAVELERS(cartId, id));
      } catch (error) {
        console.error("Failed to remove traveler", error);
      }
    }
    setTravellers((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    // Get query parameters
    const pkgId = searchParams.get("packageId") || "";
    const cId = searchParams.get("cartId") || "";
    const title = searchParams.get("packageTitle") || "";
    const plan = searchParams.get("planName") || "";
    const price = searchParams.get("planPrice") || "0";
    const curr = searchParams.get("currency") || "INR";
    const fromLoc = searchParams.get("fromLocation") || "";
    const toLoc = searchParams.get("toLocation") || "";
    const days = searchParams.get("totalDays") || "0";
    const nights = searchParams.get("totalNights") || "0";
    const addOnsParam = searchParams.get("addOnsData");
    const travellersParam = searchParams.get("travellersData");
    const itineraryParam = searchParams.get("itineraryData");
    const cancellationPolicyParam = searchParams.get("cancellationPolicy");
    const planDataParam = searchParams.get("planData");

    setCartId(cId);
    setPackageTitle(title);
    setPlanName(plan);
    setPlanPrice(parseFloat(price));
    setCurrency(curr);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setDuration(`${days} Days / ${nights} Nights`);

    if (typeof window !== 'undefined' && pkgId) {
      setInviteLink(`${window.location.origin}/viewPackage?packageId=${pkgId}`);
    }
    
    if (travellersParam) {
      try {
        setTravellers(JSON.parse(travellersParam));
      } catch (e) {
        console.error("Error parsing travellers:", e);
      }
    }

    if (itineraryParam) {
      try {
        setItinerary(JSON.parse(itineraryParam));
      } catch (e) {
        console.error("Error parsing itinerary:", e);
      }
    }

    if (addOnsParam) {
      try {
        const parsed = JSON.parse(addOnsParam);
        setSelectedAddOns(parsed);
      } catch (e) {
        console.error("Error parsing addons:", e);
      }
    }

    if (cancellationPolicyParam) {
      try {
        setCancellationPolicy(JSON.parse(cancellationPolicyParam));
      } catch (e) {
        console.error("Error parsing cancellation policy:", e);
      }
    }

    if (planDataParam) {
      try {
        setPlanData(JSON.parse(planDataParam));
      } catch (e) {
        console.error("Error parsing plan data:", e);
      }
    }
  }, [searchParams]);

  // Calculate totals
  const currencySymbol = currency === "INR" ? "₹" : currency;
  const travellerCount = travellers.length > 0 ? travellers.length : 1;
  const totalBasePrice = planPrice * travellerCount;
  const addOnsTotal = selectedAddOns.reduce((acc, addon) => acc + addon.price, 0);
  const gstAmount = Math.round((totalBasePrice + addOnsTotal) * 0.18);
  const finalTotal = totalBasePrice + addOnsTotal + gstAmount;
  const advanceAmount = Math.round(finalTotal * APP_CONSTANTS.ADVANCE_PAYMENT_PERCENTAGE);
  const remainingAmount = finalTotal - advanceAmount;

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted.slice(0, 19);
  };

  // Format expiry date
  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardExpiry(formatExpiry(e.target.value));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "");
    setCardCvv(cleaned.slice(0, 4));
  };

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError("");

    if (travellers.length === 0) {
      setPaymentError("Please add at least one traveller to proceed.");
      return;
    }

    if (paymentMethod === 'card') {
      // Validate card details
      if (cardNumber.replace(/\s/g, "").length !== 16) {
        setPaymentError("Please enter a valid 16-digit card number");
        return;
      }
      if (cardExpiry.length !== 5) {
        setPaymentError("Please enter a valid expiry date (MM/YY)");
        return;
      }
      if (cardCvv.length < 3) {
        setPaymentError("Please enter a valid CVV");
        return;
      }
      if (!cardHolderName.trim()) {
        setPaymentError("Please enter the cardholder name");
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) {
        setPaymentError("Please enter a valid UPI ID");
        return;
      }
    }

    // Process payment
    setIsProcessing(true);

    try {
      if (cartId && travellers.length > 0) {
        const travelersToSync = travellers.filter((t: Traveller & { isAddedToCart?: boolean }) => !t.isAddedToCart);

        if (travelersToSync.length > 0) {
          const travelersPayload = travelersToSync.map((t: Traveller & { firstName?: string; lastName?: string }) => ({
          firstName: t.firstName || t.name?.split(" ")[0] || "Guest",
          lastName: t.lastName || t.name?.split(" ").slice(1).join(" ") || "User",
          gender: t.gender?.toUpperCase() || "MALE",
          dob: t.dob || "2000-01-01",
          travelerType: t.travelerType || "ADULT",
        }));

        await axiosClient.post(
          API_ENDPOINTS_CONFIG.BOOKING.ADD_TRAVELERS(cartId),
          { travelers: travelersPayload }
        );
        }
      }
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    } catch (error) {
      console.error("Booking failed:", error);
      setPaymentError("Failed to process booking. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleGoToHome = () => {
    router.push(APP_ROUTES.SEARCH_TRIP);
  };

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(inviteLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Success State
  if (isSuccess) {
    return (
      <SuccessView
        packageTitle={packageTitle}
        currencySymbol={currencySymbol}
        finalTotal={finalTotal}
        inviteLink={inviteLink}
        isCopied={isCopied}
        handleCopyInvite={handleCopyInvite}
        handleGoToHome={handleGoToHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-12">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
            <p className="text-gray-500 mt-1">Review your details and pay securely</p>
          </div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 hover:text-[#276074] hover:border-[#276074]/30 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Package
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Package Preview & Add-ons */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package Details Card */}
            <PackageDetailsCard
              packageTitle={packageTitle}
              fromLocation={fromLocation}
              toLocation={toLocation}
              duration={duration}
              planName={planName}
            />

            {/* Selected Add-ons */}
            <SelectedAddOnsCard
              selectedAddOns={selectedAddOns}
              currencySymbol={currencySymbol}
            />

            {/* Add Travellers Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Travellers
                </h3>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    if (!showNewTravellerModal) {
                      setEditingTravellerId(null);
                      setNewTraveller({ firstName: "", lastName: "", gender: "MALE", dob: "", email: "", phone: "", nationality: "Indian" });
                      setNewTravellerErrors({ firstName: "", lastName: "", dob: "", email: "", phone: "" });
                    }
                    setShowNewTravellerModal(!showNewTravellerModal);
                    setShowExistingTravellerModal(false);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                    showNewTravellerModal 
                      ? "bg-gray-100 text-gray-700 border border-gray-200" 
                      : "bg-[#276074] text-white hover:opacity-90"
                  }`}
                >
                  <Plus className="w-5 h-5" />
                  {showNewTravellerModal ? "Cancel" : (editingTravellerId ? "Edit Traveller" : "Add New Traveller")}
                </button>
                <button
                  onClick={() => {
                    if (showExistingTravellerModal) {
                      setShowExistingTravellerModal(false);
                    } else {
                      setShowNewTravellerModal(false);
                      fetchExistingTravellers();
                    }
                  }}
                  disabled={isFetchingProfiles}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#276074] rounded-xl transition-all ${
                    showExistingTravellerModal
                      ? "bg-[#276074] text-white"
                      : "text-[#276074] hover:bg-[#276074]/5"
                  }`}
                >
                  <UserPlus className="w-5 h-5" />
                  {isFetchingProfiles ? "Loading..." : (showExistingTravellerModal ? "Close Selection" : "Select Existing")}
                </button>
              </div>

              {/* Inline New Traveller Form */}
              {showNewTravellerModal && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-gray-900">{editingTravellerId ? "Edit Traveller Details" : "New Traveller Details"}</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        value={newTraveller.firstName}
                        onChange={(e) => {
                          setNewTraveller({ ...newTraveller, firstName: e.target.value });
                          if (newTravellerErrors.firstName) setNewTravellerErrors((prev) => ({ ...prev, firstName: "" }));
                        }}
                        className={`w-full p-3 border ${newTravellerErrors.firstName ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-[#276074] focus:border-transparent`}
                        placeholder="Enter first name"
                      />
                      {newTravellerErrors.firstName && <p className="text-xs text-red-500 mt-1">{newTravellerErrors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={newTraveller.lastName}
                        onChange={(e) => {
                          setNewTraveller({ ...newTraveller, lastName: e.target.value });
                          if (newTravellerErrors.lastName) setNewTravellerErrors((prev) => ({ ...prev, lastName: "" }));
                        }}
                        className={`w-full p-3 border ${newTravellerErrors.lastName ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-[#276074] focus:border-transparent`}
                        placeholder="Enter last name"
                      />
                      {newTravellerErrors.lastName && <p className="text-xs text-red-500 mt-1">{newTravellerErrors.lastName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        value={newTraveller.gender}
                        onChange={(e) => setNewTraveller({ ...newTraveller, gender: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#276074] focus:border-transparent"
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={newTraveller.dob}
                        onChange={(e) => {
                          setNewTraveller({ ...newTraveller, dob: e.target.value });
                          if (newTravellerErrors.dob) setNewTravellerErrors((prev) => ({ ...prev, dob: "" }));
                        }}
                        className={`w-full p-3 border ${newTravellerErrors.dob ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-[#276074] focus:border-transparent`}
                      />
                      {newTravellerErrors.dob && <p className="text-xs text-red-500 mt-1">{newTravellerErrors.dob}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={newTraveller.email}
                        onChange={(e) => setNewTraveller({ ...newTraveller, email: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#276074] focus:border-transparent"
                        placeholder="Enter email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={newTraveller.phone}
                        onChange={(e) => setNewTraveller({ ...newTraveller, phone: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#276074] focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                      <input
                        type="text"
                        value={newTraveller.nationality}
                        onChange={(e) => setNewTraveller({ ...newTraveller, nationality: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#276074] focus:border-transparent"
                        placeholder="Enter nationality"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSaveNewTraveller}
                    disabled={isSavingProfile}
                    className="w-full py-3 bg-[#276074] text-white font-semibold rounded-xl hover:opacity-90 transition-all mt-6 disabled:opacity-70"
                  >
                    {isSavingProfile ? "Saving..." : (editingTravellerId ? "Update Profile" : "Save & Add Traveller")}
                  </button>
                </div>
              )}

              {/* Inline Existing Travellers List */}
              {showExistingTravellerModal && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-gray-900">Select from Saved Profiles</h4>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto space-y-3 mb-4 pr-2">
                    {existingProfiles.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">No existing travellers found.</p>
                    ) : (
                      existingProfiles.map((profile) => (
                        <div 
                          key={profile.id}
                          onClick={() => toggleProfileSelection(profile.id)}
                          className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                            selectedProfileIds.includes(profile.id) 
                              ? "border-[#276074] bg-[#276074]/5" 
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div>
                            <p className="font-semibold text-gray-900">{profile.firstName} {profile.lastName}</p>
                            <p className="text-sm text-gray-500">{profile.gender} • {profile.dob}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleEditProfile(profile); }}
                              className="p-2 text-gray-400 hover:text-[#276074] hover:bg-[#276074]/5 rounded-lg transition-colors"
                              title="Edit Profile"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDeleteProfile(profile.id); }}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Profile"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            {selectedProfileIds.includes(profile.id) && (
                              <div className="w-6 h-6 bg-[#276074] rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <button
                    onClick={addSelectedProfiles}
                    disabled={selectedProfileIds.length === 0 || isAddingExisting}
                    className="w-full py-3 bg-[#276074] text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAddingExisting ? "Adding..." : `Add Selected (${selectedProfileIds.length})`}
                  </button>
                </div>
              )}
            </div>

            {/* Travellers List */}
            <div className="space-y-3">
              {travellers.map((traveller, index) => (
                <div
                  key={traveller.id || index}
                  className="bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {traveller.name || `${traveller.firstName} ${traveller.lastName}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        {traveller.gender} {traveller.dob ? `• ${traveller.dob}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRemoveTraveller(traveller.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove Traveller"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              {travellers.length === 0 && (
                <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
                  <p className="text-gray-500">No travellers added yet</p>
                </div>
              )}
            </div>

            {/* Detailed Package Plan */}
            <PlanDetailsCard planData={planData} />

            {/* Detailed Itinerary */}
            <ItineraryCard itinerary={itinerary} />

            {/* Cancellation Policy */}
            <CancellationPolicyCard cancellationPolicy={cancellationPolicy} />
          </div>

          {/* Right Column - Payment Card */}
          <div className="lg:col-span-1">
            <PaymentSummaryCard
              currencySymbol={currencySymbol}
              planPrice={planPrice}
              addOnsTotal={addOnsTotal}
              gstAmount={gstAmount}
              finalTotal={finalTotal}
              travellerCount={travellerCount}
              totalBasePrice={totalBasePrice}
              advanceAmount={advanceAmount}
              remainingAmount={remainingAmount}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              paymentError={paymentError}
              cardNumber={cardNumber}
              handleCardNumberChange={handleCardNumberChange}
              cardExpiry={cardExpiry}
              handleExpiryChange={handleExpiryChange}
              cardCvv={cardCvv}
              handleCvvChange={handleCvvChange}
              cardHolderName={cardHolderName}
              setCardHolderName={setCardHolderName}
              upiId={upiId}
              setUpiId={setUpiId}
              isProcessing={isProcessing}
              handleConfirmPayment={handleConfirmPayment}
              selectedAddOnsLength={selectedAddOns.length}
            />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Profile?</h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this traveler profile? This action cannot be undone.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDeleteProfile}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <InlineLoader />
    </div>
  );
}

export default function BookPackagePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BookPackageContent />
    </Suspense>
  );
}
