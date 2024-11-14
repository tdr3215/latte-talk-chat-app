import prisma from "../lib/prisma";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
    const currUser = await getCurrentUser()

    if (!currUser?.id) {
        return []
    }

    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: "desc"
            },
            where: {
                userIds: {
                    has: currUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        })
        return conversations
    } catch (error) {
        console.log("[getConversations]", error)
        return []
    }
}
export default getConversations