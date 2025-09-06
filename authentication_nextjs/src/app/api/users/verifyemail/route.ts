import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel.js";
import { NextResponse, NextRequest } from "next/server";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const token = reqBody;
    console.log(reqBody);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "invalid Token" }, { status: 400 });
    }
    console.log(user);
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
      message:"Email Verified Successfully",
      success:true
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
