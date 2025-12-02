import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { fullName, email, phone, password } = await req.json();

    // 1) Validate input
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2) Check existing user (email OR phone)
    const orConditions = [{ email }, phone && { phone }].filter(
      (c): c is { email?: string; phone?: string } => Boolean(c)
    );

    const existing = await User.findOne({ $or: orConditions });

    if (existing) {
      return NextResponse.json(
        { error: "Email or phone already exists" },
        { status: 400 }
      );
    }

    // 3) Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 4) Create user
    const user = await User.create({
      fullName,
      email,
      phone: phone || null,
      password: hashed,
    });

    // 5) Clean response (Never send hashed password)
    return NextResponse.json({
      message: "Registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
