"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import InlineLoader from "@/components/Loader/InlineLoader";
import { ArrowLeft } from "lucide-react";
import { APP_ROUTES } from "@/utils/constants";
import { AddOnDetail, Traveller, ItineraryItem, CancellationPolicyItem, PlanData } from "./types";
import PackageDetailsCard from "./PackageDetailsCard";
import SelectedAddOnsCard from "./SelectedAddOnsCard";
import TravellersListCard from "./TravellersListCard";
import PlanDetailsCard from "./PlanDetailsCard";
import ItineraryCard from "./ItineraryCard";
import CancellationPolicyCard from "./CancellationPolicyCard";
import PaymentSummaryCard from "./PaymentSummaryCard";
import SuccessView from "./SuccessView";

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

            {/* Travellers List */}
            <TravellersListCard travellers={travellers} />

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
