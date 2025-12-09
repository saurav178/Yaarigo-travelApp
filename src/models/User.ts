import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },  // allow null + prevent duplicate errors
    mobile: { type: String, unique: true, sparse: true }, // REQUIRED FOR OTP LOGIN
    password: { type: String },

    otp: { type: String },
    otpExpires: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
