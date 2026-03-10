"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import InlineLoader from "@/components/Loader/InlineLoader";
import { ArrowLeft, Plus, UserPlus, Check, Trash2, User } from "lucide-react";
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

declare global {
  interface Window {
    Razorpay: any;
  }
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

  const [bookingNumber, setBookingNumber] = useState("");

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
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isAddingExisting, setIsAddingExisting] = useState(false);

  // Initialize existingProfiles from URL params on page load
  useEffect(() => {
    const existingProfilesParam = searchParams.get("existingProfiles");
    if (existingProfilesParam) {
      try {
        const profiles = JSON.parse(existingProfilesParam);
        setExistingProfiles(profiles);
      } catch (e) {
        console.error("Error parsing existingProfiles:", e);
      }
    }
  }, [searchParams]);

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
    
    if (!cartId) {
      console.error("Cart ID is missing.");
      return;
    }

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
      
      // Save traveler profile
      await axiosClient.post(API_ENDPOINTS_CONFIG.BOOKING.TRAVELER_PROFILES, payload);

      const response = await axiosClient.post(API_ENDPOINTS_CONFIG.BOOKING.ADD_TRAVELERS(cartId), {
        travelers: [payload]
      });
      const created = (response.data?.data || response.data)?.[0] || {};
      
      const newTravellerId = created.id || Date.now().toString();
      const travellerToAdd = {
        id: newTravellerId,
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
          id: newTravellerId,
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
      
      setNewTraveller({ firstName: "", lastName: "", gender: "MALE", dob: "", email: "", phone: "", nationality: "Indian" });
      setNewTravellerErrors({ firstName: "", lastName: "", dob: "", email: "", phone: "" });
      setShowNewTravellerModal(false);
    } catch (error) {
      console.error("Failed to add traveler", error);
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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Calculate totals
  const currencySymbol = currency === "INR" ? "₹" : currency;
  const travellerCount = travellers.length > 0 ? travellers.length : 1;
  const totalBasePrice = planPrice * travellerCount;
  const addOnsTotal = selectedAddOns.reduce((acc, addon) => acc + addon.price, 0);
  const gstAmount = Math.round((totalBasePrice + addOnsTotal) * 0.18);
  const finalTotal = totalBasePrice + addOnsTotal + gstAmount;
  const advanceAmount = Math.round(finalTotal * APP_CONSTANTS.ADVANCE_PAYMENT_PERCENTAGE);
  const remainingAmount = finalTotal - advanceAmount;

  const handleProceedToCheckout = async () => {
    if (travellers.length === 0) {
      console.error("Please add at least one traveller to proceed.");
      return;
    }

    setIsProcessing(true);

    try {
      if (cartId) {
        const travelersToSync = travellers.filter((t: Traveller & { isAddedToCart?: boolean }) => !t.isAddedToCart);

        if (travelersToSync.length > 0) {
          const travelersPayload = travelersToSync.map((t: Traveller) => ({
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

      // Step 1: Call Checkout API to get booking details
      const checkoutResponse = await axiosClient.post(`${API_ENDPOINTS_CONFIG.BOOKING.CHECKOUT_CART(cartId)}`, {
        paymentMethod: "RAZORPAY"
      });

      const bookingData = checkoutResponse.data.data || checkoutResponse.data;
      const bookingId = bookingData.booking?.id;

      if (!bookingId) {
        throw new Error("Booking ID not found in checkout response.");
      }

      if (bookingData.booking?.bookingNumber) {
        setBookingNumber(bookingData.booking.bookingNumber);
      }

      // Step 2: Call Pay API to get Razorpay order details
      const payResponse = await axiosClient.post(`${API_ENDPOINTS_CONFIG.BOOKING.PAYMENT(bookingId)}/pay`);
      const paymentData = payResponse.data.data || payResponse.data;

      if (!window.Razorpay) {
        console.error("Razorpay SDK failed to load.");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: paymentData.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: paymentData.amount,
        currency: paymentData.currency || currency,
        name: "Yaarigo",
        description: `Payment for ${packageTitle}`,
        order_id: paymentData.orderId,
        handler: async (response: any) => {
          console.log("Payment successful", response);
          try {
            // Step 3: Verify Payment
            await axiosClient.post(API_ENDPOINTS_CONFIG.BOOKING.VERIFY_PAYMENT, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            setIsSuccess(true);
            setIsProcessing(false);
          } catch (error) {
            console.error("Payment verification failed", error);
            alert("Payment verification failed. Please contact support.");
            setIsProcessing(false);
          }
        },
        prefill: {
          name: travellers[0]?.name || "Yaarigo User",
          email: travellers[0]?.email || "",
          contact: travellers[0]?.contact || "",
        },
        theme: {
          color: "#276074",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        console.error('Payment Failed:', response.error.description);
        setIsProcessing(false);
        alert(`Payment Failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      console.error("Checkout failed:", error);
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
        amountPaid={advanceAmount}
        inviteLink={inviteLink}
        isCopied={isCopied}
        handleCopyInvite={handleCopyInvite}
        handleGoToHome={handleGoToHome}
        bookingNumber={bookingNumber}
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setShowNewTravellerModal(!showNewTravellerModal);
                    setShowExistingTravellerModal(false);
                  }}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                    showNewTravellerModal 
                      ? "bg-gray-100 text-gray-700 border border-gray-200" 
                      : "bg-[#276074] text-white hover:opacity-90"
                  }`}
                >
                  <Plus className="w-5 h-5" />
                  {showNewTravellerModal ? "Cancel" : "Add New Traveller"}
                </button>
                <div className="relative">
                  <button
                    onClick={() => {
                      if (showExistingTravellerModal) {
                        setShowExistingTravellerModal(false);
                      } else {
                        setShowNewTravellerModal(false);
                        setShowExistingTravellerModal(true);
                      }
                    }}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#276074] rounded-xl transition-all ${
                      showExistingTravellerModal
                        ? "bg-[#276074] text-white"
                        : "text-[#276074] hover:bg-[#276074]/5"
                    }`}
                  >
                    <UserPlus className="w-5 h-5" />
                    {showExistingTravellerModal ? "Close Selection" : "Select Existing"}
                  </button>

                  {showExistingTravellerModal && (
                    <div className="absolute z-10 top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 animate-in fade-in-5 duration-200">
                      <div className="p-2 max-h-80 overflow-y-auto space-y-2">
                        {existingProfiles.length === 0 ? (
                          <p className="text-center text-gray-500 py-4">No saved profiles found.</p>
                        ) : (
                          existingProfiles.map((profile) => (
                            <label 
                              key={profile.id}
                              className="p-3 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={selectedProfileIds.includes(profile.id)}
                                onChange={() => toggleProfileSelection(profile.id)}
                                className="h-5 w-5 rounded border-gray-300 text-[#276074] focus:ring-[#276074]/50"
                              />
                              <div>
                                <p className="font-semibold text-gray-800">{profile.firstName} {profile.lastName}</p>
                                <p className="text-sm text-gray-500">{profile.gender} • {profile.dob}</p>
                              </div>
                            </label>
                          ))
                        )}
                      </div>
                      {existingProfiles.length > 0 && (
                        <div className="p-2 border-t border-gray-100">
                          <button
                            onClick={addSelectedProfiles}
                            disabled={selectedProfileIds.length === 0 || isAddingExisting}
                            className="w-full py-2.5 bg-[#276074] text-white font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isAddingExisting ? "Adding..." : `Add Selected (${selectedProfileIds.length})`}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Inline New Traveller Form */}
              {showNewTravellerModal && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-gray-900">New Traveller Details</h4>
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
                    {isSavingProfile ? "Saving..." : "Save & Add Traveller"}
                  </button>
                </div>
              )}

            </div>

            {/* Travellers List */}
            <div className="space-y-3">
              {travellers.map((traveller, index) => (
                <div
                  key={traveller.id || index}
                  className="bg-white p-4 rounded-xl border border-gray-200 border-dashed flex justify-between items-center"
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
                  <button
                    onClick={() => handleRemoveTraveller(traveller.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove Traveller"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {travellers.length === 0 && (
                <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
                  <p className="text-gray-500">No travellers added yet</p>
                </div>
              )}
            </div>

            {/* Add More Travellers Button */}
            {travellers.length > 0 && (
              <button
                onClick={() => {
                  setShowNewTravellerModal(false);
                  setShowExistingTravellerModal(true);
                }}
                className="mx-auto py-2 px-3 border-2 border-[#276074] text-[#276074] font-medium rounded-lg hover:bg-[#276074] hover:text-white transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <UserPlus className="w-4 h-4" />
                Add More Travellers
              </button>
            )}

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
              isProcessing={isProcessing}
              handleProceedToCheckout={handleProceedToCheckout}
              selectedAddOnsLength={selectedAddOns.length}
            />
          </div>
        </div>
      </div>
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
