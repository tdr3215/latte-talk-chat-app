import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prisma";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const currUser = await getCurrentUser()
        const body = await req.json()
        const {
            message,
            image,
            conversationId
        } = body

        if (!currUser?.id || !currUser.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currUser.id
                    }
                }


            },
            include: {
                seen: true,
                sender: true
            }
        })

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        })

        return NextResponse.json(newMessage, {
            status: 200
        })
    } catch (error) {
        console.log("[messages_POST]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}