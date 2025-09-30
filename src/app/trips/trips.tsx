// "use client";

// import { useState } from "react";
// import TabsMenu from "./tabManu";
// import MyTrips from "./screens/MyTrips";
// import ExploreTrips from "./screens/ExploreTrips";
// import Nearby from "./screens/Nearby";
// import Community from "./screens/Community";

// export default function trips() {
//   const [activeTab, setActiveTab] = useState("my-trips");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "my-trips":
//         return <MyTrips />;
//       case "explore-trips":
//         return <ExploreTrips />;
//       case "nearby":
//         return <Nearby />;
//       case "community":
//         return <Community />;
//       default:
//         return <MyTrips />;
//     }
//   };

//   return (
//     <div className="p-6">
//       <TabsMenu activeTab={activeTab} onTabChange={setActiveTab} />
//       <div className="mt-6">{renderContent()}</div>
//     </div>
//   );
// }



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
