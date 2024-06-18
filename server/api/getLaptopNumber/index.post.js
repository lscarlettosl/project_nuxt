import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    const body = await readBody(event)
    const laptops = await prisma.laptops_status.findFirst({
        where: {
            active: true,
            hash: body.hash
        },
        select: {
            id: true,
            laptopsId: true,
            startTime: true,
            endTime: true,
            usersId: true,
            active: true,
            hash: true,
            user: {
                select: {
                    last_name: true,
                },
            },

            laptop: {
                select: {
                    number: true,
                },
            },
        },
    });

    return laptops;
});
