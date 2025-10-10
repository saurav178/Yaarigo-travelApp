import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "../../../../lib/mongodb";
import User from "../../../../lib/models/User";
import { trackEvent } from "../../../../lib/analytics";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      trackEvent("Login_Error", { email, reason: "Missing fields" });
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      trackEvent("Login_Error", { email, reason: "Invalid credentials" });
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = Buffer.from(email).toString("base64");

    trackEvent("Login_Success", { email, userId: user._id, token });

    return NextResponse.json({
      message: "Login successful",
      token,
      user: { fullName: user.fullName, email: user.email },
    }, { status: 200 });
  } catch (err: any) {
    trackEvent("Login_Error", { reason: err.message });
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
