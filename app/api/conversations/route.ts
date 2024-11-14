import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: NextResponse) {
    try {
        const currUser = await getCurrentUser()
        const body = await req.json()
        const {
            userId,
            isGroup,
            members,
            name
        } = body
        // CHECK USER AUTH
        if (!currUser?.id || !currUser?.email) {
            return new NextResponse("Unauthorized", { status: 400 })
        }
        // CHECK GROUP CREAION
        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse("Invalid Data", { status: 400 })
        }

        // GROUP CHAT LOGIC
        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })),
                            {
                                id: currUser.id
                            }
                        ]
                    }
                },
                include: {
                    users: true
                }
            })
            return NextResponse.json(newConversation, { status: 200 })
        }

        // EXISTING CHAT LOGIC
        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currUser.id, userId],

                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currUser.id]
                        }
                    }
                ]
            }
        })

        const singleConversation = existingConversations[0]
        if (singleConversation) {
            return NextResponse.json(singleConversation, { status: 200 })
        }

        // NEW SINGLE CONVERSATION
        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            }, include: {
                users: true
            }

        })

        return NextResponse.json(newConversation, { status: 200 })

    } catch (error) {
        console.log("[Conversations_POST]", error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}