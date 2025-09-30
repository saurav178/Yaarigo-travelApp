// "use client";

// type TabsMenuProps = {
//   activeTab: string;
//   onTabChange: (tab: string) => void;
// };

// const tabs = [
//   { key: "my-trips", label: "My Trips" },
//   { key: "explore-trips", label: "Explore Trips" },
//   { key: "nearby", label: "Nearby Essentials" },
//   { key: "community", label: "Community" },
// ];

// export default function tabMenu({ activeTab, onTabChange }: TabsMenuProps) {
//   return (
//     <div className="flex gap-6 border-b pb-2">
//       {tabs.map((tab) => (
//         <button
//           key={tab.key}
//           onClick={() => onTabChange(tab.key)}
//           className={`pb-2 font-medium ${
//             activeTab === tab.key
//               ? "border-b-2 border-blue-500 text-blue-600"
//               : "text-gray-600 hover:text-black"
//           }`}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </div>
//   );
// }



// "use client";

// type TabsMenuProps = {
//   activeTab: string;
//   onTabChange: (tab: string) => void;
// };

// const tabs = [
//   { key: "my-trips", label: "My Trips" },
//   { key: "explore-trips", label: "Explore Trips" },
//   { key: "nearby", label: "Nearby Essentials" },
//   { key: "community", label: "Community" },
// ];

// export default function TabMenu({ activeTab, onTabChange }: TabsMenuProps) {
//   return (
//    <div className="sticky top-0 z-10 bg-white flex border-b">
//   {tabs.map((tab) => (
//     <button
//       key={tab.key}
//       onClick={() => onTabChange(tab.key)}
//       className={`flex-1 h-12 font-medium text-center truncate transition-colors ${
//         activeTab === tab.key
//           ? "border-b-2 border-blue-500 text-blue-600"
//           : "text-gray-600 hover:text-black"
//       }`}
//     >
//       {tab.label}
//     </button>
//   ))}
// </div>

//   );
// }



"use client";

type TabsMenuProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const tabs = [
  { key: "my-trips", label: "My Trips" },
  { key: "explore-trips", label: "Explore Trips" },
  { key: "nearby", label: "Nearby Essentials" },
  { key: "community", label: "Community" },
];

export default function TabMenu({ activeTab, onTabChange }: TabsMenuProps) {
  return (
    <div className="sticky top-0 z-10 bg-white flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`flex-1 h-12 font-medium text-center truncate transition-colors ${
            activeTab === tab.key
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-black"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
