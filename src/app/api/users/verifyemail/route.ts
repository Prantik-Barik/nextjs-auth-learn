import { connect } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()

        const {token} = reqBody

        const user = await User.findOne({
            verifyToken : token,
            verifyExpiry : {
                $gt : Date.now()
            }
        })

        if(!user){
            return NextResponse.json(
                {
                    message : "User not found, Invalid token"
                },
                {
                    status : 400,
                }
            )
        }

        console.log(user)

        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })

    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}