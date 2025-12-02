
import React from "react";

type Props = {
  docType: string;
  fields: Record<string, string>;
  onChange: (name: string, value: string) => void;
};

export default function DocumentFields({ docType, fields, onChange }: Props) {
  if (!docType) {
    return <div className="text-sm text-gray-400">Select a document type to enter the corresponding details.</div>;
  }

  const input = (name: string, placeholder: string, type = "text") => (
    <input
      name={name}
      placeholder={placeholder}
      value={fields[name] || ""}
      onChange={(e) => onChange(name, e.target.value)}
      className="mt-2 block w-full rounded-md border-gray-300 py-2 px-3 text-sm"
      type={type}
    />
  );

  return (
    <div className="space-y-3">
      {docType === "govt_id" && (
        <div>
          <div className="text-sm font-medium text-gray-700">Government ID details</div>
          {input("id_number", "ID number")}
          {input("issuing_state", "Issuing state / country")}
          {input("expiry", "Expiry date", "date")}
        </div>
      )}

      {docType === "passport" && (
        <div>
          <div className="text-sm font-medium text-gray-700">Passport details</div>
          {input("passport_number", "Passport number")}
          {input("country", "Country")}
          {input("expiry", "Expiry date", "date")}
        </div>
      )}

      {docType === "drivers_license" && (
        <div>
          <div className="text-sm font-medium text-gray-700">Drivers license details</div>
          {input("dl_number", "License number")}
          {input("state", "Issuing state")}
          {input("expiry", "Expiry date", "date")}
        </div>
      )}
    </div>
  );
}
