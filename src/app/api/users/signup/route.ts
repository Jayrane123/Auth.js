import {connect} from '@/dbconfig/dbconfig'
import User from '@/model/usermodel'
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helper/mailer';

connect();

export async function POST(req:NextRequest) {
    try{
        const reqBody = await req.json()
        const {username,email,password}= reqBody;
        console.log("Received request:", reqBody);
        if(!reqBody){
          console.log("error found")
        }

        // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists with email:", email);
      return NextResponse.json({ error: "User already exists" }, { status: 400 });

    }

        const salt =await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);

        const newUser = new User ({
            username,
            email,
            password: hashedPassword,
        })
        const saveUser=await newUser.save();
        console.log("User saved successfully:", saveUser);
        try{
        await sendEmail({email,emailType:"VERIFY",userId:saveUser._id})

        } catch (emailError) {
            console.log("Error sending verification email:", emailError);
            return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 });
          }
          
        return NextResponse.json({
            message:"User register Sucessfully",
            success:true,
            saveUser
        })
        
    }catch (error) {
        console.error("Error in user signup process:", error); // Log the exact error
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      }
    }