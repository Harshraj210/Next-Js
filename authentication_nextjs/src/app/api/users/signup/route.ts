import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);
    // check if user exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }
    //  hashing the password
    const salt = await bcryptjs.genSalt(10);
    const HashedPassword = await bcryptjs.hash(password, salt);

    // saving User
    const newUser = new User({
      username,
      email,
      password: HashedPassword,
    });
    // saving to database
    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
