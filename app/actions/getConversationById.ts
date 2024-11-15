import prisma from "../lib/prisma"
import getCurrentUser from "./getCurrentUser"


const getConversationById = async (conversationId: string) => {



    try {
        const currUser = await getCurrentUser()

        if (!currUser?.email) {
            return null
        }
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            }, include: { users: true }
        })

        return conversation


    } catch (error) {
        console.log("[getConversationById]", error)
        return null
    }
}

export default getConversationById