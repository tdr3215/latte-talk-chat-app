import prisma from "@/app/lib/prisma"
import getSession from "./getSession"

 const getCurrentUser = async () => {
    try {
        const session = await getSession()
        if (!session?.user?.email) {
            return null
        }
        const currUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currUser) {
            return null
        }

        return currUser

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {

        return null
    }
}

export default getCurrentUser