import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle,
  CreditCard,
  Lock,
  Zap,
  TicketPercent,
  Info,
} from "lucide-react";
import InlineLoader from "@/components/Loader/InlineLoader";
import { motion, AnimatePresence } from "framer-motion";
import { TaxComponent, PaymentTerm } from "./types";

interface PaymentSummaryCardProps {
  currencySymbol: string;
  planPrice: number;
  addOnsTotal: number;
  gstAmount: number;
  finalTotal: number;
  travellerCount: number;
  totalBasePrice: number;
  advanceAmount: number;
  remainingAmount: number;
  isProcessing: boolean;
  handleProceedToCheckout: () => void;
  selectedAddOnsLength: number;
  // New API response props
  cartPricing?: {
    baseAmount: number;
    planPricePerPerson: string;
    addonAmount: number;
    taxAmount: number;
    totalAmount: number;
    payableNow: number;
    taxComponents: TaxComponent[];
    paymentTerms: PaymentTerm[];
  };
}

export default function PaymentSummaryCard({
  currencySymbol,
  planPrice,
  addOnsTotal,
  gstAmount,
  finalTotal,
  travellerCount,
  totalBasePrice,
  advanceAmount,
  remainingAmount,
  isProcessing,
  handleProceedToCheckout,
  selectedAddOnsLength,
  cartPricing,
}: PaymentSummaryCardProps) {
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // Use API data if available, otherwise use calculated values
  const hasApiData = cartPricing && cartPricing.totalAmount > 0;
  
  const displayBaseAmount = hasApiData ? cartPricing!.baseAmount : totalBasePrice;
  const displayAddonAmount = hasApiData ? cartPricing!.addonAmount : addOnsTotal;
  const displayTaxAmount = hasApiData ? cartPricing!.taxAmount : gstAmount;
  const displayTotalAmount = hasApiData ? cartPricing!.totalAmount : finalTotal;
  const displayPayableNow = hasApiData ? cartPricing!.payableNow : advanceAmount;
  
  const taxComponents = hasApiData ? cartPricing!.taxComponents : [];
  const paymentTerms = hasApiData ? cartPricing!.paymentTerms : [];

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "YAARI10") {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code.");
      setCouponCode("");
    }
  };

  // Get the first payment term (usually the advance payment)
  const firstPaymentTerm = paymentTerms[0];
  const remainingPaymentTerm = paymentTerms[1];

  return (
    <div className="bg-white shadow-xl border border-gray-100 sticky top-24 overflow-hidden">
      <motion.div
        className="absolute top-3 -right-12 z-20"
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 45 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 15 }}
      >
        <div className="bg-amber-400 text-amber-900 px-12 py-1 text-xs font-bold uppercase shadow-md select-none border-b-2 border-amber-500">
          Offers
        </div>
      </motion.div>
      <motion.div
        className="absolute top-3 -left-12 z-20"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: -45 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 15 }}
      >
        <div className="bg-red-500 text-white px-12 py-1 text-xs font-bold uppercase shadow-md select-none">
          Exclusive
        </div>
      </motion.div>
      <div className="bg-gradient-to-br from-[#276074] to-[#1d4350] p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-10 -mb-10 blur-2xl opacity-50"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">
                {firstPaymentTerm ? `Payable Now (${firstPaymentTerm.percentage}%)` : 'Payable Now'}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold">
                  {currencySymbol}
                  {displayPayableNow.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-blue-200 text-xs flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Inclusive of all taxes & fees
          </p>
        </div>
      </div>

      <div className="p-6 bg-gray-50/50">
        <div className="space-y-3 text-sm">
          {/* Base Price */}
          <div className="flex justify-between text-gray-700">
            <span className="text-gray-600">
              Base Price ({currencySymbol}
              {planPrice.toLocaleString()} x {travellerCount} {travellerCount > 1 ? 'travellers' : 'traveller'})
            </span>
            <span className="font-semibold text-gray-900">
              {currencySymbol}
              {displayBaseAmount.toLocaleString()}
            </span>
          </div>

          {/* Add-ons */}
          {selectedAddOnsLength > 0 && (
            <div className="flex justify-between text-gray-700">
              <span className="text-gray-600">Add-ons</span>
              <span className="font-semibold text-gray-900">
                {currencySymbol}
                {displayAddonAmount.toLocaleString()}
              </span>
            </div>
          )}

          {/* Tax Components - from API */}
          {taxComponents.length > 0 ? (
            taxComponents.map((tax, index) => (
              <div key={index} className="flex justify-between text-gray-700">
                <span className="text-gray-600 flex items-center gap-1">
                  {tax.name} ({tax.percentage}%)
                  <span className="group relative">
                    <Info className="w-3 h-3 text-gray-400 cursor-help" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {tax.code}
                    </span>
                  </span>
                </span>
                <span className="font-semibold text-gray-900">
                  {currencySymbol}
                  {tax.amount.toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            /* Fallback GST display if no API data */
            <div className="flex justify-between text-gray-700">
              <span className="text-gray-600">GST (18%)</span>
              <span className="font-semibold text-gray-900">
                {currencySymbol}
                {displayTaxAmount.toLocaleString()}
              </span>
            </div>
          )}

          {/* Total Amount */}
          <div className="pt-3 mt-3 border-t-2 border-dashed border-gray-200 flex justify-between font-bold text-gray-800 text-lg">
            <span>Total Amount</span>
            <span>
              {currencySymbol}
              {displayTotalAmount.toLocaleString()}
            </span>
          </div>

          {/* Payment Terms from API */}
          {paymentTerms.length > 0 ? (
            <div className="space-y-2 mt-2">
              {paymentTerms.map((term, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between text-xs p-2 rounded-md ${
                    index === 0 ? 'bg-orange-50 text-orange-700' : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  <span className="font-medium">
                    {term.trigger === 'ON_BOOKING' && 'On Booking'}
                    {term.trigger === 'BEFORE_DAYS' && `Due ${term.beforeDays} days before travel`}
                    {term.trigger === 'AFTER_BOOKING' && 'After Booking'}
                  </span>
                  <span className="font-semibold">
                    {term.percentage}% ({currencySymbol}{((displayTotalAmount * term.percentage) / 100).toLocaleString()})
                  </span>
                </div>
              ))}
            </div>
          ) : (
            /* Fallback remaining payment display */
            <div className="flex justify-between text-orange-600 text-xs mt-1 bg-orange-50 p-2 rounded-md">
              <span>Remaining (70%) due in 7 days</span>
              <span className="font-medium">
                {currencySymbol}
                {remainingAmount.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 border-t border-gray-100">
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <TicketPercent className="w-5 h-5 text-[#276074]" />
            Apply Coupon
          </h3>
          <AnimatePresence mode="wait">
            {couponApplied ? (
              <motion.div
                key="applied"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-3 bg-green-50 border border-green-200 rounded-md text-center"
              >
                <p className="text-sm font-semibold text-green-700">
                  Coupon <span className="font-bold">YAARI10</span> applied!
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#276074] focus:border-transparent transition-colors text-sm"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={!couponCode}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex-shrink-0"
                >
                  Apply
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mb-4 flex items-center justify-center gap-2 text-xs text-gray-500 bg-green-50 border border-green-200 py-2.5 rounded-md">
          <Lock className="w-3.5 h-3.5 text-green-600" />
          <span className="font-semibold text-green-800">Your payment is secure and encrypted</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          type="button"
          onClick={handleProceedToCheckout}
          disabled={isProcessing}
          className="w-full mt-4 py-4 px-6 bg-[#276074] text-white font-bold text-lg rounded-lg hover:bg-gradient-to-r hover:from-[#276074] hover:to-[#1d4350] transition-all shadow-lg shadow-[#276074]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isProcessing ? (
            <>
              <InlineLoader size="sm" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-6 h-6" />
              <span>Proceed to Checkout</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

