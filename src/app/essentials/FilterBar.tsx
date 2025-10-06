// "use client";

// interface FilterBarProps {
//   categories: { name: string; key: string }[];
//   active: string | null;
//   onSelect: (key: string) => void;
// }

// export default function FilterBar({ categories, active, onSelect }: FilterBarProps) {
//   return (
//     <div className="flex gap-3 mt-4 flex-wrap">
//       {categories.map((cat) => (
//         <button
//           key={cat.key}
//           onClick={() => onSelect(cat.key)}
//           className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
//             active === cat.key
//               ? "bg-blue-600 text-white"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//           }`}
//         >
//           {cat.name}
//         </button>
//       ))}
//     </div>
//   );
// }
// "use client";

// interface FilterBarProps {
//   categories: { name: string; key: string }[];
//   active: string | null;
//   onSelect: (val: string) => void;
// }

// export default function FilterBar({ categories, active, onSelect }: FilterBarProps) {
//   return (
//     <div className="mt-4">
//       <select
//         className="px-4 py-2 border rounded-lg shadow-sm bg-white text-gray-700"
//         value={active ?? ""}
//         onChange={(e) => onSelect(e.target.value)}
//       >
//         <option value="">All Categories</option>
//         {categories.map((c) => (
//           <option key={c.key} value={c.key}>
//             {c.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }


"use client";

interface FilterBarProps {
  categories: { name: string; key: string }[];
  active: string | null;
  onSelect: (val: string) => void;
}

export default function FilterBar({ categories, active, onSelect }: FilterBarProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {categories.map((c) => (
        <button
          key={c.key}
          onClick={() => onSelect(c.key)}
          className={`px-4 py-2 rounded-lg text-sm shadow-sm ${
            active === c.key
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
