import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const prisma = new PrismaClient()

    const resp = await prisma.laptops.update({
        where: {
            id: Number(body.id)
        },
        data: {
            status: true
        }
    })

    const status = await prisma.laptops_status.update({
        where: {
            id: body.laptop_id
        },
        data: {
            active: false,
            endTime: new Date()
        }
        
    })
    return resp

})

