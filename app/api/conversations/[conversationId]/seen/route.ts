import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

interface IParams {
    conversationId?: string
}

export const POST = async (req: NextRequest, { params }: { params: IParams }) => {
    try {
        const currUser = await getCurrentUser()
        const { conversationId } = await params

        if (!currUser?.id || !currUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                users: true
            }
        })

        if (!conversation) {
            return new NextResponse("Invalid ID", { status: 400 })
        }

        const lastMessage = conversation.messages[conversation.messages.length - 1]
        if (!lastMessage) {
            return NextResponse.json(conversation)
        }

        // Update seen for last message
        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true
            },
            data: {
                seen: {
                    connect: {
                        id: currUser.id
                    }
                }
            }
        })

        return NextResponse.json(updatedMessage)
    } catch (error) {
        console.log("[message_seen_POST]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}