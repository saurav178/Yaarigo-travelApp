import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "../../../../lib/mongodb";
import User from "../../../../lib/models/User";
import { trackEvent } from "../../../../lib/analytics";

export async function POST(req: Request) {
  try {
    const { fullName, email, password } = await req.json();

    if (!fullName || !email || !password) {
      trackEvent("Signup_Error", { reason: "Missing fields", email });
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (password.length < 8) {
      trackEvent("Signup_Error", { reason: "Weak password", email });
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    await dbConnect();

    const exists = await User.findOne({ email });
    if (exists) {
      trackEvent("Signup_Error", { reason: "Email already exists", email });
      return NextResponse.json({ error: "Email already exists." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, password: hashedPassword });

    const token = Buffer.from(email).toString("base64");

    trackEvent("Signup_Success", { email, fullName, userId: user._id, token });

    return NextResponse.json({ message: "Signup successful", token }, { status: 200 });
  } catch (err: any) {
    trackEvent("Signup_Error", { reason: err.message });
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
