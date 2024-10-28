import { NextRequest ,NextResponse } from "next/server";
import jwt  from "jsonwebtoken";
interface DecodedToken {
    id: string;
    username: string;
    email: string;
}


export const getDatafromTOken = (req: NextRequest)=>{
    try {
        const token =req.cookies.get("token")?.value || "";
        const decodetokenjwt= jwt.verify(token,process.env.TOKEN_SECRET!) as DecodedToken
        return decodetokenjwt.id
    } catch(error) {
        console.error("Error in user signup process:", error); // Log the exact error
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}