import prisma from "@/app/lib/prisma";
import getSession from "./getSession";

const getUsers = async () => {
    const session = await getSession()
    if (!session?.user?.email) {
        return []
    }

    try {
        // Find everyone who isn't me
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                NOT: {
                    email: session.user.email
                }
            }
        })

        return users
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return []
    }
}

export default getUsers