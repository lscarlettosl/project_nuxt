import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth"
export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const prisma = new PrismaClient()

    const session = await getServerSession(event)


    const getRent = await prisma.laptops_status.findFirst({
        where: {
            hash: body.hash,
            active: true
        }
    })

    if (!getRent) {
        return 'Неверная ссылка'
    }

    if (getRent.usersId != session.user.id) {
        return 'Ноутбук должен вернуть тот пользователь, который его взял'
    }

    const status = await prisma.laptops_status.update({
        where: {
            id: getRent.id
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

    if (resp) {
        return "Ноутбук вернулся. Теперь вы можете закрыть эту страницу"
    }
})