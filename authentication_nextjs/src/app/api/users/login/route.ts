import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { email, password } = reqbody;
    console.log(reqbody);
    // user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 500 }
      );
    }
    // pass is correct
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
