"use client";

export default function AboutSection({ about }: any) {
  if (!about) return <p>Loading...</p>;

  // Fallback values agar data me na ho
  const specialities = about.specialities || [
    "Adventure Tours",
    "Cultural Tours",
    "Sustainable Tourism",
    "Small Groups",
  ];
  const certifications = about.certifications || ["ISO 9001", "ASTA Verified"];

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-black">
      <h2 className="text-xl font-bold mb-3 text-gray-900">{about.title}</h2>
      <p className="text-gray-600 leading-relaxed text-sm mb-4">
        {about.description}
      </p>

      {/* Specialities Section */}
      <div className="mb-4">
        <h3 className="text-sm font-bold mb-3 mt-8 text-gray-900">Specialities</h3>
        <div className="flex flex-wrap gap-2">
          {specialities.map((item: string, i: number) => (
            <span
              key={i}
              className="border border-gray-700 px-2 py-0.5 rounded-full text-xs text-gray-500 font-bold"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div>
        <h3 className="text-sm font-bold mb-3 mt-8 text-gray-900">
          Certifications & Awards
        </h3>
        <div className="flex flex-wrap gap-2">
          {certifications.map((item: string, i: number) => (
            <span
              key={i}
              className="border border-gray-700 px-2 py-0.5 rounded-full text-xs text-gray-500 font-bold"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
