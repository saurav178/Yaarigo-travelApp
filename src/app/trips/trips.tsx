"use client";

import { useState } from "react";
import TabsMenu from "./tabManu";
import MyTrips from "./screens/MyTrips";
import ExploreTrips from "./screens/ExploreTrips/ExploreTrips";
import Nearby from "./screens/Nearby";
import Community from "./screens/Community";

export default function Trips() {
  const [activeTab, setActiveTab] = useState("my-trips");

  return (
    <div className="p-6">
      <TabsMenu activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="mt-6">
        {activeTab === "my-trips" && <MyTrips />}
        {activeTab === "explore-trips" && <ExploreTrips />}
        {activeTab === "nearby" && <Nearby />}
        {activeTab === "community" && <Community />}
      </div>
    </div>
  );
}
