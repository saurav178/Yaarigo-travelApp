"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import InlineLoader from "@/components/Loader/InlineLoader";
import { ArrowLeft, CheckCircle, Users, Copy, MapPin, Clock, User, Info, XCircle, AlertCircle, Shield, CreditCard, Smartphone, Building, Lock } from "lucide-react";
import { APP_ROUTES } from "@/utils/constants";

interface AddOnDetail {
  id: string;
  title: string;
  desc: string;
  price: number;
  tag: string;
}

interface Traveller {
  id: string;
  name: string;
  email: string;
  contact: string;
  gender: string;
  age: string | number;
}

interface ItineraryItem {
  dayTitle: string;
  summary: string;
  activities?: { name?: string; title?: string }[];
}

interface CancellationPolicyItem {
  _id?: string;
  beforeDays: number;
  refundPercentage: number;
  trigger?: string;
}

interface PlanData {
  name: string;
  category: string;
  description: string;
  inclusions: string[];
  exclusions: string[];
}

function BookPackageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [packageId, setPackageId] = useState<string>("");
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

  useEffect(() => {
    // Get query parameters
    const pkgId = searchParams.get("packageId") || "";
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

    setPackageId(pkgId);
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
  const addOnsTotal = selectedAddOns.reduce((acc, addon) => acc + addon.price, 0);
  const GST_RATE = 0.18;
  const gstAmount = Math.round((planPrice + addOnsTotal) * GST_RATE);
  const finalTotal = planPrice + addOnsTotal + gstAmount;

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
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
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
      <div className="min-h-screen bg-gray-50 mt-12">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your booking for <strong>{packageTitle}</strong> has been confirmed. 
              You will receive a confirmation email shortly.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Booking Reference:</span>
                <span className="font-bold text-[#276074]">YGR-{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-bold text-xl text-[#276074]">
                  {currencySymbol}{finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Invite Section */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-[#276074] mb-2 flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Invite Friends & Family
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Adventures are better together! Share this trip with your friends.
              </p>
              <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-200">
                <input 
                  type="text" 
                  readOnly 
                  value={inviteLink || "Link unavailable"} 
                  className="flex-1 text-sm text-gray-600 outline-none bg-transparent px-2"
                />
                <button 
                  onClick={handleCopyInvite}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors text-[#276074]"
                  title="Copy Link"
                >
                  {isCopied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleGoToHome}
              className="w-full py-3 px-6 bg-[#276074] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Browse More Trips
            </button>
          </div>
        </div>
      </div>
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
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Package Details
              </h2>
              <div className="space-y-3">
                <div>
                   <p className="text-sm text-gray-500 mb-1">Package Name</p>
                   <p className="font-bold text-gray-900 text-lg">{packageTitle}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold">
                            <MapPin className="w-3 h-3" />
                            <span>Destination</span>
                        </div>
                        <p className="font-semibold text-gray-800 text-sm truncate" title={`${fromLocation} → ${toLocation}`}>{fromLocation} → {toLocation}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold">
                            <Clock className="w-3 h-3" />
                            <span>Duration</span>
                        </div>
                        <p className="font-semibold text-gray-800 text-sm">{duration}</p>
                    </div>
                </div>

                <div className="pt-3 mt-2 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Selected Plan</span>
                  <span className="font-bold text-[#276074] bg-blue-50 px-3 py-1 rounded-full text-sm border border-blue-100">{planName}</span>
                </div>
              </div>
            </div>

            {/* Selected Add-ons */}
            {selectedAddOns.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Selected Add-ons</h2>
                <div className="space-y-4">
                  {selectedAddOns.map((addon) => (
                    <div
                      key={addon.id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">{addon.title}</p>
                        <p className="text-sm text-gray-500">{addon.desc}</p>
                      </div>
                      <span className="font-bold text-[#276074]">
                        {currencySymbol}{addon.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Travellers List */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#276074]" />
                Travellers ({travellers.length})
              </h2>
              {travellers.length > 0 ? (
                <div className="space-y-3">
                  {travellers.map((t, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-800">{t.name}</p>
                        <p className="text-xs text-gray-500">{t.email} • {t.contact}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-medium bg-white px-2 py-1 rounded border border-gray-200 text-gray-600">
                          {t.gender}, {t.age}y
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No travellers added.</p>
              )}
            </div>

            {/* Detailed Package Plan */}
            {planData && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#276074]" />
                  Plan Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">{planData.name} <span className="text-sm font-normal text-gray-500">({planData.category})</span></h3>
                    <p className="text-sm text-gray-600 mt-1">{planData.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {planData.inclusions && planData.inclusions.length > 0 && (
                      <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                        <h4 className="font-semibold text-green-800 mb-2 text-sm">Inclusions</h4>
                        <ul className="space-y-2">
                          {planData.inclusions.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                              <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {planData.exclusions && planData.exclusions.length > 0 && (
                      <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                        <h4 className="font-semibold text-red-800 mb-2 text-sm">Exclusions</h4>
                        <ul className="space-y-2">
                          {planData.exclusions.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                              <XCircle className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Detailed Itinerary */}
            {itinerary.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#276074]" />
                  Detailed Itinerary
                </h2>
                <div className="space-y-6">
                  {itinerary.map((day, index) => (
                    <div key={index} className="border-l-2 border-[#276074]/20 pl-4 pb-1 last:pb-0 relative">
                      <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#276074]" />
                      <p className="text-xs font-bold text-[#276074] uppercase mb-1">Day {index + 1}</p>
                      <h3 className="font-semibold text-gray-800 text-sm">{day.dayTitle}</h3>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">{day.summary}</p>
                      {day.activities && day.activities.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {day.activities.map((activity, i) => (
                            <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                              {activity.name || activity.title}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cancellation Policy */}
            {cancellationPolicy.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#276074]" />
                  Cancellation Policy
                </h2>
                {(() => {
                  const sorted = [...cancellationPolicy].sort((a, b) => b.beforeDays - a.beforeDays);
                  const first = sorted[0];
                  return (
                    <>
                      <p className="text-green-600 mt-1 font-medium">
                        Cancellation Possible till {first.beforeDays} days before*
                      </p>
                      <p className="text-gray-500 text-sm">
                        After that Package is <span className="font-semibold">Non-Refundable.</span>
                      </p>

                      <div className="relative mt-8">
                        <div className="h-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-300 to-orange-300" />
                        <div className="absolute -top-3 left-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm">✓</div>
                        <div className="absolute -top-3 right-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-sm">✕</div>
                      </div>

                      <div className="flex justify-between mt-6">
                        <div>
                          <p className="text-teal-700 font-semibold">Till {first.beforeDays} days before</p>
                          <p className="text-sm text-gray-500">
                            {first.refundPercentage === 100 ? "₹0 Cancellation Fee" : `${first.refundPercentage}% Refund`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-orange-600 font-semibold">After {first.beforeDays} days</p>
                          <p className="text-sm text-gray-500">Non Refundable</p>
                        </div>
                      </div>

                      <div className="bg-gray-100 rounded-lg p-5 mt-6">
                        <ul className="space-y-3 text-sm text-gray-700">
                          <li className="flex gap-2">
                            <span className="text-green-600 mt-1">●</span>
                            These are non-refundable amounts as per the current components attached. In the case of component change/modifications, the policy will change accordingly.
                          </li>
                          <li className="flex gap-2">
                            <span className="text-green-600 mt-1">●</span>
                            Please note, TCS once collected cannot be refunded in case of any cancellation / modification.
                          </li>
                          <li className="flex gap-2">
                            <span className="text-green-600 mt-1">●</span>
                            Cancellation charges shown is exclusive of all taxes and taxes will be added as per applicable.
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Right Column - Payment Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 sticky top-24 overflow-hidden">
              {/* Price Summary */}
              <div className="bg-gradient-to-br from-[#276074] to-[#1d4350] p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">Total Payable</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold">{currencySymbol}{finalTotal.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg">
                        <Shield className="w-5 h-5 text-blue-100" />
                    </div>
                  </div>
                  <p className="text-blue-200 text-xs flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Inclusive of all taxes & fees
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span className="text-gray-600">Base Price</span>
                    <span className="font-medium text-gray-900">
                      {currencySymbol}{planPrice.toLocaleString()}
                    </span>
                  </div>
                  {selectedAddOns.length > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span className="text-gray-600">Add-ons</span>
                      <span className="font-medium text-gray-900">
                        {currencySymbol}{addOnsTotal.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-medium text-gray-900">
                      {currencySymbol}{gstAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="p-5 pb-0">
                <p className="text-sm font-bold text-gray-800 mb-3">Select Payment Method</p>
                <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center justify-center gap-2 py-3 px-2 rounded-xl border transition-all duration-200 ${paymentMethod === 'card' ? 'bg-[#276074]/10 border-[#276074] text-[#276074] shadow-sm ring-1 ring-[#276074]' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs font-semibold">Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex flex-col items-center justify-center gap-2 py-3 px-2 rounded-xl border transition-all duration-200 ${paymentMethod === 'upi' ? 'bg-[#276074]/10 border-[#276074] text-[#276074] shadow-sm ring-1 ring-[#276074]' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span className="text-xs font-semibold">UPI</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`flex flex-col items-center justify-center gap-2 py-3 px-2 rounded-xl border transition-all duration-200 ${paymentMethod === 'netbanking' ? 'bg-[#276074]/10 border-[#276074] text-[#276074] shadow-sm ring-1 ring-[#276074]' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                >
                  <Building className="w-5 h-5" />
                  <span className="text-xs font-semibold">Net Banking</span>
                </button>
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handleConfirmPayment} className="p-5 pt-6">
                {paymentError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {paymentError}
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Card Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276074] focus:border-transparent transition-shadow"
                      />
                      <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276074] focus:border-transparent transition-shadow"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={cardCvv}
                          onChange={handleCvvChange}
                          placeholder="123"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276074] focus:border-transparent transition-shadow"
                        />
                      </div>
                    </div>

                    {/* Cardholder Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardHolderName}
                        onChange={(e) => setCardHolderName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276074] focus:border-transparent transition-shadow"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID / VPA</label>
                      <div className="relative">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="username@upi"
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276074] focus:border-transparent transition-shadow"
                      />
                      <Smartphone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Google Pay, PhonePe, Paytm, BHIM, etc.</p>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or scan QR code</span>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        <span className="text-gray-400 text-xs">QR Code</span>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm text-gray-600">Select your bank to proceed securely.</p>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276074] focus:border-transparent bg-white transition-shadow">
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>SBI</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {/* Secure Payment Notice */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 py-2 rounded-lg">
                  <Lock className="w-3 h-3" />
                  <span>Your payment is secure and encrypted</span>
                </div>

                {/* Pay Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-4 py-4 px-6 bg-[#276074] text-white font-bold text-lg rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#276074]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <InlineLoader size="sm" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Pay {currencySymbol}{finalTotal.toLocaleString()}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
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
