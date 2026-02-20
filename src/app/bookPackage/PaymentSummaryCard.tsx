import {
  Shield,
  CheckCircle,
  CreditCard,
  Smartphone,
  Building,
  AlertCircle,
  Lock,
} from "lucide-react";
import InlineLoader from "@/components/Loader/InlineLoader";

interface PaymentSummaryCardProps {
  currencySymbol: string;
  planPrice: number;
  addOnsTotal: number;
  gstAmount: number;
  finalTotal: number;
  paymentMethod: "card" | "upi" | "netbanking";
  setPaymentMethod: (method: "card" | "upi" | "netbanking") => void;
  paymentError: string;
  cardNumber: string;
  handleCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cardExpiry: string;
  handleExpiryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cardCvv: string;
  handleCvvChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cardHolderName: string;
  setCardHolderName: (name: string) => void;
  upiId: string;
  setUpiId: (id: string) => void;
  isProcessing: boolean;
  handleConfirmPayment: (e: React.FormEvent) => void;
  selectedAddOnsLength: number;
}

export default function PaymentSummaryCard({
  currencySymbol,
  planPrice,
  addOnsTotal,
  gstAmount,
  finalTotal,
  paymentMethod,
  setPaymentMethod,
  paymentError,
  cardNumber,
  handleCardNumberChange,
  cardExpiry,
  handleExpiryChange,
  cardCvv,
  handleCvvChange,
  cardHolderName,
  setCardHolderName,
  upiId,
  setUpiId,
  isProcessing,
  handleConfirmPayment,
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
                Total Payable
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">
                  {currencySymbol}
                  {finalTotal.toLocaleString()}
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
            <span className="text-gray-600">Base Price</span>
            <span className="font-medium text-gray-900">
              {currencySymbol}
              {planPrice.toLocaleString()}
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
        </div>
      </div>

      {/* Payment Tabs */}
      <div className="p-5 pb-0">
        <p className="text-sm font-bold text-gray-800 mb-3">
          Select Payment Method
        </p>
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            className={`flex flex-col items-center justify-center gap-2 py-3 px-2 rounded-xl border transition-all duration-200 ${
              paymentMethod === "card"
                ? "bg-[#276074]/10 border-[#276074] text-[#276074] shadow-sm ring-1 ring-[#276074]"
                : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-xs font-semibold">Card</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("upi")}
            className={`flex flex-col items-center justify-center gap-2 py-3 px-2 rounded-xl border transition-all duration-200 ${
              paymentMethod === "upi"
                ? "bg-[#276074]/10 border-[#276074] text-[#276074] shadow-sm ring-1 ring-[#276074]"
                : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Smartphone className="w-5 h-5" />
            <span className="text-xs font-semibold">UPI</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("netbanking")}
            className={`flex flex-col items-center justify-center gap-2 py-3 px-2 rounded-xl border transition-all duration-200 ${
              paymentMethod === "netbanking"
                ? "bg-[#276074]/10 border-[#276074] text-[#276074] shadow-sm ring-1 ring-[#276074]"
                : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            }`}
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

        {paymentMethod === "card" && (
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

        {paymentMethod === "upi" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                UPI ID / VPA
              </label>
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
              <p className="text-xs text-gray-500 mt-1">
                Google Pay, PhonePe, Paytm, BHIM, etc.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or scan QR code
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <span className="text-gray-400 text-xs">QR Code</span>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "netbanking" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-sm text-gray-600">
              Select your bank to proceed securely.
            </p>
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
              <span>
                Pay {currencySymbol}
                {finalTotal.toLocaleString()}
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}