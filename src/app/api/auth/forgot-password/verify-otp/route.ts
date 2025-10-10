import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb";
import User from "../../../../../lib/models/User";
import { trackEvent } from "../../../../../lib/analytics";

export async function POST(req: Request) {
  try {
    const { emailOrPhone, otp } = await req.json();
    if (!emailOrPhone || !otp) {
      trackEvent("VerifyOTP_Failed", { emailOrPhone, otp, reason: "Missing fields" });
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    if (!user) {
      trackEvent("VerifyOTP_Failed", { emailOrPhone, otp, reason: "User not found" });
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.otp !== otp) {
      trackEvent("VerifyOTP_Failed", { emailOrPhone, otp, reason: "Invalid OTP" });
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    if (user.otpExpires && user.otpExpires < new Date()) {
      trackEvent("VerifyOTP_Failed", { emailOrPhone, otp, reason: "OTP expired" });
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    trackEvent("VerifyOTP_Success", { emailOrPhone, userId: user._id });

    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (err: any) {
    trackEvent("VerifyOTP_Error", { reason: err.message });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
