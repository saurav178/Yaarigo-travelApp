import {
  Shield,
  CheckCircle,
  CreditCard,
  Lock,
} from "lucide-react";
import InlineLoader from "@/components/Loader/InlineLoader";

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
}: PaymentSummaryCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 sticky top-24 overflow-hidden">
      {/* Price Summary */}
      <div className="bg-gradient-to-br from-[#276074] to-[#1d4350] p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">
                Payable Now (30%)
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">
                  {currencySymbol}
                  {advanceAmount.toLocaleString()}
                </span>
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
            <span className="text-gray-600">
              Base Price ({currencySymbol}
              {planPrice.toLocaleString()} x {travellerCount})
            </span>
            <span className="font-medium text-gray-900">
              {currencySymbol}
              {totalBasePrice.toLocaleString()}
            </span>
          </div>
          {selectedAddOnsLength > 0 && (
            <div className="flex justify-between text-gray-600">
              <span className="text-gray-600">Add-ons</span>
              <span className="font-medium text-gray-900">
                {currencySymbol}
                {addOnsTotal.toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex justify-between text-gray-600">
            <span className="text-gray-600">GST (18%)</span>
            <span className="font-medium text-gray-900">
              {currencySymbol}
              {gstAmount.toLocaleString()}
            </span>
          </div>
          <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between font-bold text-gray-800">
            <span>Total Amount</span>
            <span>
              {currencySymbol}
              {finalTotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-orange-600 text-xs mt-1">
            <span>Remaining (70%) due in 7 days</span>
            <span className="font-medium">
              {currencySymbol}
              {remainingAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-6">
        <div className="mb-4 flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 py-2 rounded-lg">
          <Lock className="w-3 h-3" />
          <span>Your payment is secure and encrypted</span>
        </div>

        <button
          type="button"
          onClick={handleProceedToCheckout}
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
              <span>Proceed to Checkout</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}