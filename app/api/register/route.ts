import bcrypt from "bcrypt"
import prisma from "@/app/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { email, name, password } = body

        if (!email || !name || !password) {
            return new NextResponse("Missing info", { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await prisma.user.create({ data: { email, name, hashedPassword } })
        return NextResponse.json(user, { status: 201 })

    } catch (error) {
        console.log("[Registration_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }

}
