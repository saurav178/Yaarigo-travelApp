import { CheckCircle, Users, Copy } from "lucide-react";

interface SuccessViewProps {
  packageTitle: string;
  currencySymbol: string;
  amountPaid: number;
  inviteLink: string;
  isCopied: boolean;
  bookingNumber: string;
  handleCopyInvite: () => void;
  handleGoToHome: () => void;
}

export default function SuccessView({
  packageTitle,
  currencySymbol,
  amountPaid,
  inviteLink,
  isCopied,
  bookingNumber,
  handleCopyInvite,
  handleGoToHome,
}: SuccessViewProps) {
  return (
    <div className="min-h-screen bg-gray-50 mt-12">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your booking for <strong>{packageTitle}</strong> has been confirmed.
            You will receive a confirmation email shortly.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Booking Reference:</span>
              <span className="font-bold text-[#276074] uppercase">
                {bookingNumber}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-bold text-xl text-[#276074]">
                {currencySymbol}
                {amountPaid.toLocaleString()}
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
                {isCopied ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
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