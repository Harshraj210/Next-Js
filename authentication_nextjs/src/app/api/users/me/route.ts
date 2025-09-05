import { getDataToken } from "@/helper/getdatatoken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/usermodel";
import { connect } from "@/dbconfig/dbconfig";
connect()
export async function GET(request:NextRequest){
  try {
    const userId= await getDataToken(request)
    User.findOne({_id:userId})
  } catch (error:any) {
    return NextResponse.json({error:error.message},{status:400})
  }
}