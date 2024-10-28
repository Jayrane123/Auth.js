import { connect } from "@/dbconfig/dbconfig";
import User from "@/model/usermodel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const {token} = reqBody;
        console.log(token);
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() },
        });
       console.log(user)
        if (!user) {
            return NextResponse.json({ error: "User not Found" }, { status: 500 });
        }
        user.isVarified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json(
            {
                message: "User Verified Succefully",
                success : true,
            },
            {            
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error in user signup process:", error); // Log the exact error
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
