import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const currUser = await getCurrentUser()
        const body = await req.json()
        const {
            name,
            image
        } = body

        if (!currUser?.id) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        const updateUser = await prisma.user.update({
            where: {
                id: currUser.id
            },
            data: {
                image: image,
                name: name
            }
        },)

        return NextResponse.json(updateUser, { status: 200 })
    } catch (error) {
        console.log('[Settings_POST]', error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}