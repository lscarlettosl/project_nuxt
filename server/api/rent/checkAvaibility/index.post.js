import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const prisma = new PrismaClient();

    const isAvaible = await prisma.laptops.findFirst({
        where: {
            AND: [
                {
                    number: Number(body.id)
                },
                {
                    status: true
                }
            ]
        }
    })

    if (isAvaible) {
        return true
    } else {
        return false
    }
});
