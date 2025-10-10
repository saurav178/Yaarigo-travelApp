import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import User from "../../../../lib/models/User";
import { trackEvent } from "../../../../lib/analytics";

export async function POST(req: Request) {
  try {
    const { emailOrPhone } = await req.json();
    if (!emailOrPhone) {
      trackEvent("ForgotPassword_Request_Failed", { emailOrPhone, reason: "Missing field" });
      return NextResponse.json({ error: "Email or phone required" }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    if (!user) {
      trackEvent("ForgotPassword_Request_Failed", { emailOrPhone, reason: "User not found" });
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    console.log(`✅ OTP for ${emailOrPhone} is: ${otp}`);
    trackEvent("ForgotPassword_Request_Success", { emailOrPhone, otp, userId: user._id });

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (err: any) {
    trackEvent("ForgotPassword_Request_Error", { reason: err.message });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
