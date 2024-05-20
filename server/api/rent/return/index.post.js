import { PrismaClient } from "@prisma/client";
import {getServerSession} from "#auth"
export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const prisma = new PrismaClient()

   const session = await getServerSession(event)

    
    const status = await prisma.laptops_status.update({
        where: {
            AND: [
                {
                    id: body.status_id
                },
                {
                    usersId: session.user.id
                }
            ]
          
        },
        data: {
            active: false,
            endTime: new Date()
        }

    })

    if(!status){
        return false
    }

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

