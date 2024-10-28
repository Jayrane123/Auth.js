import { connect } from "@/dbconfig/dbconfig";
import User from "@/model/usermodel";
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email,password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({ error: "User not FOund" }, { status: 500 });
        }
        console.log("user exist");

        const validPassword = bcryptjs.compare(password, user.password)
        if (!validPassword){
            return NextResponse.json({ error: "Check your Credential" }, { status: 500 });
        }

        const tokenData = {
            id: user._id,
            username: user._username,
            email : user._email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1h'})

        const response = NextResponse.json({
            message : "Logged In Success",
            success:true
        })

        response.cookies.set("token", token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === "production", // Only secure cookies in production
            maxAge: 60 * 60,
        })
        return response

    }
    catch(error) {
        console.error("Error in user signup process:", error); // Log the exact error
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
