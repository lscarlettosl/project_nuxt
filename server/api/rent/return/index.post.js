import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const prisma = new PrismaClient()

    const status = await prisma.laptops_status.update({
        where: {
            id: body.status_id
        },
        data: {
            active: false,
            endTime: new Date(),
            returnedByUserId: body.userId
        }
    })

    const resp = await prisma.laptops.update({
        where: {
            number: status.laptopsId
        },
        data: {
            status: true
        }
    })

    return resp

})