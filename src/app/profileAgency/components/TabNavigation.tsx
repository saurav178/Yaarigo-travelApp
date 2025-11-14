"use client";

interface Tab {
  id: string;
  label: string;
  count: number;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="bg-gray-200 shadow-sm bottom-0 left-0 w-full border-b border-black relative">
      <div className="flex overflow-x-auto relative">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-8 py-3 text-sm font-bold flex items-center gap-2 whitespace-nowrap relative transition-colors duration-200
              ${activeTab === tab.id ? "text-[#1D4350]" : "text-[#1D4350] hover:text-[#173844]"} 
              hover:border-b-2 hover:border-[#1D4350] hover:rounded-t-lg`}
          >
            {tab.label}
            <span className="bg-[#1D4350] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {tab.count}
            </span>

            {/* Active tab small rounded underline */}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-[#1D4350] rounded-t-lg"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
   