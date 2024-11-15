import prisma from "../lib/prisma"
import getCurrentUser from "./getCurrentUser"
const getMessages = async (conversationId: string) => {

    try {
        const currUser = await getCurrentUser()

        if (!currUser?.email) {
            return null
        }

        const messages = await prisma.message.findMany({
            where: {
                conversationId: conversationId
            },
            include: {
                sender: true,
                seen: true
            },
            orderBy: {
                createdAt: "asc"
            }
        })

        return messages
    } catch (error) {
        console.log("[getMessages]", error)
        return []
    }

}

export default getMessages