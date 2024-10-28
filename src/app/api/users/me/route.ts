import { connect } from "@/dbconfig/dbconfig";
import User from "@/model/usermodel";

import { NextRequest, NextResponse } from "next/server";

import { getDatafromTOken } from "@/helper/getdatafromtoken";
connect();

export async function POST(req: NextRequest) {
   const userId=await getDatafromTOken(req)
   const user =await User.findOne({_id:userId}).select("-password")
   return NextResponse.json({
    message:"User found",
    data:user,
})

}