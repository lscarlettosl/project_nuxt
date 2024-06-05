import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth"
export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const prisma = new PrismaClient()

    const getStatus = await prisma.laptops_status.findFirst({
        where: {
            hash: body.hash
        }
    })

    return getStatus

})