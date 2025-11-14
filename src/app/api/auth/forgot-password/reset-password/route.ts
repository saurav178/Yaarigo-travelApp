import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "../../../../../lib/mongodb";
import User from "../../../../../lib/models/User";
import { trackEvent } from "../../../../../lib/analytics";

export async function POST(req: Request) {
  try {
    const { emailOrPhone, newPassword } = await req.json();
    if (!emailOrPhone || !newPassword) {
      trackEvent("ResetPassword_Failed", { emailOrPhone, reason: "Missing fields" });
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    if (!user) {
      trackEvent("ResetPassword_Failed", { emailOrPhone, reason: "User not found" });
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    trackEvent("ResetPassword_Success", { emailOrPhone, userId: user._id });

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (err: any) {
    trackEvent("ResetPassword_Error", { reason: err.message });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
