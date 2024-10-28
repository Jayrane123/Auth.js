import { connect } from "@/dbconfig/dbconfig";

import {  NextResponse } from "next/server";

connect();

export async function GET() {
    try {
        const response = NextResponse.json({
            messagee:"Logout Sucessfully",
            sucess: 'true'
        })
        response.cookies.set("token","", {
            httpOnly:true,
            expires: new Date(0)
        })
        return response;
    }
    catch(error) {
        console.error("Error in user signup process:", error); // Log the exact error
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}