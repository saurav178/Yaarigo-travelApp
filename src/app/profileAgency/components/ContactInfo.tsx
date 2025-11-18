"use client";

export default function ContactInfo({ contact }: any) {
  if (!contact) return null;

  const contactDetails = [
    { label: "Response Time", value: contact.responseTime },
    { label: "Phone", value: contact.phone },
    { label: "Email", value: contact.email },
  ];

  return (
     <div className="bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 p-5 w-full max-w-md ml-10 border border-gray-100">
      <h3 className="text-base font-bold mb-4 text-gray-900">
        Contact Information
      </h3>

      <div className="space-y-3 text-sm">
        {contactDetails.map((item, i) => (
          <div key={i}>
            <div className="text-gray-500 text-xs mb-0.5">{item.label}</div>
            <div className="text-gray-900 font-medium">{item.value}</div>
          </div>
        ))}

        <div>
          <div className="text-gray-500 text-xs mb-0.5">Website</div>
          <a
            href={contact.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1DA69B] hover:underline text-sm"
          >
            {contact.website}
          </a>

          <div className="border-b border-black mt-5"></div>
        </div>
      </div>

      <button className="w-full mt-5 bg-[#1D4350] hover:bg-[#173844] text-white py-2.5 text-sm font-medium transition">
        Send Message
      </button>
    </div>
  );
}
