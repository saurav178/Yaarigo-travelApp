import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import User from "../../../../lib/models/User";
import { trackEvent } from "../../../../lib/analytics";

type RequestBody = {
  emailOrPhone: string;
  otp?: string;
};

const OTP_EXPIRATION_MINUTES = 5;

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const { emailOrPhone, otp } = body;

    if (!emailOrPhone) {
      return NextResponse.json({ error: "Email or phone required" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 🔹 Step 1: Send OTP
    if (!otp) {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

      user.otp = generatedOtp;
      user.otpExpires = new Date(Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000);
      await user.save();

      console.log(`✅ OTP for ${emailOrPhone} is: ${generatedOtp}`);

      trackEvent("OTPLogin_Request_Success", {
        emailOrPhone,
        otp: generatedOtp,
        time: new Date().toISOString(),
      });

      return NextResponse.json({ message: "OTP sent successfully" });
    }

    // 🔹 Step 2: Verify OTP
    if (otp) {
      if (user.otp !== otp) {
        trackEvent("OTPLogin_Verify_Failed", {
          emailOrPhone,
          otp,
          time: new Date().toISOString(),
        });
        return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
      }

      if (user.otpExpires && new Date() > user.otpExpires) {
        return NextResponse.json({ error: "OTP expired" }, { status: 400 });
      }

      // Clear OTP after successful verification
      user.otp = "";
      user.otpExpires = null;
      await user.save();

      trackEvent("OTPLogin_Verify_Success", {
        emailOrPhone,
        time: new Date().toISOString(),
      });

      return NextResponse.json({ message: "OTP verified successfully", email: user.email });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (err: any) {
    console.error(err);
    trackEvent("OTPLogin_Error", { error: err.message, time: new Date().toISOString() });
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}
