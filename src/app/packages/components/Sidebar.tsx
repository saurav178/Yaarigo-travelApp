import React from "react";
import { Button } from "../lib/ui";

export default function Sidebar() {
  const nav = [
    { label: "Dashboard" },
    { label: "Packages", active: true },
    { label: "Bookings" },
    { label: "Calendar" },
    { label: "Travelers" },
    { label: "Guides" },
    { label: "Gallery" },
    { label: "Messages" },
    { label: "Feedback" },
  ];
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-neutral-200 bg-white p-4 lg:block">
      <div className="mb-6 flex items-center gap-2">
        {/* <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white font-bold">T</div> */}
        {/* <span className="text-lg font-semibold">Travel CMS</span> */}
      </div>
      <nav className="space-y-1">
        {nav.map((item) => (
          <button
            key={item.label}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm ${
              item.active
                ? "bg-blue-50 text-blue-700"
                : "text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-8 rounded-2xl border border-neutral-200 bg gradient-to-b from-neutral-50 to-white p-4">
        <h4 className="text-sm font-semibold">
          Enhance Your Traveling Experience!
        </h4>
        <p className="mt-1 text-xs text-neutral-600">
          Unlock premium analytics, advanced pricing tools, and priority
          support.
        </p>
        <Button className="mt-3 w-full">Upgrade now</Button>
      </div>
    </aside>
  );
}
