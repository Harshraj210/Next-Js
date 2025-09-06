import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel.js";
import { NextResponse, NextRequest } from "next/server";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const token = reqBody;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
