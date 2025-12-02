// FILE: src/app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();

  const { emailOrPhone, password } = await req.json();

  if (!emailOrPhone || !password) {
    return NextResponse.json(
      { success: false, message: "Email/Phone and password are required" },
      { status: 400 }
    );
  }

  // Find user by email OR phone
  const user = await User.findOne({
    $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Account not found" },
      { status: 400 }
    );
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { success: false, message: "Wrong password" },
      { status: 400 }
    );
  }

  // Create JWT
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return NextResponse.json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      email: user.email,
      phone: user.phone,
      name: user.name,
    },
  });
}
