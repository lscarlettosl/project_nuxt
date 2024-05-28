import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth"
export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const prisma = new PrismaClient()

    const session = await getServerSession(event)


    const getUser = await prisma.laptops_status.findFirst({
        where: {
            id: Number(body.status_id)
        }
    })

    if (getUser.usersId != session.user.id) {
        return 'Wrong user returns'
    }

    const status = await prisma.laptops_status.update({
        where: {
            id: Number(body.status_id)
        },
        data: {
            active: false,
            endTime: new Date(),
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