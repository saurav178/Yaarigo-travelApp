import { NextResponse } from "next/server";
import { agencyData } from "../../../profileAgency/data/agencyData";

export async function GET() {
  return NextResponse.json(agencyData);
}
