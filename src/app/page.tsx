// src/app/page.tsx
import { redirect } from "next/navigation";

export default function RootPage() {
  // Automatically redirect users to /community (or essentials if you prefer)
  redirect("/community");
}


  