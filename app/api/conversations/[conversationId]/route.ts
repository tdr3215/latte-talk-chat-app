import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

interface IParams {
    conversationId?: string
}

export const DELETE = async (req: NextRequest, { params }: { params: IParams }) => {
    try {
        const currUser = await getCurrentUser()
        const { conversationId } = await params

        if (!currUser?.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const existingConversations = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })

        if (!existingConversations) {
            return new NextResponse("Invalid Id", { status: 400 })
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currUser.id]
                }
            }
        })

        return NextResponse.json(deletedConversation, { status: 200 })
    } catch (error) {
        console.log("[Conversations_DELETE]", error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}