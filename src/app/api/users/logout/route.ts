import { NextResponse } from "next/server";

export async function GET(){
    try {
        
        const resp = NextResponse.json(
            {
                message :  "Logout successfully"
            },
            {
                status: 200,
            }
        )

        resp.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

    } catch (error: any) {
        return NextResponse.json(
            {
                error : error.message,
            },
            {
                status: 500
            }
        )
    }
}