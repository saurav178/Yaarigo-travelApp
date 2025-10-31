"use client";
import { useState } from "react";
import ProfileSetup from "../../components/ProfileSetup";

export default function ProfileSetupPage() {
  const [error, setError] = useState("");

  const handleProfileSave = (profile: any) => {
    console.log("Profile saved:", profile);
    alert("Profile saved successfully! Check console for details.");
  };

  return <ProfileSetup onProfileSave={handleProfileSave} error={error} />;
}
