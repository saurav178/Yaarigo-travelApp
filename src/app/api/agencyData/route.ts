// import { NextResponse } from "next/server";
// import agencyData from "../../../app/ProfileAgency/data/agencyData.json";

// export async function GET() {
//   return NextResponse.json(agencyData);
// }



import { NextResponse } from "next/server";
import { agencyData } from "../../ProfileAgency/data/agencyData";

export async function GET() {
  return NextResponse.json(agencyData);
}
