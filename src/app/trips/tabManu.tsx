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
        <div
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`flex-1 h-12 flex items-center justify-center cursor-pointer font-medium truncate transition-colors ${
            activeTab === tab.key
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-black"
          }`}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}
