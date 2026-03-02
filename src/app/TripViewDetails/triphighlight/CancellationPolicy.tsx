import React from "react";

interface CancellationPolicyProps {
  trip: {
    cancellationPolicy?: {
      description?: string;
      freeCancellationDays?: number;
      refundable?: boolean;
    };
  };
}

const CancellationPolicy: React.FC<CancellationPolicyProps> = ({ trip }) => {
  const policy = trip?.cancellationPolicy;

  return (
    <div
      className="border p-5 shadow-sm"
      style={{ backgroundColor: "#c4c4c4ff" }}
    >
      <h2 className="text-lg font-semibold mb-3 text-black">
        Cancellation Policy
      </h2>

      <p className="text-sm text-black">
        {policy?.description
          ? policy.description
          : policy?.freeCancellationDays
          ? `Free cancellation up to ${policy.freeCancellationDays} days before trip start date.`
          : policy?.refundable !== undefined
          ? policy.refundable
            ? "This trip is refundable."
            : "This trip is non-refundable."
          : ""}
      </p>
    </div>
  );
};

export default CancellationPolicy;